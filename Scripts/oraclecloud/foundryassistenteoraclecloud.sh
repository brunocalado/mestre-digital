#######################################################
## assistente Oracle Cloud ################################
#!/bin/bash
#version v1.02

if [ $# -eq 1 ]; then  
  DOWNLOAD=$1

  # Open Ports in ufw
  sudo apt install ufw
  sudo ufw allow 22/tcp
  sudo ufw allow 80/tcp
  sudo ufw allow 443/tcp
  sudo ufw allow 30000/tcp  
  sudo ufw enable  
  #sudo iptables -I INPUT 6 -m state --state NEW -p tcp --match multiport --dports 80,443,30000 -j ACCEPT
  #sudo netfilter-persistent save
  
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
  
  sudo apt-get update        
  sudo apt-get install -y curl
  curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh
  sudo -E bash nodesource_setup.sh
  #sudo apt-get install -y ca-certificates curl gnupg
  #sudo mkdir -p /etc/apt/keyrings
  #curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg        
  
  #NODE_MAJOR=20
  #echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list
  
  sudo apt update
  sudo apt-get install -y nodejs
  
  # Auto inicia com a vm
  sudo apt install npm -y
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
