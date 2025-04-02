import "./Header.css";
import { NavLink } from "react-router-dom";
import { useRef, useState } from "react";
import logo from "../../assets/img/logo.jpg";

function Header() {
  const formRef = useRef();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function sendForm(event) {
    //bloquer l'envoi
    event.preventDefault();
    //récupération du body
    const { email, password } = formRef.current;
    const body = { email: email.value, password: password.value };

    const options = {
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
    };
    let URL = "https://h25-41f-library.onrender.com/users/connection";
    setIsLoading(true);
    setError(null);
    //validation des champs
    //envoyer
    try {
      const response = await fetch(URL, options);
      if (!response.ok) {
        //sinon on affiche une erreur
        throw new error("la connexion a échoué.");
      }
      //Si la connexion est bonne, on sauvegarde l'info
      const datas = await response.json();
      console.log(datas);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

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
      <form
        ref={formRef}
        className="header__connectionForm"
        onSubmit={sendForm}
      >
        <h1 className="header__title">Créateur de personnage</h1>
        <div className="input-group">
          <label htmlFor="email">Courriel</label>
          <input type="email" name="email" id="email" required />
        </div>
        <div className="input-group">
          <label htmlFor="password">Mot de passe</label>
          <input type="password" name="password" id="password" required />
        </div>
        <input
          type="submit"
          value={isLoading ? "Chargement..." : "Connexion"}
          disabled={isLoading}
        />
        {error && <p className="error-message">{error}</p>}
        {/* affiche les messages d'érreurs */}
      </form>
      <div className="header__button">Déconnexion</div>
    </header>
  );
}

export default Header;
