import { Route, Routes } from "react-router-dom";

import MainPage from "@/pages/main";

function App() {
  return (
    <Routes>
      <Route element={<MainPage />} path="/" />
    </Routes>
  );
}

export default App;
