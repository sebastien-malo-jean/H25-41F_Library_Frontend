import { useState, useEffect, useContext } from "react";
import "./FormAddCharacter.css";
import characterClass from "../../assets/data/characterClass";
import characterRace from "../../assets/data/characterRace";
import characterAlignment from "../../assets/data/characterAlignment";
import characterStatistics from "../../assets/data/characterStats";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContextProvider";

function FormAddCharacter() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [currentSection, setCurrentSection] = useState(1);
  const { user } = useContext(AuthContext);
  const [dataCharacter, setDataCharacter] = useState({
    charVoc: "",
    characterThumbnail: "",
    name: "",
    gender: "",
    class: "",
    race: "",
    alignment: {
      ethic: "",
      moral: "",
    },
    description: "",
    traits: {
      personalityTraits: "",
      ideals: "",
      bonds: "",
      flaws: "",
    },
    exp: 0,
    level: 1,
    hitPoints: {
      totalHp: "",
      currentHp: "",
    },
    statistics: {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0,
    },
  });

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

  const handleChangement = (e) => {
    const { name, value } = e.currentTarget;

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

  const onSubmitCharacterForm = async (event) => {
    event.preventDefault();
    setSubmitted(true);
    const objRequest = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataCharacter),
    };
    try {
      const response = await fetch(
        "https://h25-41f-library.onrender.com/characters",
        objRequest
      );
      console.log(response);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        navigate("/characters");
      }

      // Traitez la réponse si la requête réussit
    } catch (error) {
      console.error("Erreur lors de la création du personnage:", error);
    }
  };

  return (
    <main className="formAddCharacter__main">
      <h2>Création d'un Personnage</h2>
      <form
        action=""
        className="formAddCharacter"
        onSubmit={onSubmitCharacterForm}
      >
        <section
          className="formAddCharacter__section"
          style={{ display: currentSection === 1 ? "flex" : "none" }}
        >
          <h3 className="formAddCharacter__title">Information Général</h3>

          <div className="formAddCharacter__input-group">
            <label htmlFor="charVoc" className="formAddCharacter__label">
              Vocation du Personnage
            </label>
            <select
              name="charVoc"
              id="charVoc"
              className="formAddCharacter__select"
              value={dataCharacter.charVoc}
              onChange={handleChangement}
            >
              <option value="">Vocation</option>
              {user && user.role === 0 && (
                <>
                  <option value="npc">PNJ</option>
                  <option value="monster">Monstre</option>
                </>
              )}
              <option value="player">Joueur</option>
            </select>
          </div>

          <div className="formAddCharacter__input-group">
            <label
              htmlFor="characterThumbnail"
              className="formAddCharacter__label"
            >
              Image du personnage
            </label>
            <input
              type="text"
              name="characterThumbnail"
              id="characterThumbnail"
              className="formAddCharacter__input"
              readOnly
              value={dataCharacter.characterThumbnail}
            />
          </div>

          <div className="formAddCharacter__input-group">
            <label htmlFor="name" className="formAddCharacter__label">
              Nom du personnage
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="formAddCharacter__input"
              value={name}
              onChange={handleNameChange}
            />
          </div>

          <section className="formAddCharacter__row-group row">
            <div className="formAddCharacter__input-group col">
              <label htmlFor="gender" className="formAddCharacter__label">
                Genre du Personnage
              </label>
              <select
                name="gender"
                id="gender"
                className="formAddCharacter__select"
                value={dataCharacter.gender}
                onChange={handleChangement}
              >
                <option value="">Genre</option>
                <option value="man">Homme</option>
                <option value="woman">Femme</option>
                <option value="uknown">Inconnu</option>
              </select>
            </div>

            <div className="formAddCharacter__input-group col">
              <label htmlFor="class" className="formAddCharacter__label">
                Classe du Personnage
              </label>
              <select
                name="class"
                id="class"
                className="formAddCharacter__select"
                value={dataCharacter.class}
                onChange={handleChangement}
              >
                <option value="">Classes</option>
                {Object.values(characterClass).map((value, index) => (
                  <option key={index} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            <div className="formAddCharacter__input-group col">
              <label htmlFor="race" className="formAddCharacter__label">
                Race du Personnage
              </label>
              <select
                name="race"
                id="race"
                className="formAddCharacter__select"
                value={dataCharacter.race}
                onChange={handleChangement}
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

          <div className="formAddCharacter__button-group">
            <button
              type="button"
              className="formAddCharacter__button"
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
          <h3 className="formAddCharacter__title">Background</h3>

          <div className="formAddCharacter__input-group">
            <label
              htmlFor="alignment.ethic"
              className="formAddCharacter__label"
            >
              Alignement du Personnage
            </label>
            <div className="formAddCharacter__select-group">
              <select
                name="alignment.ethic"
                id="alignment.ethic"
                className="formAddCharacter__select"
                value={dataCharacter.alignment.ethic}
                onChange={handleChangement}
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
                className="formAddCharacter__select"
                value={dataCharacter.alignment.moral}
                onChange={handleChangement}
              >
                <option value="">Morale</option>
                {characterAlignment.moral.map((value, index) => (
                  <option key={index} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="formAddCharacter__input-group col">
            <label htmlFor="description" className="formAddCharacter__label">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              className="formAddCharacter__textarea"
              value={dataCharacter.description}
              onChange={handleChangement}
            ></textarea>
          </div>

          <div className="formAddCharacter__input-group">
            <h4 className="formAddCharacter__subtitle">Trait</h4>

            <div className="formAddCharacter__input-group col">
              <label
                htmlFor="personalityTraits"
                className="formAddCharacter__label"
              >
                Trait de personnalité
              </label>
              <input
                type="text"
                name="traits.personalityTraits"
                id="personalityTraits"
                className="formAddCharacter__input"
                onChange={handleChangement}
                value={dataCharacter.traits.personalityTraits}
              />
            </div>

            <div className="formAddCharacter__input-group col">
              <label htmlFor="ideals" className="formAddCharacter__label">
                Idéaux
              </label>
              <input
                type="text"
                name="traits.ideals"
                id="ideals"
                className="formAddCharacter__input"
                onChange={handleChangement}
                value={dataCharacter.traits.ideals}
              />
            </div>

            <div className="formAddCharacter__input-group col">
              <label htmlFor="bonds" className="formAddCharacter__label">
                Liens
              </label>
              <input
                type="text"
                name="traits.bonds"
                id="bonds"
                className="formAddCharacter__input"
                onChange={handleChangement}
                value={dataCharacter.traits.bonds}
              />
            </div>

            <div className="formAddCharacter__input-group col">
              <label htmlFor="flaws" className="formAddCharacter__label">
                Défauts
              </label>
              <input
                type="text"
                name="traits.flaws"
                id="flaws"
                className="formAddCharacter__input"
                onChange={handleChangement}
                value={dataCharacter.traits.flaws}
              />
            </div>
          </div>

          <div className="formAddCharacter__button-group">
            <button
              type="button"
              className="formAddCharacter__button"
              onClick={() => setCurrentSection((prev) => Math.max(prev - 1, 1))}
            >
              Précédent
            </button>
            <button
              type="button"
              className="formAddCharacter__button"
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
          <h3 className="formAddCharacter__title">Autres</h3>

          <div className="formAddCharacter__input-group" hidden>
            <div className="formAddCharacter__input-group">
              <label htmlFor="exp" className="formAddCharacter__label">
                Expérience
              </label>
              <input
                type="number"
                name="exp"
                id="exp"
                className="formAddCharacter__input"
                value={dataCharacter.exp}
                readOnly
              />
            </div>
            <div className="formAddCharacter__input-group">
              <label htmlFor="level" className="formAddCharacter__label">
                Niveau
              </label>
              <input
                type="number"
                name="level"
                id="level"
                className="formAddCharacter__input"
                value={dataCharacter.level}
                readOnly
              />
            </div>
          </div>

          <div className="formAddCharacter__input-group"></div>

          <h4 className="formAddCharacter__subtitle">Point de vie</h4>
          <div className="formAddCharacter__input-group">
            <label htmlFor="totalHp" className="formAddCharacter__label">
              Point de vie total
            </label>
            <input
              type="number"
              name="hitPoints.totalHp"
              id="totalHp"
              className="formAddCharacter__input"
              value={dataCharacter.hitPoints.totalHp}
              onChange={handleTotalHpChange} // Appel de la fonction pour mettre à jour totalHp
              readOnly
            />
          </div>

          <div className="formAddCharacter__input-group" hidden>
            <label htmlFor="currentHp" className="formAddCharacter__label">
              Points de vie actuel
            </label>
            <input
              type="number"
              name="hitPoints.currentHp"
              id="currentHp"
              className="formAddCharacter__input"
              value={dataCharacter.hitPoints.currentHp}
              readOnly
            />
          </div>

          <div className="formAddCharacter__input-group">
            <h4 className="formAddCharacter__subtitle">Statistiques</h4>
            {characterStatistics.map((stat) => (
              <div
                className="formAddCharacter__input-group formAddCharacter__stats"
                key={stat}
              >
                <label htmlFor={stat} className="formAddCharacter__label">
                  {stat}
                </label>
                <input
                  type="number"
                  name={`dataCharacter.statistics.${stat}`}
                  id={stat}
                  className="formAddCharacter__input"
                  value={dataCharacter.statistics[stat]}
                  readOnly
                />
                <button
                  type="button"
                  className="formAddCharacter__button"
                  onClick={() => rollDices(stat)}
                >
                  dé
                </button>
              </div>
            ))}
          </div>

          <div className="formAddCharacter__button-group">
            <button
              type="button"
              className="formAddCharacter__button"
              onClick={() => setCurrentSection((prev) => Math.max(prev - 1, 1))}
            >
              Précédent
            </button>
            <input
              type="submit"
              className=" btn btn-primary"
              value="Création de Personnage"
              disabled={submitted || isNextButtonDisabled()}
            />
          </div>
        </section>
      </form>
    </main>
  );
}

export default FormAddCharacter;
