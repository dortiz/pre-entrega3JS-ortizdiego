import { productos } from './stock.js';

let carrito = [];

// Cargar carrito desde localStorage
function cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }
}

// Guardar carrito en localStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para mostrar productos
function mostrarProductos() {
    const productosOrdenados = productos.slice().sort((a, b) => a.precio - b.precio);
    const contenedorProductos = document.getElementById('productos');
    contenedorProductos.innerHTML = '';
    productosOrdenados.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.className = 'product';
        productoDiv.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p>Tipo: ${producto.tipo}</p>
            <p>Precio: $${producto.precio.toFixed(2)}</p>
            <button data-id="${producto.id}">Agregar al Carrito</button>
        `;
        contenedorProductos.appendChild(productoDiv);
    });

    document.querySelectorAll('.product button').forEach(button => {
        button.addEventListener('click', (e) => {
            const idProducto = parseInt(e.target.getAttribute('data-id'));
            const producto = productos.find(p => p.id === idProducto);
            agregarProductoAlCarrito(producto);
        });
    });
}

// Función para agregar producto al carrito
function agregarProductoAlCarrito(producto) {
    if (producto) {
        carrito.push(producto);
        alert(`Seleccionaste ${producto.nombre}. Valor: $${producto.precio.toFixed(2)}`);
        mostrarCarrito();
        guardarCarrito();
    }
}

// Función para mostrar carrito
function mostrarCarrito() {
    const contenedorCarrito = document.getElementById('carrito');
    contenedorCarrito.innerHTML = '';
    carrito.forEach((producto, index) => {
        const productoDiv = document.createElement('div');
        productoDiv.innerHTML = `
            <p>${index + 1}. ${producto.nombre} - $${producto.precio.toFixed(2)}</p>
            <button data-index="${index}">Eliminar</button>
        `;
        contenedorCarrito.appendChild(productoDiv);
    });

    document.querySelectorAll('#carrito button').forEach(button => {
        button.addEventListener('click', (e) => {
            const indexProducto = parseInt(e.target.getAttribute('data-index'));
            eliminarProductoDelCarrito(indexProducto);
        });
    });

    document.getElementById('total').innerText = `Total: $${calcularTotal().toFixed(2)}`;
}

// Función para eliminar producto del carrito
function eliminarProductoDelCarrito(index) {
    if (index >= 0 && index < carrito.length) {
        carrito.splice(index, 1);
        alert("Producto eliminado del carrito.");
        mostrarCarrito();
        guardarCarrito();
    } else {
        alert("Opción inválida.");
    }
}

// Función para calcular el total del carrito
function calcularTotal() {
    return carrito.reduce((total, producto) => total + producto.precio, 0);
}

// Función para finalizar la compra
function finalizarCompra() {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }
    let mensaje = "Productos en tu carrito:\n";
    carrito.forEach((producto, index) => {
        mensaje += `${index + 1}. ${producto.nombre}\n`;
    });
    mensaje += `\nTotal: $${calcularTotal().toFixed(2)}\n¡Gracias por tu compra!`;
    alert(mensaje);
    carrito.length = 0;
    guardarCarrito();
    mostrarCarrito();
}

// Eventos del DOM
document.getElementById('finalizarCompra').addEventListener('click', finalizarCompra);

// Inicialización
cargarCarrito();
mostrarProductos();
mostrarCarrito();
