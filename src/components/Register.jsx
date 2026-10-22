import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    contact: '',
    gender: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
    });
  };

  const handleSubmit = async (e) => {
    if (formData.password !== formData.confirmPassword)
      return toast.error('Passwords does not match');

    if (!formData.terms)
      return toast.error('Please accept Terms and Conditions');

    const { confirmPassword, terms, ...data } = formData;

    try {
     const response = await axios.post(`${import.meta.env.VITE_API_URL}/signup`, data);
      toast.success(response.data.message || 'Registration successful!', {
        duration: 2000,
        style: {
          borderRadius: '10px',
          background: '#fff',
          color: '#198754',
        },
      });
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="container p-4 shadow rounded">

        <div className="bg-dark text-white text-center p-2 mb-4">
          <h2 className="text-uppercase">Sign Up Form</h2>
        </div>

        <label>Full Name</label>
        <input type="text" name="name" className="form-control mb-4" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />

        <label>Contact Number</label>
        <input type="tel" name="contact" className="form-control mb-4" placeholder="10-digit mobile number" value={formData.contact} onChange={handleChange} pattern="[0-9]{10}" maxLength="10" required />

        <label>Address</label>
        <textarea name="address" className="form-control mb-4" rows="2" placeholder="Enter address" value={formData.address} onChange={handleChange} required />

        <label>City</label>
        <input type="text" name="city" className="form-control mb-4" placeholder="Enter city" value={formData.city} onChange={handleChange} required />

        <label>Gender</label>
        <select name="gender" className="form-select mb-4" value={formData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label>Email Address</label>
        <input type="email" name="email" className="form-control mb-4" placeholder="Enter email" value={formData.email} onChange={handleChange} required />

        <label>Password</label>
        <input type="password" name="password" className="form-control mb-4" placeholder="Create password" value={formData.password} onChange={handleChange} minLength="8" required />

        <label>Confirm Password</label>
        <input type="password" name="confirmPassword" className="form-control mb-4" placeholder="Confirm password" value={formData.confirmPassword} onChange={handleChange} minLength="8" required />

        <div className="form-check my-3">
          <input type="checkbox" name="terms" id="terms" className="form-check-input" checked={formData.terms} onChange={handleChange} required />
          <label className="form-check-label" htmlFor="terms">I agree to the Terms and Conditions</label>
        </div>

        <button type="submit" className="btn btn-dark w-100 py-2 fw-bold mb-3" onClick={handleSubmit}>Create Account</button>

        <span>Already have an account? </span>
        <Link to="/login" className="text-danger fw-bold text-decoration-none">Login here</Link>
      </div>
    </>
  );
}

export default Register;
