import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Avatar from "../UI/Avatar";
import UserProvider from "../contexts/UserProvider";
import AuthHandler from "../components/AuthHandler";
import MarksCollection from "../components/MarksCollection";

const MePage = () => {
  let { userData, fetchUser } = useContext(UserProvider.context);
  const [user, setUser] = useState(null);
  const [marks, setMarks] = useState(null);
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    if (!userData) return;
    const userId = userData.user._id;
    fetchUser(userId).then(data => {
      const { user, marks, notes } = data;
      setMarks(marks);
      setNotes(notes);
      setUser(user);
    });
  }, [userData]);

  if (!userData || !user) return null;
  return (
    <div className="user-page__container">
      <div className="user-page__header">
        <Link to="/" title="home page">
          <div className="control-home"></div>
        </Link>
        <div className="user-page__logo">LOGO</div>
        <AuthHandler />
      </div>
      <Avatar avatarId={userData.user._id} />
      <div className="user-page__contacts-wrapper">
        <p className="user-page__email">Email</p>
        <input type="text" readOnly value={user.email} />
      </div>
      <div className="user-page__collected-container">
        <MarksCollection title="Infection cases" marks={marks} />
        <MarksCollection title="Infos" marks={notes} />
      </div>
    </div>
  );
};

export default MePage;
