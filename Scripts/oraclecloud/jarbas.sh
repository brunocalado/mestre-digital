#######################################################
## jarbas Oracle Cloud ################################
#! /bin/sh
VERSION="v1.57"
echo "========================================"
case "$1" in
    login2left)
        echo "It's better you know what you doing!"
        curl -H 'Cache-Control: no-cache' -o login2left https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/css/text-left-no-title.css?$(date +%s)
        cat login2left >> ~/foundry/resources/app/public/css/style.css
    ;;
    ligar)
        echo "Iniciando o Foundry VTT"
        ./jarbas desligar
        pm2 start "node /home/ubuntu/foundry/resources/app/main.js" --name foundry    
        pm2 save
    ;;
    desligar)
        echo "Encerrando o Foundry VTT"                
        pm2 stop foundry
        pm2 delete all
    ;;
    status)
        echo "Verificando se o Foundry VTT esta executando"        
        pm2 list
    ;;  
    versao)
        echo "Checagem de Versoes"        
        echo "Versao do NODE: $(node --version)"
        echo "Versao do NPM: $(npm --version)"
        echo "Versao do PM2: $(pm2 --version)"
        echo "Versao do jarbas: ${VERSION}"
        echo "Versao do SO: $(cat /etc/os-release | grep PRETTY_NAME)"
        echo "Versao do Foundry VTT:"
        cat foundry/resources/app/package.json | grep generation | awk -F: '{print $2}' | awk '{print $1}' | tr -d ','
        
    ;;
    reiniciar)
        echo "Encerra o FVTT e Inicia o FVTT em seguida"        
        ./jarbas ligar        
    ;;    
    horacerta)
      echo "A hora do servidor vai ser acertada para America/Sao_Paulo. Se quer algo diferente digite:"
      echo "sudo dpkg-reconfigure tzdata"
      echo "O comando acima permite escolher o que quiser."
      echo
      echo "== Timezone Atual =="
      echo "America/Sao_Paulo" | sudo tee /etc/timezone
      sudo dpkg-reconfigure --frontend noninteractive tzdata
    ;;    
    suporte)
        # Dados de Consulta
        echo "# Dados da Maquina"        
        echo "Usuario: $(whoami)"
        echo "Maquina: $(hostname)"
        echo "IP: " $(curl -s ifconfig.me)        
        echo "Dominio: " $(grep hostname config/options.json | awk '{print $2}' | sed 's/\"//g' | sed 's/,//g')
        echo         
        FILE=/home/ubuntu/foundry/resources/app/main.js
        if test -f "$FILE"; then
          echo "O Foundry VTT esta instalado."
        else
          echo "Houve um erro na sua instalacao do Foundry VTT. Reinstale. Tenha certeza de escolher a versao Linux do site do Foundry VTT."
        fi        
        echo 
        echo "== Solucao de Problemas =="
        echo "1. Reinicie a maquina no oracle."
        echo "2. Reinicie o foundry (./jarbas reiniciar)"
        echo "3. Tente acessar pelo dominio: https://$(grep hostname config/options.json | awk '{print $2}' | sed 's/\"//g' | sed 's/,//g')"
        echo "4. Tente acessar pelo IP: http://$(curl -s ifconfig.me):30000"
        echo "5. Se por IP funcionou o problema e com o dominio. Veja se o apontamento esta certo. Refaca o processo conforme o video."        
        echo
        echo "=== Inicio do Teste de Portas ==="
        echo "Voce deve ver mensagens dizendo que as portas 80,443 e 30000 estao abertas. Se nao ver, seu firewall na oracle nao esta configurado corretamente."
        MYIP=$(curl -s ifconfig.me)
        timeout 1 bash -c "</dev/tcp/$MYIP/80 &>/dev/null" &&  echo "Porta 80 ABERTA"
        timeout 1 bash -c "</dev/tcp/$MYIP/443 &>/dev/null" &&  echo "Porta 443 ABERTA"
        timeout 1 bash -c "</dev/tcp/$MYIP/30000 &>/dev/null" &&  echo "Porta 30000 ABERTA"        
        echo "=== Fim do Teste de Portas ==="
        echo
        echo "O NODE instalado deve ser o 22."
        echo "Versao do NODE: $(node --version)"        
        echo
        echo "Situacao do Firewall do OS"
        ./jarbas firewall status | grep Status
        echo
        echo "Mais ajuda no link: https://www.mestredigital.online/post/guia-de-instalacao-do-foundry-vtt-na-oracle-cloud"
    ;; 
    update)
        echo "======================"
        echo "Atualizando o jarbas."        
        rm jarbas
        curl -H 'Cache-Control: no-cache' -o jarbas https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Scripts/oraclecloud/jarbas.sh?$(date +%s)
        chmod +x jarbas
        echo "----------------------"
        grep -m1 "VERSION=" jarbas
        echo "======================"
    ;;     
    hardware)
        echo "======================"
        echo "= Espaco de Disco ="        
        df -h /dev/sda1
        echo
        echo
        echo "= Memoria RAM ="        
        free -mh
        echo
        echo
        echo "= Processador(es) ="        
        lscpu | egrep 'Model name|Socket|Thread|NUMA|CPU\(s\)'
        echo "======================"        
    ;;
    node)
        echo "======================"
        echo "Atualizando o NODE para a ultima versao Recomendada: 22"        
        echo "Apos o processo seu sistema será reiniciado e voce sera desconectado. Aguarde o sistema iniciar e se conecte novamente."
        read -p "Pressione qualquer tecla para continuar."
        ./jarbas desligar     
        # https://github.com/nodesource/distributions
        # https://medium.com/@nsidana123/before-the-birth-of-of-node-js-15ee9262110c
        # Using Ubuntu
        sudo apt-get update        
        sudo apt-get install -y curl
        curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh
        sudo -E bash nodesource_setup.sh

        #sudo apt-get install -y ca-certificates curl gnupg
        #sudo mkdir -p /etc/apt/keyrings
        #curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg        
        
        #NODE_MAJOR=20
        #echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list
 
        sudo apt-get update
        sudo apt-get install nodejs -y 
        sudo apt update && sudo apt -y upgrade
        
        ./jarbas ligar     
        echo "Se encontrar problemas reinicia a VM com: sudo reboot"
        echo "======================"        
    ;;   
    sobre)
      curl -o md https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Scripts/logo.txt && cat md && rm md
      echo "https://www.mestredigital.online/colabore-com-o-mestre-digital"
      echo
      echo "Ajuda no link: https://www.mestredigital.online/post/guia-de-instalacao-do-foundry-vtt-na-oracle-cloud"
    ;;      
    compactar)
      echo "Para salvar os seus arquivos a melhor forma e compacta-los antes em um arquivo ZIP. Isso permite que a transferencia de seu computador para nuvem ou vice versa seja muito mais rapida."
      echo 
      echo "Compactar: o comando abaixo vai copiar tudo que você tem em data (systems, worlds e modules) e transformar em um arquivo chamado data.zip"
      echo "zip -r data.zip data/"
      echo
      echo "Descompactar: o comando abaixo vai pegar tudo que tem no arquivo data.zip e descompactar dentro do diretorio atual. IMPORTANTE: voce deve saber o diretorio certo para executar isso."
      echo "unzip data.zip"
    ;;     
    setup)
      echo "CONFIGURACOES INICIAIS"
      echo 
      
      # Open Ports in ufw
      ./jarbas firewall ativar

      # Instala ZIP
      echo "===== Instala ZIP ====="
      sudo apt -y install zip unzip vim
      
      # Instala Foundry VTT
      ./jarbas admin instalar
    
      # Cria Atalhos
      echo "===== Cria Atalhos ====="  
      ln -s ~/.local/share/FoundryVTT/Data/ data
      ln -s ~/.local/share/FoundryVTT/Config/ config
      ln -s ~/.local/share/FoundryVTT/Logs/ logs
  
      # Instala NODE
      echo "===== Instala NODE e Gerenciador de Processos ====="
      cd ~      
      ./jarbas node
      
      # Auto inicia com a vm
      sudo apt install npm -y
      sudo npm install pm2 -g
      pm2 startup
      sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu
      # Configura o auto inicio do Foundry VTT
      pm2 start "node /home/ubuntu/foundry/resources/app/main.js" --name foundry    
      pm2 save
      
      # Final
      curl -o md https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Scripts/logo.txt && cat md && rm md
    
      # reboot
      echo "Sua maquina vai ser reiniciada. Aguarde alguns minutos e volte a se conectar."
      read -p "Pressione qualquer tecla para continuar."
      sudo reboot
    ;;      
    admin)               
        case "$2" in
            removesenha)
              echo "Removendo a senha de adminstracao do Foundry VTT."
              ./jarbas desligar
              rm config/admin.txt
              ./jarbas ligar
              echo "Processo concluido. Tente acessar o Foundry VTT."
            ;;
            resetaconfig)
              echo "Restaurando o arquivo de configuracao do Foundry VTT para o padrao."
              ./jarbas desligar
              rm -f config/options.json
              ./jarbas ligar
            ;;        
            instalarzip)
              echo "===== Instala Foundry VTT ====="              
              FILE=foundry.zip
              if [ -f "$FILE" ]; then
                  echo "$FILE localizado. Processo iniciado!"
                  ./jarbas desligar
                  echo "== Sua instalacao Foundry VTT esta sendo removida. Seus arquivos de usuario nao serao afetados. =="
                  cd ~
                  rm -rf foundry
                  mkdir -p foundry  
                  mkdir -p ~/.local/share/FoundryVTT  
                  mv foundry.zip foundry/
                  cd foundry/  
                  unzip foundry.zip
                  sudo chmod +x ~/foundry/resources/app/main.js
                  rm foundry.zip
                  cd ~
                  ./jarbas ligar
                else
                  echo "Voce deve ter feito o upload do arquivo zip do Foundry VTT (node) para a pasta principal atraves do Filezilla."
                  echo "NOME DO ARQUIVO DEVE SER: foundry.zip"
              fi 
            ;;
            instalar)
              echo "===== Instala Foundry VTT ====="
              ./jarbas desligar
              echo "Cole o link de download temporario da instalacao LINUX do site do Foundry VTT "
              read linkdownloadfoundry              
              cd ~
              rm -rf foundry
              mkdir -p foundry  
              mkdir -p ~/.local/share/FoundryVTT  
              cd foundry/  
              curl -o fvtt.zip "${linkdownloadfoundry}"  
              unzip fvtt.zip
              sudo chmod +x ~/foundry/resources/app/main.js    
              rm fvtt.zip
              cd ~              
            ;;            
            *)
            echo "Opcoes: $0 {instalar|instalarzip|removesenha|resetaconfig}"            
            echo "Exemplo de uso: ./jarbas admin removesenha"
            echo
            echo "- instalar: instala uma nova versao do foundry vtt usando o link do site do foundry vtt. Tem que usar o link do linux/node.js. Importante: a pasta da instalacao foundry atual sera apagada, isso nao afeta a pasta de dados do foundry."  
            echo "- instalarzip: instala o foundry a partir de um arquivo ZIP cujo nome dever ser foundry.zip e esse arquivo deve estar na pasta inicial no filezilla. Esse processo remove sua instalacao foundry sem afetar os arquivos de usuario. O que voce deve baixar do site do foundry e uma versao que seja linux/node.js."  
            echo "- removesenha: remove a senha do foundry vtt"  
            echo "- resetaconfig: coloca o arquivo de configuracao do foundry vtt em seu estado padrao."               
            echo
            exit 1
        esac
    ;;       
    swap)               
        case "$2" in
            status)
              echo "Estado da SWAP"
              free -mh | grep Swap
            ;;
            ativar)
              echo "Criando e Ativando SWAP. Aguarde! Tempo esperado: 5 minutos."
              sudo dd if=/dev/zero of=/swapfile count=2048 bs=1M
              sudo chmod 600 /swapfile
              sudo mkswap /swapfile
              sudo swapon /swapfile
              echo '/swapfile   none    swap    sw    0   0' | sudo tee -a /etc/fstab
            ;;        
            *)
            echo "Opcoes: $0 {status|ativar}"            
            echo "Exemplo de uso: ./jarbas swap status"
            echo
            echo "IMPORTANTE: APENAS PARA MAQUINA COM POUCA RAM. NAO FACA ISSO PARA MAQUINA ARM. "
            echo "NOTA: VOCE TERA UMA REDUCAO DE 2GB DE ESPACO DE DISCO COM ESSE PROCESSO. ESSE ESPACO SERA USADO PARA OFERECER UMA MELHORIA DE DESEMPENHO."
            echo "- status: reporta situacao da swap."  
            echo "- ativar: cria e ativa a swap. APENAS UMA VEZ!"  
            echo
            exit 1
        esac
    ;;    
    firewall)               
        case "$2" in
            status)
              echo "Estado do Firewall"
              sudo ufw status numbered
            ;;
            ativar)
              echo "O firewall ufw vai ser instalado e configurado."
              sudo apt -y install ufw
              sudo ufw allow 22/tcp
              sudo ufw allow 80/tcp
              sudo ufw allow 443/tcp
              sudo ufw allow 443/udp
              sudo ufw allow 30000/tcp  
              sudo ufw enable  
              echo
              echo "Reinicie a maquina virtual se nao funcionar."              
            ;;        
            *)
            echo "Opcoes: $0 {status|ativar}"            
            echo "Exemplo de uso: ./jarbas firewall status"
            echo
            exit 1
        esac
    ;;      
    caddy)
      case "$2" in
        instalar)
          echo "===== Instala Caddy ====="                    
          # https://caddyserver.com/docs/install#debian-ubuntu-raspbian
          sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
          curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
          curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list 
          sudo apt update
          sudo apt install -y caddy
          
          ./jarbas caddy config
        ;;
        config)
          echo "===== Configura o Caddy ====="
          ./jarbas desligar
          sudo service caddy stop
          
          echo "Digite o seu Dominio e pressione Enter: "
          read dominio
          
          curl -o Caddyfile https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Scripts/caddy/Caddyfile.txt
          sed -i 's+MEUDOMINIOFOUNDRY+'$dominio'+g' Caddyfile  
          sudo mv Caddyfile /etc/caddy/Caddyfile
          
          cp config/options.json config/`date +"%H%M-%d%m%Y"`options.json.bkp
          #sed -i 's+"hostname": null+"hostname": "'$dominio'"+g' config/options.json
          sed -i 's+"hostname":.*,+"hostname": "'$dominio'",+g' config/options.json
          sed -i 's+"proxySSL": false+"proxySSL": "true"+g' config/options.json
          sed -i 's+"proxyPort": null+"proxyPort": "443"+g' config/options.json
          
          sudo service caddy start
          ./jarbas ligar          
        ;;
        arquivo)          
          echo "-------------------------------"
          echo "Arquivo do Caddy"
          cat /etc/caddy/Caddyfile
          echo "-------------------------------"
          echo
          echo "Se quiser editar manualmente use o comando: nano /etc/caddy/Caddyfile"
          echo
          echo "-------------------------------"         
          echo "Arquivo de configuracao do Foundry VTT"
          cat config/options.json
          echo "-------------------------------"
        ;;        
        start)
          echo "== Iniciando o Caddy"
          sudo service caddy start
        ;;
        status)
          echo "== Para sair pressione a tecla q de quit =="
          sudo service caddy status
        ;;
        stop)
          echo "== Encerrando o Caddy"
          sudo service caddy stop
        ;;
        restart)
          echo "== Reiniciando o Caddy"
          sudo service caddy restart
        ;;                  
        *)
          echo "Opcoes: {instalar|start|restart|stop|status|config|arquivo}"            
          exit 1
      esac        
    ;;
    *)
        echo "Jarbas Versao ${VERSION}" 
        echo "Opcoes: $0 {ligar|desligar|reiniciar|admin|swap|caddy|hardware|status|update|node|sobre|suporte|horacerta}"
        echo "Exemplo de uso: ./jarbas ligar"
        echo
        echo "- admin: funcoes administrativas."  
        echo "- caddy: instala e gerencia o caddy."          
        echo "- compactar: aprenda a compactar seus arquivos para ser facil baixar."          
        echo "- desligar: Para o Foundry VTT"
        echo "- hardware: mostra dados de hardware"        
        echo "- horacerta: Permite arrumar a hora desse servidor."
        echo "- ligar: Inicia o Foundry VTT"
        echo "- node: atualiza o NODE para a ultima versao LTS (recomendado)."        
        echo "- firewall: libera acesso as portas"                
        echo "- reiniciar: Encerra o FVTT e Inicia o FVTT em seguida"
        echo "- sobre: sobre o desenvolvedor desse script"        
        echo "- status: Verifica se o Foundry VTT está rodando"
        echo "- suporte: Mostra dados da maquina"
        echo "- swap: Apenas para maquina com pouca memoria RAM. Nao faca isso para a maquina ARM."
        echo "- versao: mostra as versoes instaladas"
        echo "- update: atualiza o jarbas."                
        echo
        exit 1
esac
echo "========================================"
exit 0
#######################################################