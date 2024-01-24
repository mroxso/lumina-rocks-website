import { useState } from 'react';
import { Button } from 'react-bootstrap';

const LoginButton = () => {
  const [isLoginInProgress, setLoginInProgress] = useState(false);

  const handleLogin = () => {
    if (!isLoginInProgress) {
      setLoginInProgress(true);
      // window.nostr.getPublicKey();

      // Reset the login status after a specific amount of time
      setTimeout(() => {
        setLoginInProgress(false);
      }, 5000);
    }
  };

  return (
    <Button onClick={handleLogin}>Login</Button>
  );
};

export default LoginButton;