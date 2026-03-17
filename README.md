# 📂 Log Analyzer API

Node.js backend API para subir, almacenar y analizar archivos de logs, construida con enfoque en buenas prácticas y asincronía. Diseñada para monitoreo y análisis de errores, warnings e información general de logs.

## 📋 DESCRIPCIÓN

### Este proyecto permite:

- Subir archivos de logs a la API y almacenarlos de forma organizada usando Multer.
- Analizar los archivos y obtener información por tipo de línea: errors, warnings, info.
- Obtener un resumen completo del archivo.
- Practicar patrones de desacoplamiento, asincronía, streams, y middlewares.

### Prácticas implementadas

- Lectura eficiente de archivos grandes con streams.
- Gestión de rutas y endpoints REST.
- Desacoplamiento: Controllers para el manejo de HTTP, services para la lógica de negocio y abstracción de funciones reutilizables para evitar duplicación.
- Simulación de asincronía para procesos de lectura y upload.
- Gestión automática de nombres de archivos y almacenamiento organizado.
- Desarrollo de una API lista para producción y pruebas.
- Uso de Multer para subir archivos de manera segura y eficiente.
- Asincronía simulada: await new Promise para retrasos en lectura y subida de archivos.

## ⚡ FUNCIONALIDADES

### Endpoints disponibles

- GET /logAnalizer/logs - Devuelve un JSON con el recuento de los archivos de logs almacenados para analizar.
- GET /logAnalizer/:id/summary - Devuelve el nombre del archivo, recuento total de líneas y un array con todas las líneas.
- GET /logAnalizer/:id/errors - Devuelve el nombre del archivo, cantidad de líneas de error y un array con esas líneas.
- GET /logAnalizer/:id/warnings - Devuelve el nombre del archivo, cantidad de líneas de warning y un array con esas líneas.
- GET /logAnalizer/:id/infos - Devuelve el nombre del archivo, cantidad de líneas de info y un array con esas líneas.
- POST /logAnalizer/logs - Permite subir archivos de logs (.txt). Los archivos se guardan en public/logs y se renombran automáticamente como logFile-001.txt, logFile-002.txt, etc. Se usa Multer para gestionar la subida de archivos.

## 🛠️ Tecnologías

- Node.js & Express: servidor y gestión de rutas.
- File System & Streams: lectura y manejo de archivos grandes con createReadStream.
- dotenv – manejo de variables de entorno
- Multer: middleware para subida de archivos.

## 🚀 CÓMO CORRER EL PROYECTO

### Clonar el repositorio

```
git clone https://github.com/tuusuario/log-analyzer-api.git
cd log-analyzer-api
```

### Instalar dependencias

```
npm install
```

### Ejecutar la API

```
npm start
```

La API correra en:

http://localhost:PORT

donde `PORT` se define en tu archivo `.env`.  
Si no se define, la app usará el puerto por defecto `3000`.

## 🧪 EJEMPLOS DE USO

### Subir un archivo de log

| Endpoint   | Descripción     |
| ---------- | --------------- |
| POST /logs | Sube un archivo |

```
curl -X POST http://localhost:PORT/logs -F "log.txt=@/ruta/al/archivo/log.txt"
```

Respuesta:

```
{
    "message": "Archivo subido correctamente",
    "fileId": "001"
}
```

### Obtener errores de un archivo

\*IMPORTANTE: En caso de haber subido varios archivos, listar los archivos disponibles en la carpeta public/logs para obtener el ID del archivo con GET /logs.

| Endpoint        | Descripción                       |
| --------------- | --------------------------------- |
| GET /:id/errors | Obtiene los errores de un archivo |

```
curl -X GET http://localhost:PORT/001/errors
```

Respuesta:

```
{
    "file": "logFile-001.txt",
    "count": 20,
    "errors": [
        "Error en la conexión a la base de datos",
        "Error al procesar la solicitud"
        ...
    ]
}
```

### Obtener resumen completo

\*IMPORTANTE: En caso de haber subido varios archivos, listar los archivos disponibles en la carpeta public/logs para obtener el ID del archivo con GET /logs

| Endpoint         | Descripción                               |
| ---------------- | ----------------------------------------- |
| GET /:id/summary | Obtiene el resumen completo de un archivo |

```
curl -X GET http://localhost:PORT/001/summary
```

Respuesta:

```
{
    "file": "logFile-001.txt",
    "count": 50,
    "lines": [
        "Info: Servicio iniciado",
        "Warning: Memoria alta",
        "Error: Conexión fallida",
        ...
    ]
}
```

## 🚀 POSIBLES PRÓXIMOS PASOS Y MEJORAS

- Agregar paginación en endpoints de logs grandes.
- Soporte para archivos en formato CSV o JSON.
- Integración con base de datos para almacenar logs de forma persistente.
- Tests unitarios y de integración para endpoints y lógica de análisis.
