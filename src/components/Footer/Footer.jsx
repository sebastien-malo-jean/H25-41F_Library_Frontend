import "./Footer.css";
function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <h1>Créateur de personnage</h1>
      <p>Tous droits réservés - {year}</p>
    </footer>
  );
}

export default Footer;
