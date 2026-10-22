
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Products from './components/Products';
import Checkout from './components/Checkout';
import Cart from './components/Cart';
import Register from './components/Register';
import LoginPage from './components/LoginPage';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { userData, logout } from './redux/userslice';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      dispatch(logout());
      return;
    }

    const getUser = async () => {
      try {
        const res = await axios.get('http://localhost:1300/api/user', { headers: { Authorization: `Bearer ${token}` } });
        dispatch(userData(res.data.user));
      } catch (err) {
        console.log('User authentication failed:', err.response?.data || err.message);
        dispatch(logout());
        navigate('/login');
      }
    };

    getUser();
  }, [dispatch, navigate]);

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;
