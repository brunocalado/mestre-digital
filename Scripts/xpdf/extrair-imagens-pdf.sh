#!/bin/sh

echo "Limpando arquivos de imagem antigos."
cd imagens

rm -f *.jpg *.ppm

mv *.pdf z.pdf

echo "Realizando extracao de imagens."
./../pdfimages -j z.pdf images

echo "Processo terminado."

cd ..
