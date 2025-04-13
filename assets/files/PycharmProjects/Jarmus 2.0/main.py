import datetime
import random
import struct


def decimal_to_binary(num):
    if num == 0:
        return "0"
    elif num < 0:
        return "Invalid input: negative number"
    else:
        binary = ""
        while num > 0:
            binary = str(num % 2) + binary
            num //= 2
        return binary


def binary_to_string(string):
    binary_list = []
    for char in string:
        binary_list.append(bin(ord(char))[2:].zfill(8))
    return ''.join(binary_list)


def convert_negative_to_binary(num):
    if num >= 0:
        return bin(num)[2:].zfill(8)  # If num is non-negative, convert it directly to binary

    # For negative numbers, perform two's complement
    positive_num = abs(num) - 1
    binary_repr = bin(positive_num)[2:].zfill(8)
    complement = ''.join('1' if bit == '0' else '0' for bit in binary_repr)
    return complement


def convert_real_to_binary(numbera):
    # Pack the float number into a binary string
    binary_string = struct.pack('!f', numbera)

    # Convert the binary string to binary representation
    binary_repr = ''.join(format(byte, '08b') for byte in binary_string)

    return binary_repr


def chatbot():
    while True:
        user_input = input("Hoe kan ik u helpen?\n")
        if user_input.lower() == "hoe laat is het?":
            current_time = datetime.datetime.now().strftime("%H:%M")
            print("Het is nu " + current_time + ".")
        elif user_input.lower() == "welke dag van de week zijn we vandaag?":
            current_day = datetime.datetime.now().strftime("%A")
            print("Het is vandaag " + current_day + ".")
        elif user_input.lower() == "som":
            total = 0
            while True:
                number = input("Geef een getal in (stop om te stoppen):\n")
                if number.lower() == "stop":
                    break
                total += int(number)

            print("De som van de getallen is " + str(total) + ".")
        elif user_input.lower() == "alarm":
            number = input("Hoe vaak moet ik het alarm laten afgaan?\n")
            message = input("Wat moet ik zeggen wanneer het alarm afgaat?\n")
            for i in range(int(number)):
                print(message)
        elif user_input.lower().startswith("binary"):
            num = user_input.split("binary ")[1]
            binary_repr = decimal_to_binary(int(num))
            print(f"De binaire voorstelling van {num} is {binary_repr}.")
        elif user_input.lower().startswith("binaryStr"):
            letter = input("Please enter the letter you want to convert to binary: ")
            binary_repr = binary_to_string(letter)
            print(f"The binary representation of {letter} is {binary_repr}.")
        elif user_input.lower().startswith("complement"):
            negativenum = input("please enter the negative number you would like to convert to binary")
            binary_repr = convert_negative_to_binary(negativenum)
            print(f" the binary representation of {negativenum} is {binary_repr}")
        elif user_input.lower().startswith("binaryReal"):
            numbera = float(input("Please enter the real number you want to convert to binary: "))
            binary_repr = convert_real_to_binary(numbera)
            print(f"The binary representation of {numbera} is {binary_repr}.")
        elif user_input.lower() == "dobbelsteen":
            roll = random.randint(1, 6)
            print("De dobbelsteen rolde " + str(roll) + ".")
        elif user_input.lower() == "selfdestruct":
            raise Exception("Programma gestopt.")
        else:
            print("Sorry, ik begrijp niet wat je bedoelt.")


chatbot()
