import { useState, useEffect } from "react";
import "./FormAddCharacter.css";
import characterClass from "../../assets/data/characterClass";
import characterRace from "../../assets/data/characterRace";
import characterAlignment from "../../assets/data/characterAlignment";
import characterStatistics from "../../assets/data/characterStats";

function FormAddCharacter() {
  const [name, setName] = useState("");
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
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0,
    },
  });
  const [currentSection, setCurrentSection] = useState(1);

  // Fonction de validation générique
  const isSectionValid = (section) => {
    switch (section) {
      case 1:
        // Validation de la section 1 :
        return (
          dataCharacter.charVoc.trim() !== "" &&
          dataCharacter.name.trim() !== "" &&
          dataCharacter.characterThumbnail.trim() !== "" &&
          dataCharacter.gender.trim() !== "" &&
          dataCharacter.class.trim() !== "" &&
          dataCharacter.race.trim() !== ""
        );
      case 2:
        // Validation de la section 2
        return (
          dataCharacter.alignment.ethic.trim() !== "" &&
          dataCharacter.alignment.moral.trim() !== "" &&
          dataCharacter.description.trim() !== "" &&
          dataCharacter.traits.personalityTraits.trim() !== "" &&
          dataCharacter.traits.ideals.trim() !== "" &&
          dataCharacter.traits.bonds.trim() !== "" &&
          dataCharacter.traits.flaws.trim() !== ""
        );
      case 3:
        // Validation de la section 3 :
        return (
          dataCharacter.statistics.strength !== 0 &&
          dataCharacter.statistics.dexterity !== 0 &&
          dataCharacter.statistics.constitution !== 0 &&
          dataCharacter.statistics.intelligence !== 0 &&
          dataCharacter.statistics.wisdom !== 0 &&
          dataCharacter.statistics.charisma !== 0
        );
      default:
        return false;
    }
  };

  // Fonction pour désactiver le bouton "Suivant"
  const isNextButtonDisabled = () => {
    return !isSectionValid(currentSection);
  };

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

  useEffect(() => {
    handleTotalHpChange();
  }, [
    dataCharacter.statistics.strength,
    dataCharacter.statistics.constitution,
  ]);

  const handleTotalHpChange = () => {
    // Récupérer les valeurs de constitution et strength
    const { constitution, strength } = dataCharacter.statistics;
    // Calculer totalHp
    const newTotalHp =
      10 + parseInt(constitution, 10) + Math.floor(parseInt(strength, 10) / 2);

    if (isNaN(newTotalHp)) {
      setDataCharacter(0);
    } else {
      // Mettre à jour l'état avec la nouvelle valeur de totalHp
      setDataCharacter((prevData) => ({
        ...prevData,
        hitPoints: {
          ...prevData.hitPoints,
          totalHp: newTotalHp,
          currentHp:
            prevData.hitPoints.currentHp === prevData.hitPoints.totalHp
              ? newTotalHp
              : prevData.hitPoints.currentHp,
        },
      }));
    }
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
      <form action="" className="formAddCharacter">
        <section
          className="formAddCharacter__section"
          style={{ display: currentSection === 1 ? "flex" : "none" }}
        >
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
                <option value="">Classes</option>
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
                <option value="">Races</option>
                {Object.values(characterRace).map((value, index) => (
                  <option key={index} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          </section>
          <div className="button-group">
            <button
              type="button"
              onClick={() => setCurrentSection((prev) => Math.min(prev + 1, 3))}
              disabled={isNextButtonDisabled()}
            >
              Suivant
            </button>
          </div>
        </section>
        <section
          className="formAddCharacter__section"
          style={{ display: currentSection === 2 ? "flex" : "none" }}
        >
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
            <button
              type="button"
              onClick={() => setCurrentSection((prev) => Math.max(prev - 1, 1))}
            >
              Précédent
            </button>
            <button
              type="button"
              onClick={() => setCurrentSection((prev) => Math.min(prev + 1, 3))}
              disabled={isNextButtonDisabled()}
            >
              Suivant
            </button>
          </div>
        </section>
        <section
          className="formAddCharacter__section"
          style={{ display: currentSection === 3 ? "flex" : "none" }}
        >
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
            <label htmlFor="totalHp">Point de vie total</label>
            <input
              type="number"
              name="hitPoints.totalHp"
              id="totalHp"
              value={dataCharacter.hitPoints.totalHp}
              onChange={handleTotalHpChange} // Appel de la fonction pour mettre à jour totalHp
              readOnly
            />
          </div>
          <div className="input-group" hidden>
            <label htmlFor="currentHp">Points de vie actuel</label>
            <input
              type="number"
              name="hitPoints.currentHp"
              id="currentHp"
              value={dataCharacter.hitPoints.currentHp}
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
            <button
              type="button"
              onClick={() => setCurrentSection((prev) => Math.max(prev - 1, 1))}
            >
              Précédent
            </button>
            <input
              type="submit"
              value="Création de Personnage"
              disabled={isNextButtonDisabled()}
            />
          </div>
        </section>
      </form>
    </main>
  );
}

export default FormAddCharacter;
