import "./Header.css";
import { NavLink } from "react-router-dom";
import logo from "../../assets/img/logo.jpg";

function Header() {
  return (
    <header className="header">
      <picture className="header__logo">
        <img src={logo} alt="logo" className="header__logo-img" />
      </picture>
      <nav className="header__nav">
        <ul className="header__menu">
          <li className="header__menu-item">
            <NavLink to={"/"} className="header__link">
              Accueil
            </NavLink>
          </li>
          <li className="header__menu-item">
            <span className="header__dropdown">Personnages 🡇</span>
            <ul className="header__submenu">
              <li className="header__submenu-item">
                <NavLink to={"/characters"} className="header__link">
                  Liste des personnages
                </NavLink>
              </li>
              <li className="header__submenu-item">
                <NavLink to={"/characters/create"} className="header__link">
                  Création de personnage
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <h1 className="header__title">Créateur de personnage</h1>
    </header>
  );
}

export default Header;
