// Анімація завантаження сайту

// src/pages/SplashScreen.jsx
import React from "react";
import "../styles/SplashScreen.css";
import logoUrl from "../img/logo.png";

const SplashScreen = ({ hide = false }) => {
  return (
    <div className={`splash ${hide ? "splash--hide" : ""}`}>
      <div className="splash__bg" />
      <div className="splash__grain" />

      <div className="splash__content" role="status" aria-live="polite">
        <div className="splash__logoWrap">
          <img src={logoUrl} alt="BigSport" className="splash__logo" />
          <div className="splash__glow" />
        </div>

        <div className="splash__title" aria-hidden="true">
          <span className="glitch" data-text="BIGSPORT">BIGSPORT</span>
        </div>

        <div className="splash__sub"></div>

        <div className="progress">
          <div className="progress__bar" />
        </div>

        <div className="dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;

    