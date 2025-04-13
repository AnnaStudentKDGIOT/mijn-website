import requests
from canvasapi import canvas
 API_URL = 'https://canvas.instructure.com/api/v1/'
 ACCESS_TOKEN = 'your_access_token_here'  # Replace with your Canvas access token

canvas = Canvas(API_URL,ACCESS_TOKEN)






# Example usage
course_id = 123
assignment_id = 456
submission_id = 789

submission_info = get_submission_with_assessment(course_id, assignment_id, submission_id)
print(submission_info)









