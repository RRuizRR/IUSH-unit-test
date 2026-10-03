# Respuestas del taller — RutaSegura

Integrantes:
- Samuel Ruiz

## Ejercicio 1 — Diseño de casos (RN-01 a RN-04)

| Regla | Entradas (velocidad, distancia, factor) | Resultado esperado (calculado a mano) | Tipo (feliz / límite / error) |
|---|---|---|---|
| RN-01 | vel: 40, dist: 10, factor: 1.5 | 23 | feliz |
| RN-02 | vel: 0, dist: 10, factor: 1.0 | null | error |
| RN-02 | vel: 40, dist: 0, factor: 1.0 | 0 | límite |
| RN-03 | vel: -10, dist: 10, factor: 1.0 | RangeError | error |
| RN-04 | vel: 40, dist: 10, factor: 3.0 | 45 | límite |
| RN-04 | vel: 40, dist: 10, factor: 3.1 | RangeError | error |

## Preguntas

Respondan cada pregunta con base en SUS pruebas (citen el nombre del `it` cuando aplique). Respuestas genéricas copiadas de internet no suman puntos.

**1.** Para `calcularMinutosEstimados`, ¿qué valores de entrada escogieron para el caso feliz y por qué esos y no otros? ¿Qué demuestra esa prueba y qué NO demuestra?

R// Elegi los valores velocidad = 40, distancia = 10 y factorTrafico = 1.5 en la prueba calcularMinutosEstimados_conDatosValidos_debeRetornarMinutos. Ya que estos valores representan un escenario realista sin tocar los límites de las reglas (no usamos velocidad 0 ni factor 1.0). Esta prueba demuestra que el flujo principal y la fórmula matemática de la regla RN-01 funcionan correctamente. NO demuestra cómo reacciona el sistema ante valores negativos (RN-03) o tráfico fuera de rango (RN-04).

**2.** Tomen su prueba de caso feliz de RN-01 y cambien únicamente el dato `factorTrafico` a `1.0` (ajustando el valor esperado según la fórmula). ¿Cambia el resultado de la prueba (pasa / falla)? ¿Qué les enseña esto sobre la selección de datos de prueba?

R// Sí, la prueba falla porque al cambiar el factor a 1.0, el cálculo manual cambia a (10 / 40) * 60 * 1.0 = 15, mientras que el resultado esperado en el "Assert" seguía siendo 23. Esto nos enseña que las pruebas son altamente sensibles a los datos de entrada; si un parámetro cambia, el resultado esperado debe recalcularse, confirmando que la prueba valida correctamente la fórmula y no un valor estático.

**3.** En RN-06 y RN-08, ¿por qué probaron exactamente los valores límite (90, -90, 5, 15, etc.) y no solo valores "del medio" como 45 o 10? Expliquen con el resultado que obtuvieron.

R// La regla RN-06 exige que la latitud esté en [-90, 90], incluyendo los límites. Probar los bordes exactos (90 y -90) y un valor justo por fuera (ej. 91) en las pruebas validarCoordenadas_conLatitudLimite_debeRetornarTrue asegura que el desarrollador usó correctamente los operadores <= y >=. Si probáramos solo el 45, la prueba pasaría incluso si el desarrollador equivocadamente usó < en lugar de <=, ocultando un defecto crítico en las fronteras de los mapas.

**4.** Una prueba que pasa, ¿demuestra que la función es correcta? Argumenten usando un ejemplo real de su suite.

R// No necesariamente. Una prueba que pasa demuestra que el código cumple con lo que esa prueba en particular le exige. Por ejemplo, en la regla RN-01, si mi prueba espera 22.5 en lugar de 23 (olvidando que el README dice "redondeado hacia arriba"), y la prueba pasa, significa que el código fuente también tiene el error de no redondear. La prueba está "verde", pero la función es incorrecta frente al negocio.

**5.** En `NotificadorAcudientes`, ¿por qué usaron un mock en lugar del proveedor real de SMS? ¿Qué verifica `toHaveBeenCalledWith` que no verifica el valor de retorno de la función?

R// Usamos un mock en las pruebas de RN-10 a RN-13 porque las pruebas unitarias no deben conectarse a servicios externos que consumen tiempo y dinero real (el envío de SMS). El toHaveBeenCalledWith nos permite verificar internamente que el código armó el mensaje con el texto exacto exigido en la RN-12 (RutaSegura: el bus <PLACA> llegará en...), algo que simplemente ver el retorno true de la promesa no podría confirmar.

**6.** ¿Qué porcentaje de cobertura obtuvieron? ¿Es posible tener 100 % de cobertura y aun así tener un defecto sin detectar? Muestren un ejemplo concreto con el código de RutaSegura.

R// Obtuvimos más del 80%. Sí, es posible tener 100% de cobertura y defectos lógicos. La cobertura solo mide que las líneas de código se ejecutaron durante la prueba. Si la función calcularMinutosEstimados tuviera una fórmula mala como (distancia * velocidad), las pruebas pasarían por esa línea y la cobertura sería del 100%, pero el cálculo del tiempo estaría completamente malo, lo cual es un defecto que la herramienta de cobertura no puede ver.

**7.** Para cada defecto encontrado, describan la cadena **error → defecto → falla** (Unidad 3): ¿qué equivocación humana lo originó, dónde está en el código y qué le pasaría al acudiente o al colegio si llega a producción?

R// Error humano: El desarrollador olvidó usar Math.ceil() para redondear el tiempo hacia arriba en la regla RN-01.

Defecto en el código: La función calcularMinutosEstimados retorna decimales (ej. 22.5) en lugar de un entero.

Falla: La pantalla de la app del acudiente falla al intentar mostrar "22.5 minutos" en una interfaz diseñada para números enteros, o el usuario se confunde con la lectura del tiempo.

**8.** ¿Su suite cumple el principio **FIRST**? Den un ejemplo de una prueba suya que cumpla cada letra, y digan si alguna prueba lo viola (por ejemplo, depender de `new Date()` sin fijar la hora).

R// Sí.

    Fast: Todas las pruebas terminan en milisegundos.

    Independent: Limpiamos los mocks en beforeEach para que ninguna prueba dependa de otra.

    Repeatable: En la regla RN-05, fijamos la hora usando new Date(2026, 8, 22, 6, 30) en la prueba calcularHora_conDatosValidos_debeRetornarFechaNueva. Si usáramos new Date() vacío, la prueba daría un resultado distinto cada vez que la ejecutamos, violando esta letra.

    Self-Validating: Jest nos arroja automáticamente "Pasa/Falla" sin revisión manual.

    Timely: Las estamos haciendo antes de la nueva versión.

**9.** Supongan que el equipo de desarrollo corrige todos los defectos mañana. ¿Qué valor tiene conservar sus pruebas en el repositorio? ¿Qué pasaría si dentro de seis meses alguien vuelve a introducir el error de RN-01?

R// El mayor valor es prevenir regresiones. Si el equipo corrige todos los defectos hoy, pero en seis meses alguien modifica eta.ts y reintroduce accidentalmente un error en el factor de tráfico, la suite automatizada de Jest hará fallar la prueba inmediatamente durante el desarrollo, bloqueando el error antes de que los acudientes lo noten.

**10.** Si por tiempo solo pudieran entregar **3 pruebas** de todo el repositorio, ¿cuáles escogerían y por qué? Justifiquen según el riesgo para los estudiantes y acudientes.

R// Una prueba de error en calcularMinutosEstimados con velocidad cero: Porque un mal manejo de un bus detenido podría generar tiempos de llegada infinitos en la app y causar pánico en los acudientes.

La prueba de NotificadorAcudientes de la RN-12: Porque verificar que el SMS contiene el mensaje correcto (usando el mock) es vital; si el SMS llega vacío o con datos de otra placa, el sistema de alertas es inútil.

Las pruebas de límite [-90, 90] de validarCoordenadas: Porque si el núcleo GPS acepta datos basura por no tener las fronteras exactas, todo el seguimiento en tiempo real del bus falla en el mapa.
