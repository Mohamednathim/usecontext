
import './App.css';
import Header from './components/Header';
import { ProductProvider } from './components/ProductContext';
import { Route, Routes } from 'react-router-dom';
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <ProductProvider>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
      </Routes>

    </ProductProvider>
  );
}

export default App;
