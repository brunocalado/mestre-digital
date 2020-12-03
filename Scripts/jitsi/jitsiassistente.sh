#!/bin/bash

if [ $1 ]; then
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
  sudo apt -y install jitsi-meet
  curl -o jitsi https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Scripts/jitsi/jitsi.sh

  # NOIP
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

  # Certbot
  sudo apt -y install certbot
  sudo /usr/local/bin/noip2
  sudo /usr/share/jitsi-meet/scripts/install-letsencrypt-cert.sh

  # Configurar o Jitsi
  sudo nano "/etc/nginx/sites-available/${DOMINIO}.conf"
  sudo service nginx restart   
  cd
  echo ${DOMINIO} > dominio  
  whoami > contausuario  
  curl -o jitsi-security https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Scripts/jitsi/jitsi-security.sh
  chmod +x jitsi-security
  echo "=== Execute os Comandos Manualmente ==="
  echo "./jitsi-security SENHA"
  echo "exit"
  echo "export JITSI_DOMAIN=${DOMINIO}"
  sudo su
  
  curl -o md https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Scripts/logo.txt
  cat md
  echo  
  echo "Comandos adicionados: jitsi, noip"
  
  rm dominio
  rm contausuario
  rm md
  rm assistente
else
  echo "Coloque o dominio"
fi
