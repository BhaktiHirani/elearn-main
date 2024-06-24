// Login.jsx
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login({ onLoginSuccess }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    let errors = {};
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email address is invalid';
    }
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }
    return errors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully!");
      
          onLoginSuccess(); 
      
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
      <div className="card p-4 animate__animated animate__fadeIn" style={{ backgroundSize: 'cover' }}>
        <div className="row">
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <img src={'https://asset.gecdesigns.com/img/background-templates/isometric-e-learning-background-template-1612282245987-cover.webp'} alt="Background" className="img-fluid" />
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Welcome Back!</h2>
              <div className="form-wrapper">
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      className={`form-control ${errors.email && 'is-invalid'}`}
                      id="email"
                      placeholder="Enter Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      className={`form-control ${errors.password && 'is-invalid'}`}
                      id="password"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                  </div>
                  <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
              </div>
              <div className="mt-3 text-center">
                <a href="/forgotpassword">Forgot password?</a>
              </div>
              <div className="mt-3 text-center">
                Don't have an account? <a href="/signup">Sign Up</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login  ; // Wrap the component with withRouter
