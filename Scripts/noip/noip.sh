#######################################################
#! /bin/bash
#version v1.00
echo "========================================"
case "$1" in
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
    status)
        echo "Verificando o noip2"        
        sudo /usr/local/bin/noip2 -S       
    ;;    
    *)
        echo "Opcoes: $0 {start|stop|status}"
        exit 1
esac
echo "========================================"
exit 0
#######################################################