import React from "react";

import StatsGlobal from "../UI/StatsGlobal";
import MainFooter from "../UI/MainFooter";

const MainPage = () => {
  return (
    <div className="main-page__container">
      <p className="main-page__description">
        Map of Spreading Covid-19. Here you can leave points with useful info or
        cases of illness.
      </p>
      <StatsGlobal />
      <MainFooter />
    </div>
  );
};

export default MainPage;
