import { useState } from "react";
import "./FormAddCharacter.css";
import characterClass from "../../assets/data/characterClass";
import characterRace from "../../assets/data/characterRace";
import characterAlignement from "../../assets/data/characterAlignement";
import characterStatistics from "../../assets/data/characterStats";

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
            <option value="pnj">PNJ</option>
            <option value="player">Joueur</option>
            <option value="monster">monstre</option>
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
        <div className="input-group">
          <label htmlFor="gender">Genre du Personnage</label>
          <select name="gender" id="gender">
            <option value="man">Homme</option>
            <option value="woman">Femme</option>
            <option value="uknown">Inconnu</option>
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="class">classe du Personnage</label>
          <select name="class" id="class">
            {Object.values(characterClass).map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="race">race du Personnage</label>
          <select name="race" id="race">
            {Object.values(characterRace).map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="alignement.Ethic">Alignement du Personnage</label>
          <select name="alignement.Ethic" id="alignement.Ethic">
            {characterAlignement.ethic.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>
          <select name="alignement.Moral" id="alignement.Moral">
            {characterAlignement.moral.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <h3>Trait</h3>
          <div className="input-group">
            <label htmlFor="PersonalityTraits">Trait de personalitée</label>
            <input
              type="text"
              name="Traits.PersonalityTraits"
              id="PersonalityTraits"
            />
          </div>
          <div className="input-group">
            <label htmlFor="Ideals">Idéaux</label>
            <input type="text" name="Traits.Ideals" id="Ideals" />
          </div>
          <div className="input-group">
            <label htmlFor="Bonds">Liens</label>
            <input type="text" name="Traits.Bonds" id="Bonds" />
          </div>
          <div className="input-group">
            <label htmlFor="Flaws">Défauts</label>
            <input type="text" name="Traits.Flaws" id="Flaws" />
          </div>
        </div>
        <div className="input-group">
          {characterStatistics.map((stat) => {
            <label htmlFor={stat}>{stat}</label>;
          })}
        </div>
      </form>
    </main>
  );
}

export default FormAddCharacter;
