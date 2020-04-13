import React, { createContext, useState, useEffect } from "react";

const context = createContext(null);

const UserProvider = ({ children }) => {
  const [userData, setUser] = useState(null);

  useEffect(() => {
    fetch(`/api/user`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((er) => console.log(er));
  }, []);

  const fetchUser = async (id) => {
    const res = await fetch(`/api/user/${id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    });
    const data = await res.json();
    return data;
  };

  const updateStatus = (status, id) => {
    fetch(`/api/mark/status/${id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ status, id }),
    }).then((res) => {
      if (res.status === 200) {
        window.location.reload();
      }
    });
  };

  const isMobile = () => {
    const wWidth = window.innerWidth;
    return wWidth <= 414;
  };

  return (
    <context.Provider value={{ userData, fetchUser, updateStatus, isMobile }}>
      {children}
    </context.Provider>
  );
};

UserProvider.context = context;

export default UserProvider;
