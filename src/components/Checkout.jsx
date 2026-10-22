import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearcart } from '../redux/cartslice';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

function Checkout() {
  const cartData = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const [customer, setCustomer] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const cartTotal = cartData.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  const totalItems = cartData.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const formatPrice = (price) => `₹${Number(price).toFixed(2)}`;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (cartData.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }

    // Demo order ID; a real application should generate this on the backend.
    const newOrderId = `ORD-${Date.now().toString().slice(-8)}`;

    setOrderId(newOrderId);
    setOrderPlaced(true);

    // Clear the Redux cart after the demo order is placed.
    dispatch(clearcart());

    toast.success('Order placed successfully!');
  };

  return (
    <div className="container py-4 py-md-5">
      <Toaster position="top-right" />

      {/* Page Heading */}
      <div className="mb-4">
        <h2 className="fw-bold"><i className="fa-solid fa-lock text-success me-2"></i>Checkout</h2>
        <p className="text-muted">Complete your delivery details to place your order.</p>
      </div>

      {/* Order Confirmation */}
      {orderPlaced ? (
        <div className="card border-0 shadow-sm rounded-4 text-center p-4 p-md-5">
          <i className="fa-solid fa-circle-check text-success mb-3" style={{ fontSize: '70px' }}></i>
          <h2 className="fw-bold">Thank you for your order!</h2>
          <p className="text-muted">Your demo order has been placed successfully.</p>

          <p>Order ID: <strong>{orderId}</strong></p>

          <p>
            Payment method:
            <strong>
              {paymentMethod === 'COD' ? 'Cash on Delivery' : 'Online Payment (Demo)'}
            </strong>
          </p>

          <div>
            <button className="btn btn-success rounded-pill px-4 mt-3" onClick={() => navigate('/')} >
              <i className="fa-solid fa-house me-2"></i>Continue Shopping
            </  button>
          </div>
        </div>
      ) : cartData.length === 0 ? (
        <div className="card border-0 shadow-sm rounded-4 text-center p-5">
          <i className="fa-solid fa-cart-shopping text-secondary mb-3" style={{ fontSize: '65px' }} ></i>
          <h3 className="fw-bold">Your cart is empty</h3>
          <p className="text-muted"> Add some products before proceeding to checkout. </p>
          <div>
            <Link to="/" className="btn btn-success rounded-pill px-4"> Continue Shopping</Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handlePlaceOrder}>
          <div className="row g-4">
            {/* Customer Information */}
            <div className="col-lg-7">
              <div className="card border-0 shadow-sm rounded-4 mb-4">
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-4">
                    <i className="fa-solid fa-user text-success me-2"></i>
                    Customer Information
                  </h5>

                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label fw-semibold">Full Name</label>
                      <input type="text" name="fullName" className="form-control" placeholder="Enter your full name" value={customer.fullName} onChange={handleChange} autoComplete="name" required />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold"> Email Address</label>
                      <input type="email" name="email" className="form-control" placeholder="you@example.com" value={customer.email} onChange={handleChange} autoComplete="email" required />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold"> Phone Number </label>
                      <input type="tel" name="phone" className="form-control" placeholder="10-digit mobile number" value={customer.phone} onChange={handleChange} autoComplete="tel" pattern="[0-9]{10}" maxLength={10} minLength={10} required />
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="card border-0 shadow-sm rounded-4 mb-4">
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-4">
                    <i className="fa-solid fa-truck-fast text-success me-2"></i>
                    Delivery Address
                  </h5>

                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label fw-semibold">Street Address</label>
                      <textarea name="address" className="form-control" rows="3" placeholder="House number, street, area" value={customer.address} onChange={handleChange} autoComplete="street-address" required></textarea>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">City</label>
                      <input type="text" name="city" className="form-control" placeholder="Enter city" value={customer.city} onChange={handleChange} autoComplete="address-level2" required />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">State</label>
                      <input type="text" name="state" className="form-control" placeholder="Enter state" value={customer.state} onChange={handleChange} autoComplete="address-level1" required />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">PIN Code</label>
                      <input type="text" name="pincode" className="form-control" placeholder="6-digit PIN code" value={customer.pincode} onChange={handleChange} autoComplete="postal-code" pattern="[0-9]{6}" maxLength={6} minLength={6} required />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-4">
                    <i className="fa-solid fa-credit-card text-success me-2"></i>
                    Payment Method
                  </h5>

                  <label className="d-flex align-items-center border rounded-3 p-3 mb-3">
                    <input type="radio" className="form-check-input me-3" name="paymentMethod" value="COD" checked={paymentMethod === 'COD'} onChange={(e) => setPaymentMethod(e.target.value)} />

                    <span className="flex-grow-1">
                      <strong>Cash on Delivery</strong>
                      <small className="d-block text-muted">
                        Pay when your order arrives
                      </small>
                    </span>

                    <i className="fa-solid fa-money-bill-wave text-success fs-4"></i>
                  </label>

                  <label className="d-flex align-items-center border rounded-3 p-3">
                    <input type="radio" className="form-check-input me-3" name="paymentMethod" value="ONLINE" checked={paymentMethod === 'ONLINE'} onChange={(e) => setPaymentMethod(e.target.value)} />

                    <span className="flex-grow-1">
                      <strong>Online Payment</strong>
                      <small className="d-block text-muted">
                        Demo option only — no payment will be processed
                      </small>
                    </span>

                    <i className="fa-solid fa-credit-card text-primary fs-4"></i>
                  </label>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="col-lg-5">
              <div className="card border-0 shadow-sm rounded-4 checkout-summary">
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-4">Order Summary</h5>

                  {cartData.map((item) => (
                    <div className="d-flex align-items-center gap-3 mb-3" key={item.id}>
                      <img src={item.image} alt={item.title} style={{ width: '60px', height: '65px', objectFit: 'contain', }} />

                      <div className="flex-grow-1">
                        <p className="fw-semibold small mb-1">{item.title}</p>
                        <small className="text-muted">
                          Qty: {item.quantity} × {formatPrice(item.price)}
                        </small>
                      </div>

                      <strong className="small">{formatPrice(item.price * item.quantity)}</strong>
                    </div>
                  ))}

                  <hr />

                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">
                      Subtotal ({totalItems} items)
                    </span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>

                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">Shipping</span>
                    <span className="text-success">Free</span>
                  </div>

                  <hr />

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <strong>Grand Total</strong>
                    <h4 className="text-success fw-bold mb-0">
                      {formatPrice(cartTotal)}
                    </h4>
                  </div>

                  <button type="submit" className="btn btn-success w-100 py-3 rounded-pill fw-bold"> Place Order
                    <i className="fa-solid fa-arrow-right ms-2"></i>
                  </button>

                  <p className="text-muted text-center small mt-3 mb-0">
                    <i className="fa-solid fa-shield-halved me-1"></i>
                    Demo checkout — no real payment is taken
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default Checkout;