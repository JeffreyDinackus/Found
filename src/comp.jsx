import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Navbar from './navbar';



const ConditionalElement = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();




  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>Welcome, authenticated user!</p>
          {/* Your authenticated content goes here */}
          <Navbar></Navbar>
          <textarea type="text" style={{ width: "100%", height: "600px" }} />


        </>
      ) : (
        <>
          <p>You are not authenticated. Please log in.</p>
          {/* <button onClick={() => loginWithRedirect()}>Log In</button> */}





        </>
      )}
    </div>
  );
};

export default ConditionalElement;
