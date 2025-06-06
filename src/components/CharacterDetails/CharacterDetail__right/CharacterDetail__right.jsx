//css
import "./CharacterDetail__right.css";
//bibliothèques
import { useState } from "react";
import { animate } from "motion";

function CharacterDetail__right(props) {
  const { character } = props;

  const [activeSection, setActiveSection] = useState("info");

  function onClicBtn(section) {
    setActiveSection(section);
  }

  function ChangeSectionView() {}

  return (
    <section className="characterDetail__right">
      <section className="sectionChoice">
        <button type="button" onClick={() => onClicBtn("info")}>
          Infos de base
        </button>
        <button type="button" onClick={() => onClicBtn("traits")}>
          Traits
        </button>
        <button type="button" onClick={() => onClicBtn("stats")}>
          Statistiques
        </button>
      </section>
      <section
        className={`CharacterBasicInfo ${
          activeSection === "info" ? "" : "hidden"
        }`}
      >
        <h3>Information de base</h3>
        <p>
          <strong>Vocation :</strong> {character.charVoc}
        </p>
        <p>
          <strong>Nom :</strong> {character.name}
        </p>
        <p>
          <strong>Genre :</strong> {character.gender}
        </p>
        <p>
          <strong>Classe :</strong> {character.class}
        </p>
        <p>
          <strong>Race :</strong> {character.race}
        </p>
        <p>
          <strong>Alignement :</strong> {character.alignment.ethic}-
          {character.alignment.moral}
        </p>
        <p>
          <strong>Expérience :</strong> {character.exp}
        </p>
        <p>
          <strong>Niveau :</strong> {character.level}
        </p>
      </section>
      <section
        className={`CharacterTraits ${
          activeSection === "traits" ? "" : "hidden"
        }`}
      >
        <h3>Traits :</h3>
        <ul>
          <li>
            <p>
              <strong>Traits de personalitée :</strong>{" "}
              {character.traits.personalityTraits}
            </p>
          </li>
          <li>
            <p>
              <strong>Idéaux :</strong> {character.traits.ideals}
            </p>
          </li>
          <li>
            <p>
              <strong>attachement profond :</strong> {character.traits.bonds}
            </p>
          </li>
          <li>
            <p>
              <strong>Défauts :</strong> {character.traits.flaws}
            </p>
          </li>
        </ul>
      </section>
      <section
        className={`CharacterStatistics ${
          activeSection === "stats" ? "" : "hidden"
        }`}
      >
        <h3>statistics</h3>
        <ul>
          <li>
            <p>
              <strong>Force :</strong> {character.statistics.strength}
            </p>
          </li>
          <li>
            <p>
              <strong>Dextérité :</strong> {character.statistics.dexterity}
            </p>
          </li>
          <li>
            <p>
              <strong>Constitution :</strong>{" "}
              {character.statistics.constitution}
            </p>
          </li>
          <li>
            <p>
              <strong>Intelligence :</strong>{" "}
              {character.statistics.intelligence}
            </p>
          </li>
          <li>
            <p>
              <strong>Sagesse :</strong> {character.statistics.wisdom}
            </p>
          </li>
          <li>
            <p>
              <strong>Charisme :</strong> {character.statistics.charisma}
            </p>
          </li>
        </ul>
      </section>
    </section>
  );
}

export default CharacterDetail__right;
