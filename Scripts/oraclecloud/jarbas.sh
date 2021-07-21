#######################################################
## jarbas Oracle Cloud ################################
#! /bin/sh
VERSION="v1.22"
echo "========================================"
case "$1" in
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
    ;;
    reiniciar)
        echo "Encerra o FVTT e Inicia o FVTT em seguida"        
        ./jarbas ligar        
    ;;    
    suporte)
        echo "Dados da Maquina"        
        cat dadossuporte
        echo "IP: " $(curl -s ifconfig.me)        
        echo "Dominio: " $(grep hostname config/options.json | awk '{print $2}' | sed 's/\"//g' | sed 's/,//g')
        echo 
        echo "== Solucao de Problemas =="
        echo "1. Reinicie a maquina no oracle."
        echo "2. Reinicie o foundry (./jarbas reiniciar)"
        echo "3. Tente acessar pelo dominio: https://$(grep hostname config/options.json | awk '{print $2}' | sed 's/\"//g' | sed 's/,//g')"
        echo "4. Tente acessar pelo IP: http://$(curl -s ifconfig.me):30000"
        echo "5. Se por IP funcionou o problema e com o dominio. Veja se o apontamento esta certo. Refaca o processo conforme o video."        
        echo
        echo "Voce deve ver mensagens com as portas abertas. Se nao ver, seu firewall na oracle nao esta configurado corretamente."
        MYIP=$(curl -s ifconfig.me)
        timeout 1 bash -c "</dev/tcp/$MYIP/80 &>/dev/null" &&  echo "Porta 80 ABERTA"
        timeout 1 bash -c "</dev/tcp/$MYIP/443 &>/dev/null" &&  echo "Porta 443 ABERTA"
        timeout 1 bash -c "</dev/tcp/$MYIP/30000 &>/dev/null" &&  echo "Porta 30000 ABERTA"        
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
    espaco)
        echo "======================"
        echo "Espaco Disponivel"        
        df -h /dev/sda1
        echo "======================"        
    ;;
    node)
        echo "======================"
        echo "Atualizando o NODE para a ultima versao LTS"        
        ./jarbas desligar     
        # curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
        sudo apt update && sudo apt -y upgrade
        ./jarbas ligar     
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
      echo "Compactar: o comando abaixo bai copiar tudo que você tem em data (systems, worlds e modules) e transformar em um arquivo chamado data.zip"
      echo "zip -r data.zip data/"
      echo
      echo "Descompactar: o comando abaixo vai pegar tudo que tem no arquivo data.zip e descompactar dentro do diretorio atual. IMPORTANTE: voce deve saber o diretorio certo para executar isso."
      echo "unzip data.zip"
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
              echo "Cole o link de download temporario da instalacao Node.js do site do Foundry VTT "
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
              ./jarbas ligar             
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
    caddy)
      case "$2" in
        instalar)
          echo "===== Instala Caddy ====="                    
          sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
          curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo apt-key add -
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
          sed -i 's+"hostname": null+"hostname": "'$dominio'"+g' config/options.json
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
        echo "Opcoes: $0 {ligar|desligar|reiniciar|admin|caddy|espaco|status|update|node|sobre|suporte}"
        echo "Exemplo de uso: ./jarbas ligar"
        echo
        echo "- admin: funcoes administrativas."  
        echo "- caddy: instala e gerencia o caddy."          
        echo "- compactar: aprenda a compactar seus arquivos para ser facil baixar."          
        echo "- desligar: Para o Foundry VTT"
        echo "- espaco: mostra quanto do disco foi usado"        
        echo "- reiniciar: Encerra o FVTT e Inicia o FVTT em seguida"
        echo "- ligar: Inicia o Foundry VTT"
        echo "- node: atualiza o NODE para a ultima versao LTS (recomendado)."        
        echo "- sobre: sobre o desenvolvedor desse script"        
        echo "- status: Verifica se o Foundry VTT está rodando"
        echo "- suporte: Mostra dados da maquina"
        echo "- update: atualiza o jarbas."                
        echo
        exit 1
esac
echo "========================================"
exit 0
#######################################################