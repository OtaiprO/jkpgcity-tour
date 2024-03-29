import "../../layout.css";

export const MainPage = () => {
  return (
    <main>
      <div className="container col-7">
        <img
          className="picture img-fluid my-5"
          src="https://images.pexels.com/photos/20219918/pexels-photo-20219918/free-photo-of-kall-sno-stad-gryning.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="cart"
        />
      </div>

      <div className="container">
        <h2 className="header-start text-center">Adventures in jkpg</h2>
        <hr className="bg-primary" />
        <h3 className="header-middle text-center mt-5">
          Welcome to your Jönköping City.
        </h3>
        <p className="text-start text-center fs-5">
          Jkpg City is filled with shops, culture, experiences, cafes, and
          restaurants framed by fantastic green areas and beautiful lakes.
        </p>
        <div className="row">
          <div className="col-md-6">
            <img
              className="picture container img-fluid mt-5 mb-5"
              src="https://plus.unsplash.com/premium_photo-1674407009848-4da7a12b6b25?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8d2FybSUyMGNvZmZlfGVufDB8fDB8fHww"
              alt="cart"
            />
          </div>
          <div className="col-md-6">
            <img
              className="picture container img-fluid mt-5 mb-5"
              src="https://images.unsplash.com/photo-1615937722923-67f6deaf2cc9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGRpbm5lcnxlbnwwfHwwfHx8MA%3D%3D"
              alt="cart"
            />
          </div>
        </div>
      </div>
    </main>
  );
};
