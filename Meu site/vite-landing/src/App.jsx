import { Routes, Route } from "react-router-dom";
import { Home } from "./Home";
import { ProjectCutlery } from "./pages/ProjectCutlery";
import { ProjectFlights } from "./pages/ProjectFlights";
import { ProjectLocal } from "./pages/ProjectLocal";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projetos/cutelaria" element={<ProjectCutlery />} />
      <Route path="/projetos/passagens" element={<ProjectFlights />} />
      <Route path="/projetos/servicos-locais" element={<ProjectLocal />} />
    </Routes>
  );
}

export default App;
