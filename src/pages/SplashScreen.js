// Анімація завантаження сайту

import React from "react";
import "../styles/SplashScreen.css";
import logoUrl from "../img/logo.png"; // <-- шлях до емблеми

const SplashScreen = () => {
  return (
    <div className="splash-screen">
      <img src={logoUrl} alt="BigSport" className="logo-img" />
      <div className="loader"></div>
    </div>
  );
};

export default SplashScreen;

    