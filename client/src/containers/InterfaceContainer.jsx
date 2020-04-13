import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import AuthHandler from "../components/AuthHandler";
import CreatePage from "../pages/CreatePage";
import MainPage from "../pages/MainPage";
import UserPage from "../pages/UserPage";
import MePage from "../pages/MePage";
import UserProvider from "../contexts/UserProvider";
import InterfaceSwitcher from "../components/InterfaceSwitcher";

function InterfaceContainer() {
  const { isMobile } = useContext(UserProvider.context);
  return (
    <div className="interface-container">
      <div className="interface-pages-wrap">
        <Switch>
          <Route path="/" exact>
            <MainPage />
          </Route>
          <Route path="/mark/new">
            <CreatePage />
          </Route>
          <Route path="/note/new">
            <CreatePage />
          </Route>
          {/* <Route path="/isolated/new">
          <CreatePage />
        </Route> */}
          <Route path="/user/me" exact>
            <MePage />
          </Route>
          <Route path="/user/:uid">
            <UserPage />
          </Route>
          <Route path="/auth" exact>
            <AuthHandler />
          </Route>
          <Route path="/mark/:id"></Route>
          <Redirect to="/" exact />
        </Switch>
      </div>
      {isMobile() && <InterfaceSwitcher />}
    </div>
  );
}

export default InterfaceContainer;
