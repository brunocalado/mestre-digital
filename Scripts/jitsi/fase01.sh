#!/bin/sh
 
if [ $1  ]; then
  DOMINIO=$1

  # Atualizacao Inicial
  echo "===== Atualizacao Inicial ====="
  sudo apt update 
  sudo apt -y upgrade
  
  # Abre interface para acertar a timezone
  echo "===== Corrige a hora ====="
  sudo dpkg-reconfigure tzdata

  # Definir seu dominio
  echo "===== Define hostname ====="
  sudo hostnamectl set-hostname $DOMINIO

  # Instala jitsi no Debian 10
  sudo apt -y install gnupg
  echo "===== Instala Jitsi no Debian 10 ====="
  curl -o jitsi-key.gpg.key https://download.jitsi.org/jitsi-key.gpg.key
  sudo apt-key add jitsi-key.gpg.key
  rm jitsi-key.gpg.key
  echo "deb https://download.jitsi.org stable/" | sudo tee -a /etc/apt/sources.list.d/jitsi-stable.list
  sudo apt update
  sudo apt install jitsi-meet

  # NOIP
  sudo apt -y install gcc make
  cd /usr/local/src/
  sudo curl -o noip-duc-linux.tar.gz http://www.noip.com/client/linux/noip-duc-linux.tar.gz
  sudo tar xf noip-duc-linux.tar.gz
  sudo rm noip-duc-linux.tar.gz
  cd noip-2.1.9-1/
  sudo make install
  cd

  # Certbot
  sudo apt -y install certbot
  sudo /usr/share/jitsi-meet/scripts/install-letsencrypt-cert.sh
  
  
else
  echo "Precisa colocar um argumento que seja um dominio!"
fi


