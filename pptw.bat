@echo off
chcp 65001 > nul
call "%~dp0tools\settings.bat"
if exist "%~dp0index.zip" del "%~dp0index.zip"
"%ProgramFiles%\7-Zip\7z.exe" a -tzip "%~dp0index.zip" "%ROOT%basic_item\" "%ROOT%game_script\" "%ROOT%image_tw\" "%ROOT%jquery\" "%ROOT%setting\" "%ROOT%index.html" "%ROOT%index.js"
echo Done: index.zip
call "%~dp0tools\_select_device.bat"
if errorlevel 1 exit /b 1
adb -s %ADB_SERIAL% shell mkdir -p /sdcard/download/robotmon/scripts/com.cooper.fgotw
adb -s %ADB_SERIAL% push "%~dp0index.zip" /sdcard/download/robotmon/scripts/com.cooper.fgotw/index.zip
echo Done: push FGOTW
if /i "%~1"=="--wait" (
    powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0tools\_wait.ps1"
)
