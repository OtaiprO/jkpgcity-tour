import React, { useEffect, useState } from "react";

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top bg-light">
      <div className="container-fluid">
        {/* logo */}
        <a className="navbar-brand fs-4 mx-2" href="/">
          jkpgcity.
        </a>

        {/* toggle btn */}
        <button
          className="navbar-toggler shadow-non border-0"
          type="button"
          onClick={toggleSidebar}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* sidebar */}
        <div
          className={`sidebar offcanvas offcanvas-end ${
            isSidebarOpen ? "show" : ""
          }`}
          tabIndex="-1"
          id="offcanvasNavbar"
        >
          {/* sidebar header */}
          <div className="offcanvas-header border-bottom">
            <h5 className="offcanvas-title">jkpgcity.</h5>
            <button
              type="button"
              className="btn-close"
              onClick={toggleSidebar}
              aria-label="Close"
            ></button>
          </div>
          {/* sidebar body */}
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end align-items-center fs-5 flex-grow-1 pe-3">
              <li className="nav-item mx-2">
                <a className="nav-link" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link" href="/about-us">
                  About us
                </a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link" href="/stores">
                  Stores
                </a>
              </li>
              {isLoggedIn ? (
                <li className="nav-item mx-2">
                  <button
                    className="nav-link btn btn-light text-danger"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <li className="nav-item mx-2">
                  <a className="nav-link" href="/login">
                    Login
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
