import random
import google.generativeai as genai
import os
from producer import emit_health_tips

#genai.configure(api_key=os.environ["API_KEY"])

from google.colab import userdata
genai.configure(api_key=userdata.get('API_KEY'))

def get_random_health_tip():
    """Fetches random general health tips using Gemini and returns a formatted string.

    Returns:
        str: A random general health tip formatted as a sentence.
    """
    # Health tip categories to search for
    categories = ["diet", "exercise", "sleep", "stress management"]
    chosen_category = random.choice(categories)

    # Use Gemini to search for a random health tip in the chosen category
    query = f"Generate a general health tips for {chosen_category} in 500 characters. Give a good title"
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content(query)
    result = response.text.replace("*", "")
    emit_health_tips(QUEUE_NAME, result)

