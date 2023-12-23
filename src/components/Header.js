import '../App.css';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/IconButton';
import { useProduct } from './ProductContext';
import { useNavigate } from 'react-router-dom';


const Header = () => {
    const { cart } = useProduct();
    const itemsCount = cart.items.reduce((total, item) => total + item.quantity, 0);
    const navigate = useNavigate();
    return (
        <div className='d-flex justify-content-between align-items-center w-100 m-0 p-2 px-4  header mb-4'>
            <h2>Hi-fi Shopping</h2>
            <div className='d-flex justify-content-center align-items-center '>
                <IconButton aria-label="cart" color='inherit' onClick={() => navigate('/')}> 🏛 </IconButton>
                <IconButton aria-label="cart" color='inherit' onClick={() => navigate('/cart')}>
                    <Badge badgeContent={itemsCount} color="secondary">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
            </div>
        </div>
    )
}

export default Header;