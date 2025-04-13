import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";

import NotFound from "./pages/OtherPage/NotFound";
// import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
// import Images from "./pages/UiElements/Images";
// import Alerts from "./pages/UiElements/Alerts";
// import Badges from "./pages/UiElements/Badges";
// import Avatars from "./pages/UiElements/Avatars";
// import Buttons from "./pages/UiElements/Buttons";
// import LineChart from "./pages/Charts/LineChart";
// import BarChart from "./pages/Charts/BarChart";
// import Calendar from "./pages/Calendar";
// import BasicTables from "./pages/Tables/BasicTables";
// import FormElements from "./pages/Forms/FormElements";
// import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import ManifiestoPage from "./pages/ManifiestoPage/ManifiestoPage";
// import Home from "./pages/Dashboard/Home";
import Packages_Send from "./pages/Packages_Send/Packages_Send";
import { useEffect, useState } from "react";
import useApi from "./hooks/useApi";
import source_link from "./repositori/source_repo";
import useToken, { parseJwt } from "./hooks/useToken";



export default function App() {
  const { llamado: validate_token } = useApi(`${source_link}/validate_token`);
  const { token } = useToken();
  const jwt = token ? parseJwt(token) : null;
  const rol = jwt ? jwt.rol : null;
  const [isValid, setValid] = useState(false); // Cambiamos false -> null para manejar el estado de carga

  useEffect(() => {
    const validate = async () => {
      const body = { token };
      try {
        const response = await validate_token(body, "POST");
        setValid(response.success);
      } catch (error) {
        console.error("Error validando el token:", error);
        setValid(false); // En caso de error, se considera inválido
      }
    };

    if (token) {
      validate();
    } else {
      setValid(false); // Si no hay token, directamente se pone en false
    }
  }, [token]);

  // Mientras se valida el token, mostramos un mensaje de carga
  if (isValid === null) {
    return <div>Cargando...</div>;
  }

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Si no hay token o el token es inválido, redirigir a SignIn */}
        {!isValid ? (
          <>
            <Route path="/signin" element={<SignIn />} />
            <Route path="*" element={<Navigate to="/signin" />} />
          </>
        ) : (
          // Si el token es válido, mostrar el contenido según el rol
          
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Packages_Send />} />
            <Route path="/paquetes" element={<Packages_Send />} />
            <Route path="/admin" element={<Videos />} />

            <Route path="/manifiesto" element={rol === "admin" ? <ManifiestoPage /> : <NotFound />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        )}
      </Routes>
    </Router>
  );
}
