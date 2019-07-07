## Dependencias
Docker, Docker Compose, Make

## Levantar en entorno de desarrollo

Ejecutar:
 1. make setup
 2. make install
 3. make build
 4. make up

## Ejecutar worker

Entrar en el contenedor de node

> make node

Levantar worker:

> npm run worker



**Endpoitns**:
[GET] 
http://localhost:4000/stats

[POST]
http://localhost:4000/mutant
[BODY]

    {
	"dna":["AAAA","ATCT","AHTC","ACGA"]
	}
En la root del proyecto se encuentra disponible una collection de POSTMAN
 
