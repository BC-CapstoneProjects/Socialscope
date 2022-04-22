cd "root\frontend"
call npm install
call npm run build
cd "..\"
rd /s /q "backend\src\main\resources\static"
md "backend\src\main\resources\static"
xcopy /s /e "frontend\build\*" "backend\src\main\resources\static"
cd "backend"
call mvn package -Dmaven.test.skip=true
cd "target"
call java -jar backend-0.0.1-SNAPSHOT.jar
