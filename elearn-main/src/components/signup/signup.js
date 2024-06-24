import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { setDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './signup.css'; // Import custom CSS for styling

function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const validate = () => {
    let errors = {};
    if (!fullName.trim()) errors.fullName = 'Full name is required';
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email address is invalid';
    }
    if (!password.trim()) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }
    if (!confirmPassword.trim()) {
      errors.confirmPassword = 'Confirm Password is required';
    } else if (confirmPassword !== password) {
      errors.confirmPassword = 'Passwords do not match';
    }
    return errors;
  };

  const handleInputChange = (field, value) => {
    switch (field) {
      case 'fullName':
        setFullName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      toast.error('Please fix the errors before submitting.', {
        position: "bottom-center",
      });
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          fullname: fullName,
        });
      }
      console.log("User registered successfully");
      toast.success("User Registered Successfully!", {
        position: "top-center",
      });
      navigate('/login'); // Use navigate to redirect to the login page
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  const isFormValid = () => {
    const validationErrors = validate();
    return Object.keys(validationErrors).length === 0 && agreeToTerms;
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
              <h2 className="card-title text-center mb-4">Sign Up</h2>
              <form onSubmit={handleSignup}>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    placeholder="Enter Your Fullname"
                    value={fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    required
                  />
                </div>
                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="agreeToTerms"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    required
                  />
                  <label className="form-check-label" htmlFor="agreeToTerms" required>I agree to the Terms and Conditions</label>
                </div>
                <button 
  type="submit" 
  className="btn btn-primary w-100 custom-btn" 
  disabled={!isFormValid()} 
  style={{ backgroundColor: '#17bf9e', borderColor: '#17bf9e' }}
>
  Sign Up
</button>
              </form>
              <div className="mt-3 text-center">
                Already have an account? <a href="/login">Login</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
