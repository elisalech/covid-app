import React, { useContext, useEffect, useState } from "react";

import UserProvider from "../contexts/UserProvider";

// import GOOGLE_BUTTON from "./google_button.png";
// const SERVER = "http://localhost:5000/api";
// test

const AuthHandler = (props) => {
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
