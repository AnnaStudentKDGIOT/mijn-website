# program_3.py
from apgiotboard import TempSensor
import time


def data_save_read():
    """
    Lees de temperatuur en sla op in een bestand.
    Leest het bestand en toont de opgeslagen data.
    """
    temp_sensor = TempSensor()
    try:
        with open("data.txt", "a") as file:
            temperature = temp_sensor.read()
            file.write(f"{temperature}\n")
    except Exception as e:
        print("Error saving data:", e)

    try:
        with open("data.txt", "r") as file:
            data = file.readlines()
            print("Saved temperatures:", data)
    except Exception as e:
        print("Error reading data:", e)
