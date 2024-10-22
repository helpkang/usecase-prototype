# Java 버전 관리 스크립트
function Install-JavaVersions {
    param (
        [string[]]$Versions
    )
    
    foreach ($version in $Versions) {
        Write-Host "Installing Corretto JDK $version..." -ForegroundColor Cyan
        choco install corretto${version}jdk -y
    }
}

function Set-JavaVersion {
    param (
        [Parameter(Mandatory=$true)]
        [string]$Version
    )

    $javaHome = ""
    $baseDir = "C:\Program Files\Amazon Corretto"
    
    # 버전별 디렉토리 패턴
    $patterns = @{
        "8" = "jdk1.8*"
        "11" = "jdk11*"
        "17" = "jdk17*"
        "21" = "jdk21*"
    }

    if ($patterns.ContainsKey($Version)) {
        $pattern = $patterns[$Version]
        $javaHome = Get-ChildItem -Path $baseDir -Directory | 
                   Where-Object { $_.Name -like $pattern } |
                   Select-Object -First 1 -ExpandProperty FullName
    }

    if ($javaHome -and (Test-Path $javaHome)) {
        [System.Environment]::SetEnvironmentVariable('JAVA_HOME', $javaHome, 'Machine')
        $path = [System.Environment]::GetEnvironmentVariable('Path', 'Machine')
        
        # 기존 Java 경로 제거
        $pathParts = $path.Split(';') | Where-Object { 
            $_ -notlike "*Java*" -and $_ -notlike "*jdk*" -and $_ -notlike "*Corretto*"
        }
        
        # 새 Java 경로 추가
        $newPath = ($pathParts + "$javaHome\bin") -join ';'
        [System.Environment]::SetEnvironmentVariable('Path', $newPath, 'Machine')
        
        Write-Host "Java $Version is now active" -ForegroundColor Green
        Write-Host "JAVA_HOME: $javaHome" -ForegroundColor Green
        
        # 현재 세션의 PATH 업데이트
        $env:JAVA_HOME = $javaHome
        $env:Path = "$javaHome\bin;" + $env:Path
        
        # Java 버전 확인
        java -version
    }
    else {
        Write-Host "Java $Version is not installed or could not be found" -ForegroundColor Red
        Write-Host "Please install it using: choco install corretto${Version}jdk" -ForegroundColor Yellow
    }
}

function Show-JavaVersions {
    $versions = @()
    $baseDir = "C:\Program Files\Amazon Corretto"
    
    if (Test-Path $baseDir) {
        Get-ChildItem -Path $baseDir -Directory | ForEach-Object {
            $version = switch -Wildcard ($_.Name) {
                "jdk1.8*" { "8" }
                "jdk11*" { "11" }
                "jdk17*" { "17" }
                "jdk21*" { "21" }
                default { $null }
            }
            if ($version) {
                $versions += [PSCustomObject]@{
                    Version = $version
                    Path = $_.FullName
                    Active = $_.FullName -eq $env:JAVA_HOME
                }
            }
        }
    }
    
    if ($versions.Count -eq 0) {
        Write-Host "No Java versions found" -ForegroundColor Yellow
        Write-Host "Install using: choco install corretto<version>jdk" -ForegroundColor Yellow
        Write-Host "Example: choco install corretto11jdk" -ForegroundColor Yellow
    }
    else {
        Write-Host "Installed Java versions:" -ForegroundColor Cyan
        $versions | Format-Table @{
            Label = "Version"
            Expression = {"Java $($_.Version)"}
        }, @{
            Label = "Status"
            Expression = {if ($_.Active) {"✓ Active"} else {"Inactive"}}
        }, Path
    }
}

Export-ModuleMember -Function Install-JavaVersions, Set-JavaVersion, Show-JavaVersions