@echo off 
set namespace-value=ControlsAndrewLy
set template-type-value=field

cls
echo [101;93m  Creating folder : %1 [0m
echo ... 
mkdir %1

echo [101;93m  Change directory to : \%1 [0m
echo ... 
cd %1

echo [101;93m  Creating Project %1 [0m
echo [32m   - Variable namespace : %namespace-value%[0m
echo [32m   - Variable template-type : %template-type-value%[0m
echo ... 
call pac pcf init --namespace %namespace-value% --name %1 --template %template-type-value%

echo [101;93m  Installing Dependencies [0m
echo ...
call npm install

echo [101;93m   Creating Blank CSS file  [0m
echo ...
cd %1
mkdir css
cd css
echo.>%1.css

echo [101;93m   Creating Blank IMG Preview File [0m
echo ...
cd ..
mkdir img
cd img
echo.>preview.png

echo [101;93m   Opening VS Code [0m
echo ...
cd ..
cd ..
code %1

