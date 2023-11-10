import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/shared/Layout";
import EstatusSistema from "./components/EstatusSistema";
import EstatusOperacion from "./components/EstatusOperacion";
import EstatusMensual1 from "./components/EstatusMensual1";
import EstatusMensual2 from "./components/EstatusMensual2";
import LoginView from "./components/Login";
import { useEffect, useState } from "react";
import { getHostPath, setHost, setHostNode } from "./utils/host";

function App() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const base = "http://" + window.location.hostname;
    setHost(base, 1880);
    // setHostNode(base, 8081);
    console.log(getHostPath(""));
    setLoaded(true);
  }, []);

  return loaded ? (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<EstatusSistema />} />
          <Route path="mensual1" element={<EstatusMensual1 />} />
          <Route path="mensual2" element={<EstatusMensual2 />} />
          <Route path="operation" element={<EstatusOperacion />} />
        </Route>

        <Route path="login" element={<LoginView />} />
      </Routes>
    </Router>
  ) : (
    <p>Cargando...</p>
  );
}

export default App;
