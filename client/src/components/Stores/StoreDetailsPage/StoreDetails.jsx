import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Chart } from "./Chart";

export const StoreDetails = () => {
  const { storeId } = useParams();
  const [store, setStore] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    fetchStoreDetails();
  }, []);

  const fetchStoreDetails = async () => {
    try {
      const response = await fetch(
        `https://jkpg-city-tour-service-yp4rwj667q-ez.a.run.app/stores/${storeId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch store details");
      }
      const data = await response.json();
      setStore(data);
    } catch (error) {
      console.error("Error fetching store details:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://jkpg-city-tour-service-yp4rwj667q-ez.a.run.app/stores/${storeId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete store");
      }
      window.location.href = "/stores";
      console.log("Store deleted successfully");
    } catch (error) {
      console.error("Error deleting store:", error);
    }
  };

  if (!store) {
    return (
      <main>
        <p className="text-center fs-1 m-5">
          Loading, if it takes long it means Er404 and the store you are looking
          for does not exist!
        </p>
      </main>
    );
  }

  const categories = [
    "restaurant",
    "pharmacy",
    "grocery",
    "construction",
    "games",
    "clothes",
    "perfume",
    "other",
  ];

  const anyCategoryHasValue = categories.some(
    (category) => store[category] > 0
  );

  return (
    <div className="container mt-5">
      <div className="row">
        {store.imageurl ? (
          <div className="col-md-6">
            <img
              src={store.imageurl}
              alt="Store"
              className="img-fluid mb-3 m-2"
              id="store-image"
            />
          </div>
        ) : null}
        <div className="col-md-6 border mb-5">
          <h2 className="mb-4 m-5">{store.name}</h2>
          <p className="m-5">
            <strong>District:</strong> {store.district}
          </p>
          <p className="m-5">
            <strong>Rating:</strong>{" "}
            {store.rating ? <p>{store.rating}</p> : <p>Unrated yet</p>}
          </p>

          {anyCategoryHasValue && (
            <>
              <p className="m-5">
                <strong>
                  Has this range and number of categories of in-door stores
                </strong>
              </p>
              <Chart categories={categories} store={store} />
            </>
          )}

          {store.url ? (
            <p className="m-5">
              <button className="btn btn-dark border">
                <a className="text-light" href={`https://${store.url}`}>
                  Visit Store
                </a>
              </button>
            </p>
          ) : null}

          {isLoggedIn ? (
            <>
              <button onClick={handleDelete} className="btn btn-danger m-5">
                Delete
              </button>
              <Link to={`/stores/update/${storeId}`}>
                <button className="btn btn-warning">Update</button>
              </Link>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};
