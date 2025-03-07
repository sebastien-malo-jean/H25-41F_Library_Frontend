import "./CharacterCard.css";

import { useNavigate } from "react-router-dom";

function CharacterCard(props) {
  const { character } = props;
  const navigate = useNavigate();

  function onClicCard() {
    navigate(`/characters/${character.id}`);
  }

  return (
    <article className="card">
      <div className="card-header ">
        <h3>{character.name}</h3>
      </div>
      <div className="card-body">
        <p>
          <strong>Vocation : </strong>
          {character.charVoc}
        </p>
        <p>
          <strong>Genre : </strong>
          {character.genre}
        </p>
        <p>
          <strong>Classe : </strong>
          {character.class}
        </p>
        <p>
          <strong>Race : </strong>
          {character.race}
        </p>
        <p>
          <strong>Niveau : </strong>
          {character.lvl}
        </p>
      </div>
      <div className="card-footer">
        <button type="button" onClick={onClicCard}>
          Voir personnage
        </button>
      </div>
    </article>
  );
}

export default CharacterCard;
