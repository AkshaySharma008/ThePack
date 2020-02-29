#!/bin/bash 
sudo apt-get install aircrack-ng
sudo airmon-ng check kill
sudo airmon-ng start wlo1
cd airodump_csv
rm -rf wifi-01.csv
cd ..
sudo screen -d -m airodump-ng wlo1mon -w wifi --output-format csv
sleep 10
sudo airmon-ng check kill
sudo airmon-ng stop wlo1mon
sudo service network-manager restart
mv wifi-01.csv airodump_csv