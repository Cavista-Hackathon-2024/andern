import random
import gemini

def get_random_health_tip() -> str:
  """Fetches random general health tips using Gemini and returns a formatted string.

  Returns:
      str: A random general health tip formatted as a sentence.
  """
  # Health tip categories to search for
  categories = ["diet", "exercise", "sleep", "stress management"]
  chosen_category = random.choice(categories)

  # Use Gemini to search for a random health tip in the chosen category
  query = f"general health tips for {chosen_category}"
  response = gemini.query(query)

  # Extract a sentence from the response
  sentences = response.text.split(".")
  random_sentence = random.choice(sentences).strip()

  # Format the tip and return it
  return f"Health Tip: {random_sentence.capitalize()}."

# Example usage
tip = get_random_health_tip()
print(tip)
