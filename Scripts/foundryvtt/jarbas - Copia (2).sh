#######################################################
#! /bin/sh
VERSION="v1.13"
echo "========================================"
case "$1" in
    ligar)
        echo "Iniciando o Foundry VTT"
        echo "Pressione enter para continuar." 
        mkdir -p logExecucao
        cat nohup.out >> logExecucao/`date +"%H%M-%d%m%Y"`.log
        rm -f nohup.out
        nohup ./foundry/resources/app/main.js &
    ;;
    desligar)
        echo "Encerrando o Foundry VTT"        
        pkill node
    ;;
    status)
        echo "Verificando se o Foundry VTT esta executando"        
        cat nohup.out
        echo
        echo "Se aparecer um numero na linha abaixo, o Foundry estara rodando:"
        pgrep -f node
    ;;  
    versao)
        echo "Checagem de Versoes"        
        echo "Versao do NODE: $(node --version)"
        echo "Versao do jarbas: ${VERSION}"
        echo "Versao do SO: $(cat /etc/os-release | grep PRETTY_NAME)"
    ;;
    forcar)
        echo "Encerra o FVTT, Atualiza o IP (se tiver noip), Inicia o FVTT"        
        pkill node
        sudo /usr/local/bin/noip2        
        ./jarbas ligar        
    ;;    
    suporte)
        echo "Dados da Maquina"        
        cat dadossuporte
    ;;    
    https)
        echo "======================"
        echo "Verificacao de HTTPS"        
        sudo certbot renew --dry-run        
        echo "======================"        
    ;;    
    limpar)
        echo "======================"
        echo "Apagando todos os arquivos de log. Nao mexe nos arquivos de log do foundry vtt."        
        rm -f logExecucao/*.log
        echo "======================"        
    ;;    
    update)
        echo "======================"
        echo "Atualizando o jarbas."        
        rm jarbas
        curl -H 'Cache-Control: no-cache' -o jarbas https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Scripts/foundryvtt/jarbas.sh?$(date +%s)
        chmod +x jarbas
        grep "VERSION=" jarbas
        echo "======================"
    ;;     
    node)
        echo "======================"
        echo "Atualizando o NODE para a ultima versao LTS"        
        curl -sL https://deb.nodesource.com/setup_14.x -o nodesource_setup.sh
        sudo bash nodesource_setup.sh && rm nodesource_setup.sh  
        sudo apt update
        sudo apt install -y nodejs
        sudo apt install -y build-essential        
        echo "======================"        
    ;;             
    chaves)
        echo "Chaves localizadas"        
        ls -la ~/.ssh
        echo
        echo "No Google Cloud você deve colocar sua chave publica (.pub). Ao copiar a chave publica copie apenas o que esta entre os separadores"
        echo
        echo
        echo "===== CHAVE PUBLICA - COMECO - NAO COPIE ESSA LINHA ====="        
        cat .ssh/arquivoschave.pub
        echo "===== CHAVE PUBLICA - FIM - NAO COPIE ESSA LINHA ====="
        echo
        echo
        echo "No Filezilla você deve colocar sua chave privada (arquivo sem extensao). Copie o conteudo dele para um arquivo de texto e salve como chave.ppk no seu computador. "
        echo
        echo
        echo "===== CHAVE PRIVADA - COMECO - NAO COPIE ESSA LINHA ====="        
        cat .ssh/arquivoschave
        echo "===== CHAVE PRIVADA - FIM - NAO COPIE ESSA LINHA ====="        
        echo
        echo
    ;; 
    noip)               
        case "$2" in
            instalar)
              echo "===== Instala NOIP ====="
              sudo apt -y update 
              sudo apt -y upgrade
              sudo apt -y install gcc make
              cd /usr/local/src/
              sudo curl -o noip-duc-linux.tar.gz http://www.noip.com/client/linux/noip-duc-linux.tar.gz
              sudo tar xf noip-duc-linux.tar.gz
              sudo rm noip-duc-linux.tar.gz
              cd noip-2.1.9-1/
              sudo make install
              cd              
            ;;
            start)
              echo "Iniciando o noip2"
              sudo /usr/local/bin/noip2
            ;;
            stop)
              echo "Desligando o noip2"
              for i in `sudo /usr/local/bin/noip2 -S 2>&1 | grep Process     | awk '{print $2}' | tr -d ','`
              do
                sudo /usr/local/bin/noip2 -K $i
              done
            ;; 
            config)
              echo "Tenta configurar o noip2"
              sudo /usr/local/bin/noip2 -C
            ;;  
            status)
                echo "Verificando o noip2"        
                sudo /usr/local/bin/noip2 -S       
            ;;
            *)
            echo "Opcoes: $0 {instalar|start|stop|status|config}"            
            exit 1
        esac
    ;;    
    *)
        echo "Jarbas Versao ${VERSION}"
        echo "Opcoes: $0 {ligar|desligar|forcar|status|chaves|limpar|update|node|suporte|noip}"
        echo "Exemplo de uso: ./jarbas ligar"
        echo
        echo "chaves: Mostra chaves de acesso"
        echo "suporte: Mostra dados da maquina"
        echo "ligar: Inicia o Foundry VTT"
        echo "desligar: Para o Foundry VTT"
        echo "status: Verifica se o Foundry VTT está rodando"
        echo "forcar: Encerra o FVTT, Atualiza o IP (noip), Inicia o FVTT"
        echo "https: Verifica como esta o HTTPS"        
        echo "limpar: Apaga arquivos de log do nohup. Nao mexe nos arquivos de log do foundry vtt."        
        echo "update: atualiza o jarbas."        
        echo "node: atualiza o NODE para a ultima versao LTS (recomendado)."        
        echo "noip: instala e gerencia o noip."        
        exit 1
esac
echo "========================================"
exit 0
#######################################################