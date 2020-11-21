@ECHO off

ECHO :: GIF to WEBM Converter ::
ECHO ---------------------------

:: Replace this ffmpeg variable value with your own ffmpeg.exe path.
SET ffmpeg=%USERPROFILE%\Programs\JDownloader\tools\Windows\ffmpeg\x64\ffmpeg.exe
SET command=%ffmpeg% -i "%%f" -c:v libvpx-vp9 -b:v 0 -crf 30 -an -f webm -passlogfile "%TEMP%\ffmpeg2pass.log"
SET /P folder="Input directory path: "

rem Remove double quote from input string
SET folder=###%folder%###
SET folder=%folder:"###=%
SET folder=%folder:###"=%
SET folder=%folder:###=%

FOR %%f IN ("%folder%\*.gif") DO (
    %command% -pass 1 -y NUL && %command% -pass 2 "%%~nf.webm"
)