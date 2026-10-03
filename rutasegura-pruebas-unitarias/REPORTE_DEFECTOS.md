# Reporte de defectos — RutaSegura

Integrantes:
-
-

Reporten aquí cada prueba que falla porque el código no cumple la especificación. Copien el bloque por cada defecto.

---

Defecto 1: Cálculo erróneo de tiempo (Módulo ETA)

    Regla incumplida: RN-01

    Entradas usadas: Velocidad 40, distancia 10, factor de tráfico 1.5.

    Resultado esperado: 23 minutos.

    Resultado obtenido: 10 minutos.

    Severidad: Alta.

    Falla visible para el usuario: El acudiente verá en su app que el bus llegará en menos de la mitad del tiempo real, haciéndolo salir a esperar a la calle demasiado temprano. El desarrollador omitió multiplicar por el factor de tráfico o por los 60 minutos en la fórmula.

Defecto 2: Límite de coordenadas incorrecto (Módulo Validaciones)

    Regla incumplida: RN-06

    Entradas usadas: Latitud 90, Longitud 180.

    Resultado esperado: true (válido).

    Resultado obtenido: false (inválido).

    Severidad: Alta.

    Falla visible para el usuario: Si un bus llega a los límites geográficos válidos, el sistema descartará su ubicación como errónea y el bus desaparecerá del mapa. El desarrollador usó < en lugar de <= en la condición.

Defecto 3: Nivel de alerta desfasado (Módulo Alertas)

    Regla incumplida: RN-08

    Entradas usadas: 15 minutos de retraso.

    Resultado esperado: Nivel de alerta LEVE.

    Resultado obtenido: Nivel de alerta GRAVE.

    Severidad: Media.

    Falla visible para el usuario: Se disparará una alerta grave a la coordinación del colegio de forma prematura. El desarrollador no incluyó el número 15 dentro de la partición de equivalencia correcta.

---
