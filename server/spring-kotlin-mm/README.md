# Layered Architecuter와 결합된 simple Domain Driven Design 패턴을 구성했음

## gradle과 spring, kotlin으로 프로젝트가 구성 되어 있음
### gradle로 dependency를 추가하는 커맨드

choco로 jdk 설치 및 환경 설정
```
choco install corretto17jdk
choco install corretto11jdk
Import-Module .\switch-java.psm1
Show-JavaVersions
# Java 버전 전환
Set-JavaVersion -Version "11"   
Set-JavaVersion -Version "17"
```

gradle 프로세스 종료
```
Get-WmiObject Win32_Process | Select-Object ProcessId, Name, CommandLine
taskkill /F /PID 
```

gradle dependency를 가져오는 커맨드
``` 
gradle dependencies
```

spring boot 실행
```
gradle bootRun
```