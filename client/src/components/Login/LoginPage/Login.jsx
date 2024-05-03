import { useState, useEffect } from "react";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://jkpgcity-tour-backend.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );
      if (!response.ok) {
        throw new Error("Invalid username or password");
      }
      const data = await response.json();
      localStorage.setItem("token", data.token);
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging in:", error);
      setError(error.message);
    }
  };

  return (
    <main>
      {isLoggedIn ? (
        <p className="text-center fs-1 m-5">Error: Already logged in.</p>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <div className="container mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="container mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <div className="container mb-3 text-danger">{error}</div>}
            <div className="container">
              <button type="submit" className="btn btn-dark">
                Login
              </button>
            </div>
          </form>

          <div className="container mt-4">
            <p>Don't have an account?</p>
            <a href="/register">
              <button className="btn btn-primary my-3">Create Account</button>
            </a>
          </div>
        </>
      )}
    </main>
  );
};
