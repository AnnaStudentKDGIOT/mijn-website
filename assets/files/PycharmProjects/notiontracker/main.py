# Adafruit IO configuration
import random
from datetime import datetime, timedelta
from Adafruit_IO import Client
from config import *
from config import NOTION_TOKEN, DATABASE_ID, TELEGRAM_TOKEN, CHAT_ID
import time
import requests
import string

# ADAFRUIT_IO_USERNAME = 'annaJoKDG'
# ADAFRUIT_IO_KEY = 'aio_nJKs70zVt3oOt40sHRAeshYUx7yl'
# FEED_KEY = 'notiontracker'

# Notion API configuration NOTION_TOKEN = 'secret_oxq1E2xXyigkDo4EiDfXoU2b5SwHaZJWeoAkgGyB8Pq' DATABASE_ID =
# 'f9cf9f958c3242739586b5496d6c5ff1'


# Telegram API configuration
# TELEGRAM_TOKEN = '7160986080:AAEhyp_uu6e9gKdsFLcQKco734kp2hzsUSo' #
# CHAT_ID = '5847321993'

# Configuration
# ADAFRUIT_IO_USERNAME = 'annaJoKDG'
# ADAFRUIT_IO_KEY = 'aio_nJKs70zVt3oOt40sHRAeshYUx7yl'
# FEED_KEY = 'notiontracker'

# Initialize Adafruit IO client
aio = Client(ADAFRUIT_IO_USERNAME, ADAFRUIT_IO_KEY)

string.ascii_letters
def simulate_data():
    letter = random.choice(string.ascii_letters)
    number = random.randint(1, 110)
    current_time = datetime.now().strftime("%Y-%m-%dT%H:%M:%S")
    return number, current_time, letter


notiontracker_feed = aio.feeds(FEED_KEY)


def send_simulated_data(simulate_data):
    value = f"Number: {number}, Time: {current_time}"
    aio.send_data(notiontracker_feed.key, value)
    print(f"Sent data: {value}")


if __name__ == "__main__":
    send_simulated_data()


class AdafruitIOBOBO:
    def __init__(self):
        time.sleep(10)
        self.base_url = f'https://io.adafruit.com/api/v2/{ADAFRUIT_IO_USERNAME}/feeds/{FEED_KEY}/data'
        self.headers = {
            'X-AIO-Key': ADAFRUIT_IO_KEY,
            'Content-Type': 'application/json'
        }

    def send_data_to_feed(self, number):
        data = {"value": number}
        response = requests.post(self.base_url, headers=self.headers, json=data)
        self.print_status_code(response.status_code)
        if response.status_code == 201:
            print("Data sent successfully")

    def fetch_data(self, start_time=None, end_time=None):
        params = {}
        if start_time:
            params['start_time'] = start_time
        if end_time:
            params['end_time'] = end_time

        response = requests.get(self.base_url, headers=self.headers, params=params)
        if response.status_code == 200:
            return response.json()
        else:
            print(f"Failed to fetch data: {response.status_code}")
            return []

    @staticmethod
    def print_status_code(status_code):
        print(f"Status Code: {status_code}")


# Usage example
adafruit_io = AdafruitIOBOBO()
number, current_time = simulate_data()
adafruit_io.send_data_to_feed(number)


class Notion:
    def __init__(self):

        self.view_ID = "ce0d2af73f654a2eb75d778518d65358"
        self.endpoint = "https://api.notion.com/v1/pages"
        self.headers = {
            "Authorization": f"Bearer {NOTION_TOKEN}",
            "Content-Type": "application/json",
            "Notion-Version": "2022-06-28"
        }

    def log_data(self, number, timestamp,):
        payload = {
            "parent": {"database_id": DATABASE_ID},
            "properties": {
                "Number": {"number": number},
                "Date": {"date": {"start": timestamp}},
                "Names": {"name": {"name": string}}
            }
        }

        response = requests.post(self.endpoint, headers=self.headers, json=payload)
        if response.status_code == 200:
            print("Data logged to Notion successfully")
        else:
            print(f"Failed to log data to Notion: {response.status_code}")
            print(response.text)


notion = Notion()


def send_notification_if_exceeded():
    if number > 25:
        payload = {
            'chat_id': 5847321993,  # Replace with your actual chat ID
            'text': f"The value  has reached its limit"
        }
        endpoint = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage"
        response = requests.post(endpoint, json=payload)
        if response.status_code == 200:
            print("Notification sent successfully")
        else:
            print(f"Failed to send notification: {response.status_code}")
            print(response.text)


# Example usage:
# send_notification_if_exceeded(115, "This is a test message")


if __name__ == "__main__":
    time.sleep(5)
    adafruit_io = AdafruitIOBOBO()
    notion = Notion()
    last_checked = datetime.now() - timedelta(days=1)
    while True:
        # Simulate and send data to Adafruit.io
        number, timestamp = simulate_data()
        send_notification_if_exceeded()
        adafruit_io.send_data_to_feed(number)
        notion.log_data(number, timestamp)
        # Fetch data from Adafruit.io
        start_time = last_checked.isoformat()
        last_checked = datetime.now()
        data_points = adafruit_io.fetch_data(start_time=start_time)

        # Log each data point to Notion
        for data_point in data_points:
            data_value = data_point['value']
            try:
                number_str = data_value.split(",")[0].split(":")[1].strip()
                number = int(number_str)
            except (IndexError, ValueError):
                print(f"Error parsing value: {data_value}")
                continue

            timestamp = data_point['created_at']
            notion.log_data(number, timestamp)

        time.sleep(15)  # Delay to avoid rapid API calls
