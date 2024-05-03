import { useState } from "react";

export const CreateAccount = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [refereeCode, setRefereeCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (refereeCode !== "224466") {
        throw new Error("Incorrect referee code");
      }
      const response = await fetch(
        "https://jkpgcity-tour-backend.onrender.com/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password, refereeCode }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create account");
      }
      window.location.href = "/login";
    } catch (error) {
      console.error("Error creating account:", error.message);
      if (error.message === "Incorrect referee code") {
        setError("Incorrect referee code. Please enter the correct code.");
      } else {
        setError("Failed to create account username already exists.");
      }
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <div className="container mb-3">
          <h2 className="page-header">Create Account</h2>
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
        <div className="container mb-3">
          <label htmlFor="refereeCode" className="form-label">
            Referee Code
          </label>
          <input
            type="text"
            className="form-control"
            id="refereeCode"
            value={refereeCode}
            onChange={(e) => setRefereeCode(e.target.value)}
            required
          />
        </div>
        {error && <div className="container mb-3 text-danger">{error}</div>}
        <div className="container">
          <button type="submit" className="btn btn-dark">
            Create Account
          </button>
        </div>
      </form>
    </main>
  );
};
