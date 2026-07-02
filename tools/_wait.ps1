[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$end = [DateTime]::Now.AddSeconds(5)
$interrupted = $false
while ([DateTime]::Now -lt $end) {
    $r = [Math]::Ceiling(($end - [DateTime]::Now).TotalSeconds)
    Write-Host -NoNewline "`rClosing in $r sec... (press any key to pause)"
    if ([Console]::KeyAvailable) {
        [Console]::ReadKey($true) | Out-Null
        $interrupted = $true
        break
    }
    Start-Sleep -Milliseconds 200
}
Write-Host ""
if ($interrupted) {
    Read-Host "Paused. Press Enter to close"
}
