//CSS de la page
import "./CharacterList.css";

//importation de librairies
import { useState, useEffect } from "react";

//importation de composants
import CharacterCard from "../characterCard/characterCard";

//page
function CharacterList() {
  let [characters, setCharacters] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://h25-41f-library.onrender.com/characters"
      );
      const charactersData = await response.json();
      setCharacters(charactersData);
    }
    fetchData();
  }, []);

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
