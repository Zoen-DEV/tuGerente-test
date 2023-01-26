# Prueba tecnica para el proceso de seleccion de tuGerente

## Este consiste en un componente estilo dropdown desarrollado en React.js con Firebase

### Al abrir la app se muestra lo siguiente:

![primera vista](https://res.cloudinary.com/ddabnwlfi/image/upload/v1674752018/tuGerenteTest/1_-_componente_al_iniciar_la_app_dedvpt.png)

### Al hacer foco (click) en el input se despliega el boton de creacion de nuevos clientes y se despliega la primer pagina de 20 items

cuando se hace scroll hasta el ultimo item se muestra la siguiente pagina de 20 items hasta que ya no encuentre 'clientes' en la base de datos

![segunda vista](https://res.cloudinary.com/ddabnwlfi/image/upload/v1674752018/tuGerenteTest/2_-_despliege_y_primeras_20_paginas_jzksed.png)

### Si se escriben letras en el input este filtrara por nombre

![filtro por nombre](https://res.cloudinary.com/ddabnwlfi/image/upload/v1674752018/tuGerenteTest/3_-_filtro_por_nombre_o2yy1b.png)

### En el caso de que se escriban numeros se filtra por nit

![filtro por nit](https://res.cloudinary.com/ddabnwlfi/image/upload/v1674752018/tuGerenteTest/4_-_filtro_por_nit_rqvvu8.png)

### y por ultimo si se empieza escribiendo un signo + filtrara por telefono (esto sirve a su vez para filtrar por pais, con el codigo de area)

![filtro por telefono](https://res.cloudinary.com/ddabnwlfi/image/upload/v1674752018/tuGerenteTest/5_-_filtro_por_telefono_ddj9to.png)

### Cuando se hace click en el boton de 'Agregar cliente' se abre un popup con un formulario que guarda el estado del filtro, permite modificarlo y agregar el resto de campos para crear un nuevo cliente en la base de datos

este guarda el estado del nombre, nit o telefono. dependiendo de que tipo de filtro este usando el usuario

![onclick en Agregar cliente](https://res.cloudinary.com/ddabnwlfi/image/upload/v1674752018/tuGerenteTest/6_-_onclick_en_la_primer_opcion_majrbg.png)

![formulario](https://res.cloudinary.com/ddabnwlfi/image/upload/v1674752018/tuGerenteTest/7_-_popup_de_creacion_de_nuevo_cliente_uthund.png)
