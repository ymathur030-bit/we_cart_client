import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../redux/userslice'

function Header() {
  const cart = useSelector((state) => state.cart)
  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }


  console.log("user is on header page", JSON.stringify(user))


  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light" id="mynav">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Cart APP</Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  Cart <span className="badge bg-danger rounded-pill">{cart.length}</span>
                </Link>
              </li>

              {!user && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/register">Signup</Link>
                  </li>
                </>
              )}
            </ul>

            <div className="user-info d-flex align-items-center justify-content-between gap-3">
              {user && (
                <>
                  <div>
                    <strong>{user.name}</strong>
                    <div className="text-muted small">{user.email}</div>
                  </div>

                  <button className="btn btn-danger btn-sm" onClick={handleLogout}>
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header