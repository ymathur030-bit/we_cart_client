import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addtocart, clearcart, removefromcart } from '../redux/cartslice';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const cartData = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartTotal = cartData.reduce((total, item) => {
    return total + Number(item.price) * item.quantity;
  }, 0);

  const totalItems = cartData.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  const handleClearCart = () => {
    dispatch(clearcart());
    toast.success('Cart cleared successfully', {
      duration: 2000,
      style: {
        borderRadius: '10px',
        background: '#fff',
        color: '#198754',
      },
    });
  };

  const formatPrice = (price) => {
    return `₹${Number(price).toFixed(2)}`;
  };


  return (
    <div className="container py-4 py-md-5">
      <Toaster position="top-right" />

      {/* Page Heading */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1"><i className="fa-solid fa-bag-shopping me-2 text-success"></i>Shopping Cart</h2>
          <p className="text-muted mb-0">Review your items before checkout</p>
        </div>

        {
          cartData.length > 0
          &&
          (
            <span className="badge bg-success rounded-pill px-3 py-2 fs-6"> {totalItems} Items </span>
          )
        }
      </div>

      {/* Empty Cart */}
      {cartData.length === 0 ? (
        <div className="card border-0 shadow-sm rounded-4 text-center p-4 p-md-5">
          <div className="mb-3">
            <i className="fa-solid fa-cart-shopping text-secondary" style={{ fontSize: '70px' }}></i>
          </div>

          <h3 className="fw-bold">Your cart is empty</h3>
          <p className="text-muted">Looks like you haven't added any products yet.</p>

          <div>
            <button className="btn btn-success px-4 py-2 rounded-pill" onClick={() => window.history.back()}>
              <i className="fa-solid fa-arrow-left me-2"></i>
              Continue Shopping
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="row g-4">
            {/* Product List */}
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-header bg-white border-0 p-3 p-md-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="fw-bold mb-0">Cart Items</h5>

                    <button className="btn btn-outline-danger btn-sm rounded-pill px-3" onClick={handleClearCart}>
                      <i className="fa-regular fa-trash-can me-2"></i> Clear Cart
                    </button>
                  </div>
                </div>

                <div className="card-body p-3 p-md-4">
                  {cartData.map((item) => (
                    <div className="row align-items-center g-3 border rounded-3 p-3 mb-3 cart-item" key={item.id}>
                      {/* Product Image */}
                      <div className="col-4 col-sm-3 col-md-3 text-center">
                        <img src={item.image} alt={item.title} className="img-fluid" style={{ height: '100px', maxWidth: '100%', objectFit: 'contain', }} />
                      </div>

                      {/* Product Details */}
                      <div className="col-8 col-sm-9 col-md-9">
                        <h6 className="fw-bold mb-2"> {item.title}</h6>

                        <p className="text-muted small mb-2">Unit price: {formatPrice(item.price)}</p>

                        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                          {/* Quantity Controls */}
                          <div className="d-flex align-items-center border rounded-pill p-1">
                            <button
                              className="btn btn-sm btn-light rounded-circle"
                              aria-label={`Decrease quantity of ${item.title}`}
                              onClick={() => dispatch(removefromcart(item))}
                              style={{ width: '32px', height: '32px' }}
                            >
                              <i className="fa-solid fa-minus"></i>
                            </button>

                            <span className="fw-bold px-3">{item.quantity}</span>

                            <button
                              className="btn btn-sm btn-light rounded-circle"
                              aria-label={`Increase quantity of ${item.title}`}
                              onClick={() => dispatch(addtocart(item))}
                              style={{ width: '32px', height: '32px' }}
                            >
                              <i className="fa-solid fa-plus"></i>
                            </button>
                          </div>

                          {/* Product Total */}
                          <h6 className="fw-bold text-success mb-0">{formatPrice(item.price * item.quantity)}</h6>
                        </div>
                      </div>
                    </div>
                  ))}

                  <button className="btn btn-outline-secondary rounded-pill mt-2" onClick={() => window.history.back()}>
                    <i className="fa-solid fa-arrow-left me-2"></i>Continue Shopping
                  </button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm rounded-4 order-summary">
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-4">Order Summary</h5>

                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">Subtotal ({totalItems} items)</span>
                    <span className="fw-semibold">{formatPrice(cartTotal)}</span>
                  </div>

                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">Shipping</span>
                    <span className="text-success fw-semibold">Free</span>
                  </div>

                  <hr />

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <span className="fw-bold">Grand Total</span>
                    <h4 className="text-success fw-bold mb-0">{formatPrice(cartTotal)}</h4>
                  </div>

                  <button
                    className="btn btn-success w-100 py-3 rounded-pill fw-bold"
                    // onClick={() => {toast('Checkout functionality is coming soon!', { icon: '🛒', });}}
                    onClick={() => navigate('/checkout')}
                  >
                    Proceed to Checkout
                    <i className="fa-solid fa-arrow-right ms-2"></i>
                  </button>

                  <p className="text-muted text-center small mt-3 mb-0">
                    <i className="fa-solid fa-shield-halved me-1"></i>
                    Secure checkout experience
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;

// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { addtocart, clearcart, removefromcart } from '../redux/cartslice';
// import toast, { Toaster } from 'react-hot-toast';

// function Cart() {

//   const cartData = useSelector((state) => state.cart);
//   const dispatch = useDispatch();


//   const cartTotal = cartData.reduce((total, item) => {
//     return total + item.price * item.quantity;
//   }, 0);

//   const handleClearCart = () => {
//     dispatch(clearcart())
//     toast.success("Cart cleared successfully", {
//       duration: 2000,
//       style: {
//         borderRadius: '10px',
//         background: '#fff',
//         color: '#f00',
//       }
//     });
//   }


//   return (
//     <>
//       <Toaster position="top-right" />

//       {
//         cartData.length === 0
//           ?
//           (
//             <div className="container rounded shadow p-4">
//               <h1 className="text-center text-danger">
//                 <i class="fa-solid fa-trash"></i> Empty Cart
//               </h1>
//             </div>
//           )
//           :
//           (
//             <div className='container rounded shadow p-4'>
//               <h1 className='rounded shadow py-4 text-center'>Cart Detail</h1>

//               <div className="container bg-dark text-white py-2 my-2 rounded border" id="cartheader">
//                 <div className="row">
//                   <div className="col-md-2 d-flex justify-content-center align-items-center fw-bold">Image</div>
//                   <div className="col-md-2 d-flex justify-content-center align-items-center fw-bold">Title</div>
//                   <div className="col-md-2 d-flex justify-content-center align-items-center fw-bold">Quantity</div>
//                   <div className="col-md-2 d-flex justify-content-center align-items-center fw-bold">Price</div>
//                   <div className="col-md-2 d-flex justify-content-center align-items-center fw-bold">Total</div>
//                   <div className="col-md-2 d-flex justify-content-center align-items-center">
//                     <button className='btn btn-sm p-2 bg-danger text-white d-flex ms-auto me-3' id='clearcart' onClick={handleClearCart}>
//                       <i class="fa-solid fa-trash"></i>
//                     </button>
//                   </div>

//                 </div>
//               </div>

//               {
//                 // cartData.map((item, index) => console.log("item is", item))
//                 cartData.map((item, index) => {
//                   return (
//                     <div className="container px-4" key={index}>

//                       <div className="row my-4 border py-3 rounded">
//                         <div className="col-md-2 px-5"><img src={item.image} alt={item.image} style={{ height: '70px' }} /></div>
//                         <div className="col-md-3 d-flex justify-content-center align-items-center fw-bold">{item.title}</div>
//                         <div className="col-md-3 d-flex justify-content-center align-items-center fw-bold">
//                           <button className='btn btn-sm btn-danger px-3 me-3' onClick={() => { dispatch(removefromcart(item)) }}> - </button>
//                           {item.quantity}
//                           <button className='btn btn-sm btn-success px-3 ms-3' onClick={() => { dispatch(addtocart(item)) }}> + </button>
//                         </div>
//                         <div className="col-md-2 d-flex justify-content-center align-items-center fw-bold text-danger">{item.price}</div>
//                         <div className="col-md-2 d-flex justify-content-center align-items-center fw-bold text-success ">{item.price * item.quantity}</div>
//                       </div>


//                     </div>

//                   )
//                 })
//               }


//               <div className="container">
//                 <div className="row mt-4 border-top p-3">
//                   <div className="col-md-6 text-start"><h3>Grand Total:</h3></div>
//                   <div className="col-md-6 text-end"><h3 className="text-success">₹{cartTotal.toFixed(2)}</h3></div>
//                 </div>
//               </div>


//             </div>

//           )
//       }

//     </>
//   )
// }

// export default Cart