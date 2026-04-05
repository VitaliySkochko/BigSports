import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

const MobileMenu = ({
  isOpen,
  onClose,
  user,
  userData,
  onLoginOpen,
  onRegisterOpen,
  onLogout,
  onNavigate,
}) => {
  return (
    <div className={`mobile-menu-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div
        className={`mobile-menu-drawer ${isOpen ? 'open' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mobile-menu-header">
          <span className="mobile-menu-title">Меню</span>
          <button className="mobile-menu-close" onClick={onClose} aria-label="Закрити меню">
            ✕
          </button>
        </div>

        <div className="mobile-menu-content">
          <div className="mobile-menu-search">
            <SearchBar />
          </div>

          <div className="mobile-menu-links">
            <button
              className="mobile-menu-link"
              onClick={() => {
                onNavigate('/');
                onClose();
              }}
            >
              Головна
            </button>

            <button
              className="mobile-menu-link"
              onClick={() => {
                onNavigate('/football-ukraine');
                onClose();
              }}
            >
              Футбол України
            </button>

            <button
              className="mobile-menu-link"
              onClick={() => {
                onNavigate('/championships');
                onClose();
              }}
            >
              Чемпіонати
            </button>

            <button
              className="mobile-menu-link"
              onClick={() => {
                onNavigate('/eurocups');
                onClose();
              }}
            >
              Єврокубки
            </button>

            <button
              className="mobile-menu-link"
              onClick={() => {
                onNavigate('/biathlon');
                onClose();
              }}
            >
              Біатлон
            </button>

            <button
              className="mobile-menu-link"
              onClick={() => {
                onNavigate('/sports');
                onClose();
              }}
            >
              Види спорту
            </button>

            <button
              className="mobile-menu-link"
              onClick={() => {
                onNavigate('/tournaments');
                onClose();
              }}
            >
              Турніри
            </button>

            <Link to="/about" className="mobile-menu-link" onClick={onClose}>
              Про нас
            </Link>

            <Link to="/authors-ranking" className="mobile-menu-link" onClick={onClose}>
              Рейтинг
            </Link>
          </div>

          <div className="mobile-menu-auth">
            {userData ? (
              <>
                <div className="mobile-menu-user">{userData.username}</div>

                {userData.role === 'admin' && (
                  <button
                    className="btn btn--primary"
                    onClick={() => {
                      onNavigate('/admin');
                      onClose();
                    }}
                  >
                    Адмінпанель
                  </button>
                )}

                <button
                  className="btn btn--ghost"
                  onClick={() => {
                    onNavigate(`/profile/${user?.uid}`);
                    onClose();
                  }}
                >
                  Профіль
                </button>

                <button
                  className="btn btn--danger"
                  onClick={() => {
                    onLogout();
                    onClose();
                  }}
                >
                  Вихід
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn btn--ghost"
                  onClick={() => {
                    onLoginOpen();
                    onClose();
                  }}
                >
                  Вхід
                </button>

                <button
                  className="btn btn--secondary"
                  onClick={() => {
                    onRegisterOpen();
                    onClose();
                  }}
                >
                  Реєстрація
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;