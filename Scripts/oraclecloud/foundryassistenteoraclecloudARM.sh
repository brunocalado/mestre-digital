#######################################################
## assistente Oracle Cloud ARM ########################
#!/bin/bash
#version v1.00



curl -o foundryvtt.zip "https://foundryvtt.s3.amazonaws.com/releases/0.7.10/foundryvtt-0.7.10.zip?AWSAccessKeyId=AKIAISZIIE42YLQZKLEQ&Signature=h3m59PHYP3y5CGfBGew16f0UNcY%3D&Expires=1622207579"

sudo yum -y install nodejs
sudo yum -y update oracle-nodejs-release-el8
sudo yum -y check-update
sudo yum -y update 


https://yum.oracle.com/oracle-linux-nodejs.html

if [ $# -eq 1 ]; then  
  DOWNLOAD=$1

  # Open Ports in iptables
  sudo iptables -I INPUT 6 -m state --state NEW -p tcp --match multiport --dports 80,443,30000 -j ACCEPT
  sudo netfilter-persistent save
  
  # Instala ZIP
  echo "===== Instala ZIP ====="
  sudo apt -y install zip unzip vim
  
  # Foundry VTT  
  echo "===== Instala Foundry VTT ====="
  cd ~
  mkdir -p foundry  
  mkdir -p ~/.local/share/FoundryVTT  
  cd foundry/  
  curl -o fvtt.zip "${DOWNLOAD}"  
  unzip fvtt.zip
  sudo chmod +x ~/foundry/resources/app/main.js    
  rm fvtt.zip
  cd ~
    
  echo "===== Cria Atalhos ====="  
  ln -s ~/.local/share/FoundryVTT/Data/ data
  ln -s ~/.local/share/FoundryVTT/Config/ config
  ln -s ~/.local/share/FoundryVTT/Logs/ logs
  
  # Instala NODE
  echo "===== Instala NODE e Gerenciador de Processos ====="
  cd ~
  curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
  sudo apt-get install -y nodejs
  
  # Auto inicia com a vm
  sudo npm install pm2 -g
  pm2 startup
  sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu
  # Liga o Foundry VTT
  pm2 start "node /home/ubuntu/foundry/resources/app/main.js" --name foundry    
  pm2 save
  
  # Dados de Consulta
  echo "Usuario: $(whoami)" > dadossuporte
  echo "Maquina: $(hostname)" >> dadossuporte    
  echo "Pasta de logs do fondry vtt: logs/" >> dadossuporte
  
  # Assistente
  curl -o jarbas https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Scripts/oraclecloud/jarbas.sh
  chmod +x jarbas
  echo "Comando(s) adicionado(s): jarbas"
  
  # Final  
  curl -o md https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Scripts/logo.txt && cat md && rm md
  
  rm assistente

else
  echo "Coloque o endereco de download do foundry vtt"
fi
