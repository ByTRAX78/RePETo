// #include <Servo.h>

// Servo servo1;
// Servo servo2;

// void setup() {
//   servo1.attach(4);
//   servo2.attach(5);
//   Serial.begin(9600);
// }

// void loop() {
//   if (Serial.available() > 0) {
//     String comando = Serial.readStringUntil('\n'); // Lee el comando hasta que se reciba un salto de línea
//     if (comando == "accion") {
//       // Ejecutar la acción deseada aquí
//       servo1.write(180);
//       servo2.write(-90);
//       delay(2000);
//       servo1.write(90);
//       servo2.write(90);
//       delay(2000);

//       // Enviar confirmación de que se ha completado la acción
//       Serial.println("Accion completada");
//     }
//   }
// }
