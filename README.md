# [¿Qué me pongo?](https://qmp.ezegatica.com)
## Una aplicación para ayudarte a elegir que ponerte en base al clima y a tus preferencias.

### Descripción
¿Cansado de no saber si hace o mucho calor o mucho frío? ¡No busques más!

Esta aplicación te permite registrar que prendas te pones dada la temperatura actual, para que la proxima vez que haga una temperatura similar, puedas ver que te pusiste la última vez.

Cada persona es diferente, si soles ser mas fríolento o (whatever sea la palabra para lo contrario a fríolento) el algoritmo se va a ir ajustando a tus preferencias.

### Funcionamiento
La api que encontré para el clima [openweathermap.org](https://openweathermap.org/) devuelve 4 valores, de los cuales yo utilizo 3. Uno de ellos es la temperatura general, que es la que se muestra en la pantalla principal. Esta vendría a ser como la temperatura promedio en toda la ciudad. 

Los otros dos son la temperatura mínima y máxima en las distinas partes de la ciudad, que se utilizan para ajustar el algoritmo de busqueda. Lo que hago es que busca en las respuestas del usuario las que están dentro del rango de temperatura, y luego con estas respuestas, cuenta cuantas veces se repite cada prenda, y muestra las más repetidas para prendas de arriba y de abajo.

### Planes a futuro
- [ ] Agregar soporte para diferentes ciudades (por ahora solo funciona para la Ciudad de Buenos Aires)
- [ ] Agregar la posibilidad de marcar un rango de horario, para que en base a las minimas y maximas de ese rango te recomiende llevar ropa extra. (PLANEAR SALIDA)
  - **Ejemplo**: Salís a la 1pm y volves a las 10pm, y en ese rango de horario la temperatura va a bajar de 20° a 10°, entonces te recomienda llevar un buzo para la vuelta, aunque vos salgas en remera.
  - Esta sería la pantalla default, y el Que ponerme quedaría a la derecha, mostrandose siempre.
- [ ] Agregar la posibilidad de marcar un rango de días, y una ciudad, y bastante parecido a lo de planear salida, que te diga que llevar y que no a tu viaje.
  - **Ejemplo**: Voy al Caribe del 1 al 15. La temperatura va a estar entre 18° y 30°, entonces te recomienda llevar remera y short, pero tambien un buzo para la noche.
- [X] Agregar pronostico del día en la infobar
- [X] Hacer landing page
- [ ] Hacer un logo
- [ ] Pasar la app a PWA