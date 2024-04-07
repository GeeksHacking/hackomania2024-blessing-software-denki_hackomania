import serial
import time
import requests

url = "http://18.141.136.158:3001/api/iot/createRecord"
id = "427252"

# make sure the 'COM#' is set according the Windows Device Manager
ser = serial.Serial('COM8', 115200, timeout=1)
time.sleep(2)

while True:
    line = ser.readline()   # read a byte
    if line:
        string = line.decode()  # convert the byte string to a unicode string
        num = int(string) # convert the unicode string to an int
        requests.post(url, {'id': id, 'data': num})
        
