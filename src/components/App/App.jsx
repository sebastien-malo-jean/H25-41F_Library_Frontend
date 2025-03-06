//css de la page App
import "./App.css";
import { Routes, Route } from "react-router-dom";
//page statiques
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
//routes
import Home from "../Home/Home";
import CharacterList from "../characterList/CharacterList";
function App() {
  return (
    <body>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Characters" element={<CharacterList />} />
      </Routes>
      <Footer />
    </body>
  );
}
export default App;
