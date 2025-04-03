import "./ListFilter.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import characterClass from "../../../assets/data/characterClass";
import characterRace from "../../../assets/data/characterRace";

function ListFilter() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    charVoc: "",
    gender: "",
    class: "",
    race: "",
  });

  // Met à jour l'URL avec les filtres à chaque changement
  const updateQueryParams = (newFilters) => {
    const queryParams = new URLSearchParams(newFilters).toString();
    navigate(`/characters?${queryParams}`);
  };

  // Fonction de mise à jour des filtres
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
  };

  // Fonction de soumission du formulaire (mise à jour de l'URL)
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêcher la soumission classique du formulaire
    updateQueryParams(filters); // Met à jour l'URL avec les filtres actuels
  };

  return (
    <section className="ListFilter">
      <h3>Filtre</h3>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="charVoc">Vocation</label>
          <select
            name="charVoc"
            id="charVoc"
            value={filters.charVoc}
            onChange={handleFilterChange}
          >
            <option value="">Vocation</option>
            <option value="npc">PNJ</option>
            <option value="player">Joueur</option>
            <option value="monster">Monstre</option>
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="gender">Genre</label>
          <select
            name="gender"
            id="gender"
            value={filters.gender}
            onChange={handleFilterChange}
          >
            <option value="">Genre</option>
            <option value="man">Homme</option>
            <option value="woman">Femme</option>
            <option value="unknown">Inconnu</option>
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="class">Classe</label>
          <select
            name="class"
            id="class"
            value={filters.class}
            onChange={handleFilterChange}
          >
            <option value="">Liste des classes</option>
            {Object.values(characterClass).map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="race">Race</label>
          <select
            name="race"
            id="race"
            value={filters.race}
            onChange={handleFilterChange}
          >
            <option value="">Les races</option>
            {Object.values(characterRace).map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <button className="btn btn-primary">Appliquer les filtres</button>{" "}
          {/* Bouton de soumission */}
        </div>
      </form>
    </section>
  );
}

export default ListFilter;
