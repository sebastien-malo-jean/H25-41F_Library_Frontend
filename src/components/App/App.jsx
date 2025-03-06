//css de la page App
import "./App.css";
import { Routes, Route } from "react-router-dom";
//page statiques
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
//routes
import Home from "../Home/Home";
import CharacterList from "../CharacterList/CharacterList";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Characters" element={<CharacterList />} />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
