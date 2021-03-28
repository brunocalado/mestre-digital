#######################################################
## jarbas Oracle Cloud ################################
#! /bin/sh
VERSION="v1.00"
echo "========================================"
case "$1" in
    ligar)
        echo "Iniciando o Foundry VTT"
        echo "Pressione enter para continuar." 
        pm2 start "node /home/ubuntu/foundry/resources/app/main.js" --name foundry    
    ;;
    desligar)
        echo "Encerrando o Foundry VTT"        
        pm2 stop foundry    
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
        echo "Encerra o FVTT e Inicia o FVTT"        
        ./jarbas desligar
        ./jarbas ligar        
    ;;    
    suporte)
        echo "Dados da Maquina"        
        cat dadossuporte
    ;; 
    update)
        echo "======================"
        echo "Atualizando o jarbas."        
        rm jarbas
        curl -H 'Cache-Control: no-cache' -o jarbas https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Scripts/oraclecloud/jarbas.sh?$(date +%s)
        chmod +x jarbas
        echo "----------------------"
        grep -m1 "VERSION=" jarbas | head 1
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
        # curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
        sudo apt update && sudo apt -y upgrade
        echo "======================"        
    ;;   
    sobre)
      curl -o md https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Scripts/logo.txt && cat md && rm md
      echo "https://www.mestredigital.online/colabore-com-o-mestre-digital"
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
              rm config/options.json
              ./jarbas ligar
            ;;             
            *)
            echo "Opcoes: $0 {removesenha|resetaconfig}"            
            echo "Exemplo de uso: ./jarbas admin removesenha"
            echo
            echo "removesenha: remove a senha do foundry vtt"  
            echo "resetaconfig: coloca o arquivo de configuracao do foundry vtt em seu estado padrao."               
            exit 1
        esac
    ;;       
    caddy)
      case "$2" in
        instalar)
          echo "===== Instala Caddy ====="
          echo "deb [trusted=yes] https://apt.fury.io/caddy/ /" \
            | sudo tee -a /etc/apt/sources.list.d/caddy-fury.list
          sudo apt -y update
          sudo apt -y install caddy
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
        echo "Opcoes: $0 {ligar|desligar|reiniciar|status|update|node|sobre|suporte|noip|admin}"
        echo "Exemplo de uso: ./jarbas ligar"
        echo
        echo "admin: funcoes administrativas."  
        echo "caddy: instala e gerencia o caddy."          
        echo "desligar: Para o Foundry VTT"
        echo "espaco: mostra quanto do disco foi usado"        
        echo "reiniciar: Encerra o FVTT e Inicia o FVTT em seguida"
        echo "ligar: Inicia o Foundry VTT"
        echo "node: atualiza o NODE para a ultima versao LTS (recomendado)."        
        echo "noip: instala e gerencia o noip."        
        echo "sobre: sobre o desenvolvedor desse script"        
        echo "status: Verifica se o Foundry VTT está rodando"
        echo "suporte: Mostra dados da maquina"
        echo "update: atualiza o jarbas."                
        exit 1
esac
echo "========================================"
exit 0
#######################################################