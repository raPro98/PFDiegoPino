let productos = [
    {
        id: 'camisa-01',
        nombre: 'Camisa Below',
        imagen: '../img/tienda/camisabelow.avif',
        categoria: {
            id: 'camisas'
        },
        precio: 3000
    },
    {
        id: 'camisa-02',
        nombre: 'Camisa Octagon Force',
        imagen: '../img/tienda/camisaof.avif',
        categoria: {
            id: 'camisas'
        },
        precio: 5000
    },
    {
        id: 'camisa-03',
        nombre: 'Camisa Vast',
        imagen: '../img/tienda/camisavast.avif',
        categoria: {
            id: 'camisas'
        },
        precio: 7500
    },
    {
        id: 'mousep-01',
        nombre: 'MousePad Adventure',
        imagen: '../img/tienda/mouseadventure.avif',
        categoria: {
            id: 'mousepad'
        },
        precio: 2000
    },
    {
        id: 'mousep-02',
        nombre: 'MousePad Showdown',
        imagen: '../img/tienda/mouseshowdown.avif',
        categoria: {
            id: 'mousepad'
        },
        precio: 5000
    },
    {
        id: 'mousep-03',
        nombre: 'MousePad Time Machine 2',
        imagen: '../img/tienda/mousetm2.avif',
        categoria: {
            id: 'mousepad'
        },
        precio: 5000
    },
    {
        id: 'reloj-01',
        nombre: 'Reloj Waterflame',
        imagen: '../img/tienda/relojwaterflame.avif',
        categoria: {
            id: 'relojes'
        },
        precio: 10000
    },
    {
        id: 'reloj-02',
        nombre: 'Reloj Time Machine 2',
        imagen: '../img/tienda/relojtm2.avif',
        categoria: {
            id: 'relojes'
        },
        precio: 10000
    }
];

class Producto {
    constructor(id, nombre, imagen, categoria, precio) {
        this.id = id;
        this.nombre = nombre;
        this.imagen = imagen;
        this.categoria = categoria;
        this.precio = precio;
        this.cantidad = 0;
    };
};

let productosTienda = [];

productos.forEach(datos =>{
    let producto = new Producto(datos.id, datos.nombre, datos.imagen, datos.categoria, datos.precio);
    productosTienda.push(producto);
});

localStorage.setItem('productos Tienda', JSON.stringify(productosTienda));
