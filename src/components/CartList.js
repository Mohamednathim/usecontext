import React from 'react';
import '../App.css';
import { useProduct } from './ProductContext';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';

const CartList = () => {
    const { cart, removeFromCart, changeQuantity } = useProduct();
    const navigate = useNavigate()

    return (
        <>
            <h2 className='cart-heading'>Shopping Cart</h2>
            {cart.items.length === 0 ? (
                <h3 className='empty'><b>Your Cart is Empty...😉</b></h3>
            ) : (
                <div className='d-flex flex-wrap w-100 justify-content-center align-items-center'>

                    {cart.items.map((item) =>
                        <div key={item.id} className='card d-flex justify-content-center align-items-center text-center border-0 m-4 p-4'>
                            <img src={item.thumbnail} alt={item.title} width='100%' height='300px' />
                            <div className='card-body cart-body'>
                                <p className='card-title'><b>Title : {item.title}</b></p>
                                <p className='card-title'><b>Price: ${item.price}</b></p>
                                <div className='d-flex align-items-center justify-content-center flex-wrap'>
                                    <IconButton size='small' color='error' onClick={() => changeQuantity(item, item.quantity - 1)} > ➖</IconButton>
                                    <p className='card-title'><b>{item.quantity}</b></p>
                                    <IconButton size='small' color='success' onClick={() => changeQuantity(item, item.quantity + 1)}  >  ➕ </IconButton>
                                </div>
                                <p className='card-title'><b>Total Quantity : {item.quantity}</b></p>
                                <p className='card-title'><b>Shipping : FREE🎁 </b></p>
                                <p className='card-title'><b>Total Amount : ${item.price * item.quantity}</b></p>
                                <div className='d-flex justify-content-center align-items-center '>
                                    <IconButton size='large' color='primary' onClick={() => alert(`${item.title} Ordered Successfully...👍🏻 `)} >
                                        <ShoppingCartIcon />
                                    </IconButton>
                                    <IconButton size='large' color='error' onClick={() => removeFromCart(item)} >
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            </div>
                        </div >
                    )}
                </div >

            )}
            <div className='d-flex justify-content-center align-items-center'>
                <IconButton size='large' color='primary' onClick={() => navigate('/')}>🔙</IconButton>
            </div>
        </>
    );
};

export default CartList;
