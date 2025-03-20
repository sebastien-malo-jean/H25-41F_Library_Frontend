//CSS de la page
import "./CharacterList.css";

//importation de librairies
import { useState, useEffect } from "react";

//importation de composants
import CharacterCard from "./characterCard/characterCard";

//page
function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingText, setLoadingText] = useState(""); // Nouvelle variable d'état pour les points de "loading"

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://h25-41f-library.onrender.com/characters"
        );
        if (!response.ok) throw new Error("personnages non trouvés !");
        const charactersData = await response.json();
        setCharacters(charactersData);
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
  }, []);

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

  if (loading)
    return (
      <>
        <p>Chargement {loadingText}</p>{" "}
        {/* Affiche les points de loading dans l'UI */}
      </>
    );
  if (error) return <p>Erreur : {error}</p>;
  if (!characters.length) return <p>Aucun personnage trouvé.</p>;

  return (
    <main>
      <section>
        <h2>Liste des Personnages</h2>
        <div className="grid">
          {characters.map((character) => {
            return <CharacterCard key={character.id} character={character} />;
          })}
        </div>
      </section>
    </main>
  );
}

export default CharacterList;
