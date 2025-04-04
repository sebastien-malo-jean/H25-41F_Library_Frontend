import React, { useContext } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContextProvider";

function Home() {
  const navigate = useNavigate();
  const { user, loginToken } = useContext(AuthContext);

  return (
    <main className="home-container">
      <section className="hero">
        <h1>Bienvenue sur l'application de création de personnages</h1>
        <p>
          Découvrez une vaste collection de personnages issus du mondes de
          Mythall. Filtrez, explorez et trouvez votre héros préféré !
        </p>
        <div className="input-group">
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/characters")}
          >
            Voir les personnages
          </button>
          {loginToken && (
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/characters/create")}
            >
              Créer un personnage
            </button>
          )}
          {user && user.role === 0 && (
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/admin/adminpage")}
            >
              Page admin
            </button>
          )}
        </div>
      </section>
    </main>
  );
}

export default Home;
