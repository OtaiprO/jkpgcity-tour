import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { StoreCard } from "./StoreCard";

export const Stores = () => {
  const [stores, setStores] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [deleteOption, setDeleteOption] = useState(false);

  useEffect(() => {
    fetchStores();

    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  async function fetchStores() {
    try {
      const response = await fetch(
        "https://jkpgcity-tour-backend.onrender.com/stores/all"
      );
      if (!response.ok) {
        throw new Error("Network response was not good");
      }
      const data = await response.json();

      const storesWithNames = data.filter((store) => store.name !== null);
      const sortedStores = storesWithNames.sort((a, b) => {
        if (a.name && b.name) {
          return a.name.localeCompare(b.name);
        }
        if (!a.name && b.name) {
          return -1;
        }
        if (a.name && !b.name) {
          return 1;
        }
        return 0;
      });

      setStores(sortedStores);
    } catch (error) {
      console.error("Error fetching stores:", error);
    }
  }

  const groupStoresByLetter = () => {
    const groupedStores = {};
    stores.forEach((store) => {
      const firstLetter = store.name.charAt(0).toUpperCase();
      if (!groupedStores[firstLetter]) {
        groupedStores[firstLetter] = [];
      }
      groupedStores[firstLetter].push(store);
    });
    return groupedStores;
  };

  const handleDelete = async (storeId) => {
    try {
      const response = await fetch(
        `https://jkpgcity-tour-backend.onrender.com/stores/${storeId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete store");
      }
      console.log("Store deleted successfully");
      fetchStores();
    } catch (error) {
      console.error("Error deleting store:", error);
    }
  };

  const handleCheckboxChange = (e) => {
    setDeleteOption(e.target.checked);
  };

  return (
    <main>
      <div className="container">
        <h1 className="page-header text-center">Find a store you like here!</h1>
        {isLoggedIn ? (
          <>
            <div className="row justify-content-center align-items-center">
              <div className="col-md-auto">
                <Link to="/stores/add">
                  <button className="stores-btn btn btn-primary me-2">
                    Add Store
                  </button>
                </Link>
              </div>
            </div>
            <div className="row justify-content-center align-items-center mt-3">
              <div className="col-md-auto">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="deleteOption"
                    checked={deleteOption}
                    onChange={handleCheckboxChange}
                  />
                  <label
                    className="form-check-label ms-2"
                    htmlFor="deleteOption"
                  >
                    Delete Option
                  </label>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
      <div className="container-fluid">
        {Object.entries(groupStoresByLetter()).map(
          ([letter, storesByLetter]) => (
            <div key={letter} className="row bg-light">
              <h3 className="section-header text-left">{letter}</h3>
              {storesByLetter.map((store) => (
                <StoreCard
                  key={store.id}
                  store={store}
                  isLoggedIn={isLoggedIn}
                  deleteOption={deleteOption}
                  handleDelete={handleDelete}
                />
              ))}
            </div>
          )
        )}
      </div>
    </main>
  );
};
