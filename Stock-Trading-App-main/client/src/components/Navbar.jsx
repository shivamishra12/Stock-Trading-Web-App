import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const token = localStorage.getItem("token");

  return (
    <nav className="navbar navbar-dark px-4">

      <Link className="navbar-brand fw-bold" to="/dashboard">
        StockTrader
      </Link>

      {token && (
        <div>

          <Link className="btn btn-outline-light me-2" to="/dashboard">
            Dashboard
          </Link>

          <Link className="btn btn-outline-light me-2" to="/portfolio">
            Portfolio
          </Link>

          <Link className="btn btn-outline-light me-3" to="/transactions">
            Transactions
          </Link>

          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>

        </div>
      )}

    </nav>
  );
}

export default Navbar;