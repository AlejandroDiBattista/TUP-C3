function sumar(a, b) {
    mostrar(a, b);
    return a + b;
}

function restar(a, b) {
    mostrar(a, b);
    return a - b;
}

function mostrar(a, b) {
    console.log(a, b);
}

export { sumar, restar }