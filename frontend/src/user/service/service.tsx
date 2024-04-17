import "./service.css";
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useState, useEffect, useRef } from "react";
import { api, config } from "../../utils/apiconfig";
import { toast, Toaster } from "react-hot-toast";
import { Header } from "../../shared/header/header";
export function Service() {
  const [reviews, setReviews] = useState([] as any[]);
  const [service, setService] = useState({} as any);
  const [user, setUser] = useState({} as any);
  const [rating, setRating] = useState(0);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const comment = useRef<HTMLTextAreaElement>(null);
  const getReviews = async () => {
    const service = JSON.parse(localStorage.getItem("Selectedservice") || "{}");
    const response = await api.get(`reviews/${service._id}`);
    if (response.status === 200) {
      console.log(response.data);
      setReviews(response.data);
    }
  };
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getReviews();
      setUser(JSON.parse(sessionStorage.getItem("user") || "{}"));
      setService(JSON.parse(localStorage.getItem("Selectedservice") || "{}"));
    }
    return () => {
      mounted = false;
    };
  }, []);

  const center = {
    lat: 20.5937,
    lng: 78.9629,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCUA3uUquQ88On7YaIFbBpByARvNj64GAU",
  });

  const mapStyles = {
    height: "300px",
    width: "100%",
  };

  const [activeMarker, setActiveMarker] = useState("");
  const handleActiveMarker = (marker: string) => {
    if (activeMarker === marker) {
      return;
    }
    setActiveMarker(marker);
  };

  const setReview = (rating: number, index: number) => {
    setRating(rating);
    const icons = document.querySelectorAll(".icon");
    icons[index].classList.add("activee");
    for (let i = 0; i < icons.length; i++) {
      if (i !== index) {
        icons[i].classList.remove("activee");
      }
    }
  };
  return (
    <>
      <Header />
      <div className="container view">
        <div className="row mt-5">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="h5 text-center">Service Location</div>
            {isLoaded && (
              <div>
                <GoogleMap
                  onClick={() => {
                    setActiveMarker("");
                  }}
                  mapContainerStyle={mapStyles}
                  zoom={5}
                  center={center}
                >
                  <MarkerF
                    position={{ lat: service.latitude, lng: service.longitude }}
                    onClick={() => handleActiveMarker(service._id)}
                  >
                    {activeMarker === service._id && (
                      <InfoWindowF onCloseClick={() => setActiveMarker("")}>
                        <div>
                          <h6>{service.name}</h6>
                        </div>
                      </InfoWindowF>
                    )}
                  </MarkerF>
                </GoogleMap>
              </div>
            )}
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-lg-6 col-md-6 col-sm-12 col-12">
            <div className="card">
              <div className="card-body">
                <div>
                  <img
                    src={`${config.serviceImages}${service.image}`}
                    alt="pic"
                    style={{ width: "100%", height: "250px" }}
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
          <div className="col-lg-6 col-md-6 col-sm-12 col-12">
            <div className="card">
              <div className="card-body">
                <div className="h5 text-center">Send Message</div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    ref={messageRef}
                    className="form-control"
                    id="message"
                    rows={3}
                  ></textarea>
                </div>
                <div className="text-center">
                  <button
                    onClick={async () => {
                      if (sessionStorage.getItem("user") === null) {
                        alert("Please login to send message");
                        return;
                      }

                      if (messageRef.current?.value === "") {
                        alert("Message is required");
                        return;
                      }
                      const message = {
                        message: messageRef.current?.value,
                        userId: user._id,
                        serviceId: service._id,
                      };
                      const response = await api.post(
                        "userconnectedservice",
                        message
                      );
                      if (response.status === 200) {
                        alert("Message sent successfully");
                        messageRef.current!.value = "";
                      }
                    }}
                    className="btn btn-primary mt-3"
                  >
                    Send Message
                  </button>
                </div>
                <div className="row mt-5">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <button
                      className="btn btn-sm btn-secondary"
                      data-bs-toggle="modal"
                      data-bs-target="#reviewModal"
                    >
                      Review Service
                    </button>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <button
                      className="btn btn-sm btn-secondary"
                      data-bs-toggle="modal"
                      data-bs-target="#reviewListModal"
                    >
                      View Reviews
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal"
        id="reviewListModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="h6" id="exampleModalLabel">
                Reviews
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {reviews.map((review, index) => {
                return (
                  <div key={index}>
                    <div>{review.user[0]?.name}</div>
                    {Array.from({ length: review.rating }).map((_, index) => (
                      <span key={index}>
                        <i
                          className="fa-solid fa-star"
                          style={{
                            color: "#dda80ab3",
                          }}
                        ></i>
                      </span>
                    ))}

                    <div>Comment : {review.comment}</div>
                    <hr />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal"
        id="reviewModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="h6" id="exampleModalLabel">
                Hey {user.name}, Write your review here
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  let myModal = document.getElementById(
                    "reviewModal"
                  ) as HTMLElement;
                  myModal.style.display = "none";
                  myModal.classList.remove("show");
                }}
              ></button>
            </div>
            <div className="modal-body review">
              <div className="row justify-content-evenly">
                <div className="col-2">
                  <i
                    className="fa-solid fa-face-angry icon"
                    onClick={() => setReview(1, 0)}
                  ></i>
                  <div className="h6 mt-1">poor</div>
                </div>
                <div className="col-2">
                  <i
                    className="fa-solid fa-face-frown icon"
                    onClick={() => setReview(2, 1)}
                  ></i>
                  <div className="h6 mt-1">bad</div>
                </div>
                <div className="col-2">
                  <i
                    className="fa-solid fa-face-meh icon"
                    onClick={() => setReview(3, 2)}
                  ></i>
                  <div className="h6 mt-1">average</div>
                </div>
                <div className="col-2">
                  <i
                    className="fa-solid fa-face-grin icon"
                    onClick={() => setReview(4, 3)}
                  ></i>
                  <div className="h6 mt-1">good</div>
                </div>
                <div className="col-2">
                  <i
                    className="fa-solid fa-face-grin-stars icon"
                    onClick={() => setReview(5, 4)}
                  ></i>
                  <div className="h6 mt-1">excellent</div>
                </div>
              </div>
              <div className="mt-3">
                <textarea
                  ref={comment}
                  className="form-control"
                  placeholder="Write your review here"
                ></textarea>
              </div>
              <div className="mt-3 text-center">
                <button
                  className="btn btn-primary"
                  onClick={async () => {
                    if (rating === 0) {
                      alert("Rating is required");
                      return;
                    }
                    if (comment.current?.value === "") {
                      alert("Comment is required");
                      return;
                    }
                    const review = {
                      userId: user._id,
                      serviceId: service._id,
                      rating: rating,
                      comment: comment.current?.value,
                    };
                    const response = await api.post("reviews", review);
                    if (response.status === 201) {
                      toast.success("Review added successfully");
                      comment.current!.value = "";
                      // let myModal = document.getElementById(
                      //   "reviewModal"
                      // ) as HTMLElement;
                      // myModal.style.display = "none";
                      // myModal.classList.remove("show");
                      window.location.reload();
                    }
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
            {/* <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div> */}
          </div>
        </div>
      </div>

      <Toaster
        toastOptions={{
          style: {
            zIndex: 9999,
          },
        }}
      />
    </>
  );
}
