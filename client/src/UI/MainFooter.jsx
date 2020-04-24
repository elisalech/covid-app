import React, { useContext } from "react";
import { Link } from "react-router-dom";

import UserProvider from "../contexts/UserProvider";
import AuthHandler from "../components/AuthHandler";
import Avatar from "./Avatar";
import MarkPicker from "../components/MarkPicker";
import DisplayMarksSwitcher from "./DisplayMarksSwitcher";

const MainFooter = () => {
  const { userData } = useContext(UserProvider.context);

  if (!userData) return null;

  return (
    <div className="main-footer__container">
      <DisplayMarksSwitcher />
      <div className="user-controls__wrap">
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
    </div>
  );
};

export default MainFooter;
