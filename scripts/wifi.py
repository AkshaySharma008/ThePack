import os
os.system("./wifi1.sh")
import pandas as pd
df = pd.read_csv("airodump_csv/wifi-01.csv")
df.columns = [
    "BSSID", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N",
    "O"
]
df = df.iloc[1:, :]
df = df.iloc[:, 0:1]
df.dropna(inplace=True)
df = df[df["BSSID"] != "Station MAC"]
values = df["BSSID"].values
sms = ""
for i in values:
    sms += str(i) + ","

os.system("cd airodump_csv")
os.system("touch macs.txt")
os.system('echo ' + sms + ' > macs.txt')
os.system("./wifi2.sh")