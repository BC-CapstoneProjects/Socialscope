@echo off
set springStaticDir="backend\src\main\resources\static"
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
    cd "..\"
    if exist %springStaticDir% rd /s /q %springStaticDir%
    md %springStaticDir%
    xcopy /s /e "frontend\build\*" %springStaticDir%
    cd "..\"
)
if %back% (
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
    cd "..\"
    if %test% (
        cd "test\cypress"
        call npx cypress run --spec "cypress/integration/demo/demo.spec.js"
        cd ..\..\
    )
    cd "..\"
    set /p userIn="Press enter to exit..."
    if %run% (
        taskkill /FI "WindowTitle eq springApp*" /T /F
    )
)
echo Bye!