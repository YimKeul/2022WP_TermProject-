import { Route, Routes } from "react-router-dom";
import { Home, Main, Result } from "./Screens";
function App() {
  return (
    //페이지 관리
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Main" element={<Main />} />
      <Route path="/Result" element={<Result />} />
    </Routes>
  );
}

export default App;
