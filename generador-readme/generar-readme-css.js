const fs = require('fs');
const path = require('path');

class GeneradorReadmeCSS {
    constructor() {
        this.calificacionesPath = path.join(__dirname, 'calificaciones.json');
        this.readmePath = path.join(__dirname, 'README.md');
        this.data = null;
    }

    cargarDatos() {
        try {
            this.data = JSON.parse(fs.readFileSync(this.calificacionesPath, 'utf8'));
            return true;
        } catch (error) {
            console.error('❌ Error al cargar datos:', error.message);
            return false;
        }
    }

    // Generar CSS embebido
    generarCSS() {
        return `<style>
.calificaciones-container {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
}

.categoria {
    margin: 25px 0;
}

.categoria h4 {
    color: #333;
    border-bottom: 2px solid #e1e5e9;
    padding-bottom: 8px;
    margin-bottom: 15px;
}

.estudiante {
    display: flex;
    align-items: center;
    padding: 6px 0;
    margin: 4px 0;
    border-left: 3px solid transparent;
}

.estudiante.promocionado {
    background-color: #f0fdf4;
    border-left-color: #22c55e;
    padding-left: 8px;
}

.estudiante.regular {
    background-color: #fffbeb;
    border-left-color: #eab308;
    padding-left: 8px;
}

.estudiante.libre {
    background-color: #fef2f2;
    border-left-color: #ef4444;
    padding-left: 8px;
}

.numero {
    min-width: 25px;
    font-weight: 600;
    color: #64748b;
    margin-right: 8px;
}

.info-estudiante {
    flex: 1;
    margin-right: 15px;
}

.legajo {
    font-weight: 500;
    color: #2563eb;
}

.nombre {
    font-weight: 700;
}

.calificaciones {
    display: flex;
    gap: 3px;
    align-items: center;
}

.cal {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    display: inline-block;
    border: 1px solid rgba(0,0,0,0.1);
}

.cal.parcial {
    width: 12px;
    height: 12px;
}

.cal.verde {
    background-color: #22c55e;
    border-color: #16a34a;
}

.cal.amarillo {
    background-color: #eab308;
    border-color: #ca8a04;
}

.cal.rojo {
    background-color: #ef4444;
    border-color: #dc2626;
}

.estadisticas {
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    padding: 20px;
    border-radius: 12px;
    margin: 25px 0;
    border: 1px solid #e2e8f0;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 12px;
    margin-top: 15px;
}

.stat-item {
    background: white;
    padding: 12px;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    border: 1px solid #f1f5f9;
}

.stat-number {
    font-size: 1.8em;
    font-weight: 700;
    color: #1e40af;
}

.stat-label {
    color: #64748b;
    font-size: 0.85em;
    margin-top: 4px;
}

.leyenda {
    background: #f1f5f9;
    padding: 15px;
    border-radius: 8px;
    margin: 20px 0;
    border-left: 4px solid #3b82f6;
}

.leyenda-items {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-top: 10px;
}

.leyenda-item {
    display: flex;
    align-items: center;
    gap: 6px;
}

.leyenda-color {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 1px solid rgba(0,0,0,0.2);
}

@media (max-width: 768px) {
    .estudiante {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
    }
    
    .info-estudiante {
        margin-right: 0;
    }
    
    .stats-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>`;
    }

    // Generar HTML para las calificaciones
    generarCalificacionesHTML(calificaciones) {
        return calificaciones.map((color, index) => {
            const esParcial = index === 2 || index === 5;
            return `<span class="cal ${color} ${esParcial ? 'parcial' : ''}"></span>`;
        }).join('');
    }

    // Generar HTML para un estudiante
    generarEstudianteHTML(estudiante, numero) {
        const calificacionesHTML = this.generarCalificacionesHTML(estudiante.calificaciones);
        
        return `<div class="estudiante ${estudiante.estado}">
    <span class="numero">${numero}.</span>
    <div class="info-estudiante">
        <span class="legajo">${estudiante.legajo}</span> - 
        <span class="nombre">${estudiante.apellido}, ${estudiante.nombre}</span>
    </div>
    <div class="calificaciones">
        ${calificacionesHTML}
    </div>
</div>`;
    }

    // Generar estadísticas
    generarEstadisticas() {
        const promocionados = this.data.estudiantes.filter(e => e.estado === 'promocionado').length;
        const regulares = this.data.estudiantes.filter(e => e.estado === 'regular').length;
        const libres = this.data.estudiantes.filter(e => e.estado === 'libre').length;
        const total = this.data.estudiantes.length;

        return `<div class="estadisticas">
    <h3>📊 Estadísticas del Curso</h3>
    <div class="stats-grid">
        <div class="stat-item">
            <div class="stat-number">${total}</div>
            <div class="stat-label">Total</div>
        </div>
        <div class="stat-item">
            <div class="stat-number">${promocionados}</div>
            <div class="stat-label">Promocionados</div>
        </div>
        <div class="stat-item">
            <div class="stat-number">${regulares}</div>
            <div class="stat-label">Regulares</div>
        </div>
        <div class="stat-item">
            <div class="stat-number">${libres}</div>
            <div class="stat-label">Libres</div>
        </div>
    </div>
</div>`;
    }

    // Generar leyenda
    generarLeyenda() {
        return `<div class="leyenda">
    <h4>🎯 Leyenda de Calificaciones</h4>
    <div class="leyenda-items">
        <div class="leyenda-item">
            <span class="leyenda-color verde"></span>
            <span>Aprobado</span>
        </div>
        <div class="leyenda-item">
            <span class="leyenda-color amarillo"></span>
            <span>Recuperatorio</span>
        </div>
        <div class="leyenda-item">
            <span class="leyenda-color rojo"></span>
            <span>Desaprobado</span>
        </div>
    </div>
    <p><small>💡 Los círculos más grandes representan parciales</small></p>
</div>`;
    }

    // Generar sección del examen final
    seccionExamenFinal() {
        return `---

## 🎓 ¿Cómo se rinde el examen final?

Para rendir el examen, debes desarrollar y defender una aplicación que:

> **Implemente una agenda de contactos multiusuario**

Esta aplicación debe ser desarrollada en *React*, implementando la funcionalidad usando *Express* y persistiendo los datos con *MongoDB*.

La defensa consistirá en ejecutar la aplicación para mostrar su funcionalidad y, si está correctamente implementada, deberás mostrar el código fuente y explicar cómo funcionan las partes que se te indiquen.

### 📋 Funcionalidad requerida
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

### 👤 Los contactos deben tener:
- **Nombre y Apellido** (obligatorio)
- Empresa
- Domicilio
- Teléfonos
- **Email** (obligatorio)
- Propietario (usuario que lo creó)
- Es Público (definido por el usuario propietario)
- Es Visible (definido por el administrador)
- Contraseña (en caso de ser un usuario)`;
    }

    // Generar README completo
    generarReadme() {
        if (!this.data) {
            console.error('❌ Datos no cargados');
            return false;
        }

        // Agrupar y ordenar estudiantes
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

        // CSS embebido
        contenido += this.generarCSS() + '\n\n';

        // Contenedor principal
        contenido += '<div class="calificaciones-container">\n\n';

        // Título principal
        contenido += '# 📚 Calificaciones - TUP24 Lab3 C3\n\n';

        // Estadísticas
        contenido += this.generarEstadisticas() + '\n\n';

        // Leyenda
        contenido += this.generarLeyenda() + '\n\n';

        // Secciones de estudiantes
        if (promocionados.length > 0) {
            contenido += '<div class="categoria">\n';
            contenido += '<h4>✅ Promocionados</h4>\n';
            promocionados.forEach((estudiante, index) => {
                contenido += this.generarEstudianteHTML(estudiante, index + 1) + '\n';
            });
            contenido += '</div>\n\n';
        }

        if (regulares.length > 0) {
            contenido += '<div class="categoria">\n';
            contenido += '<h4>⚠️ Regulares</h4>\n';
            regulares.forEach((estudiante, index) => {
                contenido += this.generarEstudianteHTML(estudiante, index + 1) + '\n';
            });
            contenido += '</div>\n\n';
        }

        if (libres.length > 0) {
            contenido += '<div class="categoria">\n';
            contenido += '<h4>❌ Libres</h4>\n';
            libres.forEach((estudiante, index) => {
                contenido += this.generarEstudianteHTML(estudiante, index + 1) + '\n';
            });
            contenido += '</div>\n\n';
        }

        // Cerrar contenedor
        contenido += '</div>\n\n';

        // Sección del examen final
        contenido += this.seccionExamenFinal();

        try {
            fs.writeFileSync(this.readmePath, contenido);
            console.log('✅ README.md con CSS generado exitosamente!');
            this.mostrarEstadisticas();
            return true;
        } catch (error) {
            console.error('❌ Error al escribir README:', error.message);
            return false;
        }
    }

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
        console.log(`   • Total: ${total}`);
        console.log(`\n🎨 Características del nuevo README:`);
        console.log(`   • CSS embebido para mejor visualización`);
        console.log(`   • Puntos de colores generados con CSS`);
        console.log(`   • Diseño responsive`);
        console.log(`   • Estadísticas automáticas`);
        console.log(`   • Leyenda interactiva\n`);
    }
}

// Función principal
function main() {
    const args = process.argv.slice(2);
    const generador = new GeneradorReadmeCSS();
    
    if (args.length === 0 || args[0] === 'generar') {
        if (generador.cargarDatos()) {
            generador.generarReadme();
        }
        return;
    }

    switch (args[0]) {
        case 'help':
            console.log('🎨 Generador de README con CSS - Comandos:');
            console.log('   node generar-readme-css.js           # Generar README con CSS');
            console.log('   node generar-readme-css.js generar   # Generar README con CSS');
            console.log('   node generar-readme-css.js help      # Mostrar ayuda');
            break;
            
        default:
            console.log('❌ Comando no reconocido. Usa "help" para ver comandos disponibles.');
    }
}

// Ejecutar
main();
