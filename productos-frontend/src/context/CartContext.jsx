import { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    //Intentamos cargar el carrito desde localStorage para que no se pierda al recargar
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Función para añadir productos
    const addToCart = (producto) => {
        setCart((prevCart) => {
            const existe = prevCart.find((item) => item.id === producto.id);
            if(existe){
                //aumentamos la cantidad
                return prevCart.map((item) =>
                item.id === producto.id ? { ...item, cantidad: item.cantidad +1 } : item
                );
            }
            //Si es nuevo, lo agregamos con cantidad 1
            return [...prevCart, { ...producto, cantidad: 1}];
        })
    };

    const removeFromcart = (id) => {
        setCart(cart.filter((item) => item.id !== id));
    };
    const clearCart = () => setCart([])
    //Cálculo del total de items y precio total
    const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);
    const totalPrice = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

    return(
        <CartContext.Provider value={{cart, addToCart, removeFromcart, clearCart, totalItems, totalPrice }}>{children}</CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);