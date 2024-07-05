import React, { useState } from 'react';
import { useAuth } from '../authprovider';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';

function ChangePassword() {
  const { currentUser } = useAuth();
  const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isOldPasswordCorrect, setIsOldPasswordCorrect] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      [name]: value,
    }));
  };

  const handleCheckOldPassword = async () => {
    try {
      const { oldPassword } = passwords;
      const credential = EmailAuthProvider.credential(currentUser.email, oldPassword);
      await reauthenticateWithCredential(currentUser, credential);
      setIsOldPasswordCorrect(true);
      setError('');
    } catch (error) {
      setIsOldPasswordCorrect(false);
      setError('Invalid old password');
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    
    const { newPassword, confirmPassword } = passwords;
    
    // Validate if passwords match
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      if (!isOldPasswordCorrect) {
        setError('Please enter your old password correctly');
        return;
      }
      
      // Update password
      await updatePassword(currentUser, newPassword);
      setSuccessMessage('Password updated successfully');
      setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      setError('Failed to update password');
      console.error('Error updating password:', error);
    }
  };
  
  return (
    <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card">
          <div className="card-header text-center">
            <h4>Change Password</h4>
          </div>
          <div className="card-body">
            {error && <div className="alert alert-danger">{error}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3 text-center">
                <label htmlFor="oldPassword" className="form-label d-block mx-auto">Old Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="oldPassword"
                  name="oldPassword"
                  value={passwords.oldPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="text-center mb-3">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleCheckOldPassword}
                  style={{ width: '180px' }} // Adjust button width
                >
                  Check Old Password
                </button>
              </div>
              {isOldPasswordCorrect && (
                <>
                  <div className="mb-3 text-center">
                    <label htmlFor="newPassword" className="form-label d-block mx-auto">New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="newPassword"
                      name="newPassword"
                      value={passwords.newPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3 text-center">
                    <label htmlFor="confirmPassword" className="form-label d-block mx-auto">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={passwords.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </>
              )}
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '180px' }} // Adjust button width
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default ChangePassword;
