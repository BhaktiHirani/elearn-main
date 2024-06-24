import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await auth.sendPasswordResetEmail(email);
      setIsEmailSent(true);
      // Save the reset password request in Firestore
      await db.collection('passwordResetRequests').add({
        email,
        createdAt: new Date(),
      });
      toast.success('Password reset email sent successfully!', {
        position: 'top-center',
      });
    } catch (error) {
      toast.error(error.message, {
        position: 'bottom-center',
      });
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
      <div className="card p-4 animate__animated animate__fadeIn" style={{ backgroundSize: 'cover' }}>
        <div className="row">
          <div className="col-md-6">
            <img
              src={'https://asset.gecdesigns.com/img/background-templates/isometric-e-learning-background-template-1612282245987-cover.webp'}
              alt="Background"
              className="img-fluid"
            />
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Forgot Password</h2>
              {!isEmailSent ? (
                <form onSubmit={handleResetPassword}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Reset Password
                  </button>
                </form>
              ) : (
                <div>
                  <p className="text-center mb-4">Password reset email sent to {email}</p>
                  <Link to="/login" className="btn btn-primary w-100">
                    Back to Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
