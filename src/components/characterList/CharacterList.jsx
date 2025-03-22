import "./CharacterList.css";

//importation de librairies
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

//importation de composants
import CharacterCard from "./characterCard/characterCard";
import ListFilter from "./ListFilter/ListFilter";

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingText, setLoadingText] = useState(""); // Variable d'état pour les points de "loading"
  const location = useLocation();

  // Fonction pour récupérer les personnages en fonction des filtres dans l'URL
  const fetchData = async (filters) => {
    try {
      // Filtre les paramètres null, vides ou undefined
      const filteredFilters = Object.fromEntries(
        Object.entries(filters).filter(
          ([key, value]) => value != null && value !== "" // Seulement les filtres valides
        )
      );

      // Si aucun filtre n'est présent après le filtrage, on envoie une requête sans paramètres
      const queryParams = new URLSearchParams(filteredFilters).toString();
      let apiUrl = `https://h25-41f-library.onrender.com/characters?${queryParams}`;

      // Si aucun filtre n'est valide, on fait une requête sans aucun paramètre (ou avec des valeurs par défaut)
      if (!queryParams) {
        apiUrl = `https://h25-41f-library.onrender.com/characters`; // Requête sans filtre
      }

      const response = await fetch(apiUrl);

      // Si la réponse n'est pas OK, on lance une erreur
      if (!response.ok) {
        throw new Error("Personnages non trouvés !");
      }

      const charactersData = await response.json();

      // Si aucun personnage n'est trouvé
      if (charactersData.length === 0) {
        throw new Error(`Aucun personnage correspondant à ces critères.`);
      }

      setCharacters(charactersData);
    } catch (err) {
      // Affichage des erreurs
      setError(err.message);
    } finally {
      // Fin du chargement
      setLoading(false);
    }
  };

  // Utilisation des filtres présents dans l'URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const filters = {
      charVoc: queryParams.get("charVoc"),
      gender: queryParams.get("gender"),
      class: queryParams.get("class"),
      race: queryParams.get("race"),
    };
    fetchData(filters);
  }, [location.search]); // La fonction est appelée à chaque changement dans l'URL

  // Fonction pour afficher les points de "loading"
  useEffect(() => {
    let sentence = "";
    const intervalId = setInterval(() => {
      if (sentence.length < 3) {
        sentence += ".";
      } else {
        sentence = ".";
      }
      setLoadingText(sentence);
    }, 300);

    return () => clearInterval(intervalId);
  }, []); // Ce useEffect ne se déclenche qu'une seule fois au montage du composant

  if (loading)
    return (
      <>
        <p>Chargement {loadingText}</p>{" "}
        {/* Affiche les points de loading dans l'UI */}
      </>
    );
  if (error) return <p>Erreur : {error}</p>;
  if (!characters.length) return <p>Aucun personnage trouvé.</p>;

  return (
    <main>
      <section>
        <h2>Liste des Personnages</h2>
        <section className="mainContent">
          <ListFilter /> {/* Ici on affiche les filtres */}
          <div className="grid">
            {characters.map((character) => {
              return <CharacterCard key={character.id} character={character} />;
            })}
          </div>
        </section>
      </section>
    </main>
  );
}

export default CharacterList;
