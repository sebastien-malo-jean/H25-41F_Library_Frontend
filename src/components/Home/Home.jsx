import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

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
          <button
            className="btn btn-primary"
            onClick={() => navigate("/characters/create")}
          >
            Création de personnage
          </button>
        </div>
      </section>
    </main>
  );
}

export default Home;
