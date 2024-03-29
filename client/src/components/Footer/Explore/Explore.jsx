import "../../../layout.css";

export const Explore = () => {
  return (
    <div className="col-md-4 mb-2 text-light">
      <h5>Explore our website</h5>
      <ul>
        <li>
          <span>
            <a href="/about-us" className="some">
              About us
            </a>
          </span>
        </li>
        <li>
          <span>
            <a href="/stores" className="some">
              Stores
            </a>
          </span>
        </li>
        <li>
          <span>
            <a href="#" className="some">
              Cockies 🍪
            </a>
          </span>
        </li>
      </ul>
    </div>
  );
};
