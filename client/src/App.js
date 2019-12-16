import React from "react";
import "./App.css";

// Components
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import Search from "./components/search";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Search />
      <Footer />
    </div>
  );
}

export default App;
