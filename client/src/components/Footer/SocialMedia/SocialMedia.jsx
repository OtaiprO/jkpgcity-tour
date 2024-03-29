import "../../../layout.css";

export const SocialMedia = () => {
  return (
    <div className="col-md-4 mb-2 text-light">
      <h5>Follow us on social media</h5>
      <ul className="d-flex">
        <li className="pe-4">
          <a
            href="https://www.facebook.com/jonkopingcity"
            className="some fs-3 bi bi-facebook"
            aria-label="Facebook"
          ></a>
        </li>
        <li className="pe-4">
          <a
            href="https://www.instagram.com/jkpgcity/"
            className="some fs-3 bi bi-instagram"
            aria-label="Instagram"
          ></a>
        </li>
        <li className="pe-4">
          <a
            href="https://www.tiktok.com/@jonkopingcity"
            className="some fs-3 bi bi-tiktok"
            aria-label="Tiktok"
          ></a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/company/jkpgcity/"
            className="some fs-2 bi bi-linkedin"
            aria-label="LinkedIn"
          ></a>
        </li>
      </ul>
    </div>
  );
};
