import React from 'react';
import GoogleLoginButton from './googleButton';

const LoginPageWithGoogle = ({textOfbutton}) => {
  const handleGoogleLoginSuccess = (response) => {
    // Send the OAuth token to your server for backend authentication
    console.log('Google login successful:', response);
  };

  const handleGoogleLoginFailure = (error) => {
    console.error('Google login failed:', error);
  };

  return (
    <div style={{marginTop:"20px"}}>
     
      <GoogleLoginButton
       battonText={textOfbutton}
        onSuccess={handleGoogleLoginSuccess}
        onFailure={handleGoogleLoginFailure}
      />
    </div>
  );
};

export default LoginPageWithGoogle;
