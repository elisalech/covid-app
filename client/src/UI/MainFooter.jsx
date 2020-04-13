import React, { useContext } from "react";
import { Link } from "react-router-dom";

import UserProvider from "../contexts/UserProvider";
import AuthHandler from "../components/AuthHandler";
import Avatar from "./Avatar";
import MarkPicker from "../components/MarkPicker";

const MainFooter = () => {
  const { userData } = useContext(UserProvider.context);

  if (!userData) return null;

  return (
    <div className="main-footer__container">
      {userData.authenticated ? (
        <>
          <Link className="avatar" to="/user/me" title="/user/me">
            <Avatar avatarId={userData.user._id} />
          </Link>
          <MarkPicker />
        </>
      ) : (
        <AuthHandler />
      )}
    </div>
  );
};

export default MainFooter;
