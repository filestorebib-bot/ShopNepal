import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleLogin = (e) => {

    e.preventDefault();

    /*
      LEARNING LOGIN ONLY

      Username:
      admin

      Password:
      admin123
    */

    if (
      username === "admin" &&
      password === "admin123"
    ) {

      localStorage.setItem(
        "shopnepal_admin",
        "true"
      );

      navigate("/admin/dashboard");

    } else {

      setError(
        "Invalid username or password."
      );

    }
  };

  return (
    <main className="admin-login-page">

      <div className="login-box">

        <div className="login-logo">
          Shop<span>Nepal</span>
        </div>

        <p className="admin-label">
          ADMIN PANEL
        </p>

        <h1>Welcome Back</h1>

        <p className="login-description">
          Login to manage your products.
        </p>

        <form onSubmit={handleLogin}>

          <label>
            Username
          </label>

          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

          <label>
            Password
          </label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="login-btn"
          >
            Login to Admin
          </button>

        </form>

        <div className="demo-login">

          <strong>Learning Login</strong>

          <p>
            Username: <b>admin</b>
          </p>

          <p>
            Password: <b>admin123</b>
          </p>

        </div>

      </div>

    </main>
  );
}

export default AdminLogin;
