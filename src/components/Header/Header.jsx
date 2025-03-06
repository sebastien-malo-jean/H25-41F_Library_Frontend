import "./header.css";
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
            <a href="#">Accueil</a>
          </li>
          <li>
            Personnages 🡇
            <ul>
              <li>
                <a href="#">Liste des personnages</a>
              </li>
              <li>
                <a href="#">Création d'un nouveau personnage</a>
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
