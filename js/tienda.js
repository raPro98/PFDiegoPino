// PRODUCTOS
let productosWaterflame = [];

fetch("../js/productos.json")
    .then(response => {
        if(!response.ok){
            throw new Error('Hubo un error al cargar los datos.');
        }

        return response.json();
    })
    .then(data => {
        productosWaterflame = data;
        cargaProductos(productosWaterflame);
    }).catch(error =>{
        console.error('Error al cargar los productos:', error.message)
    });


// VARIABLES GLOBALES
const contenedorProductos = document.querySelector('.contenedorProductos');
const btnCategoria = document.querySelectorAll('.btnTienda');
let btnAgregar = document.querySelectorAll('.btnAgregar');
let productosCarrito;
let numeroCarro = document.querySelector('.numeroCarro'); 


// CARGA DE LOS PRODUCTOS SELECCIONADOS
cargaProductos =(tipoProductos)=>{
    contenedorProductos.innerHTML ='';

    tipoProductos.forEach(producto =>{
        const divContenedor = document.createElement('div');
        divContenedor.classList.add('card', 'cuadros');
        divContenedor.style.width = '20rem';
        divContenedor.innerHTML = `
            <img src="${producto.imagen}" class="card-img-top imgCuadros" alt="producto ${producto.nombre}">
            <div class="card-body">
                <h2 class="card-title text-center tituloCard">${producto.nombre}</h2>
                <p class="card-text">- $${producto.precio}.</p>
                <div class="d-flex justify-content-center">
                    <a class="btn btn-primary btnCard btnAgregar" id='${producto.id}'>Agregar</a>
                </div>
            </div>`;
            
        contenedorProductos.append(divContenedor);
    })

    // AGREGAR PRODUCTO AL CARRITO
    setTimeout(() => {
        btnAgregar = document.querySelectorAll('.btnAgregar');
        btnAgregar.forEach(boton => {
            boton.addEventListener('click', (e)=>{
                let idBtn = e.currentTarget.id;
                let productoAgregado = productosWaterflame.find(producto => producto.id === idBtn);

                    // AUMENTAR LA CANTIDAD DEL PRODUCTO SI ES QUE YA EXISTE EN EL CARRITO
                if(productosCarrito.some(productoExistente => productoExistente.id === idBtn)){
                    let index = productosCarrito.findIndex(productoExistente => productoExistente.id === idBtn);
                    productosCarrito[index].cantidad++;
                } else {
                    // AGREGAR PRODUCTO SI NO EXISTE EN EL CARRITO
                    productoAgregado.cantidad = 1;
                    productosCarrito.push(productoAgregado);
                };

                Toastify({
                    text: "Producto Agregado.",
                    duration: 1200,
                    gravity: "bottom",
                    position: 'right',
                    
                    style: {
                        background: "#f67f1def",
                        border: 'white solid 3px',
                        borderRadius: '0.6rem'
                      },
                    }).showToast();

                aumentarNumero();

                // SE GUARDA LOS PRODUCTOS EN ALMACENAMIENTO COMO STRING
                // NO SE PUEDE GUARDAR COMO ARRAY DE OBJETOS, PRIMERO PASAR A STRING
                localStorage.setItem('productos en Carrito', JSON.stringify(productosCarrito));
            });
        });
    }, 0);
};

// MANTENER PRODUCTOS Y NUMERO EN EL CARRITO
productosCarrito = JSON.parse(localStorage.getItem('productos en Carrito'));
productosCarrito ? aumentarNumero() : productosCarrito = [];

// AUMENTAR NUMERO DEL CARRITO
function aumentarNumero(){
    let numerito = productosCarrito.reduce((acc, elemento) => acc + elemento.cantidad, 0);
    numeroCarro.innerText = numerito;
};

// SELECCIONAR TIPO DE PRODUCTO
btnCategoria.forEach(btn =>{
    btn.addEventListener('click', (e) =>{

        let idProductos;

        if(e.currentTarget.id != 'todo'){
            idProductos = productosWaterflame.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargaProductos(idProductos)
        } else{
            cargaProductos(productosWaterflame)
        }
    })
});