import random
import genai
import os

genai.configure(api_key=os.environ["API_KEY"])

#from google.colab import userdata
#genai.configure(api_key=userdata.get('API_KEY'))

QUEUE_NAME = 'health-tips'

def get_random_health_tip() -> str:
    """Fetches random general health tips using Gemini and returns a formatted string.

    Returns:
        str: A random general health tip formatted as a sentence.
    """
    # Health tip categories to search for
    categories = ["diet", "exercise", "sleep", "stress management"]
    chosen_category = random.choice(categories)

    # Use Gemini to search for a random health tip in the chosen category
    query = f"Generate a general health tips for {chosen_category}"
    response = geneai.query(query)

    emit_health_tips(QUEUE_NAME, result)

