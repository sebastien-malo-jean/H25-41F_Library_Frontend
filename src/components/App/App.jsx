//css de la page App
import "./App.css";

import { Routes, Route } from "react-router-dom";
//page statiques
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
//routes
import Home from "../Home/Home";
import CharacterList from "@components/CharacterList/CharacterList";
import CharacterDetails from "@components/CharacterDetails/CharacterDetails";
import FormAddCharacter from "@components/FormAddCharacter/FormAddCharacter";
import Page404 from "@components/Page404/Page404";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<CharacterList />} />
        <Route path="/characters/create" element={<FormAddCharacter />} />
        <Route path="/characters/:id" element={<CharacterDetails />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
