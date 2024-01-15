import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ListPertanyaan from "./pages/list-pertanyaan";
import Home from "./pages/home";
import AboutApp from "./pages/about-app";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list-pertanyaan" element={<ListPertanyaan />} />
          <Route path="/about-app" element={<AboutApp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
