import React, { useContext } from "react";

import UserProvider from "../contexts/UserProvider";

const AuthHandler = () => {
  const { userData } = useContext(UserProvider.context);

  if (!userData) return null;

  return (
    <div className="auth-controls">
      {userData.authenticated ? (
        <a href={`/api/auth/logout`} className="logout">
          Log out
        </a>
      ) : (
        <a href={`/api/auth/google`}>
          <div className="login-btn">
            <span></span>
            Sign in with Google
          </div>
        </a>
      )}
    </div>
  );
};
export default AuthHandler;
