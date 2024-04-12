import "./login.css";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function AdminLogin() {
  const navigate = useNavigate();
  const loginForm = useForm();
  return (
    <>
      <div className="container">
        <div className="row mt-5 justify-content-center">
          <div className="col-lg-4 col-md-4 col-sm-12 col-12">
            <div className="card">
              <div className="card-body">
                <div className="h5 text-center">AdminLogin</div>
                <form>
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                      <label htmlFor="email" className="form-label">
                        Email <span>*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        {...loginForm.register("email", {
                          required: "Email is required",
                        })}
                      />
                      {loginForm.formState.errors.email && (
                        <div className="text-danger">
                          {loginForm.formState.errors.email.message?.toString()}
                        </div>
                      )}
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                      <label htmlFor="password" className="form-label">
                        Password <span>*</span>
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        {...loginForm.register("password", {
                          required: "Password is required",
                        })}
                      />
                      {loginForm.formState.errors.password && (
                        <div className="text-danger">
                          {loginForm.formState.errors.password.message?.toString()}
                        </div>
                      )}
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12 text-center">
                      <button
                        className="btn btn-primary mt-3 w-100"
                        onClick={loginForm.handleSubmit((data) => {
                          if (
                            data.email === "admin@gmail.com" &&
                            data.password === "admin"
                          ) {
                            navigate("/admin/services");
                          } else {
                            toast.error("Invalid credentials");
                          }
                        })}
                      >
                        Login
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}
