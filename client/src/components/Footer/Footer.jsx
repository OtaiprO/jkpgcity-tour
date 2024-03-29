import "../../layout.css";
import { Explore } from "./Explore/Explore";
import { Information } from "./Information/Information";
import { SocialMedia } from "./SocialMedia/SocialMedia";

export const Footer = () => {
  return (
    // Footer body
    <footer className="site-footer bg-dark">
      {/* Info jkpg (left column) */}
      <div className="container">
        <h2 className="text-light pt-4 pb-4">jkpgcity.</h2>

        {/* Content */}
        <div className="row">
          <Information />

          <Explore />

          <SocialMedia />
        </div>

        {/* Copyright Info (Bottom text) */}
        <h6 className="text-center text-light text-opacity-50 mb-0 pb-3">
          © Copyright 2024 Välkommen till ditt Jönköping, där du är centrum –
          Jkpg City
        </h6>
      </div>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"
      ></script>
    </footer>
  );
};
