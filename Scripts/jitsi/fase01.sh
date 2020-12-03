!#/bin/sh

# Atualizacao Inicial
echo "===== Atualizacao Inicial ====="
sudo apt update 
sudo apt -y upgrade
# jitsi
sudo apt install gnupg
# noip
sudo apt -y install gcc make

# Abre interface para acertar a timezone
echo "===== Corrige a hora ====="
sudo dpkg-reconfigure tzdata

# Definir seu dominio
echo "===== Define hostname ====="
sudo hostnamectl set-hostname jitsi.servequake.com

# Instala jitsi no Debian 10
echo "===== Instala Jitsi no Debian 10 ====="
curl -o jitsi-key.gpg.key wget https://download.jitsi.org/jitsi-key.gpg.key
sudo apt-key add jitsi-key.gpg.key
rm jitsi-key.gpg.key
sudo echo "deb https://download.jitsi.org stable/" >> /etc/apt/sources.list.d/jitsi-stable.list
sudo apt update 
sudo apt install jitsi-meet

# NOIP
sudo cd /usr/local/src/
sudo curl -o noip-duc-linux.tar.gz http://www.noip.com/client/linux/noip-duc-linux.tar.gz
sudo tar xf noip-duc-linux.tar.gz
sudo cd noip-2.1.9-1/
sudo make install

