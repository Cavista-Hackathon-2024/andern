import pika
import json

# Connect to RabbitMQ broker
connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()


# Function to emit inference results
def emit_inference_results(queue_name, result):
    # Declare a queue
    channel.queue_declare(queue=queue_name, durable=True)

    # Convert result to JSON format
    inference_json = json.dumps(result)
    
    # Publish inference result to the queue
     channel.basic_publish(
        exchange="",
        routing_key=queue_name,
        body=inference_json,
        properties=pika.BasicProperties(
            delivery_mode=2,  # make message persistent
        ),
      )
    print("Inference result emitted:", inference_json)


def emit_health_tips(queue_name, result):
    # Declare a queue
    channel.queue_declare(queue=queue_name, durable=True)
    # Convert result to JSON format
    result_json = json.dumps(result)
    
    # Publish generated health tips to the queue
     # Publish the message
    channel.basic_publish(
        exchange="",
        routing_key=queue_name,
        body=result_json,
        properties=pika.BasicProperties(
            delivery_mode=2,  # make message persistent
        ),
      )
    print("Health tips emitted:", result_json)

# Close connection
connection.close()
