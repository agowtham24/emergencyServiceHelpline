import "./dummy.css";
import { Link, useNavigate } from "react-router-dom";
export function Dummy() {
  const navigate = useNavigate();
  return (
    <>
      <div className="demo">this is dummy</div>
      <Link to="/home">Home</Link>
      <button
        className="btn btn-danger"
        type="button"
        onClick={() => {
          navigate("/home");
        }}
      >
        Home
      </button>
    </>
  );
}
