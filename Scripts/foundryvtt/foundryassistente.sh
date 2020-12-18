#!/bin/bash
#version v1.00
if [ $# -eq 2 ]; then
  DOMINIO=$1
  DOWNLOAD=$2
  
  # Instala ZIP
  echo "===== Instala ZIP ====="
  sudo apt -y install zip
  
  # Foundry VTT
  echo "===== Instala Foundry VTT ====="
  mkdir -p foundry  
  mkdir -p ~/.local/share/FoundryVTT  
  cd foundry/  
  curl -o fvtt.zip "${DOWNLOAD}"  
  unzip fvtt.zip
  sudo chmod +x ~/foundry/resources/app/main.js    
  rm fvtt.zip
  cd

  echo "===== Cria Atalhos ====="
  cd ..
  ln -s .local/share/FoundryVTT/Data/ data
  ln -s .local/share/FoundryVTT/Config/ config
  ln -s .local/share/FoundryVTT/Logs/ logs
  
  # Atualizacao Inicial
  echo "===== Atualizacao Inicial ====="  
  sudo apt update && sudo apt -y upgrade

  # Instala NODE
  echo "===== Instala NODE e Gerenciador de Processos ====="
  cd ~
  curl -sL https://deb.nodesource.com/setup_12.x -o nodesource_setup.sh
  sudo bash nodesource_setup.sh  
  sudo apt update
  sudo apt install -y nodejs
  sudo apt install -y build-essential

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

  # Certbot  
  sudo apt -y install snapd
  sudo snap install core
  sudo snap refresh core
  sudo snap install --classic certbot
  sudo ln -s /snap/bin/certbot /usr/bin/certbot
  sudo certbot certonly --standalone -d $DOMINIO
  
  # Certificado para o Foundry VTT
  sudo apt -y install acl  
  sudo setfacl -R -m u:$(whoami):rX /etc/letsencrypt/{live,archive}/$DOMINIO  
  sudo setfacl -m u:$(whoami):rX /etc/letsencrypt/{live,archive}  
  # Configura os arquivos do Foundry VTT
  sed -i 's+"sslCert": null+"sslCert": "/etc/letsencrypt/live/'$DOMINIO'/cert.pem"+g' ~/.local/share/FoundryVTT/Config/options.json
  sed -i 's+"sslKey": null+"sslKey": "/etc/letsencrypt/live/'$DOMINIO'/privkey.pem"+g' ~/.local/share/FoundryVTT/Config/options.json

  # Chave para arquivos
  ssh-keygen -t rsa -f ~/.ssh/arquivoschave -C $(whoami) -N "" 
  
  # Dados de Consulta
  echo "Usuario: $(whoami)" > dadossuporte
  echo "Maquina: $(hostname)" >> dadossuporte    
  echo "Endereco: ${DOMINIO}:30000" >> dadossuporte    
  echo "Local da chave publica: .ssh/arquivoschave.pub" >> dadossuporte    
  echo "Local da chave privada: .ssh/arquivoschave" >> dadossuporte    
  
  # Assistente
  curl -o jarbas https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Scripts/foundryvtt/jarbas.sh
  chmod +x jarbas

  # Final
  curl -o md https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Scripts/logo.txt
  cat md
  echo "Comandos adicionados: jarbas, noip"

  rm md
  rm assistente
  
  # Mostra chaves
  echo 
  echo
  ./jarbas chaves  
else
  echo "Coloque o dominio e o endereco de download do foundry vtt"
fi
