const fs = require('fs');
const path = require('path');

// Leer el archivo de calificaciones
const calificacionesPath = path.join(__dirname, 'calificaciones.json');
const data = JSON.parse(fs.readFileSync(calificacionesPath, 'utf8'));

// Función para generar las imágenes de calificación
const generarImagenesCalificacion = (calificaciones) => {
    return calificaciones.map((color, index) => {
        const width = (index === 2 || index === 5) ? 6 : 4; // Los elementos 3 y 6 tienen width="6"
        const height = (index === 2 || index === 5) ? 6 : 4; // Los elementos 3 y 6 tienen height="6"
        return `<img src="./material/${color}.png" width="${width}" height="${height}">`;
    }).join(' ');
};

// Función para generar una línea de estudiante
const generarLineaEstudiante = (estudiante, numero) => {
    const imagenes = generarImagenesCalificacion(estudiante.calificaciones);
    const nombreCompleto = `${estudiante.apellido}, ${estudiante.nombre}`;
    const espacios = ' '.repeat(Math.max(1, 50 - nombreCompleto.length)); // Alinear las imágenes
    
    return `1. ${estudiante.legajo} - **${estudiante.apellido}**, ${estudiante.nombre}${espacios}${imagenes}`;
};

// Agrupar estudiantes por estado
const promocionados = data.estudiantes.filter(e => e.estado === 'promocionado');
const regulares = data.estudiantes.filter(e => e.estado === 'regular');
const libres = data.estudiantes.filter(e => e.estado === 'libre');

// Contenido de la sección de examen final (se mantiene igual)
const seccionExamenFinal = `---
## ¿Cómo se rinde el examen final?

Para rendir el examen, debes desarrollar y defender una aplicación que:

> **Implemente una agenda de contactos multiusuario**

Esta aplicación debe ser desarrollada en *React*, implementando la funcionalidad usando *Express* y persistiendo los datos con *MongoDB*.

La defensa consistirá en ejecutar la aplicación para mostrar su funcionalidad y, si está correctamente implementada, deberás mostrar el código fuente y explicar cómo funcionan las partes que se te indiquen.

### Funcionalidad requerida
1. En la esquina superior izquierda debe ir el nombre del sitio.
2. En la esquina superior derecha deben haber dos botones: "Registrar" e "Ingresar", cuando no haya ningún usuario identificado.
3. Cuando el usuario haya ingresado, en la esquina izquierda debe estar el nombre del usuario y un botón "Salir".
4. Al pulsar en el nombre del usuario, se deberá poder editar los datos del mismo.
5. El sitio debe mostrar inicialmente una lista de contactos públicos ordenados por apellido y nombre.
6. El usuario que se registre podrá agregar nuevos contactos.
7. Los usuarios, al identificarse, podrán ver sus propios contactos y los contactos públicos que estén visibles.
8. Los usuarios son propietarios de los contactos que crean, siempre podrán visualizar sus contactos, editarlos o borrarlos. 
9. Los usuarios podrán hacer público o privado sus contactos mediante un botón asociado a los mismos.
10. Las altas y la edición, así como la registración y el ingreso, se deben hacer en una página separada y, al completar la misma, debe regresar a la página principal.
11. Debe existir un usuario administrador que pueda visualizar todos los contactos, ya sean públicos o privados, estén visibles o no.
12. El usuario administrador puede ocultar o mostrar los contactos públicos mediante un botón que aparece en cada contacto.
13. Los usuarios se deben guardar como contactos privados con una contraseña asociada. 
14. Los usuarios no deberán aparecer en el listado de contactos.

Los contactos deben tener:
- Nombre y Apellido (obligatorio)
- Empresa     
- Domicilio   
- Teléfonos 
- Email       (obligatorio)
- Propietario (usuario que lo creó)
- Es Público  (definido por el usuario propietario)
- Es Visible  (definido por el administrador)
- Contraseña  (en caso de ser un usuario)`;

// Generar el contenido del README
let contenidoReadme = '';

// Sección Promocionados
contenidoReadme += '#### Promocionados\n';
promocionados.forEach((estudiante, index) => {
    contenidoReadme += generarLineaEstudiante(estudiante, index + 1) + '\n';
});

contenidoReadme += '\n#### Regulares\n';
regulares.forEach((estudiante, index) => {
    contenidoReadme += generarLineaEstudiante(estudiante, index + 1) + '\n';
});

contenidoReadme += '\n#### Libres\n';
libres.forEach((estudiante, index) => {
    contenidoReadme += generarLineaEstudiante(estudiante, index + 1) + '\n';
});

contenidoReadme += seccionExamenFinal;

// Escribir el archivo README.md
const readmePath = path.join(__dirname, 'README.md');
fs.writeFileSync(readmePath, contenidoReadme);

console.log('✅ README.md generado exitosamente!');
console.log(`📊 Estadísticas:`);
console.log(`   • Promocionados: ${promocionados.length}`);
console.log(`   • Regulares: ${regulares.length}`);
console.log(`   • Libres: ${libres.length}`);
console.log(`   • Total: ${data.estudiantes.length}`);
