import "./CharacterList.css";
import { useState, useEffect } from "react";
import CharacterCard from "../characterCard/characterCard";

function CharacterList() {
  let [characters, setCharacters] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://h25-41f-library.onrender.com/characters"
      );
      const charactersDatas = await response.json();
      setCharacters(charactersDatas);
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
