#######################################################
#! /bin/sh
echo "========================================"
case "$1" in
    start)
        echo "Iniciando o Foundry VTT"
        sudo /usr/local/bin/noip2                
    ;;
    stop)
        echo "Encerrando o Foundry VTT"
        for i in `sudo /usr/local/bin/noip2 -S 2>&1 | grep Process     | awk '{print $2}' | tr -d ','`
        do
          sudo /usr/local/bin/noip2 -K $i
        done
    ;;
    status)
        echo "Verificando se o Foundry VTT esta executando"        
        sudo /usr/local/bin/noip2 -S       
    ;;    
    *)
        echo "Opcoes: $0 {start|stop|status}"
        exit 1
esac
echo "========================================"
exit 0
#######################################################