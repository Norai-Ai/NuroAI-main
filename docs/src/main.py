import time
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def load_models():
    logging.info("Initializing AI models...")
    time.sleep(2)  # Simulating model loading
    logging.info("AI models loaded successfully.")

def start_nuro_ai():
    logging.info("Welcome to NoraAI!")
    try:
        load_models()
        logging.info("System is ready to drive innovation!")
    except Exception as e:
        logging.error(f"Initialization failed: {e}")

if __name__ == "__main__":
    start_nuro_ai()
