#!/bin/sh

if [ $1 ]; then
  USER="foundry"
  PASSWORD=$1

  read -r CONTAUSUARIO<contausuario

  read -r DOMINIO<dominio
  export JITSI_DOMAIN=DOMINIO

  echo $DOMINIO

  curl  https://gist.githubusercontent.com/noandrea/5ff6b212273af95103996c0e71f0cdf2/raw/22965f246c59bc149245554b6079db97794425bd/apeunit.test-config.js -s | \
  sed  "s/apeunit.test/$JITSI_DOMAIN/g" \
  > /etc/jitsi/meet/$JITSI_DOMAIN-config.js

  curl https://gist.githubusercontent.com/noandrea/5ff6b212273af95103996c0e71f0cdf2/raw/bb3e8a65582882dd3aeb4624d2522b244b949855/apeunit.test.cfg.lua -s | \
  sed  "s/apeunit.test/$JITSI_DOMAIN/g" | \
  sed  "s/JICOFO_SECRET/$(grep -e '^JICOFO_SECRET=.*' /etc/jitsi/jicofo/config | cut -d '=' -f2)/g" | \
  sed  "s/TURN_SECRET/$(< /dev/urandom tr -dc _A-Z-a-z-0-9 | head -c${1:-8})/g" \
  > /etc/prosody/conf.avail/$JITSI_DOMAIN.cfg.lua

  echo "org.jitsi.jicofo.auth.URL=XMPP:$JITSI_DOMAIN" \
  >> /etc/jitsi/jicofo/sip-communicator.properties

  prosodyctl register $USER $JITSI_DOMAIN $PASSWORD
  
  touch DadosJitsi
  echo "Usuario e Senha da Conta Jitsi" >> DadosJitsi
  echo "Usuario: ${USER}" >> DadosJitsi
  echo "Senha: ${PASSWORD}" >> DadosJitsi
  chown $CONTAUSUARIO.$CONTAUSUARIO DadosJitsi
  
  service jicofo restart
  service jitsi-videobridge2 restart
  service prosody restart
else
  echo "Defina a senha"
fi

