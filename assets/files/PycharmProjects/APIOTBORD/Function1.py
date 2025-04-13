# program_1.py
from apgiotboard import LED
import time

def led_animation():
    """
    LED-animatie die een lopend licht-patroon weergeeft.
    Doel: Test de LED's en geef een visueel aantrekkelijk effect.
    """
    leds = LED()
    while True:
        for i in range(4):  # Aantal LED's
            leds.on(i)
            time.sleep(0.1)
            leds.off(i)
        if stop_condition():  # Controleer op knopdruk om te stoppen
            break
