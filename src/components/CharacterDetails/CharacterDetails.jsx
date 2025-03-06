import "./CharacterDetails.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import pour récupérer l'ID

function CharacterDetails() {
  const { id } = useParams(); // Récupère l'ID depuis l'URL
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://h25-41f-library.onrender.com/characters/${id}`
        );
        if (!response.ok) throw new Error("Personnage non trouvé !");
        const characterData = await response.json();
        setCharacter(characterData.character);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]); // Exécute la requête à chaque changement d’ID

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;
  if (!character) return <p>Aucun personnage trouvé.</p>;

  return (
    <main>
      <h2>Détail du personnage</h2>
      <section className="characterDetail">
        <picture className="characterPicture">
          <img alt={character.name} />
        </picture>
        <section className="CharacterBasicInfo">
          <h3>Information de base</h3>
          <p>
            <strong>Vocation :</strong> {character.charVoc}
          </p>
          <p>
            <strong>Nom :</strong> {character.name}
          </p>
          <p>
            <strong>Genre :</strong> {character.genre}
          </p>
          <p>
            <strong>Classe :</strong> {character.class}
          </p>
          <p>
            <strong>Race :</strong> {character.race}
          </p>
          <p>
            <strong>Alignement :</strong> {character.alignement[0]}-
            {character.alignement[1]}
          </p>
          <p>
            <strong>Expérience :</strong> {character.exp}
          </p>
          <p>
            <strong>Niveau :</strong> {character.lvl}
          </p>
        </section>
        <section className="CharacterTraits">
          <h3>Traits :</h3>
          <ul>
            <li>
              <p>
                <strong>Traits de personalitée :</strong>{" "}
                {character.Traits.PersonalityTraits}
              </p>
            </li>
            <li>
              <p>
                <strong>Idéaux :</strong> {character.Traits.Ideals}
              </p>
            </li>
            <li>
              <p>
                <strong>attachement profond :</strong> {character.Traits.Bonds}
              </p>
            </li>
            <li>
              <p>
                <strong>Défauts :</strong> {character.Traits.Flaws}
              </p>
            </li>
          </ul>
        </section>
        <section className="CharacterHitpoints">
          <h3>Point de vie</h3>
          <p>
            <strong>Point de vie total :</strong> {character.hitPoints.totalHP}
          </p>
          <p>
            <strong>Point de vie acutel :</strong>{" "}
            {character.hitPoints.currentHP}
          </p>
        </section>
        <section className="CharacterStatistics">
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
        <section className="characterDescription">
          <h3>Description</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum
            dolore facere odit aliquam distinctio officiis, quisquam nam odio.
            Quidem voluptatum, praesentium quisquam labore ex, doloribus quam
            omnis hic cupiditate inventore veritatis, esse optio vitae placeat
            quae assumenda sapiente ipsam adipisci mollitia! Dolor maiores
            commodi eveniet. Inventore consequuntur minus ipsa reprehenderit.
            Aspernatur ipsam exercitationem expedita incidunt, culpa totam
            assumenda consequuntur, debitis porro fugit eum repellendus repellat
            alias tenetur fuga itaque dignissimos, eveniet reiciendis at quam
            fugiat! Unde mollitia quisquam nemo provident soluta aliquid labore
            nesciunt facilis minima totam numquam magnam ad ipsa nulla veniam,
            consectetur inventore exercitationem cumque nobis hic. Dolorem!
          </p>
        </section>
      </section>
    </main>
  );
}

export default CharacterDetails;
