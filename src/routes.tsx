import { Route, Routes } from "react-router-dom";
import Main from "./pages/main";
import Edit from "./pages/edit";
import Create from "./pages/create";

export default function AppRoutes(): JSX.Element {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </>
  );
}
