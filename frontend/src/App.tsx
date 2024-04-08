import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./user/login/login";
import { Home } from "./user/home/home";
import { Services } from "./user/services/services";
import { Service } from "./user/service/service";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/service" element={<Service />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
