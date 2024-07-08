# Resultado Final - Comisión 3
(Seguimos revisando material, puede haber cambios)

## RECUPERACIÓN
> [!NOTE]
> Estos alumnos tienen hasta el lunes 8 para presentar las correcciones
>
59550 - **Osores Medina**, Selena Pau           
> **Presentar: TP4**
>
> **Corregir TP3**
>
> *Agrega directamente un producto sin permitir editarlo*
>


#### Promocionados
1. 58931 - **Cabrera**, Lucas Nahuel               
1. 59022 - **Camaño Terán**, Nicolás               
1. 58889 - **Capó**, Mauricio Nicolás              
1. 58770 - **Carabajal**, Ariadna Micael           
1. 59046 - **Carrizo**, Angel Nahuel               
1. 58925 - **Castillo**, Martina                   
1. 59016 - **Catania**, Franco Mauricio            
1. 58813 - **Cervera**, Diego Octavio              
1. 59379 - **Charkiewicz**, Carolina Est           
1. 59347 - **Chein**, Amir Elias                   
1. 59315 - **Chein**, Santiago                     
1. 59083 - **Cuellar**, José Omar                  
1. 59063 - **Cuevas**, Matias Sebastián            
1. 58888 - **Diaz Gómez**, Andrés Dario            
1. 55249 - **Fernandez**, Gonzalo Tomas            
1. 57565 - **Heredia**, Fabricio Nicolás           
1. 59184 - **Lucena**, Matias Leandro              
1. 59092 - **Perez**, Luciano Damian               
1. 58884 - **Salazar**, Agustina Ximena            
1. 58881 - **Sosa Juarez**, Malena Lujan           

#### Regulares
1. 58771 - **Calvo Maderuelo**, Carlos M           
1. 55839 - **Castillo**, Ignacio Agustín           
1. 59027 - **Chaves**, Gonzalo Martín              
1. 58768 - **Cordoba**, Ignacio Leandro            
1. 58780 - **Coronel**, Juan Carlos                
1. 58937 - **Coronel**, Lucas Francisco            
1. 59019 - **Corral Garcia**, Mario Maxi           
1. 58939 - **Cruz**, Francisco Sebastian           
1. 59075 - **Delgado**, Fabricio Tobias            
1. 59185 - **Diaz Ghiggia**, Guillermo             
1. 58844 - **Diaz Gonzalez**, Nahuel Ale           
1. 58763 - **Donelli**, Luciano                    
1. 59438 - **Martin**, Leonardo Javier             
1. 59060 - **Martinez**, Maira                     
1. 55883 - **Pedraza**, Leonardo Miguel            
1. 58905 - **Sueldo**, Leandro Antonio             
1. 50792 - **Tula Nelegatti**, Agustin             

#### Libres
1. 57605 - **Auad**, Gerónimo                      
1. 59204 - **Aybar**, Anibal Cesar Daniel          
1. 59181 - **Castro**, Maria Belén                 
1. 57534 - **Delani**, Luca                        
1. 58956 - **Diaz**, Viviana Lorena                
1. 58747 - **Diez Del Valle**, Lucciano            
1. 55847 - **Elizondo Carreras**, Lautaro          
1. 59183 - **Fernandez**, Ignacio                  
1. 59197 - **Peralta**, Antonio Nicolás            
1. 59037 - **Rodriguez**, Antonella Fern           
---
## ¿Cómo se rinde el examen final?

Para rendir, debes desarrollar y defender una aplicación que:

> **Implemente una agenda de contactos multiusuario**

La misma debe ser desarrollada en *React*, implementando la funcionalidad usando *Express* y persistiendo los datos con *MongoDB*.

La defensa consistirá en ejecutar la aplicación para mostrar la funcionalidad y, si está correctamente implementada, deberás mostrar el código fuente y explicar cómo funcionan las partes que se te indiquen.

### Funcionalidad requerida
1. En la esquina superior izquierda debe ir el nombre del sitio.
2. En la esquina superior derecha deben haber dos botones: "Registrar" e "Ingresar", cuando no haya ningún usuario identificado.
3. Cuando el usuario haya ingresado, en la esquina izquierda debe estar el nombre del usuario y un botón "Salir".
4. Al pulsar en el nombre del usuario se debera poder editar los datos del mismo.
5. El sitio debe mostrar inicialmente una lista de contactos públicos ordenados por apellido y nombre.
6. El usuario que se registre podrá agregar nuevos contactos.
7. Los usuarios, al identificarse, podrán ver sus propios contactos y los contactos públicos que estén visibles.
8. Los usuarios son propietarios de los contactos que crean, siempre podrán visualizar sus contactos, editarlos o borrarlos. 
9. Los usuarios podrán hacer público o poner privado sus contactos mediante un botón asociado a los mismos.
10. Las altas y la edición, así como la registración y el ingreso, se deben hacer en una página separada y, al completar la misma, debe regresar a la página principal.
11. Debe existir un usuario administrador que pueda visualizar todos los contactos, ya sean públicos o privados, estén visibles o no.
12. El usuario administrador puede ocultar o mostrar los contactos públicos mediante un botón que aparece en cada contacto.
13. Los usuarios se deben guardar como contactos privados con una contraseña asociada. 
14. Los usuarios no deberan aparecer en el listado de contactos.

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