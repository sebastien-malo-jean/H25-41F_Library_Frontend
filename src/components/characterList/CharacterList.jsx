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
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;
  if (!characters) return <p>Aucun personnage trouvé.</p>;

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
