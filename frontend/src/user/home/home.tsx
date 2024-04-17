import "./home.css";
import { useNavigate } from "react-router-dom";
import { serviceAtom } from "../../store";
import { useAtom } from "jotai";
import { Header } from "../../shared/header/header";
export function Home() {
  const navigate = useNavigate();
  const [, setService] = useAtom(serviceAtom);
  return (
    <>
      <Header />
      <div className="container home">
        <div
          className="row align-items-center justify-content-center"
          style={{
            height: "100vh",
          }}
        >
          <div className="h3 text-center" style={{ color: "#334155" }}>
            Emergency Helpline Service
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            <div
              className="card"
              onClick={() => {
                setService("hospital");
                navigate("/services");
              }}
            >
              <div className="card-body">
                <div className="h4 text-center mt-5">Hospitals</div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            <div
              className="card"
              onClick={() => {
                setService("police");
                navigate("/services");
              }}
            >
              <div className="card-body">
                {" "}
                <div className="h4 text-center mt-5">Police Stations</div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            {" "}
            <div
              className="card"
              onClick={() => {
                setService("fire");
                navigate("/services");
              }}
            >
              <div className="card-body">
                {" "}
                <div className="h4 text-center mt-5">Fire Stations</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
