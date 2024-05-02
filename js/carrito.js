let productosCarrito = JSON.parse(localStorage.getItem('productos en Carrito'));

let carritoVacio = document.getElementById('carritoVacio');
let contenedorCarrito = document.querySelector('.contenedorCarrito');
let contenedorAcciones = document.getElementById('contenedorAcciones');
let agradecimiento = document.getElementById('agradecimiento');
let basurero = document.querySelectorAll('.basura');
let vaciarCarro = document.querySelector('.vaciarCarro');
let comprar = document.querySelector('.comprar');
let total = document.getElementById('total');;

// CARGA DE LOS PRODUCTOS TRAIDOS DESDE EL JSON
function cargaProductosCarro(){
    contenedorCarrito.innerHTML = '';

    if (productosCarrito.length > 0) { // SI El ARRAY DE OBJETOS ES MAYOR A 0 SE MOSTRARA LOS PRODUCTOS
        carritoVacio.classList.add('oculto');
        contenedorAcciones.classList.remove('oculto');
        contenedorCarrito.classList.remove('oculto');
    
        productosCarrito.forEach(producto =>{
            const divContenedor = document.createElement('div');
            divContenedor.classList.add('info', 'd-flex', 'justify-content-between', 'p-3');
            divContenedor.innerHTML = `
                <img src="${producto.imagen}" class="imgCuadros" style="width: 8rem;" alt="imagen ${producto.nombre}">
                <div class="carritoNombre">
                    <small>Nombre Producto</small>
                    <p>${producto.nombre}</p>
                </div>
                <div class="carritoCantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carritoPrecio">
                    <small>Precio</small>
                    <p>$${producto.precio}.</p>
                </div>
                <div class="carritoSubtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button id='${producto.id}' class="basura p-0">
                    <i class="bi bi-trash"></i>
                </button>`;
    
            contenedorCarrito.append(divContenedor);
        });
    } else { // SI NO HAY PRODUCTOS O SE ELIMINA TODOS LOS PRODUCTOS SE MOSTRARA EL CARRITO VACIO
        carritoVacio.classList.remove('oculto');
        contenedorAcciones.classList.add('oculto');
        contenedorCarrito.classList.add('oculto');
    };

    // ELIMINAR UN PRODUCTO
    setTimeout(() => {
        basurero = document.querySelectorAll('.basura'); //DEFINIR LAS ID DE LOS BOTONES BASUREROS
        basurero.forEach(btnEliminar => {
            btnEliminar.addEventListener('click', (e)=>{
                const idBoton = e.currentTarget.id;
                const eliminado = productosCarrito.findIndex(producto => producto.id === idBoton);
                
                // ELIMINAR EL OBJETO ENCONTRADO EN EL ARRAY QUE COINCIDIA SU ID CON LA ID DEL BOTON BASURERO
                productosCarrito.splice(eliminado, 1);

                // SE GUARDA EN ALMACENAMIENTO EL NUEVO ARRAY DE OBJETOS, SIN EL PRODUCTO ELIMINADO
                localStorage.setItem('productos en Carrito', JSON.stringify(productosCarrito));

                cargaProductosCarro();
            });
        })
    }, 0);

    const totalCompra = productosCarrito.reduce((acc, elemento) => acc + (elemento.precio * elemento.cantidad), 0);
    total.innerText = `$${totalCompra}`

};

cargaProductosCarro();

// VACIAR TODO EL CARRITO
vaciarCarro.addEventListener('click', ()=>{
    Swal.fire({
        title: 'Vaciar Carrito',
        text: '¿Quieres vaciar todo tú carrito?.',
        iconHtml: '<i class="bi bi-cart-x"></i>',
        iconColor: 'gray',
        confirmButtonText: 'Aceptar',
        showCancelButton: true,
        cancelButtonText: 'Rechazar'
    }).then(resultado => {
        if(resultado.isConfirmed){
            productosCarrito.length = 0; // SE DEJA EL ARRAY DE OBJETOS EN 0
        localStorage.setItem('productos en Carrito', JSON.stringify(productosCarrito)); // SE GUARDA UN ARRAY DE OBJETOS VACIO EN ALMACENAMIENTO
        cargaProductosCarro();
        };
    });


    
});

// COMPRAR PRODUCTOS
comprar.addEventListener('click', ()=>{
    Swal.fire({
        title: 'Comprar Productos',
        text: '¿Quieres realizar la compra?.',
        iconHtml: '<i class="bi bi-box2-heart"></i>',
        iconColor: 'gray',
        confirmButtonText: 'Aceptar',
        showCancelButton: true,
        cancelButtonText: 'Rechazar'
    }).then(resultado => {
        if(resultado.isConfirmed){
            Swal.fire({
                title: '¡Compra Realizada!',
                text: 'Muchas gracias por tú compra.',
                iconHtml: '<i class="bi bi-balloon-heart-fill"></i>',
                iconColor: 'red',
                confirmButtonText: 'Aceptar'
            });

            productosCarrito.length = 0;
            localStorage.setItem('productos en Carrito', JSON.stringify(productosCarrito));
            cargaProductosCarro();
        };
    });
})


