#######################################################
#! /bin/bash
echo "========================================"
case "$1" in
    start)
        echo "Iniciando o Jitsi"
        sudo service jicofo start
        sudo service jitsi-videobridge2 start
        sudo service prosody start                
    ;;
    stop)
        echo "Desligando o jitsi"
        sudo service jicofo stop
        sudo service jitsi-videobridge2 stop
        sudo service prosody stop      
    ;;
    status)
        echo "Verificando o jitsi"        
        sudo service jicofo status
        sudo service jitsi-videobridge2 status
        sudo service prosody status
    ;;    
    restart)
        echo "Reiniciando o jitsi"        
        sudo service jicofo restart
        sudo service jitsi-videobridge2 restart
        sudo service prosody restart
    ;;    
    *)
        echo "Opcoes: $0 {start|stop|status|restart}"
        exit 1
esac
echo "========================================"
exit 0
#######################################################