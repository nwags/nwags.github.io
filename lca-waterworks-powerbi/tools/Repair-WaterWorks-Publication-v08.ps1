# Local WaterWorks v07 -> v08 publication candidate. Windows PowerShell 5.1+.
# Creates a new copy. Never publishes, installs software, changes execution policy,
# uploads files, deletes source files, or modifies existing financial-engine measures.
[CmdletBinding()]
param([string]$ProjectPath, [string]$Destination)
& {
    param($ProjectPath, $Destination)
    $ErrorActionPreference = 'Stop'
    if (@(Get-Process -Name PBIDesktop -ErrorAction SilentlyContinue).Count -gt 0) {
        throw 'Save and close all Power BI Desktop windows first.'
    }
    if (-not $ProjectPath) {
        Add-Type -AssemblyName System.Windows.Forms
        $picker = New-Object System.Windows.Forms.OpenFileDialog
        $picker.Title = 'Select the current working WaterWorks .pbip project'
        $picker.Filter = 'Power BI project (*.pbip)|*.pbip'
        if (Test-Path -LiteralPath 'C:\WaterWorksLab') { $picker.InitialDirectory = 'C:\WaterWorksLab' }
        try {
            if ($picker.ShowDialog() -ne [System.Windows.Forms.DialogResult]::OK) {
                Write-Host 'Cancelled. No files changed.'
                return
            }
            $ProjectPath = $picker.FileName
        } finally { $picker.Dispose() }
    }
    $project = (Get-Item -LiteralPath $ProjectPath).FullName
    if ([IO.Path]::GetExtension($project) -ne '.pbip') { throw 'Select a .pbip project, not a packaged .pbix.' }
    $source = Split-Path -Parent $project
    $prefix = $source.TrimEnd([char[]]'\/') + [IO.Path]::DirectorySeparatorChar
    function Read-Json([string]$Path) { return ConvertFrom-Json -InputObject ([IO.File]::ReadAllText($Path)) }
    function Local-Path([string]$Folder, [string]$Relative) {
        $p = [IO.Path]::GetFullPath((Join-Path $Folder $Relative))
        if (-not $p.StartsWith($prefix, [StringComparison]::OrdinalIgnoreCase)) { throw "External project reference: $p" }
        return $p
    }
    $entry = Read-Json $project
    $reports = @($entry.artifacts | Where-Object { $_.report })
    if ($reports.Count -ne 1) { throw 'Expected one local report artifact.' }
    $report = Local-Path $source $reports[0].report.path
    $definition = Read-Json (Join-Path $report 'definition.pbir')
    if (-not $definition.datasetReference.byPath.path) { throw 'Expected a local semantic model.' }
    $model = Local-Path $report $definition.datasetReference.byPath.path
    $measureFile = Join-Path $model 'definition\tables\WaterWorksMeasures.tmdl'
    $modelFile = Join-Path $model 'definition\model.tmdl'
    foreach ($f in @($measureFile, $modelFile, (Join-Path $report 'definition\version.json'))) {
        if (-not (Test-Path -LiteralPath $f -PathType Leaf)) { throw "Required v07 file missing: $f" }
    }
    if (-not $Destination) { $Destination = Join-Path (Split-Path -Parent $source) 'WaterWorks_Publication_v08' }
    $dest = [IO.Path]::GetFullPath($Destination)
    if (Test-Path -LiteralPath $dest) { throw "Destination exists; nothing overwritten: $dest" }
    foreach ($component in @($report, $model)) {
        if ($dest.StartsWith($component.TrimEnd([char[]]'\/') + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) {
            throw 'Destination cannot be inside a source report/model folder.'
        }
    }
    $inventory = @()
    foreach ($component in @($report, $model)) {
        $item = Get-Item -LiteralPath $component
        if ($item.Attributes -band [IO.FileAttributes]::ReparsePoint) { throw 'Linked source folders are not supported.' }
        $inventory += @(Get-ChildItem -LiteralPath $component -Recurse -Force)
    }
    if (@($inventory | Where-Object { $_.Attributes -band [IO.FileAttributes]::ReparsePoint }).Count) { throw 'Source contains links/junctions.' }
    if (@($inventory | Where-Object { $_.Name -eq 'unappliedChanges.json' }).Count) {
        throw 'Apply and save pending Power Query changes in Desktop, then close it. No files changed.'
    }
    $pages = @(Get-ChildItem -LiteralPath (Join-Path $report 'definition\pages') -Recurse -File -Filter page.json)
    if ($pages.Count -ne 15) { throw 'Expected the current 15-page report.' }
    $original = [IO.File]::ReadAllText($measureFile)
    if ($original -match "(?m)^\s*measure 'PUB08 ") { throw 'v08 repairs already exist. Select the working v07 source.' }
    $badType = '(\{\s*"(?:[^"]|"")+"\s*,\s*)text(?=\s*\})'
    foreach ($f in @(Get-ChildItem -LiteralPath (Join-Path $model 'definition\tables') -File -Filter '*.tmdl')) {
        if ([regex]::IsMatch([IO.File]::ReadAllText($f.FullName), $badType)) { throw 'Old M text-type defect remains. Select the corrected v07 source.' }
    }
    $flows = @('Customer receipts','Other operating receipts','Investment receipts','Capital receipts',
        'Planned grants received','Additional grants','Planned borrowing','Additional borrowing','Investment conversions',
        'Operating cash payments','Lease payments','Other capital payments','Base debt service','Additional debt service',
        'Capital spending','Net flow','Total cash sources','Total cash uses','Capital residual','Capital funding above spending')
    $required = $flows + @('Opening cash','Year-end unrestricted cash','Cash days','Coverage','Monthly bill equivalent',
        'Feasible','Five-year capital cash bridge','Five-year cash generated','Five-year reserve draw','Grants after horizon',
        'Volume index 2016 equals 100','Planning status')
    foreach ($name in $required) {
        $pat = "(?m)^\s*measure\s+(?:'" + [regex]::Escape($name) + "'|" + [regex]::Escape($name) + ")\s*="
        if (-not [regex]::IsMatch($original, $pat)) { throw "Required measure missing: $name" }
    }
    $utf8 = New-Object System.Text.UTF8Encoding($false)
    function Put-Text([string]$Path, [string]$Text) {
        [void][IO.Directory]::CreateDirectory((Split-Path -Parent $Path))
        [IO.File]::WriteAllText($Path, $Text, $utf8)
    }
    function Put-Json([string]$Path, $Object) {
        $text = ConvertTo-Json -InputObject $Object -Depth 100
        $null = ConvertFrom-Json -InputObject $text
        Put-Text $Path ($text + "`n")
    }
    function Set-Prop($Object, [string]$Name, $Value) { $Object | Add-Member -MemberType NoteProperty -Name $Name -Value $Value -Force }
    function Ensure-Prop($Object, [string]$Name) {
        if ($null -eq $Object.$Name) { Set-Prop $Object $Name ([pscustomobject]@{}) }
        return $Object.$Name
    }
    function Lit($Value) {
        if ($Value -is [bool]) { $s = $Value.ToString().ToLowerInvariant() }
        elseif ($Value -is [string]) { $s = "'" + $Value.Replace("'", "''") + "'" }
        else { $s = ([string]$Value) + 'D' }
        return [pscustomobject]@{expr=[pscustomobject]@{Literal=[pscustomobject]@{Value=$s}}}
    }
    function Format-Prop($Visual, [string]$Group, [string]$Name, $Value) {
        $objects = Ensure-Prop $Visual 'objects'
        $items = @($objects.$Group | Where-Object { $null -ne $_ })
        $target = @($items | Where-Object { $null -eq $_.selector }) | Select-Object -First 1
        if ($null -eq $target) { $target=[pscustomobject]@{properties=[pscustomobject]@{}}; $items += $target }
        Set-Prop (Ensure-Prop $target 'properties') $Name $Value
        Set-Prop $objects $Group @($items)
    }
    function Rewrite-Refs($Object, [hashtable]$Map) {
        if ($null -eq $Object) { return }
        if ($Object -is [System.Array]) { foreach ($x in $Object) { Rewrite-Refs $x $Map } }
        elseif ($Object -is [pscustomobject]) {
            if ($Object.Measure -and $Object.Measure.Expression.SourceRef.Entity -eq 'WaterWorksMeasures') {
                $n=[string]$Object.Measure.Property
                if ($Map.ContainsKey($n)) { $Object.Measure.Property=$Map[$n] }
            }
            if ($Object.queryRef -is [string] -and $Object.queryRef.StartsWith('WaterWorksMeasures.')) {
                $n=$Object.queryRef.Substring('WaterWorksMeasures.'.Length)
                if ($Map.ContainsKey($n)) { $Object.queryRef='WaterWorksMeasures.'+$Map[$n] }
            }
            foreach ($p in @($Object.PSObject.Properties)) { Rewrite-Refs $p.Value $Map }
        }
    }
    $newDax = New-Object System.Text.StringBuilder
    function Add-Measure([string]$Name, [string]$Expression, [string]$Format) {
        [void]$newDax.Append("`n`tmeasure '$Name' =`n")
        foreach ($line in ($Expression -split '\r?\n')) { [void]$newDax.Append("`t`t`t$line`n") }
        if ($Format) { [void]$newDax.Append("`t`tformatString: $Format`n") }
        [void]$newDax.Append("`t`tdisplayFolder: Publication v08`n")
    }
    $money = '$#,0.00;($#,0.00);$0.00'
    $tableMap = @{}
    foreach ($name in $flows) {
        $newName='PUB08 Table '+$name
        Add-Measure $newName ("SUMX(VALUES('Year'[Year]), CALCULATE([$name]))") $money
        $tableMap[$name]=$newName
    }
    foreach ($spec in @(@('Opening cash','MIN'),@('Year-end unrestricted cash','MAX'),@('Monthly bill equivalent','MAX'))) {
        $name=$spec[0]; $agg=$spec[1]; $newName='PUB08 Table '+$name
        Add-Measure $newName ("VAR __y=$agg('Year'[Year]) RETURN CALCULATE([$name], REMOVEFILTERS('Year'), TREATAS({__y},'Year'[Year]))") $money
        $tableMap[$name]=$newName
    }
    foreach ($name in @('Cash days','Coverage')) {
        $newName='PUB08 Table '+$name
        Add-Measure $newName ("MINX(VALUES('Year'[Year]), CALCULATE([$name]))") '0.00'
        $tableMap[$name]=$newName
    }
    Add-Measure 'PUB08 Bridge value' "IF(HASONEVALUE('FiveYearBridge'[Metric]), [Five-year capital cash bridge], BLANK())" $money
    $tableMap['Five-year capital cash bridge']='PUB08 Bridge value'
    Add-Measure 'PUB08 Grants after horizon' 'IF(ISBLANK([Feasible]), BLANK(), COALESCE([Grants after horizon],0))' $money
    Add-Measure 'PUB08 Planning status' 'VAR __p=[Feasible] RETURN IF(ISBLANK(__p),"No result: review inputs or finite-search feasibility.",IF(__p=1,"Implemented planning targets: PASS.","One or more planning targets: FAIL.")) & " Not an approval or official forecast."' ''
    Add-Measure 'PUB08 Volume index' @'
VAR __area=SELECTEDVALUE('CustomerVolume'[Area],"westernLehigh")
RETURN IF((ISFILTERED('CustomerVolume'[Area]) && NOT(HASONEVALUE('CustomerVolume'[Area]))) || NOT(HASONEVALUE('CustomerVolume'[Class])), BLANK(),
    CALCULATE(AVERAGE('CustomerVolume'[Index2016]), KEEPFILTERS('CustomerVolume'[Area]=__area), KEEPFILTERS('CustomerVolume'[Class]<>"Total Sales")))
'@ '0.0'
    $allMap=@{'Grants after horizon'='PUB08 Grants after horizon';'Planning status'='PUB08 Planning status';'Volume index 2016 equals 100'='PUB08 Volume index'}
    foreach ($name in $flows) {
        Add-Measure ('PUB08 Period '+$name) ("CALCULATE([PUB08 Table $name], REMOVEFILTERS('Year'))") $money
    }
    Add-Measure 'PUB08 Opening 2027' "CALCULATE([Opening cash],REMOVEFILTERS('Year'),TREATAS({2027},'Year'[Year]))" $money
    Add-Measure 'PUB08 Closing 2031' "CALCULATE([Year-end unrestricted cash],REMOVEFILTERS('Year'),TREATAS({2031},'Year'[Year]))" $money
    Add-Measure 'PUB08 Cash residual' 'IF(ISBLANK([Feasible]),BLANK(),[PUB08 Opening 2027]+[PUB08 Period Total cash sources]-[PUB08 Period Total cash uses]-[PUB08 Closing 2031])' $money
    Add-Measure 'PUB08 Capital residual' @'
IF(ISBLANK([Feasible]),BLANK(),[PUB08 Period Capital spending]-[PUB08 Period Planned borrowing]-[PUB08 Period Additional borrowing]-[PUB08 Period Planned grants received]-[PUB08 Period Additional grants]-[PUB08 Period Capital receipts]-[PUB08 Period Investment conversions]-[Five-year cash generated]-[Five-year reserve draw])
'@ $money
    $summary = @()
    $summary += ,@('Opening cash - start of 2027','PUB08 Opening 2027')
    foreach ($name in $flows[0..18]) { $summary += ,@($name+' - 2027-2031 sum','PUB08 Period '+$name) }
    $summary += ,@('Closing cash - end of 2031','PUB08 Closing 2031')
    $summary += ,@('Cash reconciliation residual - should be zero','PUB08 Cash residual')
    $summary += ,@('Capital funding residual - should be zero','PUB08 Capital residual')
    $cases=@();$rows=@();$i=0
    foreach ($row in $summary) {
        $label=$row[0];$measure=$row[1];$i++
        $cases += ('"'+$label+'",['+$measure+']')
        $rows += ('{"'+$label+'",'+$i+'}')
    }
    Add-Measure 'PUB08 Summary USD' ('SWITCH(SELECTEDVALUE(''PUB08Summary''[Item]),'+($cases -join ',')+',BLANK())') $money
    $summaryTmdl = @"
table PUB08Summary
`tcolumn Item
`t`tdataType: string
`t`tsourceColumn: Item
`t`tsummarizeBy: none
`t`tsortByColumn: Ordinal
`tcolumn Ordinal
`t`tdataType: int64
`t`tsourceColumn: Ordinal
`t`tsummarizeBy: none
`t`tisHidden
`tpartition PUB08Summary = m
`t`tmode: import
`t`tsource =
`t`t`tlet
`t`t`t`tSource = #table({"Item","Ordinal"}, {$($rows -join ',')}),
`t`t`t`tTyped = Table.TransformColumnTypes(Source,{{"Item",type text},{"Ordinal",Int64.Type}})
`t`t`tin Typed
"@
    function Visual-Base([string]$Name, [string]$Kind, [double]$Y, [double]$W, [double]$H) {
        return [pscustomobject]@{
            '$schema'='https://developer.microsoft.com/json-schemas/fabric/item/report/definition/visualContainer/2.9.0/schema.json'
            name=$Name; position=[pscustomobject]@{x=30;y=$Y;z=2000;height=$H;width=$W;tabOrder=2000}
            visual=[pscustomobject]@{visualType=$Kind}
        }
    }
    function Text-Visual([string]$Name,[string]$Text,[double]$Y,[double]$W,[double]$H) {
        $v=Visual-Base $Name 'textbox' $Y $W $H
        Set-Prop $v.visual 'objects' ([pscustomobject]@{general=@([pscustomobject]@{properties=[pscustomobject]@{
            paragraphs=@([pscustomobject]@{textRuns=@([pscustomobject]@{value=$Text;textStyle=[pscustomobject]@{fontFamily='Segoe UI';fontSize='15pt';color='#153B46'}})})
        }})})
        return $v
    }
    function Projection([string]$Entity,[string]$Property,[bool]$IsMeasure) {
        $kind='Column';if($IsMeasure){$kind='Measure'}
        $field=[pscustomobject]@{}
        Set-Prop $field $kind ([pscustomobject]@{Expression=[pscustomobject]@{SourceRef=[pscustomobject]@{Entity=$Entity}};Property=$Property})
        return [pscustomobject]@{field=$field;queryRef=($Entity+'.'+$Property);nativeQueryRef=$Property}
    }
    $notice='INDEPENDENT EDUCATIONAL EXERCISE. Not affiliated with or endorsed by Lehigh County Authority or LCA WaterWorks. Public data and assumptions may be incomplete, inaccurate or different from actual rates, finances, plans and operations. Not an official or definitive assessment. Evidence cutoff: 7 November 2026.'
    $help='2027-2031 model. Clear an input override to restore its preset value; changing a preset does not clear overrides. Annual tables omit ambiguous Total rows. Explicit period sums and cash-balance checks are at the bottom of page 15.'
    # Create a new copy of ONLY this report and its local semantic model.
    [void][IO.Directory]::CreateDirectory($dest)
    foreach ($f in @($inventory | Where-Object { -not $_.PSIsContainer })) {
        $rel=$f.FullName.Substring($prefix.Length)
        if ($rel -match '(^|[\\/])\.pbi([\\/]|$)') { continue }
        $target=Join-Path $dest $rel
        [void][IO.Directory]::CreateDirectory((Split-Path -Parent $target))
        Copy-Item -LiteralPath $f.FullName -Destination $target
    }
    $outReport=Join-Path $dest $report.Substring($prefix.Length)
    $outModel=Join-Path $dest $model.Substring($prefix.Length)
    $outMeasures=Join-Path $outModel 'definition\tables\WaterWorksMeasures.tmdl'
    Put-Text $outMeasures ($original + $newDax.ToString())
    Put-Text (Join-Path $outModel 'definition\tables\PUB08Summary.tmdl') $summaryTmdl
    Put-Text (Join-Path $outModel 'definition\model.tmdl') ([IO.File]::ReadAllText($modelFile)+"`nref table PUB08Summary`n")
    $visualCount=0;$tableCount=0;$noticeCount=0
    foreach ($pf in @(Get-ChildItem -LiteralPath (Join-Path $outReport 'definition\pages') -Recurse -File -Filter page.json)) {
        $page=Read-Json $pf.FullName;$folder=Split-Path -Parent $pf.FullName
        foreach ($vf in @(Get-ChildItem -LiteralPath (Join-Path $folder 'visuals') -Recurse -File -Filter visual.json)) {
            $v=Read-Json $vf.FullName
            Rewrite-Refs $v $allMap
            if ($v.visual.visualType -eq 'tableEx') {
                Rewrite-Refs $v $tableMap
                Format-Prop $v.visual 'total' 'totals' (Lit $false)
                Format-Prop $v.visual 'values' 'fontSize' (Lit 14)
                Format-Prop $v.visual 'values' 'wordWrap' (Lit $true)
                Format-Prop $v.visual 'columnHeaders' 'fontSize' (Lit 14)
                Format-Prop $v.visual 'columnHeaders' 'wordWrap' (Lit $true)
                $tableCount++
            }
            if ($v.visual.visualType -eq 'slicer') {
                Format-Prop $v.visual 'data' 'mode' (Lit 'Dropdown')
                Format-Prop $v.visual 'items' 'fontSize' (Lit 14)
            }
            foreach ($t in @($v.visual.visualContainerObjects.title | Where-Object { $null -ne $_ })) {
                Set-Prop $t.properties 'fontSize' (Lit 16)
            }
            if ($v.visual.visualType -eq 'card' -and (ConvertTo-Json $v.visual -Depth 100 -Compress).Contains('PUB08 Planning status')) {
                Format-Prop $v.visual 'labels' 'fontSize' (Lit 20)
            }
            $v.position.y=[double]$v.position.y+170
            Put-Json $vf.FullName $v;$visualCount++
        }
        $w=[double]$page.width-60;$height=[double]$page.height+170
        Put-Json (Join-Path $folder 'visuals\pub08Notice\visual.json') (Text-Visual 'pub08Notice' $notice 8 $w 96)
        Put-Json (Join-Path $folder 'visuals\pub08Help\visual.json') (Text-Visual 'pub08Help' $help 110 $w 52)
        if ($page.displayName -like '15 *') {
            $v=Visual-Base 'pub08Summary' 'tableEx' $height $w 1000
            $projections=@((Projection 'PUB08Summary' 'Item' $false),(Projection 'WaterWorksMeasures' 'PUB08 Summary USD' $true))
            Set-Prop $v.visual 'query' ([pscustomobject]@{queryState=[pscustomobject]@{Values=[pscustomobject]@{projections=$projections}}})
            Set-Prop $v.visual 'visualContainerObjects' ([pscustomobject]@{title=@([pscustomobject]@{properties=[pscustomobject]@{show=(Lit $true);text=(Lit '2027-2031 reconciliation - sums of flows; opening/closing balances');fontSize=(Lit 16)}})})
            Format-Prop $v.visual 'total' 'totals' (Lit $false)
            Format-Prop $v.visual 'values' 'fontSize' (Lit 14)
            Format-Prop $v.visual 'columnHeaders' 'fontSize' (Lit 14)
            Put-Json (Join-Path $folder 'visuals\pub08Summary\visual.json') $v
            $height+=1020
        }
        Put-Json (Join-Path $folder 'visuals\pub08Footer\visual.json') (Text-Visual 'pub08Footer' $notice $height $w 100)
        $page.height=$height+110;Put-Json $pf.FullName $page;$noticeCount++
    }
    $outProject=Join-Path $dest 'WaterWorks_Publication_v08.pbip'
    Put-Json $outProject $entry
    $query=@'
// DAX Query view: run independently of report slicers. Central preset, Manual.
// New wrappers must reproduce annual measures and the two residuals must be ~0.
EVALUATE
SUMMARIZECOLUMNS(
    'Division'[Division],
    TREATAS({"central"},'Scenario'[Scenario]), TREATAS({"Manual"},'Mode'[Mode]),
    "Opening2027",[PUB08 Opening 2027],
    "Cash2027",CALCULATE([Year-end unrestricted cash],TREATAS({2027},'Year'[Year])),
    "Closing2031",[PUB08 Closing 2031],
    "Capital2027to2031",[PUB08 Period Capital spending],
    "Borrowing2027to2031",[PUB08 Period Planned borrowing],
    "NetFlow2027to2031",[PUB08 Period Net flow],
    "CashResidual",[PUB08 Cash residual],
    "CapitalResidual",[PUB08 Capital residual],
    "Check",IF(ISBLANK([Feasible]),"NO RESULT",IF(ABS([PUB08 Cash residual])<0.01 && ABS([PUB08 Capital residual])<0.01,"PASS arithmetic only","FAIL"))
)
ORDER BY 'Division'[Division]
'@
    Put-Text (Join-Path $outModel 'DAXQueries\V08 period acceptance.dax') $query
    $jsonCount=0
    foreach ($f in @(Get-ChildItem -LiteralPath $dest -Recurse -File)) {
        if ($f.Extension -in @('.json','.pbip','.pbir','.pbism')) { $null=Read-Json $f.FullName;$jsonCount++ }
    }
    if (-not ([IO.File]::ReadAllText($outMeasures)).StartsWith($original,[StringComparison]::Ordinal)) { throw 'Existing measure definitions changed unexpectedly.' }
    $dataCount=0
    foreach ($f in @(Get-ChildItem -LiteralPath (Join-Path $model 'definition\tables') -File -Filter '*.tmdl')) {
        if ($f.Name -eq 'WaterWorksMeasures.tmdl') { continue }
        $target=Join-Path $outModel ('definition\tables\'+$f.Name)
        if ((Get-FileHash -LiteralPath $f.FullName -Algorithm SHA256).Hash -ne (Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash) { throw "Source-table copy differs: $($f.Name)" }
        $dataCount++
    }
    $log=[ordered]@{status='STATIC REPAIR COMPLETE; DESKTOP ACCEPTANCE PENDING';sourceProject=$project;outputProject=$outProject;sourceFilesModified=0;originalDataTablesUnchanged=$dataCount;pages=$noticeCount;tablesUpdated=$tableCount;originalVisualsUpdated=$visualCount;jsonParsed=$jsonCount}
    Put-Json (Join-Path $dest 'V08_REPAIR_RESULT.json') $log
    Put-Text (Join-Path $dest 'V08_README.txt') @'
Publication candidate, not a published or fully validated report.
Original files, engine measures, data tables, financial assumptions and 15-page structure are preserved.
Report annual tables use explicit flow/balance wrappers and omit ambiguous total rows.
The page 15 period summary distinguishes sums, opening cash, closing cash and reconciliation residuals.
Customer-volume class filtering is preserved. Zero delayed grants displays only for valid scenarios.
A disclosure appears at the top and bottom of every report page; it is not a sticky Power BI canvas element.
The separate website's sticky notice remains necessary. The JavaScript website is unchanged.
No .pbi local cache is copied. Refresh once in Desktop; no production ERP connection is introduced.
Run DAXQueries/V08 period acceptance.dax and the existing canonical-case and finite-optimizer queries.
Inspect all pages, especially fonts, dropdowns, class trends, the page 15 summary and source/uses charts.
Use manual presets for parity tests and separately verify optimized calculation modes.
Publish only after Desktop acceptance and public-data review. No publishing is performed by this script.
'@
    Write-Host 'PASS: new candidate written; source files and original engine preserved.'
    Write-Host "Pages: $noticeCount; annual/other tables updated: $tableCount; data tables unchanged: $dataCount"
    Write-Host "Original visuals updated: $visualCount; JSON files parsed: $jsonCount"
    Write-Host 'NEXT: open this new project, Refresh, then run V08 period acceptance.'
    Write-Host $outProject
    Write-Host "Repair log: $(Join-Path $dest 'V08_REPAIR_RESULT.json')"
} $ProjectPath $Destination
