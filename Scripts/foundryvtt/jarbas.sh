#######################################################
#! /bin/sh
VERSION="v1.00"
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
    chaves)
        echo "Chaves localizadas"        
        ls -la ~/.ssh
        echo "No Google Cloud você deve colocar sua chave publica (.pub). Ao copiar a chave publica copie apenas o que esta entre os separadores"
        echo "===== CHAVE PUBLICA - NAO COPIE ESSA LINHA ====="        
        cat .ssh/arquivoschave.pub
        echo "===== CHAVE PUBLICA - NAO COPIE ESSA LINHA ====="
        echo "No Filezilla você deve colocar sua chave privada (arquivo sem extensao). Copie o conteudo dele para um arquivo de texto e salve como chave.ppk no seu computador. "
        echo "===== CHAVE PRIVADA - NAO COPIE ESSA LINHA ====="        
        cat .ssh/arquivoschave
        echo "===== CHAVE PRIVADA - NAO COPIE ESSA LINHA ====="        
    ;;        
    *)
        echo "Jarbas Versao ${VERSION}"
        echo "Opcoes: $0 {start|stop|status|version|force|chaves}"
        echo "Exemplo de uso: ./jarbas start"
        echo
        echo "chaves: Mostra chaves de acesso"
        echo "start: Inicia o Foundry VTT"
        echo "stop: Para o Foundry VTT"
        echo "status: Verifica se o Foundry VTT está rodando"
        echo "force: Encerra o FVTT, Atualiza o IP (noip), Inicia o FVTT"
        exit 1
esac
echo "========================================"
exit 0
#######################################################