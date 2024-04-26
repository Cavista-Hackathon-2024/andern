import json
import schedule
import threading
import time
from .health_tips import get_random_health_tip
from .diagnosis import consume_diagnosis


# Schedule the health tip generator to run every 3 hours
def schedule_health_tip_generator():
    while True:
        schedule.run_pending()
        time.sleep(1)

if __name__ == '__main__':
    # Start a background thread for consuming diagnosis data from RabbitMQ
    diagnosis_thread = threading.Thread(target=consume_diagnosis)
    diagnosis_thread.start()

    # Start a background thread for scheduling the health tip generator
    schedule.every(3).hours.do(get_random_health_tip)
    scheduler_thread = threading.Thread(target=schedule_health_tip_generator)
    scheduler_thread.start()

    # Run indefinitely to keep the application running
    while True:
        time.sleep(1)
