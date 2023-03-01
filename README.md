# Next.js OpenJira APP

Para correr localmente , se necesita la base de datos


```
docker-compose up -d

```

* el -d, significa __detached__

*MongoDB URL Local:

```
mongodb://localhost:27017/entriesdb

```

## Configurar las variables de entorno

Renombrar el archivo __.env.template__a__.env__



## LLenar la base de datos con informacion de pruebas

LLamar a 

````
http://localhost:3000/api/seed
````