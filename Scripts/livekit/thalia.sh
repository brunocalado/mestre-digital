#######################################################
## thalia Oracle Cloud - livekit assistant ############
#! /bin/sh
VERSION="v1.09"
echo "========================================"
case "$1" in
    updatesystem)
      echo "== The system will be updated =="
      echo "After update the system will reboot. You will need to connect again."
      read -p "Press any key to continue or Control + C to abort this update."
      sudo apt update && sudo apt -y upgrade
      sudo reboot
    ;;
    updatethalia)
      echo "== thalia will be updated =="
      rm thalia
      curl -H 'Cache-Control: no-cache' -o thalia https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Scripts/livekit/thalia.sh?$(date +%s)
      chmod +x thalia
    ;;    
    start)
      echo "Starting Livekit"                
      sudo systemctl start livekit-docker
    ;;
    stop)
      echo "Stopping Livekit"                
      sudo systemctl stop livekit-docker
    ;;    
    restart)
      echo "Restarting Livekit"                
      sudo systemctl restart livekit-docker
    ;;       
    status)
      systemctl status livekit-docker
    ;;      
    version)
        echo "== Version =="        
        echo "$(~/livekit/bin/livekit-server --version)"
        echo "thalia: ${VERSION}"
        echo "OS: $(cat /etc/os-release | grep PRETTY_NAME)"
        echo
        cd /opt/livekit;
        sudo docker-compose logs | grep livekit-livekit | grep version
    ;;
    support)
        echo "== Machine Data =="        
        echo "IP: " $(curl -s ifconfig.me)         
        echo 
        echo "== Disk Space =="        
        df -h /dev/sda1
        echo
        echo "== RAM =="        
        free -mh        
        echo
        echo "== CPU =="        
        lscpu | egrep 'Model name|Socket|Thread|NUMA|CPU\(s\)'
        echo
        echo "== Firewall (should be: inactive) =="        
        sudo ufw status
        echo                
    ;;
    admin)               
        case "$2" in
            installdocker)
              echo "== Install Docker =="
              echo "This will reboot the system. You will need to connect again."
              read -p "Press any key to continue or press Control + C to abort."
              sudo apt update && sudo apt -y upgrade
              sudo apt -y install docker.io
              echo "This will reboot the system. You will need to connect again."
              echo
              sudo reboot
            ;;
            installlivekit)
              echo "== Install Livekit Installer =="
              sudo docker run --rm -it -v$PWD:/output livekit/generate
              echo
              echo "================================"
              echo "You need to enter the folder created by this script. It's the same name of your domain. Type ls to check it out."
              echo "After that run the following commands:"
              echo "sudo chmod +x init_script.sh"
              echo "sudo ./init_script.sh"
              echo "================================"
            ;;            
            iptablessetup)
              echo "== IP Tables Setup =="
              sudo iptables -I INPUT 6 -m state --state NEW -p tcp --match multiport --dports 80,443,7881,7880 -j ACCEPT
              sudo iptables -I INPUT 6 -m state --state NEW -p udp --match multiport --dports 443,7882,50000:60000 -j ACCEPT              
              sudo netfilter-persistent save
            ;;
            iptablesshow)
              echo "== IP Tables =="
              sudo iptables -L
            ;;              
            iptablesflush)
              echo "== Flush IP Tables =="
              echo "Test purposes only."
              sudo iptables --flush
            ;;  
            upgrade)
              echo "----------------------------------------"
              echo "The file docker-compose.yaml must have the image field set to livekit/livekit-server:latest to this work."
              echo "You can access the docker-compose.yaml inside your domain folder."              
              echo "----------------------------------------"
              ./thalia stop
              sudo docker pull livekit/livekit-server
              ./thalia start
            ;;              
            *)
            echo "Options: $0 {installdocker|installlivekit|iptablessetup|iptablesshow|iptablesflush|upgrade}"
            echo
            echo "- installdocker: install docker"  
            echo "- installlivekit: install livekit"  
            echo "- iptablessetup: set iptables to livekit"  
            echo "- iptablesshow: show iptables"  
            echo "- iptablesflush: "  
            echo "- upgrade: update livekit to last version"  
            echo
            exit 1            
        esac
    ;;  
    logs)
      cd /opt/livekit
      sudo docker-compose logs            
      echo "=========================="
      echo "You can do this going to cd /opt/livekit and typing sudo less docker-compose logs"
      echo "This will show the logs. You need to grep or less to read the data."
    ;;    
    connectiontest)
      echo "You can go to https://livekit.io/connection-test and test"
    ;;            
    swap)               
        case "$2" in
            status)
              echo "== Status =="
              free -mh | grep Swap
            ;;
            activate)
              echo "Creating SWAP. Wait! ETA: 5 minutes."
              sudo dd if=/dev/zero of=/swapfile count=2048 bs=1M
              sudo chmod 600 /swapfile
              sudo mkswap /swapfile
              sudo swapon /swapfile
              echo '/swapfile   none    swap    sw    0   0' | sudo tee -a /etc/fstab
            ;;        
            *)
            echo "Options: $0 {status|activate}"            
            echo "Example: ./thalia swap status"
            echo
            echo "- status: swap status"  
            echo "- activate: Create swap."  
            echo
            exit 1
        esac
    ;;
    *)
        echo "thalia ${VERSION}" 
        echo "Options:"
        echo "Example: ./thalia start"
        echo
        echo "- updatesystem: this will update the os and packages"     
        echo "- updatethalia: this will update thalia"     
        echo "- start: start livekit"     
        echo "- stop: stop livekit"     
        echo "- restart: restart livekit"  
        echo "- status: show livekit status"  
        echo "- logs: show livekit logs"          
        echo "- version: show version"     
        echo "- support: show system information"             
        echo "- admin: livekit installation and configuration"                     
        echo "- swap: install and configuration swap"                             
        echo "- connectiontest: show link to test your server"                                     
        echo
        exit 1
esac
echo "========================================"
exit 0
#######################################################