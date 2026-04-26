// Анімація завантаження сайту

import React from "react";
import "../styles/SplashScreen.css";
import logoUrl from "../img/logo.png";

const SplashScreen = ({ hide = false }) => {
  return (
    <div className={`splash ${hide ? "splash--hide" : ""}`}>
      <div className="splash__orb splash__orb--one" />
      <div className="splash__orb splash__orb--two" />
      <div className="splash__grid" />

      <div className="splash__content" role="status" aria-live="polite">
        <div className="splash__logoBox">
          <div className="splash__ring" />
          <img src={logoUrl} alt="BigSPORT" className="splash__logo" />
        </div>

        <h1 className="splash__title">BigSPORT</h1>

<span className="splash__version">v5.0</span>

<p className="splash__subtitle">
  Спортивні новини України та світу
</p>

        <div className="splash__loader">
          <span />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;

    