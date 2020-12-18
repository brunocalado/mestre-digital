#######################################################
#! /bin/sh
VERSION="v1.00"
echo "========================================"
case "$1" in
    ligar)
        echo "Iniciando o Foundry VTT"
        echo "Pressione enter para continuar." 
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
        echo "Se 'node' aparecer, o Foundry estara rodando:"
        pgrep -f node
    ;;  
    versao)
        echo "Checagem de Versoes"        
        node --version        
    ;;
    forcar)
        echo "Encerra o FVTT, Atualiza o IP, Inicia o FVTT"        
        pkill node
        sudo /usr/local/bin/noip2
        echo "Pressione enter para continuar." 
        nohup ./foundry/resources/app/main.js &
    ;;    
    suporte)
        echo "Dados da Maquina"        
        cat dadossuporte
    ;;    
    chaves)
        echo "Chaves localizadas"        
        ls -la ~/.ssh
        echo "No Google Cloud você deve colocar sua chave publica (.pub). Ao copiar a chave publica copie apenas o que esta entre os separadores"
        echo "===== CHAVE PUBLICA - COMECO - NAO COPIE ESSA LINHA ====="        
        cat .ssh/arquivoschave.pub
        echo "===== CHAVE PUBLICA - FIM - NAO COPIE ESSA LINHA ====="
        echo "No Filezilla você deve colocar sua chave privada (arquivo sem extensao). Copie o conteudo dele para um arquivo de texto e salve como chave.ppk no seu computador. "
        echo "===== CHAVE PRIVADA - COMECO - NAO COPIE ESSA LINHA ====="        
        cat .ssh/arquivoschave
        echo "===== CHAVE PRIVADA - FIM - NAO COPIE ESSA LINHA ====="        
    ;;        
    *)
        echo "Jarbas Versao ${VERSION}"
        echo "Opcoes: $0 {start|stop|status|version|force|chaves}"
        echo "Exemplo de uso: ./jarbas start"
        echo
        echo "chaves: Mostra chaves de acesso"
        echo "suporte: Mostra dados da maquina"
        echo "ligar: Inicia o Foundry VTT"
        echo "desligar: Para o Foundry VTT"
        echo "status: Verifica se o Foundry VTT está rodando"
        echo "forcar: Encerra o FVTT, Atualiza o IP (noip), Inicia o FVTT"
        exit 1
esac
echo "========================================"
exit 0
#######################################################