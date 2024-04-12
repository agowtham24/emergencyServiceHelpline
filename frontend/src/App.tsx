import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./user/login/login";
import { Home } from "./user/home/home";
import { Services } from "./user/services/services";
import { Service } from "./user/service/service";
import { AdminLogin } from "./admin/login/login";
import { AdminServices } from "./admin/services/services";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/service" element={<Service />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/services" element={<AdminServices />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
