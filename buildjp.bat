@echo off
chcp 65001 > nul
call "%~dp0tools\settings.bat"
set DEST=%SCRIPTS_ROOT%com.cooper.FGO
if exist "%~dp0index.zip" del "%~dp0index.zip"
"%ProgramFiles%\7-Zip\7z.exe" a -tzip "%~dp0index.zip" "%ROOT%basic_item\" "%ROOT%game_script\" "%ROOT%image_jp\" "%ROOT%jquery\" "%ROOT%setting\" "%ROOT%index.html" "%ROOT%index.js"
echo Done: index.zip
if exist "%DEST%" rd /s /q "%DEST%"
mkdir "%DEST%"
move /y "%~dp0index.zip" "%DEST%\" >nul
"%ProgramFiles%\7-Zip\7z.exe" e "%DEST%\index.zip" -o"%DEST%" -y -spf
echo Done: build FGOJP -^> %DEST%
