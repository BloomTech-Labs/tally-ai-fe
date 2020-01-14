import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

// Components
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import Search from "./components/search";
import DashboardGrid from "./components/dashboard";
import registration from "./components/registration";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Route exact path="/" component={Search} />
      <Route exact path="/Dashboard/" component={DashboardGrid} />
      <Route exact path="/Register/" component={registration} />
      <Footer />
    </div>
  );
}

export default App;
