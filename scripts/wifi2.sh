mac=$(hcitool con| cut -d " " -f 3 | tail -n 1)
sendToBluetooth=`screen -d -m bluetooth-sendto --device=$mac macs.txt`
echo $sendToBluetooth