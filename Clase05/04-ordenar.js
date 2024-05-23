let numeros = [10, 2, 3, 30, 20]

numeros.sort()  // Ordena alfabeticamente los elementos (como strings)
numeros //> [10, 2, 20, 3, 30]

// Ordena en orden numerico (de menor a mayor)
numeros.sort((a, b) => a < b)

numeros //> [2, 3, 10, 20, 30]

let nombres = ['Juan', 'Pedro', 'Ana', 'Maria']

// Ordena alfabeticamente los elementos (como strings)
nombres.sort()
nombres //> ['Ana', 'Juan', 'Maria', 'Pedro']

// Ordena en orden natural (de menor a mayor)
nombres.sort((a, b) => a < b)
nombres //> ['Ana', 'Juan', 'Maria', 'Pedro']

// Ordena en orden inverso (de mayor a menor)
nombres.sort((a, b) => a > b)
nombres //> ['Pedro', 'Maria', 'Juan', 'Ana']

nombres.sort((a, b) => a.length < b.length)