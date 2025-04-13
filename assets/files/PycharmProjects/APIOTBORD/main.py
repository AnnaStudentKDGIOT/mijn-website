# main.py
from apgiotboard import LED, Button, Knob, TempSensor
import time
import led_animation
import Function1

# Initialiseer componenten
leds = LED()
button_select = Button(pin=0)  # Select knop
button_start = Button(pin=1)  # Start knop
knob = Knob()
temp_sensor = TempSensor()

# Functies
from program_1 import led_animation
from program_2 import temp_read
from program_3 import data_save_read
from program_4 import interactive_led
from program_5 import countdown_timer

# Programma lijst
programs = [led_animation, temp_read, data_save_read, interactive_led, countdown_timer]
current_program = 0

while True:
    # Toon huidige selectie met LED's
    leds.show_pattern(current_program)
    if button_select.is_pressed():
        current_program = (current_program + 1) % len(programs)
        time.sleep(0.2)  # Debounce
    if button_start.is_pressed():
        programs[current_program]()  # Start geselecteerd programma
