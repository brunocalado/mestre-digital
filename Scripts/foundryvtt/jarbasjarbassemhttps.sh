#######################################################
#! /bin/sh
VERSION="v1.01"
echo "========================================"
case "$1" in
    ligar)
        echo "Iniciando o Foundry VTT"
        echo "Pressione enter para continuar." 
        mkdir -p log
        mv nohup.out 
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
        rm nohup.out        
        nohup ./foundry/resources/app/main.js &
        echo "Pressione enter para continuar." 
    ;;    
    suporte)
        echo "Dados da Maquina"        
        cat dadossuporte
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
    *)
        echo "Jarbas Versao ${VERSION}"
        echo "Opcoes: $0 {start|stop|status|version|force|chaves|https}"
        echo "Exemplo de uso: ./jarbas start"
        echo
        echo "chaves: Mostra chaves de acesso"
        echo "suporte: Mostra dados da maquina"
        echo "ligar: Inicia o Foundry VTT"
        echo "desligar: Para o Foundry VTT"
        echo "status: Verifica se o Foundry VTT está rodando"
        echo "forcar: Encerra o FVTT e Inicia o FVTT"        
        exit 1
esac
echo "========================================"
exit 0
#######################################################