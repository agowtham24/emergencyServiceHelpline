import "./services.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { api } from "../../utils/apiconfig";
import axios from "axios";
export function AdminServices() {
  const [services, setServices] = useState([] as any[]);
  const [edit, setEdit] = useState(false);
  const editForm = useForm();
  const addForm = useForm();
  const [editData, setEditData] = useState({} as any);
  const fetchServices = async () => {
    const { data } = await api.get("services");
    console.log(data, "data");
    setServices(data);
  };
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchServices();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <div className="container">
        <div className="card mt-5">
          <div className="card-body">
            {edit === false && <div className="h5">Add Service</div>}
            {edit === true && <div className="h5">Edit Service</div>}
            <form>
              {edit === false && (
                <div className="row">
                  <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                    <label htmlFor="name" className="form-label">
                      Name <span>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      {...addForm.register("name", {
                        required: "Name is required",
                      })}
                    />
                    {addForm.formState.errors.name && (
                      <div className="text-danger">
                        {addForm.formState.errors.name.message?.toString()}
                      </div>
                    )}
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                    <label htmlFor="location" className="form-label">
                      Location <span>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Location"
                      {...addForm.register("location", {
                        required: "Location is required",
                      })}
                    />
                    {addForm.formState.errors.location && (
                      <div className="text-danger">
                        {addForm.formState.errors.location.message?.toString()}
                      </div>
                    )}
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                    <label htmlFor="email" className="form-label">
                      Email <span>*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      {...addForm.register("email", {
                        required: "Email is required",
                      })}
                    />
                    {addForm.formState.errors.email && (
                      <div className="text-danger">
                        {addForm.formState.errors.email.message?.toString()}
                      </div>
                    )}
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                    <label htmlFor="phone" className="form-label">
                      Phone <span>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Phone"
                      {...addForm.register("phone", {
                        required: "Phone is required",
                      })}
                    />
                    {addForm.formState.errors.phone && (
                      <div className="text-danger">
                        {addForm.formState.errors.phone.message?.toString()}
                      </div>
                    )}
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                    <label htmlFor="specialization" className="form-label">
                      Specialization
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Specialization"
                      {...addForm.register("specialization")}
                    />
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                    <label htmlFor="serviceType" className="form-label">
                      Service Type <span>*</span>
                    </label>
                    <select
                      defaultValue={""}
                      className="form-select"
                      {...addForm.register("serviceType", {
                        required: "Service Type is required",
                      })}
                    >
                      <option value="" disabled>
                        Select Service Type
                      </option>
                      <option value="hospital">Hospital</option>
                      <option value="police">Police Station</option>
                      <option value="fire">Fire Station</option>
                    </select>
                    {addForm.formState.errors.serviceType && (
                      <div className="text-danger">
                        {addForm.formState.errors.serviceType.message?.toString()}
                      </div>
                    )}
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                    <label htmlFor="image" className="form-label">
                      Image <span>*</span>
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      {...addForm.register("image", {
                        required: "Image is required",
                      })}
                      accept="image/*"
                    />
                    {addForm.formState.errors.image && (
                      <div className="text-danger">
                        {addForm.formState.errors.image.message?.toString()}
                      </div>
                    )}
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                    <button
                      className="btn btn-primary mt-4"
                      type="submit"
                      onClick={addForm.handleSubmit(async (ddata) => {
                        let formData = new FormData();
                        formData.append("name", ddata.name);
                        formData.append("location", ddata.location);
                        formData.append("email", ddata.email);
                        formData.append("phone", ddata.phone);
                        formData.append("specialization", ddata.specialization);
                        formData.append("serviceType", ddata.serviceType);
                        formData.append("image", ddata.image[0]);
                        const { data } = await axios.get(
                          `https://maps.googleapis.com/maps/api/geocode/json?address=${ddata.location}&key=AIzaSyCUA3uUquQ88On7YaIFbBpByARvNj64GAU`
                        );
                        const latitude = data.results[0].geometry.location.lat;
                        const longitude = data.results[0].geometry.location.lng;
                        formData.append("latitude", latitude);
                        formData.append("longitude", longitude);

                        const res = await api.post("services", formData);
                        if (res) {
                          toast.success("Service Added Successfully");
                          fetchServices();
                        } else {
                          toast.error("Service Added Failed");
                        }
                      })}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              )}
              {edit === true && (
                <div className="row">
                  <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                    <label htmlFor="name" className="form-label">
                      Name <span>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      defaultValue={editData.name}
                      {...editForm.register("name", {
                        required: "Name is required",
                      })}
                    />
                    {editForm.formState.errors.name && (
                      <div className="text-danger">
                        {editForm.formState.errors.name.message?.toString()}
                      </div>
                    )}
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                    <label htmlFor="location" className="form-label">
                      Location <span>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Location"
                      defaultValue={editData.location}
                      {...editForm.register("location", {
                        required: "Location is required",
                      })}
                    />
                    {editForm.formState.errors.location && (
                      <div className="text-danger">
                        {editForm.formState.errors.location.message?.toString()}
                      </div>
                    )}
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                    <label htmlFor="email" className="form-label">
                      Email <span>*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      defaultValue={editData.email}
                      {...editForm.register("email", {
                        required: "Email is required",
                      })}
                    />
                    {editForm.formState.errors.email && (
                      <div className="text-danger">
                        {editForm.formState.errors.email.message?.toString()}
                      </div>
                    )}
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                    <label htmlFor="phone" className="form-label">
                      Phone <span>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Phone"
                      defaultValue={editData.phone}
                      {...editForm.register("phone", {
                        required: "Phone is required",
                      })}
                    />
                    {editForm.formState.errors.phone && (
                      <div className="text-danger">
                        {editForm.formState.errors.phone.message?.toString()}
                      </div>
                    )}
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                    <label htmlFor="specialization" className="form-label">
                      Specialization
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Specialization"
                      defaultValue={editData.specialization}
                      {...editForm.register("specialization")}
                    />
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                    <label htmlFor="serviceType" className="form-label">
                      Service Type <span>*</span>
                    </label>
                    <select
                      defaultValue={editData.serviceType}
                      className="form-select"
                      {...editForm.register("serviceType", {
                        required: "Service Type is required",
                      })}
                    >
                      <option value="" disabled>
                        Select Service Type
                      </option>
                      <option value="hospital">Hospital</option>
                      <option value="police">Police Station</option>
                      <option value="fire">Fire Station</option>
                    </select>
                    {editForm.formState.errors.serviceType && (
                      <div className="text-danger">
                        {editForm.formState.errors.serviceType.message?.toString()}
                      </div>
                    )}
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                    <label htmlFor="image" className="form-label">
                      Image <span>*</span>
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      {...editForm.register("image")}
                      accept="image/*"
                    />
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                    <button
                      className="btn btn-primary mt-4"
                      type="submit"
                      onClick={editForm.handleSubmit(async (ddata) => {
                        let formData = new FormData();
                        formData.append("name", ddata.name);
                        formData.append("location", ddata.location);
                        formData.append("email", ddata.email);
                        formData.append("phone", ddata.phone);
                        formData.append("specialization", ddata.specialization);
                        formData.append("serviceType", ddata.serviceType);
                        if (ddata.image.length > 0) {
                          formData.append("image", ddata.image[0]);
                        }
                        const { data } = await axios.get(
                          `https://maps.googleapis.com/maps/api/geocode/json?address=${ddata.location}&key=AIzaSyCUA3uUquQ88On7YaIFbBpByARvNj64GAU`
                        );
                        const latitude = data.results[0].geometry.location.lat;
                        const longitude = data.results[0].geometry.location.lng;
                        formData.append("latitude", latitude);
                        formData.append("longitude", longitude);
                        const res = await api.patch(
                          `services/${editData._id}`,
                          formData
                        );
                        if (res) {
                          toast.success("Service Updated Successfully");
                          fetchServices();
                          setEdit(false);
                        } else {
                          toast.error("Service Updated Failed");
                        }
                      })}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger mt-4"
                      style={{
                        marginLeft: "10px",
                      }}
                      onClick={() => {
                        setEdit(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
        <div className="card mt-5">
          <div className="card-body">
            <div className="h5">Services</div>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Specialization</th>
                  <th>Service Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service._id}>
                    <td>{service.name}</td>
                    <td>{service.location}</td>
                    <td>{service.email}</td>
                    <td>{service.phone}</td>
                    <td>{service.specialization}</td>
                    <td>{service.serviceType}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          setEdit(true);
                          setEditData(service);
                        }}
                      >
                        <i className="fa-regular fa-pen-to-square"></i>
                      </button>
                      <button
                        className="btn btn-danger"
                        style={{
                          marginLeft: "10px",
                        }}
                        onClick={async () => {
                          const res = await api.delete(
                            `services/${service._id}`
                          );
                          if (res) {
                            toast.success("Service Deleted Successfully");
                            fetchServices();
                          } else {
                            toast.error("Service Deleted Failed");
                          }
                        }}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
