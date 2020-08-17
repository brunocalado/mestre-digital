@ECHO OFF
CLS

:: Requirements
:: Windows
:: install ffmpeg

:: Usage
:: optimize.bat NOMEDOARQUIVO.FORMATO
:: Example: optimize.bat meuvideo.mp4

:: Definitions %arquivo%
SET arquivo=%1
SET arquivosaida=out-2pass.webm
SET arquivosaidasemsom=out-2pass-nosound.webm
SET tamanho=hd

:: Ativação Opcional
SET taxadequadros=-framerate 30
SET escalar=-vf scale=1920x1080
:: escalar="-vf scale=1920x1080" # Apenas ative se você quer que o vídeo tenha seu tamanho alterado
:: escalar="-vf scale=3840x2160" # Apenas ative se você quer que o vídeo tenha seu tamanho alterado


ECHO Principal
ECHO =====================
ECHO Otimizar Windows v0.01
ECHO =====================

:: Executa a conversão
ECHO ====================================================
ECHO Comando Executado:
ECHO "ffmpeg -i %arquivo% %escalar% %taxadequadros% -c:v vp9 -b:v 2000k -minrate 1500k -maxrate 2500k -quality good -crf 31 -c:a libvorbis -pass 1 -speed 4 %arquivosaida% && ffmpeg -i %arquivo% %escalar% %taxadequadros% -c:v vp9 -b:v 2000k -minrate 1500k -maxrate 2500k -quality good -crf 31 -c:a libvorbis -pass 2 -speed 4 -y %arquivosaida%"
ECHO "ffmpeg -i %arquivosaida% -vcodec copy -an %arquivosaidasemsom%"
ECHO ====================================================

:: Configuração para HD 1920 x 1080
ffmpeg -i %arquivo% %escalar% %taxadequadros% -c:v vp9 -b:v 2000k -minrate 1500k -maxrate 2500k -quality good -crf 31 -c:a libvorbis -pass 1 -speed 4 -f mp4 NUL
ffmpeg -i %arquivo% %escalar% %taxadequadros% -c:v vp9 -b:v 2000k -minrate 1500k -maxrate 2500k -quality good -crf 31 -c:a libvorbis -pass 2 -speed 4 -y %arquivosaida%
::ffmpeg -i $arquivosaida -vcodec copy -an $arquivosaidasemsom
