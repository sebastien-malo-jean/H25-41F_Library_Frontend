import { useState, useEffect } from "react";

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
      <h2>Liste des Personnages</h2>
      <div className="grid">
        {characters.map((character) => {
          return <div key={character.id}>{character.name}</div>;
        })}
      </div>
    </main>
  );
}

export default CharacterList;
