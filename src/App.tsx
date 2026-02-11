import { Route, Routes } from "react-router-dom";
import MainPage from "@/pages/main";
import Login from "@/pages/login";

function App() {
  return (
    <Routes>
      <Route element={<Login />} path="/" />
      <Route element={<MainPage />} path="/main" />
    </Routes>
  );
}

export default App;
