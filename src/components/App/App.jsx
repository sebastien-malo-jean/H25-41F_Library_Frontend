import { useState } from "react"; // hook d'état
import Header from "../Header/Header";
import Footer from "../Footer/Footer";



function App() {
  let [nbClic, setNmClic] = useState(0);


  function onPageClick() {
    nbClic = nbClic + 1;
    setNmClic(nbClic);
  }

  return (
    <main onClick={onPageClick}>
      <Header />
        <h1>Mon application</h1>
        <h2>Vous avez cliqué {nbClic} fois.</h2>
        <p>Ceci est mon application.</p>
        <Footer />
    </main>
  );
}
export default App;
