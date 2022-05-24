@echo off
set springStaticDir="root\backend\src\main\resources\static"
set credentialsFolderDir="root\backend\src\main\resources\private\*"
set front=1==1
set back=1==1
set run=1==0
set test=1==0
if "%1" == "/r" (
    set run=1==1
)
if "%1" == "/t" (
    set run=1==1 
    set test=1==1
)
if "%1" == "/b" (
    set front=1==0
    set run=1==1
)
if "%1" == "/f" (
    set back=1==0
)
if %front% (
    cd "root\frontend"
    call npm install || exit /b
    call npm run build || exit /b
	if %test% (
		call npm test || exit /b
	)
    cd "..\..\"
    if exist %springStaticDir% rd /s /q %springStaticDir%
    md %springStaticDir%
    xcopy /s /e "root\frontend\build\*" %springStaticDir%
)
if %back% (
    if not exist %credentialsFolderDir% (
        echo No credentials detected!
        exit /b
    )
    cd "root\backend"
    if %test% (
        call mvn package || exit /b
        ) else (
        call mvn package -Dmaven.test.skip=true || exit /b
        )
    if %run% (
        cd "target"
        start "springApp" java -jar backend-0.0.1-SNAPSHOT.jar || exit /b
        cd "..\"
    )
    cd "..\..\"
    set /p userIn="Press enter to exit..."
    if %run% (
        taskkill /FI "WindowTitle eq springApp*" /T /F
    )
)
echo Bye!