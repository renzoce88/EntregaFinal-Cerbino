const productos = [
    {
        id: "zapatilla01",
        titulo: "zapatilla 01",
        imagen: "/img/zapatilla01.jpg",
        precio: 25000,
    },

    {
        id: "zapatilla02",
        titulo: "zapatilla 02",
        imagen: "/img/zapatilla02.jpg",
        precio: 65000,
    },

    {
        id: "zapatilla03",
        titulo: "zapatilla 03",
        imagen: "/img/zapatilla03.jpg",
        precio: 35000,
    },

    {
        id: "zapatilla04",
        titulo: "zapatilla 04",
        imagen: "/img/zapatilla04.jpg",
        precio: 55000,
    },

    {
        id: "zapatilla05",
        titulo: "zapatilla 05",
        imagen: "/img/zapatilla05.jpg",
        precio: 21000,
    },

    {
        id: "zapatilla06",
        titulo: "zapatilla 06",
        imagen: "/img/zapatilla06.jpg",
        precio: 45000,
    },
]

const contenedorProductos = document.querySelector("#contenedorProductos");
const contenedorCarrito = document.querySelector("#contenedorCarrito");

function cargaProductos() {
    productos.forEach(producto => {
        const div = document.createElement("div");
        div.innerHTML = `
            <img class="productoImagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="descripcionProducto">
                <h3 class="nombreProducto">${producto.titulo}</h3>
                <p class="precioProducto">${producto.precio}</p>
                <button id="${producto.id}" class="productoAgregar">agregar</button>
            </div>
        `;

        const botonAgregar = div.querySelector('.productoAgregar');
        botonAgregar.addEventListener('click', agregarAcarrito);

        contenedorProductos.append(div);
    });
}

const productosCarrito = [];

function agregarAcarrito(e) {
    const id = e.currentTarget.id;
    const productoExistente = productosCarrito.find(item => item.producto.id === id);

    if (productoExistente) {
        productoExistente.cantidad += 1; 
    } else {
        const productoAgregado = {
            producto: productos.find(producto => producto.id === id),
            cantidad: 1
        };
        productosCarrito.push(productoAgregado);
    }

    mostrarProductosCarrito();

    localStorage.setItem("productosCarrito", JSON.stringify(productosCarrito));
}

function mostrarProductosCarrito() {
    contenedorCarrito.innerHTML = "";

    productosCarrito.forEach(item => {
        const producto = item.producto;
        const cantidad = item.cantidad;

        const divProducto = document.createElement("div");
        divProducto.classList.add("productoCarrito");
        divProducto.innerHTML = `
            <img class="productoCarritoImagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="descripcionProductoCarrito">
                <h3 class="nombreProductoCarrito">${producto.titulo}</h3>
                <p class="precioProductoCarrito">${producto.precio}</p>
                <p class="cantidadProductoCarrito">Cantidad: ${cantidad}</p>
                <p class="total">Total: ${cantidad * producto.precio}</p>
            </div>
        `;

        contenedorCarrito.appendChild(divProducto);
    });
}

cargaProductos();

