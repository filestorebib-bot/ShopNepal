import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const isAdmin = localStorage.getItem("shopnepal_admin") === "true";

  const logout = () => {
    localStorage.removeItem("shopnepal_admin");
    navigate("/admin");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">

        <Link to="/" className="logo">
          Shop<span>Nepal</span>
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>

          {isAdmin ? (
            <>
              <Link to="/admin/dashboard">Dashboard</Link>

              <button
                className="logout-btn"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/admin" className="admin-link">
              Admin
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
