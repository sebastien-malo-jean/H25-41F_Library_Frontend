import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <main className="home-container">
      <section className="hero">
        <h1>Bienvenue dans l'univers des Personnages</h1>
        <p>
          Découvrez une vaste collection de personnages issus de différents
          mondes, classes et races. Filtrez, explorez et trouvez votre héros
          préféré !
        </p>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/characters")}
        >
          Explorer les Personnages
        </button>
      </section>
    </main>
  );
}

export default Home;
