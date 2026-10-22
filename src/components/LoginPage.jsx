
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { userData } from '../redux/userslice';

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({ email: '', password: '' });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading)
      return;

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:1300/api/login', formData);
      const { token, user, message } = response.data;

      if (!token) {
        toast.error('Login response does not contain a token');
        return;
      }

      // Save token as a plain string
      localStorage.setItem('token', token);
      let loggedInUser = user;

      // Fetch user details if login response does not contain user data
      if (!loggedInUser) {
        const userResponse = await axios.get('http://localhost:1300/api/user', { headers: { Authorization: `Bearer ${token}` } }
        );
        loggedInUser = userResponse.data.user;
      }

      if (!loggedInUser) {
        throw new Error('User details were not returned by the server');
      }

      // Update Redux store and localStorage user data
      dispatch(userData(loggedInUser));

      toast.success(message || 'Login successful!', { duration: 2000 });
      navigate('/');
    } catch (error) {
      // Clear invalid or incomplete login state
      localStorage.removeItem('token');

      toast.error(error.response?.data?.message || error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />

      <div className="container p-4 shadow rounded mt-5 mb-5">
        <h2 className="alert alert-dark text-center p-2 mb-5 text-uppercase rounded shadow">Login Form</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" name="email" className="form-control mb-4" placeholder="Enter email" value={formData.email} onChange={handleChange} required />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" className="form-control mb-4" placeholder="Enter password" value={formData.password} onChange={handleChange} required />

          <button type="submit" className="btn btn-sm btn-outline-dark fw-bold w-25 d-block m-auto mb-3 text-uppercase" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>

        </form>

        <span>Don't have an account? </span>
        <Link to="/register" className="text-primary fw-bold text-decoration-none">Register here</Link>
      </div>
    </>
  );
}

export default LoginPage;
