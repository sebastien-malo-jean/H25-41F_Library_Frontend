function Footer() {
    const date = new Date();

    return (
        <footer>
        <p>Tous droits réservés - {date.getFullYear()}</p>
        </footer>
    );
    
}

export default Footer;