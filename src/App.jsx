import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatNaWazungu from "./pages/ChatNaWazungu";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChatNaWazungu />} />
      </Routes>
    </BrowserRouter>
  );
}
