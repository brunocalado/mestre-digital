@echo off
cd imagens
echo "Limpando arquivos de imagem antigos."
erase /Q *.jpg
erase /Q *.ppm
rename *.pdf z.pdf
echo "Realizando extracao de imagens."
..\pdfimages.exe -j z.pdf images
echo "Processo terminado."
cd ..
