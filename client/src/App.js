import "./layout.css";
import { BrowserRouter as Router } from "react-router-dom";
import Pathes from "./Pathes";
import { Navbar } from "./components/Navbar/Navbar";
import { Footer } from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Navbar />

      <Router>
        <Pathes />
      </Router>

      <Footer />
    </>
  );
}

export default App;
