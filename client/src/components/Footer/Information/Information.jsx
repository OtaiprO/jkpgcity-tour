import "../../../layout.css";

export const Information = () => {
  return (
    <div className="col-md-4 mb-2 text-light">
      <ul>
        <li className="d-flex">
          <p>Jönköping City AB </p>
        </li>
        <li className="d-flex">
          <p>c/o Jönköpings kommun </p>
        </li>
        <li className="d-flex">
          <p>Rådhusparken 1 </p>
        </li>
        <li className="d-flex">
          <p>551 89 Jönköping </p>
        </li>
      </ul>
      <ul>
        <li className="d-flex">
          <p>Telefon: 036-16 40 74</p>
        </li>
        <li className="d-flex">
          <p>Mail: info@jkpgcity.se </p>
        </li>
        <li className="d-flex">
          <p>Besöksadress: Rådhuset, entréplan </p>
        </li>
      </ul>
    </div>
  );
};
