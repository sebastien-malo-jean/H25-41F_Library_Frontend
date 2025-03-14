//css de la page App
import "./App.css";
import { Routes, Route } from "react-router-dom";
//page statiques
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
//routes
import Home from "../Home/Home";
import CharacterList from "../CharacterList/CharacterList";
import CharacterDetails from "../CharacterDetails/CharacterDetails";
import FormAddCharacter from "../FormAddCharacter/FormAddCharacter";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<CharacterList />} />
        <Route path="/characters/create" element={<FormAddCharacter />} />
        <Route path="/characters/:id" element={<CharacterDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
