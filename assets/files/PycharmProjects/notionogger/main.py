import requests
import random
from datetime import datetime

# Function to generate a random letter


class NotionBOBO:
    def __init__(self, notion_token, database_id, view_id=None):
        self.notion_token = notion_token
        self.database_id = database_id
        self.view_id = view_id  # Storing view_id if it needs to be used later for other purposes
        self.endpoint = "https://api.notion.com/v1/pages"
        self.headers = {
            "Authorization": f"Bearer {self.notion_token}",
            "Content-Type": "application/json",
            "Notion-Version": "2022-06-28"
        }

    def update_page_properties(self):
        current_date = datetime.now().strftime("%Y-%m-%d")
        random_number = random.randint(1, 100)


        data_to_update = {
            "Value": {
                "type": "number",
                "number": random_number
            },
            "Timestamp": {
                "type": "date",
                "date": {"start": current_date}
            }
            }


        return data_to_update

    def send_to_notion(self, data):
        payload = {
            "parent": {
                "type": "database_id",
                "database_id": self.database_id
            },
            "properties": data
        }

        response = requests.post(self.endpoint, headers=self.headers, json=payload)

        if response.status_code == 200:
            print("Data sent to Notion successfully")
        else:
            print(f"Failed to send data to Notion: {response.status_code}")
            print(response.text)

# Usage example
notion_token = "secret_diMOKnlkB7nbZrgK346nEeImgRzJdxcexGXXEz4aJKk"
database_id = "32792511c3a14eb2ad05ddea480a6b79"
view_id = "2c994287874e45b98381bcfb572e0624"  # This can be passed if needed for later use

notion_bobo = NotionBOBO(notion_token, database_id, view_id)
data_to_update = notion_bobo.update_page_properties()
notion_bobo.send_to_notion(data_to_update)
