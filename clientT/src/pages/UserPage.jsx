import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";

import Avatar from "../UI/Avatar";
import UserProvider from "../contexts/UserProvider";
import MarksCollection from "../components/MarksCollection";

const UserPage = () => {
  let { userData, fetchUser } = useContext(UserProvider.context);
  const userId = useParams().uid;
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [marks, setMarks] = useState(null);
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    fetchUser(userId).then(data => {
      const { user, marks, notes } = data;
      setUser(user);
      setMarks(marks);
      setNotes(notes);
    });
  }, []);

  useEffect(() => {
    if (userData && userData.authenticated && userData.user._id === userId) {
      history.push("/user/me");
    }
  }, [userData]);

  if (!user) return null;

  return (
    <div className="user-page__container">
      <div className="user-page__header">
        <Link to="/" title="home page">
          <div className="control-home"></div>
        </Link>
        <div className="user-page__logo">LOGO</div>
        <a className="logout"></a>
      </div>

      <Avatar avatarId={user._id} />
      <div className="user-page__contacts-wrapper">
        <p className="user-page__email">Email</p>
        <input type="text" readOnly value={user.email} />
      </div>
      {marks && notes && (
        <div className="user-page__collected-container">
          <MarksCollection title="Infection cases" marks={marks} />
          <MarksCollection title="Infirmation notes" marks={notes} />
        </div>
      )}
    </div>
  );
};

export default UserPage;
