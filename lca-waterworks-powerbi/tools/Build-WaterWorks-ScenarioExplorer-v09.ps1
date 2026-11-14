# Build a SEPARATE native Power BI scenario explorer from a saved v08 PBIP.
# Windows PowerShell 5.1+. Source files are never changed. No installation,
# network access, execution-policy change, publication, or production connection.
[CmdletBinding()]
param(
    [Parameter(Mandatory=$true)][string]$ProjectPath,
    [Parameter(Mandatory=$true)][string]$RecipePath,
    [string]$Destination = 'C:\WaterWorksLab\WaterWorks_ScenarioExplorer_v09'
)
& {
    param($ProjectPath, $RecipePath, $Destination)
    $ErrorActionPreference = 'Stop'
    $utf8 = [System.Text.UTF8Encoding]::new($false)
    $culture = [Globalization.CultureInfo]::InvariantCulture
    if (@(Get-Process -Name PBIDesktop -ErrorAction SilentlyContinue).Count -gt 0) {
        throw 'Save and close ALL Power BI Desktop windows first.'
    }
    $project = (Get-Item -LiteralPath $ProjectPath -ErrorAction Stop).FullName
    if ([IO.Path]::GetExtension($project) -ne '.pbip') { throw 'Select the saved .pbip project, not a .pbix file.' }
    $source = Split-Path -Parent $project
    $prefix = $source.TrimEnd([char[]]'\/') + [IO.Path]::DirectorySeparatorChar
    $dest = [IO.Path]::GetFullPath($Destination)
    if ((Test-Path -LiteralPath $dest) -or $dest.StartsWith($prefix, [StringComparison]::OrdinalIgnoreCase)) {
        throw 'Destination must be a NEW folder outside the source. Nothing overwritten.'
    }
    function Read-Json([string]$p) { return ConvertFrom-Json -InputObject ([IO.File]::ReadAllText($p)) }
    function Resolve-Local([string]$folder, [string]$relative) {
        $p = [IO.Path]::GetFullPath((Join-Path $folder $relative))
        if (-not $p.StartsWith($prefix, [StringComparison]::OrdinalIgnoreCase)) { throw "External project reference: $p" }
        return $p
    }
    $entry = Read-Json $project
    $art = @($entry.artifacts | Where-Object { $_.report })
    if ($art.Count -ne 1) { throw 'Expected one local report artifact.' }
    $reportRoot = Resolve-Local $source $art[0].report.path
    $reportDef = Read-Json (Join-Path $reportRoot 'definition.pbir')
    if (-not $reportDef.datasetReference.byPath.path) { throw 'Expected a local semantic model.' }
    $modelRoot = Resolve-Local $reportRoot $reportDef.datasetReference.byPath.path
    $tableDir = Join-Path $modelRoot 'definition\tables'
    $inventory = @(Get-ChildItem -LiteralPath $source -Recurse -Force)
    if (@($inventory | Where-Object { $_.Attributes -band [IO.FileAttributes]::ReparsePoint }).Count -gt 0) {
        throw 'Links/junctions are not supported. Source unchanged.'
    }
    if (@($inventory | Where-Object { $_.Name -eq 'unappliedChanges.json' }).Count -gt 0) {
        throw 'Apply and save pending queries in Desktop before building this edition.'
    }
    # GZip/base64 authoring recipe: only generic DAX, report templates and labels.
    # It contains NO source data, credentials or executable PowerShell.
    $recipeHash = 'e24d7f40f46b6da2ef7f2b95acf032f73e2a0710c39b6a92ac3da1b32c166d97'
    if ((Get-FileHash -LiteralPath $RecipePath -Algorithm SHA256).Hash -ne $recipeHash) {
        throw 'Authoring recipe checksum mismatch. Nothing changed.'
    }
    $compressed = [Convert]::FromBase64String([IO.File]::ReadAllText($RecipePath))
    $memory = [IO.MemoryStream]::new($compressed)
    $gzip = [IO.Compression.GZipStream]::new($memory, [IO.Compression.CompressionMode]::Decompress)
    $reader = [IO.StreamReader]::new($gzip, [Text.Encoding]::UTF8)
    try { $recipe = ConvertFrom-Json -InputObject $reader.ReadToEnd() }
    finally { $reader.Dispose(); $gzip.Dispose(); $memory.Dispose() }

    # Parse literal #table rows WITHOUT executing source M, DAX or other code.
    function Read-LiteralTable([string]$name) {
        $file = Join-Path $tableDir ($name + '.tmdl')
        if (-not (Test-Path -LiteralPath $file -PathType Leaf)) { throw "Required table missing: $name" }
        $s = [IO.File]::ReadAllText($file)
        $match = [regex]::Match($s, '#table\s*\(')
        if (-not $match.Success) { throw "Unsupported source representation in $name. Source unchanged." }
        $i = $match.Index + $match.Length
        $b = [Text.StringBuilder]::new()
        while ($i -lt $s.Length) {
            $ch = $s[$i]
            if ([char]::IsWhiteSpace($ch)) { $i++; continue }
            if ($ch -eq ')') { break }
            if ($ch -eq '"') {
                $i++; $t = [Text.StringBuilder]::new(); $closed = $false
                while ($i -lt $s.Length) {
                    if ($s[$i] -eq '"') {
                        if ($i + 1 -lt $s.Length -and $s[$i + 1] -eq '"') { [void]$t.Append('"'); $i += 2; continue }
                        $i++; $closed = $true; break
                    }
                    [void]$t.Append($s[$i]); $i++
                }
                if (-not $closed) { throw "Unclosed source string in $name" }
                $v = $t.ToString().Replace('#(cr,lf)', "`r`n").Replace('#(lf)', "`n").Replace('#(cr)', "`r").Replace('#(tab)', "`t")
                [void]$b.Append((ConvertTo-Json -InputObject $v -Compress)); continue
            }
            if ($ch -eq '{') { [void]$b.Append('['); $i++; continue }
            if ($ch -eq '}') { [void]$b.Append(']'); $i++; continue }
            if ($ch -eq ',') { [void]$b.Append(','); $i++; continue }
            $m = [regex]::Match($s.Substring($i), '\A(?:null|true|false|[-+]?\d+(?:\.\d*)?(?:[eE][-+]?\d+)?)')
            if (-not $m.Success) { throw "Unsupported M literal in $name at character $i." }
            [void]$b.Append($m.Value); $i += $m.Length
        }
        $a = ConvertFrom-Json -InputObject ('[' + $b.ToString() + ']')
        if ($a.Count -ne 2) { throw "Unexpected #table arguments in $name" }
        $columns = @($a[0]); $records = [Collections.Generic.List[object]]::new()
        if (($columns -join '|') -ne (@($recipe.sourceColumns.$name) -join '|')) { throw "Unexpected columns in $name" }
        foreach ($r in $a[1]) {
            if ($r.Count -ne $columns.Count) { throw "Row width mismatch in $name" }
            $o = [ordered]@{}
            for ($j = 0; $j -lt $columns.Count; $j++) { $o[[string]$columns[$j]] = $r[$j] }
            $records.Add([pscustomobject]$o)
        }
        return [pscustomobject]@{ Columns = $columns; Rows = @($records.ToArray()); File = $file }
    }
    $names = @($recipe.copyTables) + @('ValidationExpected', 'TariffLines', 'FundData')
    $tables = @{}; $sourceHashes = @{}
    foreach ($n in $names) {
        $tables[$n] = Read-LiteralTable $n
        $sourceHashes[$n] = (Get-FileHash -LiteralPath $tables[$n].File -Algorithm SHA256).Hash
    }
    $identity = @($tables['RunIdentity'].Rows)
    if ($identity.Count -ne 1 -or $identity[0].DataRevision -ne $recipe.sourceRevision -or $identity[0].Cutoff -ne '2026-11-07') {
        throw 'Source data identity differs from the reviewed snapshot. No files changed.'
    }
    $funds = @($tables['Division'].Rows); $scenarios = @($tables['Scenario'].Rows)
    if ($funds.Count -ne 3 -or $scenarios.Count -ne 11) { throw 'Expected three divisions and eleven presets.' }
    $allowed = @{}
    foreach ($f in $funds) {
        foreach ($s in $scenarios) {
            if ($recipe.scenarioIds -notcontains $s.Scenario) { throw 'Unknown scenario identifier.' }
            $allowed[$f.Fund + '-' + $s.Scenario] = $true
        }
    }
    if ($allowed.Count -ne 33) { throw 'Division/preset identifiers are not unique.' }
    $published = [Collections.Generic.List[object]]::new(); $ix = @{}
    foreach ($r in $tables['ValidationExpected'].Rows) {
        if (-not $allowed.ContainsKey([string]$r.Case)) { continue }
        if ($null -eq $r.Expected -or [double]::IsNaN([double]$r.Expected) -or [double]::IsInfinity([double]$r.Expected)) { throw 'Missing/nonfinite stored result.' }
        $key = $r.Case + '|' + $r.Year + '|' + $r.Metric
        if ($ix.ContainsKey($key)) { throw "Duplicate stored metric: $key" }
        $ix[$key] = [double]$r.Expected
        $published.Add([pscustomobject][ordered]@{ Case=[string]$r.Case; Year=[int]$r.Year; Metric=[string]$r.Metric; Value=[double]$r.Expected })
    }
    if ($published.Count -ne 6435) { throw "Expected 6435 stored metrics; found $($published.Count). Nothing changed." }
    function Value-At([string]$case, [int]$year, [string]$metric) {
        $key = $case + '|' + $year + '|' + $metric
        if (-not $ix.ContainsKey($key)) { throw "Missing metric: $key" }
        return [double]$ix[$key]
    }
    function Sum-Period([string]$case, [string]$metric) {
        $sum = 0.0; foreach ($y in 2027..2031) { $sum += Value-At $case $y $metric }; return $sum
    }
    function Close-Enough([double]$a, [double]$b, [string]$label) {
        if ([math]::Abs($a - $b) -gt 0.00001) { throw "Reconciliation failed: $label ($a vs $b)" }
    }
    $sourceKeys = @('customer','otherOperating','investment','capitalReceipts','plannedGrants','extraGrants','baseBorrowing','extraBorrowing','investmentConversions')
    $useKeys = @('operatingExpense','lease','otherCapitalPayments','baseDebtService','extraDebtService','capex')
    $caseChecks = [Collections.Generic.List[object]]::new()
    foreach ($c in @($allowed.Keys | Sort-Object)) {
        foreach ($y in 2027..2031) {
            $inflow = 0.0; $outflow = 0.0
            foreach ($k in $sourceKeys) { $inflow += Value-At $c $y $k }
            foreach ($k in $useKeys) { $outflow += Value-At $c $y $k }
            Close-Enough $inflow (Value-At $c $y 'cashSources') "$c $y sources"
            Close-Enough $outflow (Value-At $c $y 'cashUses') "$c $y uses"
            Close-Enough ((Value-At $c $y 'openingCash') + $inflow - $outflow) (Value-At $c $y 'cash') "$c $y cash"
            if ($y -gt 2027) { Close-Enough (Value-At $c $y 'openingCash') (Value-At $c ($y-1) 'cash') "$c continuity" }
            Close-Enough ((Value-At $c $y 'annualBill') / 12) (Value-At $c $y 'monthlyBill') "$c monthly bill"
        }
        $open = Value-At $c 2027 'openingCash'; $end = Value-At $c 2031 'cash'
        $cashResidual = $open + (Sum-Period $c 'netFlow') - $end
        $generated = (Sum-Period $c 'customer') + (Sum-Period $c 'otherOperating') + (Sum-Period $c 'investment')
        foreach ($k in @('operatingExpense','lease','otherCapitalPayments','baseDebtService','extraDebtService')) { $generated -= Sum-Period $c $k }
        $capitalResidual = Sum-Period $c 'capex'
        foreach ($k in @('baseBorrowing','extraBorrowing','plannedGrants','extraGrants','capitalReceipts','investmentConversions')) { $capitalResidual -= Sum-Period $c $k }
        $capitalResidual -= $generated + ($open - $end)
        Close-Enough $cashResidual 0 "$c cash residual"
        Close-Enough $capitalResidual 0 "$c capital residual"
        Close-Enough (Sum-Period $c 'capex') (Value-At $c 2031 'totalCapital') "$c capital total"
        $caseChecks.Add([pscustomobject]@{ Case=$c; AnnualRows=5; Opening2027=$open; Closing2031=$end; Capital=(Sum-Period $c 'capex'); PlannedBorrowing=(Sum-Period $c 'baseBorrowing'); CashResidual=$cashResidual; CapitalResidual=$capitalResidual })
    }
    # Independent reference anchors; do not adjust these to force a passing result.
    $anchors = @(
        @('suburbanWater',7546095.0,43516250.0,17751000.0,1325105.37),
        @('suburbanWastewater',10447425.0,55161250.0,31025000.0,6791324.42),
        @('city',53947019.0,262634500.0,28973780.0,33928469.46)
    )
    foreach ($a in $anchors) {
        $c = $a[0] + '-central'
        Close-Enough (Value-At $c 2027 'cash') $a[1] "$c anchor cash"
        Close-Enough (Sum-Period $c 'capex') $a[2] "$c anchor capital"
        Close-Enough (Sum-Period $c 'baseBorrowing') $a[3] "$c anchor borrowing"
        if ([math]::Abs((Value-At $c 2031 'cash') - $a[4]) -gt 0.01) { throw 'Closing-cash anchor differs.' }
    }
    $settings = @{}
    foreach ($r in $tables['PresetValues'].Rows) {
        $key = $r.Fund + '|' + $r.Scenario + '|' + $r.Key
        $settings[$key] = if ($null -ne $r.Text) { $r.Text } else { $r.Number }
    }
    function Setting([string]$fund, [string]$scenario, [string]$key) {
        $k = $fund + '|' + $scenario + '|' + $key
        if (-not $settings.ContainsKey($k)) { throw "Missing setting: $k" }; return $settings[$k]
    }
    # Reconstruct the exposed default account bill from tariff lines; compare each
    # year with its stored scenario bill. Unsupported accounts stop the build.
    $parts = [Collections.Generic.List[object]]::new()
    foreach ($f in $funds) {
        $fd = @($tables['FundData'].Rows | Where-Object { $_.Fund -eq $f.Fund })
        if ($fd.Count -ne 1) { throw 'Invalid FundData key.' }
        foreach ($s in $scenarios) {
            $fkey = [string]$f.Fund; $skey = [string]$s.Scenario; $c = $fkey + '-' + $skey
            if ((Setting $fkey $skey 'usage') -ne 5000 -or (Setting $fkey $skey 'meter') -ne '5/8' -or (Setting $fkey $skey 'edu') -ne 1 -or (Setting $fkey $skey 'income') -ne 35000) {
                throw "Nondefault account in $c. No silent account substitution."
            }
            $frozen = (Setting $fkey $skey 'tariffPath') -eq 'freeze2026'
            $ty = if ($frozen) { 2026 } else { 2027 }; $bt = Setting $fkey $skey 'billType'
            $lines = @($tables['TariffLines'].Rows | Where-Object { $_.Fund -eq $fkey -and $_.BillType -eq $bt -and $_.Meter -eq '5/8' -and $_.Year -eq $ty })
            if ($lines.Count -eq 0) { throw "Missing tariff lines: $c" }
            foreach ($y in 2027..2031) {
                $billSum = 0.0
                foreach ($line in $lines) {
                    if ($line.Months -ne 3) { throw 'Unexpected billing period.' }
                    $growth = if ($frozen) { 1.0 } else { [math]::Pow(1 + [double]$fd[0].futureTariffGrowthPct / 100, $y-2027) }
                    $mk = switch ($line.Kind) { 'fixed' { 'fixedAdjustments' } 'usage' { 'usageAdjustments' } 'addon' { 'addonAdjustments' } default { throw 'Unknown component kind.' } }
                    $factor = 1.0
                    foreach ($yr in 2027..$y) { $factor *= 1 + [double](Setting $fkey $skey ($mk + '_' + $yr)) / 100 }
                    $raw = switch ($line.Unit) {
                        'fixed' { [double]$line.Value }
                        'edu' { [double]$line.Value }
                        'kgal' { [double]$line.Value * 15 }
                        'blocks' { if (15000 -gt $line.B1) { throw 'Default usage exceeded block 1.' }; [double]$line.R1 * 15 }
                        default { throw 'Unsupported default tariff basis.' }
                    }
                    $raw *= $growth * $factor
                    $amount = [math]::Floor(($raw + 2.220446049250313e-16) * 100 + 0.5) / 100
                    $billSum += $amount
                    $parts.Add([pscustomobject][ordered]@{ Case=$c; Year=$y; Label=[string]$line.Label; Kind=[string]$line.Kind; Amount=$amount })
                }
                Close-Enough ($billSum * 4) (Value-At $c $y 'annualBill') "$c $y bill components"
            }
        }
    }
    if ($parts.Count -ne 605) { throw 'Unexpected bill-component count.' }
    function M-Literal($v) {
        if ($null -eq $v) { return 'null' }
        if ($v -is [string]) { return '"' + $v.Replace('"','""').Replace("`r",'#(cr)').Replace("`n",'#(lf)') + '"' }
        if ($v -is [bool]) { return $v.ToString().ToLowerInvariant() }
        if ($v -is [double]) { return $v.ToString('R', $culture) }
        return [Convert]::ToString($v, $culture)
    }
    function Make-Table([string]$name, $rows, [Collections.Specialized.OrderedDictionary]$types, [bool]$hidden=$false) {
        $a = [Collections.Generic.List[string]]::new(); $a.Add("table '$name'")
        if ($hidden) { $a.Add("`tisHidden") }
        foreach ($col in $types.Keys) {
            $a.Add("`tcolumn '$col'"); $a.Add("`t`tdataType: $($types[$col])"); $a.Add("`t`tsourceColumn: $col"); $a.Add("`t`tsummarizeBy: none")
            if ($name -eq 'FiveYearBridge' -and $col -eq 'Category') { $a.Add("`t`tsortByColumn: Order") }
        }
        $dataRows = [Collections.Generic.List[string]]::new()
        foreach ($r in $rows) { $vals = @(foreach ($col in $types.Keys) { M-Literal $r.$col }); $dataRows.Add('{' + ($vals -join ',') + '}') }
        $header = @(foreach ($col in $types.Keys) { M-Literal $col })
        $mt = @{ string='type text'; int64='Int64.Type'; double='type number'; boolean='type logical' }
        $typed = @(foreach ($col in $types.Keys) { '{' + (M-Literal $col) + ',' + $mt[$types[$col]] + '}' })
        $a.Add("`tpartition '$name' = m"); $a.Add("`t`tmode: import"); $a.Add("`t`tsource ="); $a.Add("`t`t`tlet")
        $a.Add("`t`t`t`tSource = #table({" + ($header -join ',') + '}, {' + ($dataRows -join ',') + '}),')
        $a.Add("`t`t`t`tTyped = Table.TransformColumnTypes(Source,{" + ($typed -join ',') + '})'); $a.Add("`t`t`tin Typed")
        return ($a -join "`n") + "`n"
    }
    function Put([string]$relative, [string]$content) {
        $target = [IO.Path]::GetFullPath((Join-Path $dest $relative))
        if (-not $target.StartsWith($dest.TrimEnd([char[]]'\/') + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) { throw 'Unsafe output path.' }
        [void][IO.Directory]::CreateDirectory((Split-Path -Parent $target))
        [IO.File]::WriteAllText($target, $content, $utf8)
    }
    # All arithmetic preflight checks passed BEFORE creating the destination.
    [void][IO.Directory]::CreateDirectory($dest)
    foreach ($p in $recipe.files.PSObject.Properties) {
        $content = if ($p.Value -is [string]) { $p.Value } else { (ConvertTo-Json -InputObject $p.Value -Depth 100) + "`n" }
        Put $p.Name $content
    }
    foreach ($n in $recipe.copyTables) {
        $types = [ordered]@{}
        foreach ($p in $recipe.tableSchemas.$n.PSObject.Properties) { $types[$p.Name] = [string]$p.Value }
        $rows = @($tables[$n].Rows)
        if ($n -eq 'RunIdentity') { $rows[0].Status = 'Stored-scenario explorer; no live optimization; 2027 rates proposed at evidence cutoff.' }
        Put ('WaterWorks.SemanticModel/definition/tables/' + $n + '.tmdl') (Make-Table $n $rows $types ($n -eq 'PresetValues'))
    }
    Put 'WaterWorks.SemanticModel/definition/tables/PublishedValues.tmdl' (Make-Table 'PublishedValues' ($published.ToArray()) ([ordered]@{Case='string';Year='int64';Metric='string';Value='double'}) $true)
    Put 'WaterWorks.SemanticModel/definition/tables/PublishedBillParts.tmdl' (Make-Table 'PublishedBillParts' ($parts.ToArray()) ([ordered]@{Case='string';Year='int64';Label='string';Kind='string';Amount='double'}) $true)
    Put 'README.txt' $recipe.readme
    $jsonCount = 0; $visualCount = 0; $tableCount = 0
    foreach ($file in @(Get-ChildItem -LiteralPath $dest -Recurse -File)) {
        if ($file.Extension -in @('.json','.pbip','.pbir','.pbism')) { $null = Read-Json $file.FullName; $jsonCount++ }
        if ($file.Name -eq 'visual.json') { $visualCount++ }
        if ($file.Extension -eq '.tmdl') {
            $text = [IO.File]::ReadAllText($file.FullName)
            if ($text -match '\[_(Engine|Result|BestCandidate)\]' -or $text -match 'Web\.Contents|File\.Contents|Sql\.Database|Excel\.Workbook') { throw 'Unexpected live/external dependency in candidate. Source unchanged.' }
            if ($file.Directory.Name -eq 'tables') { $tableCount++ }
        }
    }
    if ($visualCount -ne $recipe.counts.visuals -or $tableCount -ne $recipe.counts.tables) { throw 'Output count check failed. Do not publish.' }
    foreach ($n in $names) {
        if ((Get-FileHash -LiteralPath $tables[$n].File -Algorithm SHA256).Hash -ne $sourceHashes[$n]) { throw 'Source changed during build. Do not publish this candidate.' }
    }
    $log = [ordered]@{
        Status='PASS build and arithmetic; native Desktop acceptance pending'
        Edition='Scenario Explorer v09'; SourceProject=$project; SourceDataRevision=$identity[0].DataRevision
        ScenarioCases=33; AnnualRows=165; StoredMetrics=$published.Count; BillComponentRows=$parts.Count
        ReportPages=$recipe.counts.pages; ReportVisuals=$visualCount; ModelTables=$tableCount
        LiveEngineIncluded=$false; LiveOptimizerIncluded=$false; OriginalFilesModified=0
        JsonFilesParsed=$jsonCount; Cases=$caseChecks.ToArray()
    }
    Put 'V09_BUILD_RESULT.json' ((ConvertTo-Json -InputObject $log -Depth 20) + "`n")
    Write-Host 'PASS: new stored-scenario explorer built; source files unchanged.'
    Write-Host '33 cases; 165 annual rows; 605 bill lines; cash and capital checks passed.'
    Write-Host "10 report pages; $visualCount visuals; $tableCount tables. No original engine or optimizer dependency."
    Write-Host 'NEXT: open the new project, Refresh once, save, and run Explorer acceptance.'
    Write-Host (Join-Path $dest 'WaterWorks_ScenarioExplorer_v09.pbip')
    Write-Host (Join-Path $dest 'V09_BUILD_RESULT.json')
} $ProjectPath $RecipePath $Destination
