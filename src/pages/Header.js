import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import { auth, db } from '../firebase';
import PasswordModal from '../registration/PasswordModal';
import RegistrationModal from '../registration/RegistrationModal';
import SearchBar from '../components/SearchBar';
import Menu from './Menu';
import MobileMenu from './MobileMenu';

import logo from '../img/logo.png';
import '../styles/Header.css';

const Header = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (!currentUser) {
        setUserData(null);
        return;
      }

      const snap = await getDoc(doc(db, 'users', currentUser.uid));
      setUserData(snap.exists() ? snap.data() : null);
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setUserData(null);
  };

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <div className="header-left">
            <div className="header-logo-wrap" onClick={() => navigate('/')}>
              <img src={logo} alt="BigSport" className="header-logo" />
            </div>

            <button
              className={`burger-btn ${mobileMenuOpen ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Відкрити меню"
            >
              <span />
              <span />
              <span />
            </button>
          </div>

          <div className="header-right">
            <div className="header-topbar">
              <div className="topbar-right">
                <div className="desktop-topbar-links">
                  <Link to="/about" className="topbar-link">
                    Про нас
                  </Link>

                  <Link to="/authors-ranking" className="topbar-link">
                    Рейтинг
                  </Link>
                </div>

                <div className="topbar-search">
                  <SearchBar />
                </div>

                <div className="desktop-auth">
                  {userData ? (
                    <div className="topbar-auth">
                      <span className="topbar-username">{userData.username}</span>

                      {userData.role === 'admin' && (
                        <button
                          className="btn btn--primary btn--sm"
                          onClick={() => navigate('/admin')}
                        >
                          Адмінпанель
                        </button>
                      )}

                      <button
                        className="btn btn--ghost btn--sm"
                        onClick={() => navigate(`/profile/${user?.uid}`)}
                      >
                        Профіль
                      </button>

                      <button
                        className="btn btn--danger btn--sm"
                        onClick={handleLogout}
                      >
                        Вихід
                      </button>
                    </div>
                  ) : (
                    <div className="topbar-auth">
                      <button
                        className="btn btn--ghost btn--sm"
                        onClick={() => setLoginOpen(true)}
                      >
                        Вхід
                      </button>

                      <button
                        className="btn btn--secondary btn--sm"
                        onClick={() => setRegisterOpen(true)}
                      >
                        Реєстрація
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="header-menubar">
              <Menu />
            </div>
          </div>
        </div>

        <PasswordModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
        <RegistrationModal isOpen={registerOpen} onClose={() => setRegisterOpen(false)} />
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        user={user}
        userData={userData}
        onLoginOpen={() => setLoginOpen(true)}
        onRegisterOpen={() => setRegisterOpen(true)}
        onLogout={handleLogout}
        onNavigate={navigate}
      />
    </>
  );
};

export default Header;