const fs = require('fs');
const path = require('path');

class GeneradorCalificaciones {
    constructor() {
        this.calificacionesPath = path.join(__dirname, 'calificaciones.json');
        this.readmePath = path.join(__dirname, 'README.md');
        this.data = null;
    }

    // Cargar datos del archivo JSON
    cargarDatos() {
        try {
            this.data = JSON.parse(fs.readFileSync(this.calificacionesPath, 'utf8'));
            return true;
        } catch (error) {
            console.error('❌ Error al cargar datos:', error.message);
            return false;
        }
    }

    // Guardar datos en el archivo JSON
    guardarDatos() {
        try {
            fs.writeFileSync(this.calificacionesPath, JSON.stringify(this.data, null, 2));
            return true;
        } catch (error) {
            console.error('❌ Error al guardar datos:', error.message);
            return false;
        }
    }

    // Agregar o actualizar estudiante
    actualizarEstudiante(legajo, apellido, nombre, calificaciones, estado) {
        if (!this.data) {
            console.error('❌ Datos no cargados');
            return false;
        }

        // Validar calificaciones
        if (!Array.isArray(calificaciones) || calificaciones.length !== 6) {
            console.error('❌ Las calificaciones deben ser un array de 6 elementos');
            return false;
        }

        const coloresValidos = ['verde', 'amarillo', 'rojo'];
        if (!calificaciones.every(cal => coloresValidos.includes(cal))) {
            console.error('❌ Las calificaciones solo pueden ser: verde, amarillo, rojo');
            return false;
        }

        const estadosValidos = ['promocionado', 'regular', 'libre'];
        if (!estadosValidos.includes(estado)) {
            console.error('❌ El estado debe ser: promocionado, regular, libre');
            return false;
        }

        // Buscar si existe el estudiante
        const indice = this.data.estudiantes.findIndex(e => e.legajo === legajo);
        
        const estudiante = {
            legajo,
            apellido,
            nombre,
            calificaciones,
            estado
        };

        if (indice >= 0) {
            this.data.estudiantes[indice] = estudiante;
            console.log(`✅ Estudiante ${legajo} actualizado`);
        } else {
            this.data.estudiantes.push(estudiante);
            console.log(`✅ Estudiante ${legajo} agregado`);
        }

        return true;
    }

    // Generar README.md
    generarReadme() {
        if (!this.data) {
            console.error('❌ Datos no cargados');
            return false;
        }

        const imagenCalificacion = (calificaciones) => {
            return calificaciones.map((color, index) => {
                const width = (index === 2 || index === 5) ? 6 : 4;
                const height = (index === 2 || index === 5) ? 6 : 4;
                return `<img src="./material/${color}.png" width="${width}" height="${height}">`;
            }).join(' ');
        };

        const lineaEstudiante = (estudiante) => {
            const imagenes = imagenCalificacion(estudiante.calificaciones);
            const nombreCompleto = `${estudiante.apellido}, ${estudiante.nombre}`;
            const espacios = ' '.repeat(Math.max(1, 50 - nombreCompleto.length));
            
            return `1. ${estudiante.legajo} - **${estudiante.apellido}**, ${estudiante.nombre}${espacios}${imagenes}`;
        };

        // Agrupar y ordenar por apellido
        const promocionados = this.data.estudiantes
            .filter(e => e.estado === 'promocionado')
            .sort((a, b) => a.apellido.localeCompare(b.apellido));
            
        const regulares = this.data.estudiantes
            .filter(e => e.estado === 'regular')
            .sort((a, b) => a.apellido.localeCompare(b.apellido));
            
        const libres = this.data.estudiantes
            .filter(e => e.estado === 'libre')
            .sort((a, b) => a.apellido.localeCompare(b.apellido));

        let contenido = '';

        // Generar secciones
        if (promocionados.length > 0) {
            contenido += '#### Promocionados\n';
            promocionados.forEach(estudiante => {
                contenido += lineaEstudiante(estudiante) + '\n';
            });
            contenido += '\n';
        }

        if (regulares.length > 0) {
            contenido += '#### Regulares\n';
            regulares.forEach(estudiante => {
                contenido += lineaEstudiante(estudiante) + '\n';
            });
            contenido += '\n';
        }

        if (libres.length > 0) {
            contenido += '#### Libres\n';
            libres.forEach(estudiante => {
                contenido += lineaEstudiante(estudiante) + '\n';
            });
        }

        // Agregar sección del examen
        contenido += this.seccionExamenFinal();

        try {
            fs.writeFileSync(this.readmePath, contenido);
            console.log('✅ README.md generado exitosamente!');
            this.mostrarEstadisticas();
            return true;
        } catch (error) {
            console.error('❌ Error al escribir README:', error.message);
            return false;
        }
    }

    // Mostrar estadísticas
    mostrarEstadisticas() {
        if (!this.data) return;

        const promocionados = this.data.estudiantes.filter(e => e.estado === 'promocionado').length;
        const regulares = this.data.estudiantes.filter(e => e.estado === 'regular').length;
        const libres = this.data.estudiantes.filter(e => e.estado === 'libre').length;
        const total = this.data.estudiantes.length;

        console.log(`\n📊 Estadísticas:`);
        console.log(`   • Promocionados: ${promocionados} (${(promocionados/total*100).toFixed(1)}%)`);
        console.log(`   • Regulares: ${regulares} (${(regulares/total*100).toFixed(1)}%)`);
        console.log(`   • Libres: ${libres} (${(libres/total*100).toFixed(1)}%)`);
        console.log(`   • Total: ${total}\n`);
    }

    // Buscar estudiante
    buscarEstudiante(legajo) {
        if (!this.data) return null;
        return this.data.estudiantes.find(e => e.legajo === legajo);
    }

    // Listar estudiantes por estado
    listarPorEstado(estado) {
        if (!this.data) return [];
        return this.data.estudiantes
            .filter(e => e.estado === estado)
            .sort((a, b) => a.apellido.localeCompare(b.apellido));
    }

    seccionExamenFinal() {
        return `---
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
- Contraseña  (en caso de ser un usuario)
`;
    }
}

// Uso del script
const generador = new GeneradorCalificaciones();

// Función principal
function main() {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        // Generar README con datos existentes
        if (generador.cargarDatos()) {
            generador.generarReadme();
        }
        return;
    }

    const comando = args[0];
    
    switch (comando) {
        case 'stats':
            if (generador.cargarDatos()) {
                generador.mostrarEstadisticas();
            }
            break;
            
        case 'buscar':
            if (args.length < 2) {
                console.log('❌ Uso: node generar-readme-mejorado.js buscar [legajo]');
                return;
            }
            if (generador.cargarDatos()) {
                const estudiante = generador.buscarEstudiante(args[1]);
                if (estudiante) {
                    console.log('✅ Estudiante encontrado:');
                    console.log(`   Legajo: ${estudiante.legajo}`);
                    console.log(`   Nombre: ${estudiante.apellido}, ${estudiante.nombre}`);
                    console.log(`   Estado: ${estudiante.estado}`);
                    console.log(`   Calificaciones: ${estudiante.calificaciones.join(', ')}`);
                } else {
                    console.log('❌ Estudiante no encontrado');
                }
            }
            break;
            
        case 'actualizar':
            if (args.length < 6) {
                console.log('❌ Uso: node generar-readme-mejorado.js actualizar [legajo] [apellido] [nombre] [estado] [cal1,cal2,cal3,cal4,cal5,cal6]');
                console.log('   Estados: promocionado, regular, libre');
                console.log('   Calificaciones: verde, amarillo, rojo');
                console.log('   Ejemplo: node generar-readme-mejorado.js actualizar 58931 "Cabrera" "Lucas" promocionado verde,verde,verde,verde,verde,verde');
                return;
            }
            
            if (generador.cargarDatos()) {
                const legajo = args[1];
                const apellido = args[2];
                const nombre = args[3];
                const estado = args[4];
                const calificaciones = args[5].split(',');
                
                if (generador.actualizarEstudiante(legajo, apellido, nombre, calificaciones, estado)) {
                    if (generador.guardarDatos()) {
                        generador.generarReadme();
                    }
                }
            }
            break;
            
        case 'help':
            console.log('🚀 Generador de Calificaciones - Comandos disponibles:');
            console.log('   node generar-readme-mejorado.js              # Generar README');
            console.log('   node generar-readme-mejorado.js stats        # Mostrar estadísticas');
            console.log('   node generar-readme-mejorado.js buscar [legajo]  # Buscar estudiante');
            console.log('   node generar-readme-mejorado.js actualizar [datos]  # Actualizar estudiante');
            console.log('   node generar-readme-mejorado.js help         # Mostrar ayuda');
            break;
            
        default:
            console.log('❌ Comando no reconocido. Usa "help" para ver los comandos disponibles.');
    }
}

// Ejecutar
main();
