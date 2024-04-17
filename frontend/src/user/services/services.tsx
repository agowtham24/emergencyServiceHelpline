import "./services.css";
import { useEffect, useState, useRef } from "react";
import { api, config } from "../../utils/apiconfig";
import { useNavigate } from "react-router-dom";
import { SelectedserviceAtom } from "../../store";
import { useAtom } from "jotai";
import { Header } from "../../shared/header/header";
export function Services() {
  const navigate = useNavigate();
  const [, setService] = useAtom(SelectedserviceAtom);
  const [services, setServices] = useState([] as any[]);
  const searchRef = useRef<HTMLInputElement>(null);
  const getServices = async () => {
    const service = localStorage.getItem("service");
    const res = await api.get(`services/type/${JSON.parse(service as string)}`);
    // console.log(res.data);
    setServices(res.data);
  };
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getServices();
    }
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <>
      <Header />
      <div className="container service">
        <div
          className="row"
          style={{
            marginTop: "10%",
          }}
        >
          <div className="col-lg-10 col-md-10 col-sm-6 col-12">
            <input
              type="search"
              className="form-control"
              ref={searchRef}
              placeholder="Search By Location"
              onKeyUp={async (e: any) => {
                console.log(e.target.value, "event");
                if (e.target.value === "") {
                  getServices();
                  return;
                }
                const res = await api.get(
                  `services/location/${e.target.value}`
                );
                setServices(res.data);
              }}
            />
          </div>
          {/* <div className="col-lg-2 col-md-2 col-sm-6 col-12">
            <button
              className="btn btn-secondary"
              type="button"
              onClick={async () => {
                if (!searchRef.current?.value) {
                  getServices();
                  return;
                }
                const res = await api.get(
                  `services/location/${searchRef.current?.value}`
                );
                setServices(res.data);
              }}
            >
              Search
            </button>
          </div> */}
        </div>
        <div className="row mt-5">
          {services.map((service) => (
            <div
              className="col-lg-3 col-md-3 col-sm-6 col-12"
              key={service._id}
            >
              <div
                className="card"
                onClick={() => {
                  setService(service);
                  navigate("/service");
                }}
              >
                <div className="card-body">
                  <div>
                    <img
                      src={`${config.serviceImages}${service.image}`}
                      alt="pic"
                      style={{ width: "100%", height: "150px" }}
                    />
                  </div>
                  <div className="mt-2 text-center">
                    <span className="h6">Name : </span>
                    <span
                      style={{
                        fontSize: "17px",
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      {service.name}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="h6">Location : </span>
                    <span
                      style={{
                        fontSize: "17px",
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      {service.location}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="h6">Specialization : </span>
                    <span
                      style={{
                        fontSize: "17px",
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      {service.specialization}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="h6">Email : </span>
                    <span
                      style={{
                        fontSize: "17px",
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      {service.email}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="h6">Mobile : </span>
                    <span
                      style={{
                        fontSize: "17px",
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      {service.phone}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
