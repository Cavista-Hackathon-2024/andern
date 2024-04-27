from transformers import pipeline
from typing import Dict, List
from producer import emit_inference_results
import pika
import json


DATA_QUEUE = 'data'
INFERENCE_QUEUE = 'inference'
AMQ_URL = "amqps://msrktgpz:iMlpi5RZKbt7v2JyWjvRBb8fACRz9xhs@gull.rmq.cloudamqp.com/msrktgpz"

def diagnosis(symptom: str, medical_history: List, patient_info: Dict) -> Dict:
    """
    Diagnosis disease from symptoms
    Use Symptom_to_Diagnosis model - a finetuned bert classification model
    Emit inference to message broker

    Returns:
       Model inference
    """
    pipe = pipeline("text-classification", model="Zabihin/Symptom_to_Diagnosis")
    generated_symptom =  generate_prompt(symptom, medical_history, patient_info)
    result = pipe(generated_symptom)

    #Emit message to broker
    emit_inference_results(INFERENCE_QUEUE, result)
    return result


def generate_prompt(symptom: str, medical_history: List, patient_info: Dict) -> str:
    """
    Construct prompt using patient information and medical history

    Return:
        Prompt to use by model in diagnosis function
    """
    formatted_medic_history = ', '.join(medical_history)
    prompt = f"{symptom}, I am {patient_info['age']}, years old, with blood type of {patient_info['bloodType']}, genotype of {patient_info['genoType']}. Previously suffered from {formatted_medic_history}"
    return prompt


def consume_diagnosis():
    # Connect to RabbitMQ broker
    connection = pika.BlockingConnection(pika.URLParameters(AMQ_URL))
    channel = connection.channel()
    # Callback function to handle incoming messages
    def callback(ch, method, properties, body):
        # Decode JSON message
        patient_data = json.loads(body.decode('utf-8'))
        print("Received patient data:", patient_data)

        # Perform inference with your diagnosis model
        diagnosis(patient_data["symptom"], patient_data["medicalHistory"], patient_data["patientInfo"])

    channel.basic_consume(queue=DATA_QUEUE, on_message_callback=callback, auto_ack=True)
    channel.start_consuming()
  
if __name__ == "__main__":
    symptom = "Having severe headache and feel pains in my body"
    medical_history = ["migraine", "malaria"]
    patient_info = {
        "age": 14,
        "bloodType": "O positive",
        "genoType": "A"
    }
    result = diagnosis(symptom, medical_history, patient_info)
    print(result)