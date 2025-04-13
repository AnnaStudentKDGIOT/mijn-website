"""Module for using the AP Graduate IoT board in a more userfriendly way.
Hardware:
GPIO  Hardware
2-9   led1-led8
10    button 2
14-21 digit display
22    button 1
25    led0 (on raspberry pi)

ADC   Hardware
4     temperature sensor (on raspberry pi)
28    dial
"""
from machine import Pin


MAXLED=8 # constant indicating the highest led number


def led(n):
    """Return the led on pin number n."""
    return Pin(n, Pin.OUT)

# The led display has 7 segments, named A -> G and a decimal point (DP)
#    ___
#  F| A |B
#   |___|
#   | G |
#  E|___|C .DP
#     D

# Pin numbers for the 7 segments and decimal point
# (Pin 14 = segment A, Pin 15 = segment B, Pin 16 = segment C, ...)
seg7leds = range(14, 22)

# The following lists contain the leds needed to show each number.
digits = [
    list(range(14, 20)),        # 0
    [15, 16],                   # 1
    [14, 15, 17, 18, 20],       # 2
    [14, 15, 16, 17, 20],       # 3
    [15, 16, 19, 20],           # 4
    [14, 16, 17, 19, 20],       # 5
    [14, 16, 17, 18, 19, 20],   # 6
    [14, 15, 16],               # 7
    list(range(14, 21)),        # 8
    [14, 15, 16, 17, 19, 20]    # 9
]

seg7leds = range(14, 22)
from machine import Pin
led = Pin(seg7leds, Pin.OUT)
led.off()


from machine import Pin
led = Pin(seg7leds, Pin.OUT)
led20 = Pin(20, Pin.OUT)
    led.off()
    led20.on()


input = range(1, 10)
