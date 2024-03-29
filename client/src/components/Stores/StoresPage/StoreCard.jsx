import React from "react";
import { Link } from "react-router-dom";

export const StoreCard = ({
  store,
  isLoggedIn,
  deleteOption,
  handleDelete,
}) => {
  return (
    <div className="col-md-4 p-1" key={store.id}>
      <div className="stores">
        <ul
          id="store-list"
          className="d-flex border bg-dark m-2 p-3 bg-highlight text-light"
        >
          <li>
            <h6>{store.name}</h6>
            {store.district ? <p>{store.district}</p> : null}
            {store.rating ? (
              <p>
                <b>{store.rating} </b>
                Of 5 Stars
              </p>
            ) : null}
          </li>
          <ul className="d-flex gap-3">
            {isLoggedIn && deleteOption ? (
              <li>
                <button
                  onClick={() => handleDelete(store.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </li>
            ) : null}
            <li>
              <Link to={`/stores/${store.id}`}>
                <button className="btn btn-dark border">Check</button>
              </Link>
            </li>
          </ul>
        </ul>
      </div>
    </div>
  );
};
