import { create } from "zustand";

export const useCartStore = create((set, get) => ({
    cartItems: [],

    addToCart: (product) => {
        const { cartItems } = get();
        const existingItem = cartItems.find((item) => item.id === product.id);

        if (existingItem) {
            set({
                cartItems: cartItems.map((item) =>
                    item.id === product.id ?
                    {...item, quantity: item.quantity + 1 } :
                    item
                ),
            });
        } else {
            set({
                cartItems: [...cartItems, {...product, quantity: 1 }],
            });
        }
    },

    removeFromCart: (productId) => {
        const { cartItems } = get();
        set({
            cartItems: cartItems.filter((item) => item.id !== productId),
        });
    },

    decreaseQuantity: (productId) => {
        const { cartItems } = get();
        const existingItem = cartItems.find((item) => item.id === productId);

        if (existingItem && existingItem.quantity > 1) {
            set({
                cartItems: cartItems.map((item) =>
                    item.id === productId ?
                    {...item, quantity: item.quantity - 1 } :
                    item
                ),
            });
        } else if (existingItem && existingItem.quantity === 1) {
            get().removeFromCart(productId);
        }
    },

    getCartItemCount: () => {
        const { cartItems } = get();
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    },

    getCartTotal: () => {
        const { cartItems } = get();
        return cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
    },

    // Cartni tozalash
    clearCart: () => {
        set({ cartItems: [] });
    },
}));