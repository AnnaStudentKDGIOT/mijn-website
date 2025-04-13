import datetime
import random

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
        elif user_input.lower() == "dobbelsteen":
            roll = random.randint(1, 6)
            print("De dobbelsteen rolde " + str(roll) + ".")
        elif user_input.lower() == "selfdestruct":
            raise Exception("Programma gestopt.")
        else:
            print("Sorry, ik begrijp niet wat je bedoelt.")

chatbot()
