import "./Footer.css";
function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <p>Tous droits réservés - {year}</p>
    </footer>
  );
}

export default Footer;
