import { useState } from "react";
import "./FormAddCharacter.css";

function FormAddCharacter() {
  const [name, setName] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  function removeCompromisedChar(string) {
    let cleanedString = string
      .split("")
      .filter((char) => /[a-zA-Z0-9]/.test(char))
      .join("");
    return cleanedString;
  }

  return (
    <main>
      <h2>Création d'un Personnage</h2>
      <form action="">
        <div className="input-group">
          <label htmlFor="charVoc">Vocation du Personnage</label>
          <select name="charVoc" id="charVoc">
            <option value="">Vocation</option>
            <option value="pnj">PNJ</option>
            <option value="player">Joueur</option>
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="characterThumbnail">Image du personnage</label>
          <input
            type="text"
            name="characterThumbnail"
            id="characterThumbnail"
            disabled
            value={`${removeCompromisedChar(name.toLowerCase())}.jpg`}
          />
        </div>
        <div className="input-group">
          <label htmlFor="name">Nom du personnage</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
      </form>
    </main>
  );
}

export default FormAddCharacter;
