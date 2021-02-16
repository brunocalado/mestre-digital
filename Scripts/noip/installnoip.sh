#!/bin/bash
#version v1.00

# NOIP
echo "===== Instala NOIP ====="
sudo apt -y install gcc make
cd /usr/local/src/
sudo curl -o noip-duc-linux.tar.gz http://www.noip.com/client/linux/noip-duc-linux.tar.gz
sudo tar xf noip-duc-linux.tar.gz
sudo rm noip-duc-linux.tar.gz
cd noip-2.1.9-1/
sudo make install
cd
curl -o noip https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Scripts/noip/noip.sh
chmod +x noip
./noip start

# Final
echo "Comandos adicionados: noip"
curl -o md https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Scripts/logo.txt
cat md  

rm md  
