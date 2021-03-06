#!/bin/bash

if [ $1 ]; then
  USER="foundry"
  PASSWORD=$1
  
  CONTAUSUARIO=$(head -n 1 contausuario)
  
  DOMINIO=$(head -n 1 dominio)  
  export JITSI_DOMAIN=$DOMINIO  

curl  https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Scripts/jitsi/apeunit.test-config.js -s | \
sed  "s/apeunit.test/$JITSI_DOMAIN/g" \
> /etc/jitsi/meet/$JITSI_DOMAIN-config.js

curl https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Scripts/jitsi/apeunit.test.cfg.lua -s | \
sed  "s/apeunit.test/$JITSI_DOMAIN/g" | \
sed  "s/JICOFO_SECRET/$(grep -e '^JICOFO_SECRET=.*' /etc/jitsi/jicofo/config | cut -d '=' -f2)/g" | \
sed  "s/TURN_SECRET/$(< /dev/urandom tr -dc _A-Z-a-z-0-9 | head -c${1:-8})/g" \
> /etc/prosody/conf.avail/$JITSI_DOMAIN.cfg.lua


echo "org.jitsi.jicofo.auth.URL=XMPP:$JITSI_DOMAIN" \
>> /etc/jitsi/jicofo/sip-communicator.properties

  prosodyctl register $USER $JITSI_DOMAIN $PASSWORD  
  
  touch DadosJitsi
  echo "===================" > DadosJitsi
  echo "Usuario e Senha da Conta Jitsi" >> DadosJitsi  
  echo "Endereco: ${JITSI_DOMAIN}" >> DadosJitsi
  echo "Usuario: ${USER}" >> DadosJitsi
  echo "Senha: ${PASSWORD}" >> DadosJitsi
  echo "===================" >> DadosJitsi
  cat DadosJitsi
  chown $CONTAUSUARIO.$CONTAUSUARIO DadosJitsi

  service jicofo restart
  service jitsi-videobridge2 restart
  service prosody restart
else
  echo "Defina a senha"
fi

