# Relojería Web

Una plataforma web de comercio electrónico para la venta de relojes de lujo. Desarrollada con tecnologías web modernas para ofrecer una experiencia de usuario intuitiva y atractiva.

## 🚀 Características

### Catálogo de Productos
- **Visualización de productos**: Cada reloj incluye imágenes de alta calidad, nombre, descripción, marca y precio.
- **Carrusel de imágenes**: Algunos productos tienen múltiples imágenes con navegación interactiva.
- **Categorías por marca**: Filtra productos por marcas premium como Rolex, Invicta, Richard Mille, Omega, Tag Heuer, Seiko y Casio.

### Funcionalidades de Compra
- **Búsqueda avanzada**: Busca productos por nombre, marca o descripción con sugerencias automáticas.
- **Carrito de compras**: Agrega productos con control de cantidad, calcula subtotales y costos de envío.
- **Sistema de favoritos**: Marca productos como favoritos para acceso rápido.
- **Comparador de productos**: Compara hasta 3 productos lado a lado.

### Interacción y Feedback
- **Reseñas y calificaciones**: Los usuarios pueden dejar reseñas y calificar productos.
- **Sistema de calificación general**: Muestra el promedio de calificaciones de la plataforma.
- **Reloj en tiempo real**: Muestra la fecha y hora actual.

### Experiencia de Usuario
- **Modo oscuro/claro**: Alterna entre temas para comodidad visual.
- **Diseño responsivo**: Optimizado para dispositivos móviles y de escritorio.
- **Animaciones suaves**: Transiciones y efectos visuales para una navegación fluida.

### Pago y Checkout
- **Integración con Nequi**: Simula el proceso de pago con Nequi, enviando detalles del pedido por WhatsApp.
- **Cálculo de envío**: Envío gratuito para compras de más de 2 productos.

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica de la página web.
- **CSS3**: Estilos modernos con flexbox, grid y animaciones.
- **JavaScript (ES6+)**: Lógica interactiva, manipulación del DOM y almacenamiento local.
- **localStorage**: Persistencia de datos del lado del cliente (productos, carrito, favoritos, reseñas, etc.).

## 📦 Instalación y Uso

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/QUILIRED/Relojeria-Web.git
   cd Relojeria-Web
   ```

2. **Abre el proyecto**:
   - Abre el archivo `index.html` en tu navegador web preferido.
   - No se requiere servidor web; funciona directamente desde el sistema de archivos.

3. **Navegación**:
   - Explora el catálogo de productos.
   - Usa los filtros por marca o la barra de búsqueda.
   - Agrega productos al carrito y procede al checkout.
   - Interactúa con favoritos, comparador y reseñas.

## 📁 Estructura del Proyecto

```
Relojeria-Web/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Lógica JavaScript
├── interaccion.js      # Funciones adicionales (si se usa)
├── img/                # Imágenes de productos
│   ├── 20251225_230341.jpg
│   ├── 20251225_230342.jpg
│   └── ...
└── README.md           # Este archivo
```

## 🎯 Funcionalidades Clave

- **Gestión de productos**: Los productos se almacenan en `localStorage` con información detallada.
- **Carrito dinámico**: Actualización en tiempo real del contenido y totales.
- **Sistema de reseñas**: Permite agregar y visualizar reseñas por producto.
- **Pago simulado**: Redirige a WhatsApp con detalles del pedido para completar el pago.
- **Persistencia de datos**: Todo se guarda localmente, permitiendo sesiones continuas.

## 🔄 Próximas Mejoras

- Integración con una base de datos real para persistencia de datos.
- Sistema de autenticación de usuarios completo.
- Integración con APIs de pago reales (Nequi, PayPal, etc.).
- Panel de administración para vendedores.
- Optimización de imágenes y carga lazy.
- Soporte para múltiples idiomas.
- Notificaciones push y correos electrónicos.

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Si deseas mejorar la plataforma:

1. Haz un fork del repositorio.
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Agrega nueva funcionalidad'`).
4. Push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## 📞 Contacto

Para preguntas o soporte, contacta al desarrollador a través de GitHub.

---

¡Gracias por visitar Relojería Web! Esperamos que encuentres el reloj perfecto para ti. 🕰️✨