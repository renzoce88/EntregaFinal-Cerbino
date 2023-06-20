const productosEnCarrito = JSON.parse(localStorage.getItem("productosCarrito"));
const contenedorCarrito = document.querySelector("#contenedorCarrito");

if (productosEnCarrito) {
    productosEnCarrito.forEach(item => {
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
                <button class="eliminar">X</button>
            </div>
        `;

        contenedorCarrito.appendChild(divProducto);
    });
} else {
    console.log("No hay productos en el carrito.");
};



const contador1Carrito = document.querySelector("#contadorCarrito");
let totalProductos = 0;

productosEnCarrito.forEach(item => {
    totalProductos += item.cantidad;
});

contador1Carrito.textContent = totalProductos;


const eliminarBotones = document.querySelectorAll(".eliminar");

eliminarBotones.forEach((boton, index) => {
    boton.addEventListener("click", () => {
        restarCantidad(index);
    });
});

function actualizarContadorCarrito() {
    totalProductos = 0;

    productosEnCarrito.forEach(item => {
        totalProductos += item.cantidad;
    });

    contador1Carrito.textContent = totalProductos;
}

function actualizarLocalStorage() {
    localStorage.setItem("productosCarrito", JSON.stringify(productosEnCarrito));
}


function restarCantidad(index) {
    productosEnCarrito[index].cantidad--;

    if (productosEnCarrito[index].cantidad === 0) {
        // Eliminar el producto si la cantidad llega a 0
        productosEnCarrito.splice(index, 1);
        contenedorCarrito.removeChild(contenedorCarrito.children[index]);
    } else {
        // Actualizar la cantidad y el total en el carrito
        const cantidadProductoCarrito = contenedorCarrito.children[index].querySelector(".cantidadProductoCarrito");
        const totalProductoCarrito = contenedorCarrito.children[index].querySelector(".total");

        cantidadProductoCarrito.textContent = `Cantidad: ${productosEnCarrito[index].cantidad}`;
        totalProductoCarrito.textContent = `Total: ${productosEnCarrito[index].cantidad * productosEnCarrito[index].producto.precio}`;
    }

    actualizarContadorCarrito();
    actualizarLocalStorage();
}

