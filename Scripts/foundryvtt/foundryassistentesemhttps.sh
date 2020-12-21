#!/bin/bash
#version v1.00
if [ $# -eq 1 ]; then  
  DOWNLOAD=$1
  
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
  cd ~
    
  echo "===== Cria Atalhos ====="  
  ln -s ~/.local/share/FoundryVTT/Data/ data
  ln -s ~/.local/share/FoundryVTT/Config/ config
  ln -s ~/.local/share/FoundryVTT/Logs/ logs
  
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

  # Liga o Foundry VTT
  nohup ./foundry/resources/app/main.js &

  # Chave para arquivos
  ssh-keygen -t rsa -f ~/.ssh/arquivoschave -C $(whoami) -N "" 
  
  # Dados de Consulta
  echo "Usuario: $(whoami)" > dadossuporte
  echo "Maquina: $(hostname)" >> dadossuporte    
  echo "Local da chave publica: .ssh/arquivoschave.pub" >> dadossuporte    
  echo "Local da chave privada: .ssh/arquivoschave" >> dadossuporte    
  
  # Assistente
  curl -o jarbas https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Scripts/foundryvtt/jarbasjarbassemhttps.sh
  chmod +x jarbas

  # Final
  echo "Comandos adicionados: jarbas, noip"
  curl -o md https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Scripts/logo.txt
  cat md  

  rm md
  rm assistente
  
  pkill node
else
  echo "Coloque o dominio e o endereco de download do foundry vtt"
fi
