# Houm entry test

Prueba de houm

## Endpoints documentation

- /api-docs (swagger)

## Environment vars

```plaintext
MONGO_URI=mongodb://mongo:27020/db_name #MongoURI
PORT=5001 #Port on run backend
SECRET_JWT=strong_jwt_secret
ENVIRONMENT=dev
```

## Execution

```plaintext
npm i

- docker-compose -f docker-compose.dev.yml up

```

## Tests

Execute tests with this commands

All tests

```plaintext
npm run test
```

Tests and coverage

```plaintext
npm run test:coverage OR npx npm run test:coverage
```

## informacion adicional

Este proyecto fue programado con typescript bajo arquitectura hexagonal (hexagonal architecture) que es parte de
las arquitecturas limpias (clean architectures) para una programación por capas, sin estar fuertemente ligadas
y poder cambiar logíca o conectores (bd, librerias, etc) sin afectar a las demas capas.

Se supuso que el tiempo de "traslado" de cada houmer es el tiempo entre que finaliza una visita y comienza otra,
esto para simplificar, ya que podría ser otra lógica mas compleja que la que se abordo en esta Prueba.

Tambien, se supuso que cada houmer tiene sus propiedades y puede estar visitando una sola, para visitar otra es
necesario finalizar la visita en curso antes de comenzar con otra.

Finalmente, para calcular la velocidad de traslado, se utiliza el metodo de 'haversine' para calcular la distancia lineal
entre 2 propiedades y luego eso se divide por el tiempo de traslado entre estas 2 para obtener la velocidad en kilometros
por hora.

Entonces, con esto es necesario estar logueado como houmer, crear dos propiedades y luego realizar una visita, finalizar
la visita y luego visitar la otra propiedad para que se hagan los calculos al utilizar los endpoints.
Estos endpoints estan disponible en formato postman en el archivo postman.json para ser importados o viendolos en swagger

Jorge Silva - 2021
