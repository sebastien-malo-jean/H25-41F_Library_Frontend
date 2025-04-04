//css
import "./CharacterDetails.css";
//bibliotheque
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import pour récupérer l'ID
import { AuthContext } from "../AuthContext/AuthContextProvider";
//composants
import CharacterDetail__right from "./CharacterDetail__right/CharacterDetail__right";

function CharacterDetails() {
  const navigate = useNavigate();
  const { id } = useParams(); // Récupère l'ID depuis l'URL
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingText, setLoadingText] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://h25-41f-library.onrender.com/characters/${id}`
        );
        if (!response.ok) throw new Error("Personnage non trouvé !");
        const characterData = await response.json();
        setCharacter(characterData.character);
      } catch (err) {
        setError(err.message);
      } finally {
        // Ajout d'un délai pour ralentir l'affichage des personnages
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      }
    }
    fetchData();
  }, [id]); // Exécute la requête à chaque changement d’ID

  // Fonction pour afficher les points de "loading"
  useEffect(() => {
    let sentence = "";
    const intervalId = setInterval(() => {
      if (sentence.length < 3) {
        sentence += ".";
      } else {
        sentence = ".";
      }
      setLoadingText(sentence);
    }, 300);

    // Nettoyage de l'intervalle lorsque le composant est démonté
    return () => clearInterval(intervalId);
  }, []); // Ce useEffect ne se déclenche qu'une seule fois au montage du composant

  async function destroy() {
    const objRequest = {
      method: "DELETE",
    };
    const response = await fetch(
      `https://h25-41f-library.onrender.com/characters/${id}`,
      objRequest
    );

    if (response.ok == true) {
      navigate("/characters");
    }
  }

  if (loading) return <p>Chargement {loadingText}</p>;
  if (error) return <p>Erreur : {error}</p>;
  if (!character) return <p>Aucun personnage trouvé.</p>;

  return (
    <main className={`characterDetail__main ${character.race}`}>
      <h2>Détail du personnage</h2>
      <section className={`characterDetail ${character.class}`}>
        <section className="characterDetail__title">
          <h3>{character.name}</h3>
        </section>
        <section className="characterDetail__left">
          <picture className="characterPicture">
            <img
              src={`/src/assets/img/characters/${character.characterThumbnail}`}
              alt={character.name}
            />
          </picture>
          <section className="CharacterHitpoints">
            <h3>Point de vie</h3>
            <p>
              <strong>Point de vie total :</strong>{" "}
              {character.hitPoints.totalHp}
            </p>
            <p>
              <strong>Point de vie acutel :</strong>{" "}
              {character.hitPoints.currentHp}
            </p>
          </section>
        </section>
        <CharacterDetail__right key={character.id} character={character} />
        <section className="characterDetail__description">
          <h3>Description</h3>
          <p>{character.description}</p>
        </section>
      </section>
      {user && user.role === 0 && (
        <section className="btn-section">
          <button type="button" className="btn btn-danger" onClick={destroy}>
            supprimer
          </button>
        </section>
      )}
    </main>
  );
}

export default CharacterDetails;
