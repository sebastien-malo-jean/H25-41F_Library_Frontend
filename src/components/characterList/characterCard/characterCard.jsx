import "./CharacterCard.css";

import { useNavigate } from "react-router-dom";

function CharacterCard(props) {
  const { character } = props;
  const navigate = useNavigate();

  function onClicCard() {
    navigate(`/characters/${character.id}`);
  }

  return (
    <article className={`card ${character.race}`} data-type={character.class}>
      <div className="card-header">
        <h3>{character.name}</h3>
      </div>
      <div className="card-body">
        <div className="card-body-data">
          <p>Vocation : </p>
          <p>{character.charVoc}</p>
        </div>
        <div className="card-body-data">
          <p>Genre : </p>
          <p>{character.gender}</p>
        </div>
        <div className="card-body-data">
          <p>Classe : </p>
          <p>{character.class}</p>
        </div>
        <div className="card-body-data">
          <p>Race : </p>
          <p>{character.race}</p>
        </div>
        <div className="card-body-data">
          <p>Niveau :</p>
          <p>{character.level}</p>
        </div>
      </div>
      <div className="card-footer">
        <button type="button" className="btn btn-primary" onClick={onClicCard}>
          Voir personnage
        </button>
      </div>
    </article>
  );
}

export default CharacterCard;
