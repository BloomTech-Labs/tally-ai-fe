import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

// Components
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import Search from "./components/search";
import DashboardGrid from "./components/dashboard";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Search />
      <Footer />
      <Route exact path="/Dashboard/" component={DashboardGrid}/>
    </div>
  );
}

export default App;
