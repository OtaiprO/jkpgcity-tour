import "../../layout.css";

export const AboutUS = () => {
  return (
    <main>
      <div className="container-fluid">
        <div id="about-container" className="row mb-5 p-4">
          <div className="col-md-6 mb-4">
            <img
              id="about-img"
              src="https://images.pexels.com/photos/17835952/pexels-photo-17835952/free-photo-of-science-park-towers.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="The church of Sofia, located in Jönköping city"
            />
          </div>
          <div className="col-md-6">
            <h1 className="text-center">Jönköping City</h1>
            <p>
              We are a city development company that develops, activates and
              creates well-being in Jönköping's city center for all businesses,
              residents and visitors. You don't have to be a member or pay any
              fee - if you are in the city, you are part of Jkpg city.
              <br />
              <br />
              Jönköping city is a place for experiences and new memories. But
              just as much a welcoming and lively city center for everyone who
              lives and works here - all day of the year. Our promise: You are
              the center.
              <br />
              <br />
              We are located at Rådhusparken 1, 551 89 Jönköping.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
