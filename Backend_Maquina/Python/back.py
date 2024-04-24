import base64
import re
import cv2
import serial
import time
import base64
import numpy as np
import vertexai
from vertexai.generative_models import GenerativeModel, Part
import requests
import json

# Crear una captura de video
cap = cv2.VideoCapture("http://192.168.190.67:8080/video") #Camara seleccionada

# Leer un fotograma
ret, frame = cap.read()

# Liberar la captura de video
cap.release()

# Mostrar la imagen
cv2.imshow("Imagen", frame)
cv2.waitKey(0)
cv2.destroyAllWindows()
# Convertir la imagen a formato JPEG
jpg_data = cv2.imencode('.jpg', frame)[1].tobytes()

# Guardar la imagen en un archivo
with open("imagen.jpg", "wb") as f:
  f.write(jpg_data)
  
def activar_servo():
        # Configuración de la comunicación serial
    arduino_port = 'COM3'  # Cambiar a tu puerto serial
    baud_rate = 9600

    # Iniciar la comunicación serial
    arduino = serial.Serial(arduino_port, baud_rate)
    time.sleep(2)  # Esperar a que Arduino se inicialice

    # Enviar comando "accion" al Arduino
    comando = 'accion\n'
    arduino.write(comando.encode())

    # Leer respuesta del Arduino
    respuesta = arduino.readline().decode().strip()
    # print("Respuesta del Arduino:", respuesta)

    # Cerrar la conexión serial
    arduino.close()




def generate_text(project_id: str, location: str) -> str:
    # Initialize Vertex AI
    vertexai.init(project=project_id, location=location)

    # Load the model
    model = GenerativeModel("gemini-1.0-pro-vision")

    # Load example image from local storage
    encoded_image = base64.b64encode(open("imagen.jpg", "rb").read()).decode("utf-8")
    image_content = Part.from_data(
        data=base64.b64decode(encoded_image), mime_type="image/jpeg"
    )

    # Generation Config
    config = {"max_output_tokens": 2048, "temperature": 0.4, "top_p": 1, "top_k": 32}

    # Generate text
    response = model.generate_content(
        [image_content, "Quiero que me contestes 3 cosas acerca de la imagen y damelo en salto de lineas. Esto es una botella? Si es efectivamente una botella, dime si es plastico la botella? y tambien dime si tiene liquido en su contenido o no?No importa si tiene gotas adentro de liquido, solo me interesa si tiene liquido y esta más de la mitad de la botella. Dime si, si o no y el por que. Si no llega a ser así, dime que es lo ves ves en la imagen y externamelo en otro salto de linea"], generation_config=config
    )
    
    paragraphs = response.text.split('\n')
    return   paragraphs              #' '.join(paragraphs) # Unir los párrafos en una sola cadena

texto = generate_text("repeto-419218", "us-central1")
print(texto)
# Inicializar una lista vacía para almacenar los resultados


# Aplicar re.findall() a todo el texto y agregar los resultados a la lista 'resultados'


def es_botella():
    return len(re.findall(r"Si", texto[0]))

def es_plastico():
    return len(re.findall(r"Si", texto[1]))

def no_tiene_agua():
    return len(re.findall(r"No", texto[2]))

def errorer_botella():
    # No es necesario crear un arreglo aquí, simplemente retornar un mensaje
    return "Error en la función errorer_botella"



if es_botella() == 1 and es_plastico() == 1 and no_tiene_agua() == 1:
        print("Botella ingresada correctamente")
        activar_servo()
        url = "http://192.168.190.68:3000/api/recic_maquina/agregar"

        payload = json.dumps({
        "Maquina": "62616c5a-babe-49fa-b1a0-e6206b8ee911"
        })
        headers = {
        'Content-Type': 'application/json'
        }
        
        response = requests.request("POST", url, headers=headers, data=payload)
        print(response.text)
        
elif es_botella() == 1 and es_plastico() == 1 and no_tiene_agua() == 0:
        print("Retira el agua de la botella")
elif es_botella() == 1 and es_plastico() == 0 and no_tiene_agua() == 0 or no_tiene_agua() == 1:
        print("La botella no es de plástico, verificala, parece ser que " + texto[len(texto)-1])
            
else:
    
        print("La botella no cumple ninguna condición especificada" + texto[len(texto)-1])



