
function subirCondicionC3() {
    let datos = [1, 1, 4, 2, 4, 4, 4, 4, 2, 4, 4, 4, 4, 2, 4, 4, 2, 2, 2, 2, 2, 4, 4, 1, 2, 2, 2, 1, 1, 2, 4, 1, 4, 4, 4, 4, 2, 4, 2, 1, 4, 1, 4, 4, 2, 2]
    let estados = document.querySelectorAll('select[name="nota"]');
    if (datos.length != estados.length) {
        alert('Error en la cantidad de alumnos >> Alumnos: ' + datos.length + 'Condiciones: ' + estados.length);
    } else {
        estados.forEach((estado, index) => estado.selectedIndex = datos[index]);
    }
}

function subirNotaC3() {
    let datos = [1, 1, 10, 8, 10, 10, 10, 10, 8, 10, 10, 10, 9, 8, 10, 9, 8, 8, 8, 8, 8, 10, 10, 1, 8, 8, 8, 1, 1, 8, 10, 1, 10, 9, 10, 9, 8, 9, 8, 1, 10, 1, 9, 10, 8, 6]
    let notas = document.querySelectorAll('input[name="nota"]');
    if (datos.length != notas.length) {
        alert('Error en la cantidad de alumnos >> Alumnos: ' + datos.length + 'Notas: ' + notas.length);
    } else {
        notas.forEach((nota, index) => nota.value = datos[index]);
    }
}