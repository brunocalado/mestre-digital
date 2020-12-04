#######################################################
#! /bin/sh
echo "========================================"
case "$1" in
    start)
        echo "Iniciando o Foundry VTT"
        pm2 start foundry/resources/app/main.js --name fvtt
    ;;
    stop)
        echo "Encerrando o Foundry VTT"
        pm2 stop foundry/resources/app/main.js --name fvtt
    ;;
    status)
        echo "Verificando se o Foundry VTT esta executando"        
        pm2 list all
    ;;  
    version)
        echo "Checagem de Versoes"        
        node --version
        nvm --version
    ;;
    force)
        echo "Encerra o FVTT, Atualiza o IP, Inicia o FVTT"        
        pm2 stop foundry/resources/app/main.js --name fvtt
        sudo /usr/local/bin/noip2
        pm2 start foundry/resources/app/main.js --name fvtt
    ;;    
    *)
        echo "Opcoes: $0 {start|stop|status|version|force}"
        echo "Exemplo de uso: ./jarbas start"
        echo
        echo "start: Inicia o Foundry VTT"
        echo "stop: Para o Foundry VTT"
        echo "status: Verifica se o Foundry VTT está rodando"
        echo "force: Encerra o FVTT, Atualiza o IP (noip), Inicia o FVTT"
        exit 1
esac
echo "========================================"
exit 0
#######################################################