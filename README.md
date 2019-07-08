## Dependencias
Docker, Docker Compose, Make

## Levantar en entorno de desarrollo

Ejecutar:
 1. make setup
 2. make install
 3. cp .src/server/.env.example .src/server/.env
 4. make build
 5. make up

## Ejecutar worker

Entrar en el contenedor de node

> make node

Levantar worker:

> npm run worker



**Endpoitns locales**:
[GET] 
http://localhost:4000/stats

[POST]
http://localhost:4000/mutant
[BODY]

    {
	"dna":["AAAA","ATCT","AHTC","ACGA"]
	}
	

**Endpoitns Prod**:
[GET] 
ec2-54-237-142-141.compute-1.amazonaws.com/stats

[POST]
ec2-54-237-142-141.compute-1.amazonaws.com/mutant
[BODY]

    {
	"dna":["AAAA","ATCT","AHTC","ACGA"]
	}	
	
	
En la root del proyecto se encuentra disponible una collection de POSTMAN
 
