# ☕ Aroma & Grano - E-commerce de Café Premium

¡Bienvenido a **Aroma & Grano**! Este es un proyecto Fullstack diseñado para una tienda de café, aplicando principios de **Clean Architecture** (Arquitectura Limpia) para garantizar un código escalable, mantenible y profesional.



## 🚀 Tecnologías Utilizadas

### Frontend
* **React.js** (Vite)
* **Tailwind CSS** (Estilos modernos y responsivos)
* **React Router Dom** (Navegación)
* **Context API** (Gestión del estado global del carrito)

### Backend
* **Node.js & Express**
* **MySQL** (Base de datos relacional)
* **JWT** (Autenticación segura)
* **Multer** (Gestión de subida de imágenes)
* **Bcrypt.js** (Encriptación de contraseñas)

---

## 🏗️ Arquitectura del Proyecto

Este proyecto destaca por separar la lógica de negocio de los detalles de implementación:

### Backend (Clean Architecture)
* **Controllers:** Manejan las peticiones HTTP y las respuestas.
* **Use Cases:** Contienen las reglas de negocio puras (ej: validar stock antes de comprar).
* **Repositories:** Única capa que tiene permiso de hablar con la base de datos (SQL).

### Frontend (Modular)
* **Pages:** Componentes de alto nivel que representan las rutas.
* **Components:** Piezas reutilizables (Navbar, ProductoCard, CartDrawer).
* **Context:** Manejo del carrito de compras persistente.

---

## 🛠️ Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone [https://github.com/tu-usuario/nombre-del-repo.git](https://github.com/tu-usuario/nombre-del-repo.git)
cd nombre-del-repo
```
###  2. Configurar el Backend
1. Entra a la carpeta del servidor:
```bash
cd productos-backend
```
2. Instala las dependencias:
```bash
npm install
```
3. Crea un archivo .env con las siguientes variables:
```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=nombre_de_tu_db
JWT_SECRET=tu_clave_secreta
```
4. Inicia el servidor:
```bash
   npm run dev
```
### 3. Configurar el Frontend
1. Entra a la carpeta del cliente:
```bash
cd productos-frontend
```
3. Instala las dependencias:
```bash
npm install
```
4. Inicia la aplicación:
```bash
npm run dev
```

## Funcionalidades Clave
1. Autenticación: Sistema de Login y Registro con Roles (Admin/Cliente).
2. Carrito de Compras: Gestión dinámica de productos, cantidades y totales.
3. Inventario Real: Al finalizar la compra, el sistema descuenta automáticamente el stock de la base de datos mediante transacciones SQL.
4. Panel Administrativo: CRUD completo de productos con carga de imágenes.

## Autor
Cristian Danilo Tobon Marulanda
Rol: Desarrollador Fullstack
