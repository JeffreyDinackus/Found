import { useAuth0 } from "@auth0/auth0-react";
import './App.css';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button className='start-button' onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;