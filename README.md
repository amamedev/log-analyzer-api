# 📂 Log Analyzer API

Node.js backend API para subir, almacenar y analizar archivos de logs, construida con enfoque en buenas prácticas y asincronía. Diseñada para monitoreo y análisis de errores, warnings e información general de logs.

## 📋 DESCRIPCIÓN

Este proyecto permite:

Subir archivos de logs a la API y almacenarlos de forma organizada usando Multer.

Analizar los archivos y obtener información por tipo de línea: errors, warnings, info.

Obtener un resumen completo del archivo.

Practicar patrones de desacoplamiento, asincronía, streams, y middleware de upload.

El proyecto está diseñado con estructura modular, separando la lógica de negocio de la gestión de rutas y peticiones HTTP, facilitando escalabilidad y mantenimiento.

## ⚡ FUNCIONALIDADES

### Endpoints disponibles

- GET /logAnalizer/logs - Devuelve un JSON con el recuento de los archivos de logs almacenados para analizar.
- GET /logAnalizer/:id/errors - Devuelve el nombre del archivo, cantidad de líneas de error y un array con esas líneas.
- GET /logAnalizer/:id/warnings - Devuelve el nombre del archivo, cantidad de líneas de warning y un array con esas líneas.
- GET /logAnalizer/:id/info - Devuelve el nombre del archivo, cantidad de líneas de info y un array con esas líneas.
- GET /logAnalizer/:id/summary - Devuelve el nombre del archivo, recuento total de líneas y un array con todas las líneas.
- POST /logAnalizer/logs - Permite subir archivos de logs (.txt). Los archivos se guardan en public/logs y se renombran automáticamente como logFile-001.txt, logFile-002.txt, etc. Se usa Multer para gestionar la subida de archivos.

## 🛠️ Tecnologías y conceptos aplicados

- Node.js & Express: servidor y gestión de rutas.
- File System & Streams: lectura y manejo de archivos grandes con createReadStream.
- Desacoplamiento: controllers/logController.js maneja HTTP, services/analyzeLogFile.js contiene la lógica de análisis.
- Asincronía simulada: await new Promise para retrasos en lectura y subida de archivos.
- Estructura modular y escalable: fácil de mantener y extender.
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

La API correrá en http://localhost:3000.

Carpeta de logs: public/logs

## 🧪 EJEMPLO DE USO

### Subir un archivo de log

```
POST /logs
Content-Type: multipart/form-data
File: log.txt
```

Respuesta:

{
"message": "Archivo subido correctamente",
"fileId": "001"
}

### Obtener errores de un archivo

\*IMPORTANTE: En caso de haber subido varios archivos, listar los archivos disponibles en la carpeta public/logs para obtener el ID del archivo.
GET /001/errors

Respuesta:

{
"file": "logFile-001.txt",
"count": 5,
"errors": [
"Error en la conexión a la base de datos",
"Error al procesar la solicitud"
]
}

### Obtener resumen completo

\*IMPORTANTE: En caso de haber subido varios archivos, listar los archivos disponibles en la carpeta public/logs para obtener el ID del archivo.
GET /001/summary

Respuesta:

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

## 📚 PRÁCTICAS

- Lectura eficiente de archivos grandes con streams.
- Gestión de rutas y endpoints REST.
- Separación de responsabilidades (controller vs service).
- Simulación de asincronía para procesos de lectura y upload.
- Gestión automática de nombres de archivos y almacenamiento organizado.
- Desarrollo de una API lista para producción y pruebas.
- Uso de Multer para subir archivos de manera segura y eficiente.

## 🚀 POSIBLES PRÓXIMOS PASOS Y MEJORAS

- Agregar paginación en endpoints de logs grandes.
- Soporte para archivos en formato CSV o JSON.
- Integración con base de datos para almacenar logs de forma persistente.
- Tests unitarios y de integración para endpoints y lógica de análisis.

```

```
