#######################################################
## thalia Oracle Cloud - livekit assistant ############
#! /bin/sh
VERSION="v1.00"
echo "========================================"
case "$1" in
    updatesystem)
      echo "== The system will be updated =="
      sudo apt update && sudo apt -y upgrade
    ;;
    updatethalia)
      echo "== thalia will be updated =="
      rm thalia
      curl -H 'Cache-Control: no-cache' -o jarbas https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Scripts/livekit/thalia.sh?$(date +%s)
      chmod +x thalia
    ;;    
    start)
      echo "Starting Livekit"                
      echo "Press Control + C to stop."
      LIVEKIT_KEYS="$(cat keys)" ~/livekit-server/bin/livekit-server --config config.yaml
    ;;
    readconfig)
        echo "Config file is located at: ~/livekit-server/config.yaml"        
        cat ~/config.yaml
    ;;  
    version)
        echo "== Version =="        
        echo "$(~/livekit-server/bin/livekit-server --version)"
        echo "thalia: ${VERSION}"
        echo "OS: $(cat /etc/os-release | grep PRETTY_NAME)"
        echo "== GO =="        
        go version
    ;;
    support)
        echo "== Machine Data =="        
        echo "IP: " $(curl -s ifconfig.me)         
        echo 
        echo "== Disk Space =="        
        df -h /dev/sda1
        echo
        echo "== RAM =="        
        free -mh        
        echo
        echo "== CPU =="        
        lscpu | egrep 'Model name|Socket|Thread|NUMA|CPU\(s\)'
    ;;
    admin)               
        case "$2" in
            generatekeys)
              echo "== Generating new keys for livekit =="
              ~/livekit-server/bin/livekit-server generate-keys > keys
              APIKEY="$(grep 'API Key' keys | awk '{print $3}')"
              APISECRET="$(grep 'API Secret' keys | awk '{print $3}')"
              cat "$APIKEY: $APISECRET" > keys
            ;;
            showkeys)
              echo "== Keys =="
              cat keys
            ;;
            showiptables)
              echo "== IP Tables =="
              sudo iptables -L
            ;;              
            flushiptables)
              echo "== Flush IP Tables =="
              sudo iptables --flush
            ;;                          
            *)
            echo "Options: $0 {generatekeys|showkeys|showiptables|flushiptables}"            
            echo "Example: ./thalia admin showkeys"
            echo
            echo "- generatekeys: This you generate a new key and store it at keys file."  
            echo "- showkeys: This will show current keys."  
            echo
            exit 1
        esac
    ;;       
    swap)               
        case "$2" in
            status)
              echo "== Status =="
              free -mh | grep Swap
            ;;
            activate)
              echo "Creating SWAP. Wait! ETA: 5 minutes."
              sudo dd if=/dev/zero of=/swapfile count=2048 bs=1M
              sudo chmod 600 /swapfile
              sudo mkswap /swapfile
              sudo swapon /swapfile
              echo '/swapfile   none    swap    sw    0   0' | sudo tee -a /etc/fstab
            ;;        
            *)
            echo "Options: $0 {status|activate}"            
            echo "Example: ./thalia swap status"
            echo
            echo "- status: swap status"  
            echo "- activate: Create swap."  
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
        echo "thalia ${VERSION}" 
        echo "Options: $0 {start|admin}"
        echo "Example: ./thalia start"
        echo
        echo "- admin: livekit admin"     
        echo
        exit 1
esac
echo "========================================"
exit 0
#######################################################