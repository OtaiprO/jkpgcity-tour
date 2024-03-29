import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const UpdateStore = () => {
  const { storeId } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    district: "",
    rating: 0,
    imageurl: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetchStoreData();

    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [storeId]);

  const fetchStoreData = async () => {
    try {
      const response = await fetch(
        `https://jkpg-city-tour-service-yp4rwj667q-ez.a.run.app/stores/${storeId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch store data");
      }
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.error("Error fetching store data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (
      (name !== "rating" && parseInt(value) < 0) ||
      (name !== "rating" && parseInt(value) > 20)
    ) {
      return;
    }

    if (name === "rating") {
      if (parseInt(value) < 0 || parseInt(value) > 5) {
        return;
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://jkpg-city-tour-service-yp4rwj667q-ez.a.run.app/stores/update/${storeId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update store");
      }
      window.location.href = `/stores/${storeId}`;
      console.log("Store updated successfully");
    } catch (error) {
      console.error("Error updating store:", error);
      alert("Failed to update store");
    }
  };

  return (
    <main>
      {isLoggedIn ? (
        <form onSubmit={handleSubmit}>
          <div className="container mb-3">
            <h2 className="page-header">Update Store</h2>
            <label htmlFor="name" className="form-label">
              Store Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="container mb-3">
            <label htmlFor="district" className="form-label">
              District
            </label>
            <input
              type="text"
              className="form-control"
              id="district"
              name="district"
              value={formData.district}
              onChange={handleChange}
            />
          </div>
          <div className="container mb-3">
            <label htmlFor="url" className="form-label">
              URL
            </label>
            <input
              type="text"
              className="form-control"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              required
            />
          </div>
          <div className="container mb-3">
            <label htmlFor="rating" className="form-label">
              Rating
            </label>
            <input
              type="number"
              className="form-control"
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
            />
          </div>
          <div className="container mb-3">
            <label htmlFor="imageurl" className="form-label">
              Image URL
            </label>
            <input
              type="text"
              className="form-control"
              id="imageurl"
              name="imageurl"
              value={formData.imageurl}
              onChange={handleChange}
            />
          </div>
          <div className="container mb-3">
            <label className="form-label">Categories</label>
            <div className="row">
              <div className="col">
                <label htmlFor="restaurant">Restaurant</label>
                <input
                  type="number"
                  className="form-control"
                  id="restaurant"
                  name="restaurant"
                  value={formData.restaurant}
                  onChange={handleChange}
                />
              </div>
              <div className="col">
                <label htmlFor="pharmacy">Pharmacy</label>
                <input
                  type="number"
                  className="form-control"
                  id="pharmacy"
                  name="pharmacy"
                  value={formData.pharmacy}
                  onChange={handleChange}
                />
              </div>
              <div className="col">
                <label htmlFor="grocery">Grocery</label>
                <input
                  type="number"
                  className="form-control"
                  id="grocery"
                  name="grocery"
                  value={formData.grocery}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col">
                <label htmlFor="construction">Construction</label>
                <input
                  type="number"
                  className="form-control"
                  id="construction"
                  name="construction"
                  value={formData.construction}
                  onChange={handleChange}
                />
              </div>
              <div className="col">
                <label htmlFor="games">Games</label>
                <input
                  type="number"
                  className="form-control"
                  id="games"
                  name="games"
                  value={formData.games}
                  onChange={handleChange}
                />
              </div>
              <div className="col">
                <label htmlFor="clothes">Clothes</label>
                <input
                  type="number"
                  className="form-control"
                  id="clothes"
                  name="clothes"
                  value={formData.clothes}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col">
                <label htmlFor="perfume">Perfume</label>
                <input
                  type="number"
                  className="form-control"
                  id="perfume"
                  name="perfume"
                  value={formData.perfume}
                  onChange={handleChange}
                />
              </div>
              <div className="col">
                <label htmlFor="other">Other</label>
                <input
                  type="number"
                  className="form-control"
                  id="other"
                  name="other"
                  value={formData.other}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="container">
            <button type="submit" className="btn btn-dark">
              Update Store
            </button>
          </div>
        </form>
      ) : (
        <p className="text-center fs-1 m-5">
          Error: Please log in to update the store.
        </p>
      )}
    </main>
  );
};
