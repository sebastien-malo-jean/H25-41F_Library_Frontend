import "./Footer.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer text-center p-3">
      <h1 className="footer__title">Créateur de personnage</h1>
      <p className="footer__text">Tous droits réservés - {year}</p>
    </footer>
  );
}

export default Footer;
