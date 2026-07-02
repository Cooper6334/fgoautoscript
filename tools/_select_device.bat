@echo off
setlocal enabledelayedexpansion

set _COUNT=0
for /f "skip=1 tokens=1,2" %%a in ('adb devices 2^>nul') do (
    if "%%b"=="device" (
        set /a _COUNT+=1
        set _DEV_!_COUNT!=%%a
    )
)

if !_COUNT!==0 (
    echo Error: no device found
    endlocal & set ADB_SERIAL=
    exit /b 1
)

if !_COUNT!==1 (
    set _SEL=!_DEV_1!
    goto :done
)

echo Multiple devices detected. Select target:
echo.
for /l %%i in (1,1,!_COUNT!) do (
    set _SIZE_%%i=unknown
    for /f "tokens=3" %%s in ('adb -s !_DEV_%%i! shell wm size 2^>nul') do (
        if "!_SIZE_%%i!"=="unknown" set _SIZE_%%i=%%s
    )
    echo   [%%i] !_DEV_%%i!    !_SIZE_%%i!
)
echo.
set /p _CHOICE=Enter number [1-!_COUNT!]:

set _SEL=
for /l %%i in (1,1,!_COUNT!) do (
    if "!_CHOICE!"=="%%i" set _SEL=!_DEV_%%i!
)

if "!_SEL!"=="" (
    echo Invalid number
    endlocal & set ADB_SERIAL=
    exit /b 1
)

:done
for /f "tokens=*" %%v in ("!_SEL!") do (
    endlocal
    set ADB_SERIAL=%%v
)
exit /b 0
