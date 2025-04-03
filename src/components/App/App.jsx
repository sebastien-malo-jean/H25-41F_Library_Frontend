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
import AuthContextProvider from "../AuthContext/AuthContextProvider";
import AdminRoute from "../AdminRoute/AdminRoute";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<CharacterList />} />
          <Route path="/characters/:id" element={<CharacterDetails />} />
          <Route element={<AdminRoute />}>
            <Route path="/characters/create" element={<FormAddCharacter />} />
          </Route>
          <Route path="*" element={<Page404 />} />
        </Routes>
        <Footer />
      </AuthContextProvider>
    </div>
  );
}
export default App;
