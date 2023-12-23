import React, { createContext, useContext, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductContext = createContext();

const productReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const existingItem = state.items.find(item => item.id === action.payload.id);

            if (existingItem) {
                return {
                    ...state,
                    items: state.items.map(item =>
                        item.id === existingItem.id ? { ...item, quantity: item.quantity + 1 } : item
                    ),
                };
            } else {
                // If the item is not in the cart, add it with quantity 1
                return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
            }

        case 'REMOVE_FROM_CART':
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload.id),
            };

        case 'CHANGE_QUANTITY':
            const updatedItems = state.items.map(item =>
                item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
            );

            // Remove items with quantity 0
            const filteredItems = updatedItems.filter(item => item.quantity > 0);

            return {
                ...state,
                items: filteredItems,
            };

        default:
            return state;
    }
};

const ProductProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(productReducer, { items: [] });
    const navigate = useNavigate()
    const addToCart = (item) => {
        dispatch({ type: 'ADD_TO_CART', payload: item });
        navigate('/cart')
    };

    const removeFromCart = (item) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: item });
    };

    const changeQuantity = (item, newQuantity) => {
        dispatch({ type: 'CHANGE_QUANTITY', payload: { id: item.id, quantity: newQuantity } });
    };

    return (
        <ProductContext.Provider value={{ cart, addToCart, removeFromCart, changeQuantity }}>
            {children}
        </ProductContext.Provider>
    );
};

const useProduct = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProduct must be used within a ProductProvider');
    }
    return context;
};

export { ProductProvider, useProduct };
