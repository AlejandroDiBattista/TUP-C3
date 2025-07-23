# 📚 Sistema de Gestión de Calificaciones

Este sistema te permite gestionar las calificaciones de estudiantes de forma mucho más eficiente, eliminando la repetición manual y facilitando las actualizaciones.

## 🚀 Archivos Creados

### 1. `calificaciones.json`
Archivo central que contiene todos los datos de estudiantes en formato JSON estructurado.

### 2. `generar-readme-mejorado.js`
Script principal con múltiples funcionalidades para gestionar calificaciones.

### 3. `calificaciones.html`
Visualización interactiva y moderna de las calificaciones con estadísticas.

### 4. `estilos-calificaciones.css`
Estilos CSS para mejorar la presentación visual.

## 🎯 Ventajas del Nuevo Sistema

### ✅ Antes (Repetitivo)
```markdown
1. 58931 - **Cabrera**, Lucas Nahuel    <img src="./material/verde.png" width="4" height="4"> <img src="./material/verde.png" width="4" height="4"> <img src="./material/verde.png" width="6" height="6"> <img src="./material/verde.png" width="4" height="4"> <img src="./material/verde.png" width="4" height="4"> <img src="./material/verde.png" width="6" height="6">
```

### ✅ Ahora (Estructurado)
```json
{
  "legajo": "58931",
  "apellido": "Cabrera", 
  "nombre": "Lucas Nahuel",
  "calificaciones": ["verde", "verde", "verde", "verde", "verde", "verde"],
  "estado": "promocionado"
}
```

## 🛠️ Comandos Disponibles

### Generar README
```bash
node generar-readme-mejorado.js
```

### Ver Estadísticas
```bash
node generar-readme-mejorado.js stats
```

### Buscar Estudiante
```bash
node generar-readme-mejorado.js buscar 58931
```

### Actualizar Estudiante
```bash
node generar-readme-mejorado.js actualizar 58931 "Cabrera" "Lucas" promocionado verde,verde,verde,verde,verde,verde
```

### Ver Ayuda
```bash
node generar-readme-mejorado.js help
```

## 📊 Visualización Interactiva

Abre `calificaciones.html` en tu navegador para ver:
- 📈 Estadísticas en tiempo real
- 🎨 Visualización colorida de calificaciones  
- 📱 Diseño responsive
- 🔍 Información clara y organizada

## 🎯 Estados de Estudiantes

- **Promocionado**: Todas las evaluaciones aprobadas
- **Regular**: Puede rendir examen final
- **Libre**: Debe recursar o rendir como libre

## 🎨 Colores de Calificación

- 🟢 **Verde**: Aprobado
- 🟡 **Amarillo**: Recuperatorio
- 🔴 **Rojo**: Desaprobado

## 📝 Formato de Calificaciones

Las calificaciones se representan como un array de 6 elementos:
1. Evaluación 1 (tamaño pequeño)
2. Evaluación 2 (tamaño pequeño)  
3. **Parcial 1** (tamaño grande)
4. Evaluación 3 (tamaño pequeño)
5. Evaluación 4 (tamaño pequeño)
6. **Parcial 2** (tamaño grande)

## 🔄 Flujo de Trabajo Recomendado

1. **Editar datos**: Modificar `calificaciones.json` directamente o usar comandos
2. **Generar README**: Ejecutar `node generar-readme-mejorado.js`
3. **Visualizar**: Abrir `calificaciones.html` para verificar
4. **Confirmar**: El README.md se actualiza automáticamente

## ⚡ Ejemplos Prácticos

### Cambiar estado de un estudiante
```bash
# Cambiar de regular a promocionado
node generar-readme-mejorado.js actualizar 58771 "Calvo Maderuelo" "Carlos M" promocionado verde,verde,verde,verde,verde,verde
```

### Agregar nuevo estudiante
```bash
# Agregar estudiante libre
node generar-readme-mejorado.js actualizar 99999 "Nuevo" "Estudiante" libre rojo,rojo,rojo,rojo,rojo,rojo
```

### Actualizar solo calificaciones
```bash
# Cambiar última calificación de amarillo a verde
node generar-readme-mejorado.js actualizar 58771 "Calvo Maderuelo" "Carlos M" promocionado verde,verde,verde,verde,verde,verde
```

## 🔧 Personalización

### Agregar nuevos colores
Editar en `calificaciones.json` y `calificaciones.html`:
```json
"calificaciones": ["verde", "azul", "morado", "verde", "amarillo", "verde"]
```

### Cambiar criterios de estado
Modificar la lógica en `generar-readme-mejorado.js` según tus necesidades.

## 📱 Compatibilidad

- ✅ Funciona en Windows, macOS y Linux
- ✅ Compatible con cualquier editor de texto
- ✅ Se integra con Git y GitHub
- ✅ Responsive design para móviles

## 🆘 Solución de Problemas

### Error: archivo no encontrado
```bash
# Verificar que estés en la carpeta correcta
pwd
ls -la calificaciones.json
```

### Error: JSON malformado
```bash
# Validar JSON online o con:
node -e "console.log(JSON.parse(require('fs').readFileSync('calificaciones.json')))"
```

### Restaurar archivo original
Si algo sale mal, siempre puedes restaurar desde Git:
```bash
git checkout HEAD -- README.md
```

---

**¡Ahora tienes un sistema mucho más eficiente para gestionar las calificaciones! 🎉**
