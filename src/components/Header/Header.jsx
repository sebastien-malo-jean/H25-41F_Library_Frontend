//import du Css pour le header
import "./header.css";
//importation des routes
import { NavLink, Link } from "react-router-dom";
//importation du logo
import logo from "../../assets/img/logo.jpg";
function Header() {
  return (
    <header>
      <picture>
        <img src={logo} alt="logo" />
      </picture>
      <nav>
        <ul>
          <li>
            <NavLink to={"/"}>Accueil</NavLink>
          </li>
          <li>
            Personnages 🡇
            <ul>
              <li>
                <NavLink to={"/characters"}>Liste des personnages</NavLink>
              </li>
              <li>
                <NavLink to={"/characters/create"}>
                  Création de personnage
                </NavLink>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">À propos</a>
          </li>
        </ul>
      </nav>
      <h1>Créateur de personnage</h1>
    </header>
  );
}

export default Header;
