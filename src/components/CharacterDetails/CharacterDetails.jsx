//css
import "./CharacterDetails.css";
//bibliotheque
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import pour récupérer l'ID
//composants
import CharacterDetail__right from "./CharacterDetail__right/CharacterDetail__right";

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
        <section className="characterDetail__title">
          <h3>{character.name}</h3>
        </section>
        <section className="characterDetail__left">
          <picture className="characterPicture">
            <img alt={character.name} />
          </picture>
          <section className="CharacterHitpoints">
            <h3>Point de vie</h3>
            <p>
              <strong>Point de vie total :</strong>{" "}
              {character.hitPoints.totalHP}
            </p>
            <p>
              <strong>Point de vie acutel :</strong>{" "}
              {character.hitPoints.currentHP}
            </p>
          </section>
        </section>
        <CharacterDetail__right key={character.id} character={character} />
        <section className="characterDetail__description">
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
