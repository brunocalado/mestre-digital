#!/bin/sh

## Requirements
# Linux
# apt install mediainfo
# apt install ffmpeg


## Usage
# optimize NOMEDOARQUIVO.FORMATO
# Example: ./optimize.sh meuvideo.mp4


## Definições
arquivo=$1
arquivosaida="out-2pass.webm"
arquivosaidasemsom="out-2pass-nosound.webm"
tamanho="hd" # pode ser 4k ou hd

## Ativação Opcional
taxadequadros="-framerate 30"
#escalar="-vf scale=1920x1080" # Apenas ative se você quer que o vídeo tenha seu tamanho alterado
#escalar="-vf scale=3840x2160" # Apenas ative se você quer que o vídeo tenha seu tamanho alterado


### Principal
echo "====================="
echo 'Otimizar v0.03'
echo "====================="

if [ "$1" != "" ]; then
  echo '===================================================='
  mediainfo $1
  echo '===================================================='
else
    echo "You need to provide a filename."
    exit
fi


## Executa a conversão
if [ $tamanho = "hd" ]; then
  echo '===================================================='
  echo "Comando Executado:"
  echo "ffmpeg -i $arquivo $escalar $taxadequadros -c:v vp9 -b:v 2000k -minrate 1500k -maxrate 2500k -quality good -crf 31 -c:a libvorbis -pass 1 -speed 4 $arquivosaida && ffmpeg -i $arquivo $escalar $taxadequadros -c:v vp9 -b:v 2000k -minrate 1500k -maxrate 2500k -quality good -crf 31 -c:a libvorbis -pass 2 -speed 4 -y $arquivosaida"
  echo "ffmpeg -i $arquivosaida -vcodec copy -an $arquivosaidasemsom"
  echo '===================================================='
  # Configuração para HD 1920 x 1080
  ffmpeg -i $arquivo $escalar $taxadequadros -c:v vp9 -b:v 2000k \
    -minrate 1500k -maxrate 2500k -quality good \
    -crf 31 -c:a libvorbis \
    -pass 1 -speed 4 $arquivosaida && \
  ffmpeg -i $arquivo $escalar $taxadequadros -c:v vp9 -b:v 2000k \
    -minrate 1500k -maxrate 2500k -quality good \
    -crf 31 -c:a libvorbis \
    -pass 2 -speed 4 -y $arquivosaida
  ffmpeg -i $arquivosaida -vcodec copy -an $arquivosaidasemsom
else
  echo '===================================================='
  echo "Comando Executado:"
  echo "ffmpeg -i $arquivo $escalar $taxadequadros -c:v vp9 -b:v 12000k -minrate 6000k -maxrate 17400k -quality good -crf 15 -c:a libvorbis -pass 1 -speed 4 $arquivosaida && ffmpeg -i $arquivo $escalar $taxadequadros -c:v vp9 -b:v 12000k -minrate 6000k -maxrate 17400k -quality good -crf 15 -c:a libvorbis -pass 2 -speed 4 -y $arquivosaida"
  echo "ffmpeg -i $arquivosaida -vcodec copy -an $arquivosaidasemsom"
  echo '===================================================='
  # Configuração para 4K 3840 x 2160 (overkill para VTT)  
  ffmpeg -i $arquivo $escalar $taxadequadros -c:v vp9 -b:v 12000k \
    -minrate 6000k -maxrate 17400k -quality good \
    -crf 15 -c:a libvorbis \
    -pass 1 -speed 4 $arquivosaida && \
  ffmpeg -i $arquivo $escalar $taxadequadros -c:v vp9 -b:v 12000k \
    -minrate 6000k -maxrate 17400k -quality good \
    -crf 15 -c:a libvorbis \
    -pass 2 -speed 4 -y $arquivosaida
  ffmpeg -i $arquivosaida -vcodec copy -an $arquivosaidasemsom
fi

mkdir -p original
mkdir -p convertido
mv $1 original
mv $arquivosaida convertido/$1
mv $arquivosaidasemsom convertido/"semsom${1}"

echo "Finalizado ${1}"
echo '===================================================='
















