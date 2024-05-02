// PRODUCTOS
let productosTienda = JSON.parse(localStorage.getItem('productos Tienda'));

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
                let productoAgregado = productosTienda.find(producto => producto.id === idBtn);

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
            idProductos = productosTienda.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargaProductos(idProductos)
        } else{
            cargaProductos(productosTienda)
        }
    })
});

cargaProductos(productosTienda);







// const buscarCancionForm = document.getElementById('buscarCancion-form');
// const buscarCancion = document.getElementById('buscarCancion');
// const topPropio = document.getElementById('topPropio');
// const contenedorForm = document.querySelector('.contenedor-form');

// agregarCancion = (e) => {
//     let canciones = readText('canciones.json');
//     let interpreteCanciones = JSON.parse(canciones)[0].canciones;

//     if (buscarCancion.value.trim()) {
//         let cancionesFiltradas = interpreteCanciones.filter(cancion => {
//             return cancion.nombre.toLowerCase().includes(buscarCancion.value.toLowerCase());
//         });

//         if (cancionesFiltradas.length > 0) {
//             let contenedor = document.createElement('div');
//             cancionesFiltradas.forEach(cancion => {

//                 let contenedor = document.createElement('div');
//                 contenedor.innerHTML = `
//                     <h3 class="tituloCanciones">${cancion.nombre}.</h3>
//                     <a href="${cancion.enlaces.spotify}" class="p-0 m-0" target="_blank">
//                         <img src="${cancion.imagen}" alt="Imagen de la cancion ${cancion.nombre}">
//                     </a>
//                     <p class="fw-medium m-0 mt-2">- Álbum: ${cancion.album}.</p>
//                     <p class="escuchalo">Escuchalo en:</p>
//                     <ul class="list-unstyled d-flex justify-content-md-between justify-content-around flex-wrap row-gap-2 px-0">
//                         <li>
//                             <a href="${cancion.enlaces.youtube}" class="btn btn-primary px-0 btnMusica btnCanciones btnYoutube" target="_blank">
//                                 <i class="bi bi-youtube"></i>
//                                 YouTube
//                             </a>
//                         </li>
//                         <li>
//                             <a href="${cancion.enlaces.spotify}" class="btn btn-primary float-md-none float-end px-0 btnMusica btnCanciones btnSpotify" target="_blank">
//                                 <i class="bi bi-spotify"></i>
//                                 Spotify
//                             </a>
//                         </li>
//                         <li>
//                             <a href="${cancion.enlaces.newgrounds}" class="btn btn-primary btnMusica btnCanciones btnNewgrounds" target="_blank">
//                                 <img src="../img/logonewgrounds.png" class="logoNewgrounds" alt="Logo Newgrounds">
//                                 NG
//                             </a>
//                         </li>
//                     </ul>
//                 `;
//                 contenedor.appendChild(cancionHTML);
//                 contenedorForm.style.display = 'none';
//             });
//             topPropio.appendChild(contenedor);
            
//         } else {
//             alert('No se encontraron canciones que coincidan con la búsqueda.');
//         }
//     };

//     e.preventDefault();
//     buscarCancionForm.reset();
// };
// //         topPropio.appendChild(contenedor);
// //         contenedorForm.style.display = 'none';
// //     };

// //     e.preventDefault();
// //     buscarCancionForm.reset();

// // };

// buscarCancionForm.addEventListener('submit', agregarCancion);

// function readText(rutaLocal) {
//     var texto = null;
//     var xmlhttp = new XMLHttpRequest();
//     xmlhttp.open("GET", rutaLocal, false);
//     xmlhttp.send();
//     if (xmlhttp.status == 200) {
//         texto = xmlhttp.responseText;
//     }
//     return texto;
// }