from transformers import pipeline
from typing import Dict, List
from .broker import emit_inference_results

QUEUE_NAME = 'inference'

def diagnosis(symptom: str, medic_history: List, patient_info: Dict) -> Dict:
    """
    Diagnosis disease from symptoms
    Use Symptom_to_Diagnosis model - a finetuned bert classification model
    Emit inference to message broker

    Returns:
       Model inference
    """
    pipe = pipeline("text-classification", model="Zabihin/Symptom_to_Diagnosis")
    generated_symptom =  generate_prompt(symptom, medic_history, patient_info)
    result = pipe(symptom)

    #Emit message to broker
    emit_inference_results(QUEUE_NAME, result)
    return result


def generate_prompt(symptom: str, medic_history: List, patient_info: Dict) -> str:
    """
    Construct prompt using patient information and medical history

    Return:
        Prompt to use by model in diagnosis function
    """
    prompt = f"{symptom}, I am {patient_info['age']}, years old, with blood group of {patient_info['bloodGroup']}, my blood type is {patient_info['bloodType']} "
    return prompt


def consume_diagnosis():
    # Connect to RabbitMQ broker
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()
    # Callback function to handle incoming messages
    def callback(ch, method, properties, body):
        # Decode JSON message
        patient_data = json.loads(body.decode('utf-8'))
        print("Received patient data:", patient_data)

        # Perform inference with your diagnosis model
        inference_result = diagnosis(patient_data[symptom], patient_data["medic_history"], patient_data["patient_info"])

    channel.basic_consume(queue=QUEUE_NAME, on_message_callback=callback, auto_ack=True)
    channel.start_consuming()
  
if __name__ == "__main__":
    symptom = "Having severe headache and feel pains in my body"
    medic_history = ["migraine", "malaria"]
    patient_info = {
        "age": 14,
        "bloodGroup": "A",
        "bloodType": "O positive"
    }
    result = diagnosis(symptom, medic_history, patient_info)
    print(result)