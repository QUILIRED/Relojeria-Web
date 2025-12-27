// Datos de productos - cargados desde localStorage
let productos = [
    { id: 1, nombre: 'Rolex Submariner', descripcion: 'Reloj de buceo icónico de Rolex', precio: 100000, stock: 15, imagenes: ['img/20251225_230344.jpg', 'img/20251225_230342.jpg'], marca: 'Rolex' },
    { id: 2, nombre: 'Invicta Pro Diver', descripcion: 'Reloj resistente al agua de Invicta', precio: 100000, stock: 15, imagenes: ['img/20251225_230345.jpg', 'img/20251225_230344.jpg'], marca: 'Invicta' },
    { id: 3, nombre: 'Richard Mille RM 011', descripcion: 'Reloj de lujo de Richard Mille', precio: 100000, stock: 15, imagenes: ['img/20251225_230342.jpg'], marca: 'Richard Mille' },
    { id: 7, nombre: 'Rolex Daytona', descripcion: 'Reloj cronógrafo de lujo de Rolex', precio: 100000, stock: 15, imagenes: ['img/daytonarolex.jpeg'], marca: 'Rolex' },
    { id: 8, nombre: 'Casio Edifice', descripcion: 'Reloj elegante de Casio', precio: 100000, stock: 15, imagenes: ['img/20251227230348.jpg'], marca: 'Casio' },
    { id: 9, nombre: 'Richard Mille RM 035', descripcion: 'Reloj tourbillon de Richard Mille', precio: 100000, stock: 15, imagenes: ['img/20251225_230350.jpg'], marca: 'Richard Mille' },
    { id: 13, nombre: 'Rolex Oyster Perpetual', descripcion: 'Reloj clásico de Rolex', precio: 100000, stock: 15, imagenes: ['img/Datejust01.jpg'], marca: 'Rolex' }
];

// Actualizar localStorage con los productos por defecto
localStorage.setItem('productos', JSON.stringify(productos));

// Usuarios
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
let usuarioActual = JSON.parse(localStorage.getItem('usuarioActual')) || null;

// Carrito
let carrito = [];

// Cargar ventas desde localStorage
let ventas = JSON.parse(localStorage.getItem('ventas')) || [];

// Reseñas por producto
let reseñas = JSON.parse(localStorage.getItem('reseñas')) || {};

// Favoritos
let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

// Comparador
let comparador = JSON.parse(localStorage.getItem('comparador')) || [];

// Función para renderizar productos
function renderizarProductos(filtroMarca = '', busqueda = '') {
    const container = document.getElementById('productos-container');
    container.innerHTML = '';
    let productosFiltrados = filtroMarca ? productos.filter(p => p.marca === filtroMarca) : productos;
    if (busqueda) {
        const termino = busqueda.toLowerCase();
        productosFiltrados = productosFiltrados.filter(p =>
            p.nombre.toLowerCase().includes(termino) ||
            p.marca.toLowerCase().includes(termino) ||
            p.descripcion.toLowerCase().includes(termino)
        );
    }
    productosFiltrados.forEach((producto, index) => {
        const div = document.createElement('div');
        div.className = 'producto fade-in';
        div.dataset.id = producto.id;
        div.style.animationDelay = `${index * 0.1}s`;
        if (producto.imagenes.length === 1) {
            div.innerHTML = `
                <img src="${producto.imagenes[0]}" alt="${producto.nombre}" class="producto-img">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p class="marca">Marca: ${producto.marca}</p>
                <p class="precio">$${producto.precio.toLocaleString()}</p>
                <p class="stock">Stock: ${producto.stock} unidades</p>
                <label>Cantidad:</label>
                <input type="number" min="1" max="${producto.stock}" value="1" class="cantidad">
                <button class="agregar-carrito">🛒 Agregar al Carrito</button>
                <button class="favorito" data-id="${producto.id}">${favoritos.includes(producto.id) ? '❤️' : '🤍'} Favorito</button>
                <button class="comparar" data-id="${producto.id}" ${comparador.includes(producto.id) ? 'disabled' : ''}>Comparar</button>
                <button class="ver-reseñas" data-id="${producto.id}">Ver Reseñas</button>
                ${usuarioActual && usuarioActual.tipo === 'vendedor' ? `
                    <button class="editar-producto">Editar</button>
                    <button class="borrar-producto">Borrar</button>
                ` : ''}
            `;
        } else {
            const imagenesHTML = producto.imagenes.map((img, idx) => `<img src="${img}" alt="${producto.nombre}" class="producto-img" style="display: ${idx === 0 ? 'block' : 'none'};">`).join('');
            const indicadores = producto.imagenes.map((_, idx) => `<span class="indicador" data-index="${idx}" style="background-color: ${idx === 0 ? '#717171' : '#bbb'}"></span>`).join('');
            div.innerHTML = `
                <div class="carrusel">
                    ${imagenesHTML}
                    <button class="prev">&#10094;</button><button class="next">&#10095;</button>
                    <div class="indicadores">${indicadores}</div>
                </div>
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p class="marca">Marca: ${producto.marca}</p>
                <p class="precio">$${producto.precio.toLocaleString()}</p>
                <p class="stock">Stock: ${producto.stock} unidades</p>
                <label>Cantidad:</label>
                <input type="number" min="1" max="${producto.stock}" value="1" class="cantidad">
                <button class="agregar-carrito">🛒 Agregar al Carrito</button>
                <button class="favorito" data-id="${producto.id}">${favoritos.includes(producto.id) ? '❤️' : '🤍'} Favorito</button>
                <button class="comparar" data-id="${producto.id}" ${comparador.includes(producto.id) ? 'disabled' : ''}>Comparar</button>
                <button class="ver-reseñas" data-id="${producto.id}">Ver Reseñas</button>
                ${usuarioActual && usuarioActual.tipo === 'vendedor' ? `
                    <button class="editar-producto">Editar</button>
                    <button class="borrar-producto">Borrar</button>
                ` : ''}
            `;
        }
        container.appendChild(div);
    });
}

// Función para cambiar imagen en carrusel
function cambiarImagen(carrusel, index) {
    const imgs = carrusel.querySelectorAll('.producto-img');
    const indicadores = carrusel.querySelectorAll('.indicador');
    imgs.forEach((img, i) => img.style.display = i === index ? 'block' : 'none');
    indicadores.forEach((ind, i) => ind.style.backgroundColor = i === index ? '#717171' : '#bbb');
}

// Event delegation para productos
document.getElementById('productos-container').addEventListener('click', (e) => {
    const productoDiv = e.target.closest('.producto');
    const id = parseInt(productoDiv.dataset.id);
    if (e.target.classList.contains('agregar-carrito')) {
        const cantidad = parseInt(productoDiv.querySelector('.cantidad').value);
        const producto = productos.find(p => p.id === id);
        const itemExistente = carrito.find(item => item.producto.id === id);
        const totalCantidad = (itemExistente ? itemExistente.cantidad : 0) + cantidad;
        if (totalCantidad > producto.stock) {
            alert(`Stock limitado. Solo quedan ${producto.stock} unidades disponibles.`);
            return;
        }
        if (itemExistente) {
            itemExistente.cantidad += cantidad;
        } else {
            carrito.push({ producto, cantidad });
        }
        producto.stock -= cantidad;
        localStorage.setItem('productos', JSON.stringify(productos));
        actualizarCarrito();
        renderizarProductos();
        document.getElementById('carrito-modal').style.display = 'block';
        alert('Artículo agregado al carrito de compras.');
    } else if (e.target.classList.contains('favorito')) {
        if (favoritos.includes(id)) {
            favoritos = favoritos.filter(fav => fav !== id);
            e.target.textContent = '🤍 Favorito';
        } else {
            favoritos.push(id);
            e.target.textContent = '❤️ Favorito';
        }
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
    } else if (e.target.classList.contains('comparar')) {
        if (comparador.length < 3 && !comparador.includes(id)) {
            comparador.push(id);
            e.target.disabled = true;
            localStorage.setItem('comparador', JSON.stringify(comparador));
            if (comparador.length >= 2) {
                mostrarComparador();
            }
        }
    } else if (e.target.classList.contains('ver-reseñas')) {
        mostrarReseñas(id);
    } else if (e.target.classList.contains('prev') || e.target.classList.contains('next')) {
        const carrusel = e.target.parentElement;
        const imgs = carrusel.querySelectorAll('.producto-img');
        let currentIndex = Array.from(imgs).findIndex(img => img.style.display === 'block');
        if (e.target.classList.contains('next')) {
            currentIndex = (currentIndex + 1) % imgs.length;
        } else {
            currentIndex = (currentIndex - 1 + imgs.length) % imgs.length;
        }
        cambiarImagen(carrusel, currentIndex);
    } else if (e.target.classList.contains('indicador')) {
        const carrusel = e.target.parentElement.parentElement;
        const index = parseInt(e.target.dataset.index);
        cambiarImagen(carrusel, index);
    } else if (e.target.classList.contains('editar-producto')) {
        editarProducto(id);
    } else if (e.target.classList.contains('borrar-producto')) {
        if (confirm('¿Estás seguro de borrar este producto?')) {
            productos = productos.filter(p => p.id !== id);
            localStorage.setItem('productos', JSON.stringify(productos));
            renderizarProductos();
        }
    }
});

// Actualizar carrito
function actualizarCarrito() {
    const carritoItems = document.getElementById('carrito-items');
    carritoItems.innerHTML = '';
    let total = 0;
    carrito.forEach((item, index) => {
        const div = document.createElement('div');
        const subtotal = item.producto.precio * item.cantidad;
        div.innerHTML = `
            ${item.producto.nombre} - Cantidad:
            <button class="restar" data-index="${index}">-</button>
            ${item.cantidad}
            <button class="sumar" data-index="${index}">+</button>
            - $${item.producto.precio} cada uno - Subtotal: $${subtotal}
            <button class="quitar" data-index="${index}">Cancelar</button>
        `;
        carritoItems.appendChild(div);
        total += subtotal;
    });
    const totalProductos = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    const envio = totalProductos > 2 ? 0 : 25000;
    const totalConEnvio = total + envio;
    const envioDiv = document.createElement('div');
    envioDiv.innerHTML = `Envío: $${envio}`;
    carritoItems.appendChild(envioDiv);
    const totalDiv = document.createElement('div');
    totalDiv.innerHTML = `<strong>Total: $${totalConEnvio}</strong>`;
    carritoItems.appendChild(totalDiv);

    document.getElementById('checkout-btn').disabled = carrito.length === 0;
    if (document.getElementById('checkout').style.display !== 'none') {
        document.querySelector('#checkout-form button').disabled = carrito.length === 0;
    }
    // Actualizar contador en index.html si existe
    const countEl = document.getElementById('carrito-count');
    if (countEl) {
        countEl.textContent = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    }
}

// Event delegation para botones del carrito
document.getElementById('carrito-modal').addEventListener('click', (e) => {
    if (e.target.classList.contains('restar')) {
        const index = parseInt(e.target.dataset.index);
        if (carrito[index].cantidad > 1) {
            carrito[index].cantidad--;
        } else {
            carrito.splice(index, 1);
        }
        actualizarCarrito();
    } else if (e.target.classList.contains('sumar')) {
        const index = parseInt(e.target.dataset.index);
        carrito[index].cantidad++;
        actualizarCarrito();
    } else if (e.target.classList.contains('quitar')) {
        const index = parseInt(e.target.dataset.index);
        carrito.splice(index, 1);
        actualizarCarrito();
    }
});

// Mostrar checkout
document.getElementById('checkout-btn').addEventListener('click', () => {
    document.getElementById('checkout').style.display = 'block';
    const subtotal = carrito.reduce((sum, item) => sum + item.producto.precio * item.cantidad, 0);
    const totalProductos = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    const envio = totalProductos > 2 ? 0 : 25000;
    const total = subtotal + envio;
    document.getElementById('checkout-total').innerHTML = `<p>Subtotal: $${subtotal}</p><p>Envío: $${envio}</p><p><strong>Total a pagar: $${total}</strong></p>`;
});

// Procesar pago con Nequi
document.getElementById('checkout-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value;

    // Simular pago con Nequi (en realidad, redirigir a Nequi app o API)
    alert('Redirigiendo a Nequi para pago...');
    // Aquí se integraría la API real de Nequi

    // Registrar venta
    const venta = {
        nombre: nombre,
        telefono: telefono,
        productos: carrito,
        fecha: new Date().toISOString()
    };
    ventas.push(venta);
    localStorage.setItem('ventas', JSON.stringify(ventas));

    // Construir mensaje con detalles de la venta
    let mensajeVenta = 'Quiero completar mi pago. Detalles del pedido:\n';
    carrito.forEach(item => {
        mensajeVenta += `- ${item.producto.nombre}: ${item.cantidad} x $${item.producto.precio} = $${item.producto.precio * item.cantidad}\n`;
    });
    const subtotal = carrito.reduce((sum, item) => sum + item.producto.precio * item.cantidad, 0);
    const totalProductos = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    const envio = totalProductos > 2 ? 0 : 25000;
    const total = subtotal + envio;
    mensajeVenta += `Subtotal: $${subtotal}\nEnvío: $${envio}\nTotal: $${total}\nMe regalas número de Nequi?`;

    // Limpiar carrito y ocultar checkout
    carrito = [];
    actualizarCarrito();
    document.getElementById('checkout').style.display = 'none';

    // Reportar venta por WhatsApp
    window.open(`https://wa.me/573183347792?text=${encodeURIComponent(mensajeVenta)}`, '_blank');

    alert(`Compra exitosa!!! Total pagado: $${total}. Te esperamos vuelvas pronto!!!`);

    // Mostrar modal de calificación después de compra si no ha sido enviado
    setTimeout(() => {
        if (!localStorage.getItem('ratingSubmitted')) {
            document.getElementById('rating-modal').style.display = 'block';
        }
        actualizarRatingsDisplay();
    }, 3000);
});

// Actualizar lista de ventas
function actualizarVentas() {
    const ventasLista = document.getElementById('ventas-lista');
    if (!ventasLista) return;
    ventasLista.innerHTML = '';
    ventas.forEach(venta => {
        const totalProductos = venta.productos.reduce((sum, item) => sum + item.cantidad, 0);
        const subtotal = venta.productos.reduce((sum, item) => sum + item.producto.precio * item.cantidad, 0);
        const envio = totalProductos > 2 ? 0 : 25000;
        const total = subtotal + envio;
        const productosDetalle = venta.productos.map(item => `${item.producto.nombre} x${item.cantidad}`).join(', ');
        const div = document.createElement('div');
        div.innerHTML = `<strong>${venta.nombre}</strong> (${venta.telefono}) - Productos: ${productosDetalle} - Subtotal: $${subtotal} + Envío: $${envio} = Total: $${total} - ${totalProductos} productos - ${venta.fecha}`;
        ventasLista.appendChild(div);
    });
}

// Actualizar lista de calificaciones
function actualizarRatings() {
    const ratingsLista = document.getElementById('ratings-lista');
    if (!ratingsLista) return;
    const ratings = JSON.parse(localStorage.getItem('ratings')) || [];
    ratingsLista.innerHTML = '';
    ratings.forEach(rating => {
        const div = document.createElement('div');
        div.innerHTML = `Calificación: ${'★'.repeat(rating.rating)} (${rating.rating}/5) - Fecha: ${new Date(rating.date).toLocaleString()}`;
        ratingsLista.appendChild(div);
    });
}

// Actualizar display de calificaciones en frontend
function actualizarRatingsDisplay() {
    const ratingsDisplay = document.getElementById('ratings-display');
    if (!ratingsDisplay) return;
    const ratings = JSON.parse(localStorage.getItem('ratings')) || [];
    if (ratings.length === 0) {
        ratingsDisplay.innerHTML = '';
        return;
    }
    const avg = (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(1);
    ratingsDisplay.innerHTML = `<p style="text-align: center; font-size: 18px; color: #2f4f2f;">Calificación promedio: ${'★'.repeat(Math.round(avg))} (${avg}/5)</p>`;
}


// Icono del carrito
const carritoIcon = document.getElementById('carrito-icon');
if (carritoIcon) {
    carritoIcon.addEventListener('click', () => {
        document.getElementById('carrito-modal').style.display = 'block';
        actualizarCarrito();
    });
}

// Contador de favoritos en header
const headerInfo = document.getElementById('header-info');
if (headerInfo) {
    headerInfo.addEventListener('click', () => {
        mostrarFavoritos();
    });
}

// Cerrar modal
const closeBtn = document.querySelector('.close');
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        document.getElementById('carrito-modal').style.display = 'none';
    });
}

// Cerrar modal al hacer click fuera
window.addEventListener('click', (e) => {
    const modal = document.getElementById('carrito-modal');
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});




// Rating modal
let selectedRating = 0;

setTimeout(() => {
    if (localStorage.getItem('ratingSubmitted')) return;
    document.getElementById('rating-modal').style.display = 'block';
}, 10000); // 10 segundos

document.querySelector('.stars').addEventListener('click', (e) => {
    if (e.target.classList.contains('star')) {
        selectedRating = parseInt(e.target.dataset.value);
        document.querySelectorAll('.star').forEach(star => star.classList.remove('active'));
        for (let i = 0; i < selectedRating; i++) {
            document.querySelectorAll('.star')[i].classList.add('active');
        }
    }
});

document.getElementById('submit-rating').addEventListener('click', () => {
    if (selectedRating > 0) {
        let ratings = JSON.parse(localStorage.getItem('ratings')) || [];
        ratings.push({ rating: selectedRating, date: new Date().toISOString() });
        localStorage.setItem('ratings', JSON.stringify(ratings));
        localStorage.setItem('ratingSubmitted', 'true');
        document.getElementById('rating-modal').style.display = 'none';
        alert('¡Gracias por tu calificación!');
        actualizarRatingsDisplay();
    } else {
        alert('Por favor selecciona una calificación.');
    }
});

document.getElementById('close-rating').addEventListener('click', () => {
    document.getElementById('rating-modal').style.display = 'none';
});

document.getElementById('close-reviews').addEventListener('click', () => {
    document.getElementById('reviews-modal').style.display = 'none';
});

document.getElementById('close-favoritos').addEventListener('click', () => {
    document.getElementById('favoritos-modal').style.display = 'none';
});

document.getElementById('close-comparador').addEventListener('click', () => {
    document.getElementById('comparador-modal').style.display = 'none';
});

// Event delegation para quitar de comparador
document.getElementById('comparador-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('quitar-comparar')) {
        const id = parseInt(e.target.dataset.id);
        comparador = comparador.filter(comp => comp !== id);
        localStorage.setItem('comparador', JSON.stringify(comparador));
        mostrarComparador();
        renderizarProductos(); // Para habilitar botones
    }
});

// Event delegation para quitar favorito
document.getElementById('favoritos-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('quitar-favorito')) {
        const id = parseInt(e.target.dataset.id);
        favoritos = favoritos.filter(fav => fav !== id);
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
        mostrarFavoritos();
        renderizarProductos(); // Para actualizar botones
    }
});

document.getElementById('review-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const productId = parseInt(e.target.dataset.productId);
    const name = document.getElementById('review-name').value;
    const rating = parseInt(document.getElementById('review-rating').value);
    const comment = document.getElementById('review-comment').value;
    if (!reseñas[productId]) reseñas[productId] = [];
    reseñas[productId].push({ name, rating, comment, date: new Date().toISOString() });
    localStorage.setItem('reseñas', JSON.stringify(reseñas));
    document.getElementById('review-form').reset();
    mostrarReseñas(productId); // Recargar reseñas
    alert('Reseña enviada exitosamente.');
});

// Reloj
function updateClock() {
    const now = new Date();
    const date = now.toLocaleDateString('es-CO');
    const time = now.toLocaleTimeString('es-CO', { hour12: true });
    const clockEl = document.getElementById('clock');
    if (clockEl) {
        clockEl.textContent = `${date} - ${time}`;
    }
}

setInterval(updateClock, 1000);
updateClock();

// Función para mostrar reseñas
function mostrarReseñas(id) {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;
    document.getElementById('reviews-title').textContent = `Reseñas de ${producto.nombre}`;
    const reviewsList = document.getElementById('reviews-list');
    reviewsList.innerHTML = '';
    const productReviews = reseñas[id] || [];
    if (productReviews.length === 0) {
        reviewsList.innerHTML = '<p>No hay reseñas aún.</p>';
    } else {
        productReviews.forEach(review => {
            const div = document.createElement('div');
            div.className = 'review';
            div.innerHTML = `
                <strong>${review.name}</strong> - ${'★'.repeat(review.rating)} (${review.rating}/5)<br>
                <p>${review.comment}</p>
                <small>${new Date(review.date).toLocaleString()}</small>
            `;
            reviewsList.appendChild(div);
        });
    }
    document.getElementById('reviews-modal').style.display = 'block';
    document.getElementById('review-form').dataset.productId = id;
}

// Función para mostrar favoritos
function mostrarFavoritos() {
    const favoritosList = document.getElementById('favoritos-list');
    favoritosList.innerHTML = '';
    if (favoritos.length === 0) {
        favoritosList.innerHTML = '<p>No tienes productos favoritos.</p>';
    } else {
        favoritos.forEach(id => {
            const producto = productos.find(p => p.id === id);
            if (producto) {
                const div = document.createElement('div');
                div.className = 'producto';
                div.innerHTML = `
                    <img src="${producto.imagenes[0]}" alt="${producto.nombre}" class="producto-img">
                    <h3>${producto.nombre}</h3>
                    <p>${producto.descripcion}</p>
                    <p class="marca">Marca: ${producto.marca}</p>
                    <p class="precio">$${producto.precio.toLocaleString()}</p>
                    <button class="quitar-favorito" data-id="${id}">Quitar de Favoritos</button>
                `;
                favoritosList.appendChild(div);
            }
        });
    }
    document.getElementById('favoritos-modal').style.display = 'block';
    actualizarContadorFavoritos();
}

// Función para mostrar comparador
function mostrarComparador() {
    const comparadorList = document.getElementById('comparador-list');
    comparadorList.innerHTML = '';
    comparador.forEach(id => {
        const producto = productos.find(p => p.id === id);
        if (producto) {
            const div = document.createElement('div');
            div.className = 'producto-comparar';
            div.innerHTML = `
                <img src="${producto.imagenes[0]}" alt="${producto.nombre}" class="producto-img">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p class="marca">Marca: ${producto.marca}</p>
                <p class="precio">$${producto.precio.toLocaleString()}</p>
                <p>Stock: ${producto.stock}</p>
                <button class="quitar-comparar" data-id="${id}">Quitar</button>
            `;
            comparadorList.appendChild(div);
        }
    });
    document.getElementById('comparador-modal').style.display = 'block';
}

// Función para actualizar contador de favoritos
function actualizarContadorFavoritos() {
    const countEl = document.getElementById('favoritos-count');
    if (countEl) {
        countEl.textContent = favoritos.length;
    }
    const headerCountEl = document.getElementById('favoritos-count-header');
    if (headerCountEl) {
        headerCountEl.textContent = favoritos.length;
    }
}

// Función para editar producto
function editarProducto(id) {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;
    document.getElementById('nombre').value = producto.nombre;
    document.getElementById('descripcion').value = producto.descripcion;
    document.getElementById('precio').value = producto.precio;
    document.getElementById('stock').value = producto.stock;
    document.getElementById('imagen').value = producto.imagen;
    document.getElementById('agregar-producto-modal').style.display = 'block';
    document.getElementById('agregar-producto-form').dataset.editId = id;
}

// Event listeners para modales
// document.getElementById('vendedor-btn').addEventListener('click', () => { // Comentado porque los elementos no existen en HTML
//     document.getElementById('agregar-producto-modal').style.display = 'block';
// });

// document.getElementById('close-agregar').addEventListener('click', () => {
//     document.getElementById('agregar-producto-modal').style.display = 'none';
//     document.getElementById('agregar-producto-form').reset();
//     delete document.getElementById('agregar-producto-form').dataset.editId;
// });

// Formulario agregar/editar producto
// document.getElementById('agregar-producto-form').addEventListener('submit', (e) => { // Comentado porque los elementos no existen en HTML
//     e.preventDefault();
//     const nombre = document.getElementById('nombre').value;
//     const descripcion = document.getElementById('descripcion').value;
//     const precio = parseFloat(document.getElementById('precio').value);
//     const stock = parseInt(document.getElementById('stock').value);
//     const imagen = document.getElementById('imagen').value;
//     const editId = document.getElementById('agregar-producto-form').dataset.editId;

//     if (editId) {
//         const index = productos.findIndex(p => p.id == editId);
//         productos[index] = { ...productos[index], nombre, descripcion, precio, stock, imagen };
//     } else {
//         const id = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;
//         productos.push({ id, nombre, descripcion, precio, stock, imagen });
//     }
//     localStorage.setItem('productos', JSON.stringify(productos));
//     renderizarProductos();
//     document.getElementById('agregar-producto-modal').style.display = 'none';
//     document.getElementById('agregar-producto-form').reset();
//     delete document.getElementById('agregar-producto-form').dataset.editId;
// });

// Sistema de usuarios
// function actualizarUIUsuario() { // Comentado porque los elementos no existen en HTML
//     const loginBtn = document.getElementById('login-btn');
//     const registerBtn = document.getElementById('register-btn');
//     const vendedorBtn = document.getElementById('vendedor-btn');
//     if (usuarioActual) {
//         loginBtn.textContent = `Hola, ${usuarioActual.nombre}`;
//         loginBtn.addEventListener('click', () => {
//             if (confirm('¿Cerrar sesión?')) {
//                 usuarioActual = null;
//                 localStorage.removeItem('usuarioActual');
//                 location.reload();
//             }
//         });
//         registerBtn.style.display = 'none';
//         if (usuarioActual.tipo === 'vendedor') {
//             vendedorBtn.style.display = 'inline-block';
//         }
//     } else {
//         loginBtn.textContent = 'Iniciar Sesión';
//         registerBtn.style.display = 'inline-block';
//         vendedorBtn.style.display = 'none';
//     }
// }

// Event listeners para modales de usuario
// document.getElementById('login-btn').addEventListener('click', () => { // Comentado porque los elementos no existen en HTML
//     if (!usuarioActual) {
//         const modal = document.getElementById('login-modal');
//         modal.style.display = 'block';
//         setTimeout(() => modal.classList.add('show'), 10);
//     }
// });

// document.getElementById('register-btn').addEventListener('click', () => {
//     const modal = document.getElementById('register-modal');
//     modal.style.display = 'block';
//     setTimeout(() => modal.classList.add('show'), 10);
// });

// document.getElementById('close-login').addEventListener('click', () => {
//     const modal = document.getElementById('login-modal');
//     modal.classList.remove('show');
//     setTimeout(() => modal.style.display = 'none', 300);
// });

// document.getElementById('close-register').addEventListener('click', () => {
//     const modal = document.getElementById('register-modal');
//     modal.classList.remove('show');
//     setTimeout(() => modal.style.display = 'none', 300);
// });

// Formulario login
// document.getElementById('login-form').addEventListener('submit', (e) => { // Comentado porque los elementos no existen en HTML
//     e.preventDefault();
//     const email = document.getElementById('login-email').value;
//     const password = document.getElementById('login-password').value;
//     const usuario = usuarios.find(u => u.email === email && u.password === password);
//     if (usuario) {
//         usuarioActual = usuario;
//         localStorage.setItem('usuarioActual', JSON.stringify(usuario));
//         document.getElementById('login-modal').style.display = 'none';
//         actualizarUIUsuario();
//         renderizarProductos();
//         alert('Inicio de sesión exitoso');
//     } else {
//         alert('Credenciales incorrectas');
//     }
// });

// Formulario registro
// document.getElementById('register-form').addEventListener('submit', (e) => {
//     e.preventDefault();
//     const name = document.getElementById('register-name').value;
//     const email = document.getElementById('register-email').value;
//     const password = document.getElementById('register-password').value;
//     const tipo = document.getElementById('register-type').value;
//     if (usuarios.find(u => u.email === email)) {
//         alert('El correo ya está registrado');
//         return;
//     }
//     const nuevoUsuario = { id: usuarios.length + 1, nombre: name, email, password, tipo };
//     usuarios.push(nuevoUsuario);
//     localStorage.setItem('usuarios', JSON.stringify(usuarios));
//     usuarioActual = nuevoUsuario;
//     localStorage.setItem('usuarioActual', JSON.stringify(nuevoUsuario));
//     document.getElementById('register-modal').style.display = 'none';
//     actualizarUIUsuario();
//     renderizarProductos();
//     alert('Registro exitoso');
// });

// Event listener para filtro de marca
document.getElementById('marca-select').addEventListener('change', (e) => {
    const busquedaActual = document.getElementById('busqueda-input').value;
    renderizarProductos(e.target.value, busquedaActual);
});

// Event listeners para botones de categoría
document.getElementById('categorias-buttons').addEventListener('click', (e) => {
    if (e.target.classList.contains('categoria-btn')) {
        const marca = e.target.dataset.marca;
        // Remover clase active de todos
        document.querySelectorAll('.categoria-btn').forEach(btn => btn.classList.remove('active'));
        // Agregar active al clicado
        e.target.classList.add('active');
        // Filtrar productos
        const busquedaActual = document.getElementById('busqueda-input').value;
        renderizarProductos(marca, busquedaActual);
        // Actualizar select si existe
        const select = document.getElementById('marca-select');
        if (select) select.value = marca;
    }
});

// Event listeners para búsqueda
document.getElementById('busqueda-btn').addEventListener('click', () => {
    const busqueda = document.getElementById('busqueda-input').value;
    const marcaActual = document.getElementById('marca-select').value;
    renderizarProductos(marcaActual, busqueda);
});

document.getElementById('busqueda-input').addEventListener('input', () => {
    const busqueda = document.getElementById('busqueda-input').value;
    const marcaActual = document.getElementById('marca-select').value;
    renderizarProductos(marcaActual, busqueda);
});

// Función para poblar sugerencias de búsqueda
function poblarSugerencias() {
    const datalist = document.getElementById('sugerencias');
    datalist.innerHTML = '';
    const sugerencias = new Set();
    productos.forEach(producto => {
        sugerencias.add(producto.nombre);
        sugerencias.add(producto.marca);
        // Agregar palabras clave de descripción si es necesario
        producto.descripcion.split(' ').forEach(word => {
            if (word.length > 3) sugerencias.add(word);
        });
    });
    sugerencias.forEach(sugerencia => {
        const option = document.createElement('option');
        option.value = sugerencia;
        datalist.appendChild(option);
    });
}

// Función para poblar el slider
function poblarSlider() {
    const slider = document.querySelector('.slider');
    slider.innerHTML = '';
    productos.filter(producto => producto.imagenes[0] !== 'img/daytonarolex.jpeg').forEach((producto, index) => {
        const img = document.createElement('img');
        img.src = producto.imagenes[0];
        img.alt = producto.nombre;
        img.style.animationDelay = `${index * 2}s`;
        slider.appendChild(img);
    });
}

// Toggle de tema
document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    document.getElementById('theme-toggle').textContent = isDark ? '☀️ Modo Claro' : '🌙 Modo Oscuro';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Cargar tema guardado
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    document.getElementById('theme-toggle').textContent = '☀️ Modo Claro';
}

// Inicializar
// actualizarUIUsuario(); // Comentado porque los elementos no existen en HTML
poblarSugerencias();
poblarSlider();
renderizarProductos();
actualizarRatingsDisplay();
actualizarContadorFavoritos();