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
    call npm install || pause /b
    call npm run build || pause /b
	if %test% (
		call npm test || pause /b
	)
    cd "..\..\"
    if exist %springStaticDir% rd /s /q %springStaticDir%
    md %springStaticDir%
    xcopy /s /e "root\frontend\build\*" %springStaticDir%
)
if %back% (
    if not exist %credentialsFolderDir% (
        echo No credentials detected!
        pause /b
    )
    cd "root\backend"
    if %test% (
        call mvn package || pause /b
        ) else (
        call mvn package -Dmaven.test.skip=true || pause /b
        )
    if %run% (
        cd "target"
        start "springApp" java -jar backend-0.0.1-SNAPSHOT.jar || pause /b
        cd "..\"
    )
    cd "..\..\"
    set /p userIn="Press enter to exit..."
@REM     if %run% (
@REM         taskkill /FI "WindowTitle eq springApp*" /T /F
@REM     )
)
echo Bye!