import React from 'react';
import { GoogleLogin } from 'react-google-login';
import "./googleButton.scss";

const GoogleLoginButton = ({ onSuccess, onFailure, battonText }) => {
  const clientId = '383198814159-i6becmdphkpnq2b2kj94k6g6vqpu7avk.apps.googleusercontent.com';

  const handleSuccess = (response) => {
    // Handle successful login
    onSuccess(response);
  };

  const handleFailure = (error) => {
    // Handle failed login
    onFailure(error);
  };

  return (
    <GoogleLogin className='google-login-button'
      clientId={clientId}
      buttonText={battonText}
      onSuccess={handleSuccess}
      onFailure={handleFailure}
      cookiePolicy={'single_host_origin'}
     
    />
  );
};

export default GoogleLoginButton;
