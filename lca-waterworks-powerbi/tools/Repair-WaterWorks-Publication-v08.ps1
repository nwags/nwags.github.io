# Repair a local WaterWorks v07 PBIP copy. No publication, uploads, credentials,
# installs, execution-policy changes, source overwrites, or model-data edits.
# Output is a new publication CANDIDATE. Native Desktop acceptance is still required.
[CmdletBinding()]
param([string]$ProjectPath, [string]$Destination)
& {
    param($ProjectPath, $Destination)
    $ErrorActionPreference = 'Stop'
    if (@(Get-Process -Name PBIDesktop -ErrorAction SilentlyContinue).Count -gt 0) {
        throw 'Save and close every Power BI Desktop window before running this repair.'
    }
    if (-not $ProjectPath) {
        Add-Type -AssemblyName System.Windows.Forms
        $picker = New-Object System.Windows.Forms.OpenFileDialog
        $picker.Title = 'Select your CURRENT working WaterWorks Power BI PROJECT (.pbip)'
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
    $project = (Get-Item -LiteralPath $ProjectPath -ErrorAction Stop).FullName
    if ([IO.Path]::GetExtension($project) -ne '.pbip') { throw 'Select a .pbip project, not a .pbix file.' }
    $source = Split-Path -Parent $project
    if (-not $Destination) {
        $Destination = Join-Path (Split-Path -Parent $source) 'WaterWorks_Publication_v08'
    }
    $dest = [IO.Path]::GetFullPath($Destination)
    if (Test-Path -LiteralPath $dest) { throw "Destination exists; nothing overwritten: $dest" }
    $sourcePrefix = $source.TrimEnd([char[]]'\/') + [IO.Path]::DirectorySeparatorChar
    if ($dest.StartsWith($sourcePrefix, [StringComparison]::OrdinalIgnoreCase)) {
        throw 'The destination must be outside the source folder.'
    }
    function Resolve-InProject([string]$Folder, [string]$Relative) {
        $p = [IO.Path]::GetFullPath((Join-Path $Folder $Relative))
        if (-not $p.StartsWith($sourcePrefix, [StringComparison]::OrdinalIgnoreCase)) {
            throw "External project reference is not supported by this repair: $p"
        }
        return $p
    }
    function Read-Json([string]$Path) { return ConvertFrom-Json -InputObject ([IO.File]::ReadAllText($Path)) }
    $entry = Read-Json $project
    $reports = @($entry.artifacts | Where-Object { $_.report })
    if ($reports.Count -ne 1) { throw 'Expected one local report artifact.' }
    $reportRoot = Resolve-InProject $source $reports[0].report.path
    $reportDef = Read-Json (Join-Path $reportRoot 'definition.pbir')
    if (-not $reportDef.datasetReference.byPath.path) { throw 'Expected a local semantic-model reference.' }
    $modelRoot = Resolve-InProject $reportRoot $reportDef.datasetReference.byPath.path
    $pagesRoot = Join-Path $reportRoot 'definition\pages'
    $measuresPath = Join-Path $modelRoot 'definition\tables\WaterWorksMeasures.tmdl'
    $modelPath = Join-Path $modelRoot 'definition\model.tmdl'
    foreach ($p in @($measuresPath, $modelPath, (Join-Path $reportRoot 'definition\version.json'))) {
        if (-not (Test-Path -LiteralPath $p -PathType Leaf)) { throw "Required v07 file missing: $p" }
    }
    $inventory = @(Get-ChildItem -LiteralPath $source -Recurse -Force)
    if (@($inventory | Where-Object { $_.Attributes -band [IO.FileAttributes]::ReparsePoint }).Count) {
        throw 'Source contains links/junctions. No files changed.'
    }
    if (@($inventory | Where-Object { $_.Name -eq 'unappliedChanges.json' }).Count) {
        throw 'Apply and save pending Power Query changes in Desktop before repairing. No files changed.'
    }
    $pageFiles = @(Get-ChildItem -LiteralPath $pagesRoot -Filter page.json -Recurse -File)
    if ($pageFiles.Count -ne 15) { throw 'Expected the 15-page WaterWorks report. No files changed.' }
    $originalMeasures = [IO.File]::ReadAllText($measuresPath)
    if ($originalMeasures -match 'WW08 ' -or (Test-Path -LiteralPath (Join-Path $modelRoot 'definition\tables\WW08Summary.tmdl'))) {
        throw 'Publication v08 changes are already present. Select the original v07 project.'
    }
    $badType = '(\{\s*"(?:[^"]|"")+"\s*,\s*)text(?=\s*\})'
    foreach ($f in @(Get-ChildItem -LiteralPath (Join-Path $modelRoot 'definition\tables') -Filter '*.tmdl' -File)) {
        if ([regex]::IsMatch([IO.File]::ReadAllText($f.FullName), $badType)) {
            throw 'This source still has the old Power Query text-type defect. Select the working v07 project.'
        }
    }

    # GZip/base64 holds only static DAX/TMDL and PBIR templates (not executable PowerShell).
    $encodedPayload = @'
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
'@
    $compressed = [Convert]::FromBase64String($encodedPayload)
    $memory = New-Object System.IO.MemoryStream(,$compressed)
    $gzip = New-Object System.IO.Compression.GZipStream($memory, [IO.Compression.CompressionMode]::Decompress)
    $reader = New-Object System.IO.StreamReader($gzip, [Text.Encoding]::UTF8)
    try { $payloadText = $reader.ReadToEnd() } finally { $reader.Dispose(); $gzip.Dispose(); $memory.Dispose() }
    # The payload is inspectable source: report-only DAX, labels and PBIR templates.
    $payload = ConvertFrom-Json -InputObject $payloadText
    $requiredMeasures = @('Feasible', 'Year-end unrestricted cash', 'Total capital',
        'Total cash sources', 'Total cash uses', 'Five-year cash generated',
        'Five-year reserve draw', 'Grants after horizon', 'Volume index 2016 equals 100')
    $requiredMeasures += @($payload.tableBindings.PSObject.Properties.Name | Where-Object { $_ -ne 'Five-year capital cash bridge' })
    $requiredMeasures += 'Five-year capital cash bridge'
    foreach ($name in $requiredMeasures) {
        $pattern = "(?m)^\s*measure\s+(?:'" + [regex]::Escape($name) + "'|" + [regex]::Escape($name) + ")\s*="
        if (-not [regex]::IsMatch($originalMeasures, $pattern)) { throw "Required measure missing: $name" }
    }
    $utf8 = New-Object System.Text.UTF8Encoding($false)
    function Put-Text([string]$Path, [string]$Text) {
        [void][IO.Directory]::CreateDirectory((Split-Path -Parent $Path))
        [IO.File]::WriteAllText($Path, $Text, $utf8)
    }
    function Put-Json([string]$Path, $Object) {
        $s = ConvertTo-Json -InputObject $Object -Depth 100
        $null = ConvertFrom-Json -InputObject $s
        Put-Text $Path ($s + "`n")
    }
    function Set-Prop($Object, [string]$Name, $Value) {
        $Object | Add-Member -MemberType NoteProperty -Name $Name -Value $Value -Force
    }
    function Ensure-Prop($Object, [string]$Name) {
        if ($null -eq $Object.$Name) { Set-Prop $Object $Name ([pscustomobject]@{}) }
        return $Object.$Name
    }
    function Lit($Value) {
        if ($Value -is [bool]) { $s = $Value.ToString().ToLowerInvariant() }
        elseif ($Value -is [string]) { $s = "'" + $Value.Replace("'", "''") + "'" }
        else { $s = ([string]$Value) + 'D' }
        return [pscustomobject]@{ expr = [pscustomobject]@{ Literal = [pscustomobject]@{ Value = $s } } }
    }
    function Color([string]$Hex) { return [pscustomobject]@{ solid = [pscustomobject]@{ color = (Lit $Hex) } } }
    function Set-Format($Visual, [string]$Key, [hashtable]$Props) {
        $objects = Ensure-Prop $Visual 'objects'
        $items = @($objects.$Key | Where-Object { $null -ne $_ })
        $target = @($items | Where-Object { $null -eq $_.selector }) | Select-Object -First 1
        if ($null -eq $target) {
            $target = [pscustomobject]@{ properties = [pscustomobject]@{} }
            $items += $target
        }
        $propObject = Ensure-Prop $target 'properties'
        foreach ($keyName in $Props.Keys) { Set-Prop $propObject $keyName $Props[$keyName] }
        Set-Prop $objects $Key @($items)
    }
    function Rewrite-Refs($Object, [hashtable]$Map) {
        if ($null -eq $Object) { return }
        if ($Object -is [System.Array]) {
            foreach ($x in $Object) { Rewrite-Refs $x $Map }
        } elseif ($Object -is [pscustomobject]) {
            if ($Object.Measure -and $Object.Measure.Expression.SourceRef.Entity -eq 'WaterWorksMeasures') {
                $n = [string]$Object.Measure.Property
                if ($Map.ContainsKey($n)) { $Object.Measure.Property = $Map[$n] }
            }
            if ($Object.queryRef -is [string] -and $Object.queryRef.StartsWith('WaterWorksMeasures.')) {
                $n = $Object.queryRef.Substring('WaterWorksMeasures.'.Length)
                if ($Map.ContainsKey($n)) {
                    $Object.queryRef = 'WaterWorksMeasures.' + $Map[$n]
                    if (-not $Object.displayName) { Set-Prop $Object 'displayName' $n }
                }
            }
            foreach ($property in @($Object.PSObject.Properties)) { Rewrite-Refs $property.Value $Map }
        }
    }
    function Format-Visual($Visual) {
        foreach ($t in @($Visual.visualContainerObjects.title | Where-Object { $null -ne $_ })) {
            Set-Prop $t.properties 'fontSize' (Lit 16)
            Set-Prop $t.properties 'fontColor' (Color '#193D48')
        }
        switch ($Visual.visualType) {
            'tableEx' {
                Set-Format $Visual 'total' @{ totals = (Lit $false) }
                Set-Format $Visual 'values' @{ fontSize = (Lit 14); wordWrap = (Lit $true) }
                Set-Format $Visual 'columnHeaders' @{ fontSize = (Lit 14); wordWrap = (Lit $true) }
                Set-Format $Visual 'grid' @{ rowPadding = (Lit 5) }
            }
            'slicer' {
                Set-Format $Visual 'data' @{ mode = (Lit 'Dropdown') }
                Set-Format $Visual 'items' @{ fontSize = (Lit 14) }
                Set-Format $Visual 'header' @{ show = (Lit $false) }
            }
            'card' { Set-Format $Visual 'labels' @{ fontSize = (Lit 26) } }
        }
    }
    function Clone($Object) { return ConvertFrom-Json -InputObject (ConvertTo-Json -InputObject $Object -Depth 100) }
    # Copy definitions to a new folder. Leave source and local data caches untouched.
    [void][IO.Directory]::CreateDirectory($dest)
    foreach ($f in @($inventory | Where-Object { -not $_.PSIsContainer })) {
        $rel = $f.FullName.Substring($sourcePrefix.Length)
        if ($rel -match '(^|[\\/])\.pbi([\\/]|$)') { continue }
        $target = Join-Path $dest $rel
        [void][IO.Directory]::CreateDirectory((Split-Path -Parent $target))
        Copy-Item -LiteralPath $f.FullName -Destination $target -ErrorAction Stop
    }
    $outReport = Join-Path $dest $reportRoot.Substring($sourcePrefix.Length)
    $outModel = Join-Path $dest $modelRoot.Substring($sourcePrefix.Length)
    $outMeasures = Join-Path $outModel 'definition\tables\WaterWorksMeasures.tmdl'
    Put-Text $outMeasures ($originalMeasures + $payload.measureAdditions)
    Put-Text (Join-Path $outModel 'definition\tables\WW08Summary.tmdl') $payload.summaryTable
    $outModelTmdl = Join-Path $outModel 'definition\model.tmdl'
    Put-Text $outModelTmdl ([IO.File]::ReadAllText($outModelTmdl) + "`nref table WW08Summary`n")
    $changedVisuals = 0
    foreach ($pageFile in @(Get-ChildItem -LiteralPath (Join-Path $outReport 'definition\pages') -Filter page.json -Recurse -File)) {
        $page = Read-Json $pageFile.FullName
        $pageFolder = Split-Path -Parent $pageFile.FullName
        foreach ($vf in @(Get-ChildItem -LiteralPath (Join-Path $pageFolder 'visuals') -Filter visual.json -Recurse -File)) {
            $j = Read-Json $vf.FullName
            if ($j.name -like 'ww08*') { throw 'Unexpected existing v08 visual. Output is incomplete; source is unchanged.' }
            $map = @{}
            foreach ($p in $payload.otherBindings.PSObject.Properties) { $map[$p.Name] = $p.Value }
            if ($j.visual.visualType -eq 'tableEx') {
                foreach ($p in $payload.tableBindings.PSObject.Properties) { $map[$p.Name] = $p.Value }
            }
            Rewrite-Refs $j $map
            Format-Visual $j.visual
            $j.position.y = [double]$j.position.y + 160
            $visualText = ConvertTo-Json -InputObject $j.visual -Depth 100 -Compress
            if ($j.visual.visualType -eq 'card' -and $visualText.Contains('WW08 Planning status')) {
                Set-Format $j.visual 'labels' @{ fontSize = (Lit 18) }
            }
            if ($j.visual.visualType -eq 'card' -and $visualText.Contains('Annual bill as income percent')) {
                Set-Prop $j.visual.visualContainerObjects.title[0].properties 'text' (Lit '2031 annual illustrative bill / selected income (%)')
            }
            Put-Json $vf.FullName $j
            $changedVisuals++
        }
        $notice = Clone $payload.noticeTemplate
        $notice.position.width = [double]$page.width - 60
        Put-Json (Join-Path $pageFolder 'visuals\ww08Notice\visual.json') $notice
        $help = Clone $payload.helpTemplate
        $help.position.width = [double]$page.width - 60
        Put-Json (Join-Path $pageFolder 'visuals\ww08Help\visual.json') $help
        $height = [double]$page.height + 160
        if ($page.displayName -like '15 *') {
            $summaryVisual = Clone $payload.summaryTemplate
            $summaryVisual.position.y = $height
            $summaryVisual.position.width = [double]$page.width - 60
            Format-Visual $summaryVisual.visual
            Put-Json (Join-Path $pageFolder 'visuals\ww08Summary\visual.json') $summaryVisual
            $height += 680
        }
        $footer = Clone $payload.footerTemplate
        $footer.position.y = $height
        $footer.position.width = [double]$page.width - 60
        Put-Json (Join-Path $pageFolder 'visuals\ww08Footer\visual.json') $footer
        $page.height = $height + 105
        Put-Json $pageFile.FullName $page
    }
    $outProject = Join-Path $dest 'WaterWorks_Publication_v08.pbip'
    $copiedProject = Join-Path $dest ([IO.Path]::GetFileName($project))
    if ($copiedProject -ne $outProject) { Move-Item -LiteralPath $copiedProject -Destination $outProject }
    Put-Text (Join-Path $outModel 'DAXQueries\V08 period acceptance.dax') $payload.acceptanceQuery
    # Fresh inventory after renaming: don't reuse stale FileInfo paths.
    $jsonCount = 0
    foreach ($f in @(Get-ChildItem -LiteralPath $dest -Recurse -File)) {
        if ($f.Extension -in @('.json', '.pbip', '.pbir', '.pbism')) {
            $null = Read-Json $f.FullName
            $jsonCount++
        }
    }
    if (-not ([IO.File]::ReadAllText($outMeasures)).StartsWith($originalMeasures, [StringComparison]::Ordinal)) {
        throw 'Existing measure definitions changed unexpectedly.'
    }
    # Verify that original data-table definitions did not change during copying.
    $dataCount = 0
    foreach ($f in @(Get-ChildItem -LiteralPath (Join-Path $modelRoot 'definition\tables') -File -Filter '*.tmdl')) {
        if ($f.Name -eq 'WaterWorksMeasures.tmdl') { continue }
        $q = Join-Path $outModel ('definition\tables\' + $f.Name)
        if ((Get-FileHash -LiteralPath $f.FullName -Algorithm SHA256).Hash -ne (Get-FileHash -LiteralPath $q -Algorithm SHA256).Hash) {
            throw "Data-table copy differs: $($f.Name)"
        }
        $dataCount++
    }
    $log = [ordered]@{
        status = 'STATIC REPAIR COMPLETE - NATIVE ACCEPTANCE PENDING'
        sourceProject = $project; outputProject = $outProject
        sourceFilesModified = 0; existingMeasuresPreserved = $true
        originalDataTablesUnchanged = $dataCount; reportPages = $pageFiles.Count
        originalVisualsUpdated = $changedVisuals; jsonFilesParsed = $jsonCount
        note = 'No publication performed. Refresh in Desktop and run V08 period acceptance.'
    }
    Put-Json (Join-Path $dest 'V08_REPAIR_RESULT.json') $log
    Put-Text (Join-Path $dest 'V08_README.txt') $payload.readme
    Write-Host 'PASS: source untouched; report-only repair written to a new copy.'
    Write-Host "Pages: $($pageFiles.Count); original data tables unchanged: $dataCount"
    Write-Host "Original visuals updated: $changedVisuals; JSON documents parsed: $jsonCount"
    Write-Host 'NEXT: open the following project, Refresh, then run V08 period acceptance.'
    Write-Host $outProject
    Write-Host "Log: $(Join-Path $dest 'V08_REPAIR_RESULT.json')"
} $ProjectPath $Destination
