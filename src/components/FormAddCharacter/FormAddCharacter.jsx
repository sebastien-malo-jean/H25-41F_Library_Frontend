import { useState } from "react";
import "./FormAddCharacter.css";
import characterClass from "../../assets/data/characterClass";
import characterRace from "../../assets/data/characterRace";
import characterAlignment from "../../assets/data/characterAlignment";
import characterStatistics from "../../assets/data/characterStats";

function FormAddCharacter() {
  const [name, setName] = useState("");
  const [stats, setStats] = useState(
    characterStatistics.reduce((acc, stat) => ({ ...acc, [stat]: 0 }), {})
  );
  const [dataCharacter, setDataCharacter] = useState({
    charVoc: "",
    characterThumbnail: "",
    name: "",
    gender: "",
    class: "",
    race: "",
    alignment: { ethic: "", moral: "" },
    description: "",
    traits: { personalityTraits: "", ideals: "", bonds: "", flaws: "" },
    exp: 0,
    level: 1,
    hitPoints: { totalHp: "", currentHp: "" },
    statistics: {
      strength: "",
      dexterity: "",
      constitution: "",
      intelligence: "",
      wisdom: "",
      charisma: "",
    },
  });

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);

    setDataCharacter((prevData) => ({
      ...prevData,
      name: newName,
      characterThumbnail: `${removeCompromisedChar(newName.toLowerCase())}.jpg`,
    }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;

    setDataCharacter((prevData) => {
      const keys = name.split(".");
      let updatedData = { ...prevData };

      if (keys.length === 2) {
        updatedData[keys[0]] = {
          ...updatedData[keys[0]],
          [keys[1]]: value,
        };
      } else {
        updatedData[name] = value;
      }

      return updatedData;
    });
  };

  function removeCompromisedChar(string) {
    let cleanedString = string
      .split("")
      .filter((char) => /[a-zA-Z0-9]/.test(char))
      .join("");
    return cleanedString;
  }

  function rollDices(stat) {
    const roll = Math.floor(Math.random() * 6) + 1;
    setDataCharacter((prevData) => ({
      ...prevData,
      statistics: {
        ...prevData.statistics,
        [stat]: parseInt(roll, 10),
      },
    }));
  }

  return (
    <main>
      <h2>Création d'un Personnage</h2>
      <form action="">
        <section>
          <h3>menu 1</h3>
          <div className="input-group">
            <label htmlFor="charVoc">Vocation du Personnage</label>
            <select
              name="charVoc"
              id="charVoc"
              value={dataCharacter.charVoc}
              onChange={handleSelectChange}
            >
              <option value="">Vocation</option>
              <option value="pnj">PNJ</option>
              <option value="player">Joueur</option>
              <option value="monster">Monstre</option>
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="characterThumbnail">Image du personnage</label>
            <input
              type="text"
              name="characterThumbnail"
              id="characterThumbnail"
              readOnly
              value={dataCharacter.characterThumbnail}
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
          <section className="row-group">
            <div className="input-group">
              <label htmlFor="gender">Genre du Personnage</label>
              <select
                name="gender"
                id="gender"
                value={dataCharacter.gender}
                onChange={handleSelectChange}
              >
                <option value="">Genre</option>
                <option value="man">Homme</option>
                <option value="woman">Femme</option>
                <option value="uknown">Inconnu</option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="class">classe du Personnage</label>
              <select
                name="class"
                id="class"
                value={dataCharacter.class}
                onChange={handleSelectChange}
              >
                {Object.values(characterClass).map((value, index) => (
                  <option key={index} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="race">race du Personnage</label>
              <select
                name="race"
                id="race"
                value={dataCharacter.race}
                onChange={handleSelectChange}
              >
                {Object.values(characterRace).map((value, index) => (
                  <option key={index} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          </section>
          <div className="button-group">
            <button type="button">Suivant</button>
          </div>
        </section>
        <section>
          <h3>"Background"</h3>
          <div className="input-group">
            <label htmlFor="alignment.ethic">Alignement du Personnage</label>
            <select
              name="alignment.ethic"
              id="alignment.ethic"
              value={dataCharacter.alignment.ethic}
              onChange={handleSelectChange}
            >
              <option value="">Étique</option>
              {characterAlignment.ethic.map((value, index) => (
                <option key={index} value={value}>
                  {value}
                </option>
              ))}
            </select>
            <select
              name="alignment.moral"
              id="alignment.moral"
              value={dataCharacter.alignment.moral}
              onChange={handleSelectChange}
            >
              <option value="">Morale</option>
              {characterAlignment.moral.map((value, index) => (
                <option key={index} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              value={dataCharacter.description}
              onChange={handleSelectChange}
            ></textarea>
          </div>
          <div className="input-group">
            <h4>Trait</h4>
            <div className="input-group">
              <label htmlFor="personalityTraits">Trait de personalité</label>
              <input
                type="text"
                name="traits.personalityTraits"
                id="personalityTraits"
                onChange={handleSelectChange}
                value={dataCharacter.traits.personalityTraits}
              />
            </div>
            <div className="input-group">
              <label htmlFor="ideals">Idéaux</label>
              <input
                type="text"
                name="traits.ideals"
                id="ideals"
                onChange={handleSelectChange}
                value={dataCharacter.traits.ideals}
              />
            </div>
            <div className="input-group">
              <label htmlFor="bonds">Liens</label>
              <input
                type="text"
                name="traits.bonds"
                id="bonds"
                onChange={handleSelectChange}
                value={dataCharacter.traits.bonds}
              />
            </div>
            <div className="input-group">
              <label htmlFor="flaws">Défauts</label>
              <input
                type="text"
                name="traits.flaws"
                id="flaws"
                onChange={handleSelectChange}
                value={dataCharacter.traits.flaws}
              />
            </div>
          </div>
          <div className="button-group">
            <button type="button">Précédent</button>
            <button type="button">Suivant</button>
          </div>
        </section>
        <section>
          <h3>Autres</h3>
          <div className="input-group" hidden>
            <div className="input-group">
              <label htmlFor="exp">Expérience</label>
              <input
                type="number"
                name="exp"
                id="exp"
                value={dataCharacter.exp}
                readOnly
              />
            </div>
            <div className="input-group">
              <label htmlFor="level">Niveau</label>
              <input
                type="number"
                name="level"
                id="level"
                value={dataCharacter.level}
                readOnly
              />
            </div>
          </div>
          <div className="input-group"></div>
          <h4>point de vie</h4>
          <div className="input-group">
            <label htmlFor="hitPoints.totalHp">Point de vie total</label>
            <input
              type="number"
              name="hitPoints.totalHp"
              id="hitPoints.totalHp"
              value={
                10 +
                (parseInt(dataCharacter.statistics.constitution, 10) || 0) +
                (parseInt(dataCharacter.statistics.strength, 10) || 0) / 2
              }
              /* totalHP = 10 + constitution */
              readOnly
            />{" "}
            {/*+ Constritution*/}
          </div>
          <div className="input-group" hidden>
            <label htmlFor="currentHp">Points de vie actuel</label>
            <input
              type="number"
              name="hitPoints.currentHp"
              id="currentHp"
              value={dataCharacter.hitPoints.totalHp}
              readOnly
            />
          </div>
          <div className="input-group">
            <h4>Statistiques</h4>
            {characterStatistics.map((stat) => (
              <div className="input-group stats" key={stat}>
                <label htmlFor={stat}>{stat}</label>
                <input
                  type="number"
                  name={`datacharacter.statistics.${stat}`}
                  id={stat}
                  value={dataCharacter.statistics[stat]}
                  readOnly
                />
                <button type="button" onClick={() => rollDices(stat)}>
                  dé
                </button>
              </div>
            ))}
          </div>
          <div className="button-group">
            <button type="button">Précédent</button>
            <input type="submit" value="Création de Personnage" />
          </div>
        </section>
      </form>
    </main>
  );
}

export default FormAddCharacter;
