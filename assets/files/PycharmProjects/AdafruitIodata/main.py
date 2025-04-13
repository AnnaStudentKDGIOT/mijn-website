import random
from datetime import datetime
from Adafruit_IO import Client

# Configuration
ADAFRUIT_IO_USERNAME = 'annaJoKDG'
ADAFRUIT_IO_KEY = 'aio_nJKs70zVt3oOt40sHRAeshYUx7yl'
FEED_KEY = 'notiontracker'

# Initialize Adafruit IO client
aio = Client(ADAFRUIT_IO_USERNAME, ADAFRUIT_IO_KEY)



def simulate_data():
    number = random.randint(1, 1000)
    current_time = datetime.now().strftime("%Y-%m-%dT%H:%M:%S")
    value = f"Number: {number}, Time: {current_time}"
    return value

notiontracker_feed = aio.feeds(FEED_KEY)

def send_simulated_data():
    simulated_value = simulate_data()
    aio.send_data(notiontracker_feed.key, simulated_value)
    print(f"Sent data: {simulated_value}")


if __name__ == "__main__":
    send_simulated_data()
