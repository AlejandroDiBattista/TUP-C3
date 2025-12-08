#!/bin/bash

# Script para renombrar carpetas en tp/ eliminando los 2 primeros dígitos y el guion

cd tp/

for dir in */; do
    # Eliminar la barra final
    dir_name="${dir%/}"
    
    # Verificar si el nombre empieza con NN - (dos dígitos seguidos de espacio-guion-espacio)
    if [[ "$dir_name" =~ ^[0-9]{2}\ -\  ]]; then
        # Eliminar los primeros 5 caracteres (NN - )
        new_name="${dir_name:5}"
        
        echo "Renombrando: '$dir_name' -> '$new_name'"
        mv "$dir_name" "$new_name"
    fi
done

echo "¡Renombrado completado!"
