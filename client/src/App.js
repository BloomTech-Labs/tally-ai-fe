import React, { useEffect } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { axiosWithAuth } from "./utils/axiosWithAuth"
// Components
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import Search from "./components/search";
import DashboardGrid from "./components/dashboard";
import registration from "./components/registration";
import Login from "./components/login";
import Settings from "./components/settings/settings"

function App() {

  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("userID")) {//we're logged in but there's no user info in the store, lets fix that
    axiosWithAuth()
    .get("users/" + localStorage.getItem("userID"))
    .then(res => {
      
    })
    .catch(err => {

    })
    }else{
      
    }
  }, props.loggedInUser.shouldUpdate)

  return (
    <div className="App">
      <NavBar />
      <Route exact path="/" component={Search} />
      <Route path="/Dashboard/" component={DashboardGrid} />
      <Route path="/Register/" component={registration} />
      <Route path="/Login/" component={Login} />
      <Route path="/Settings/" component={Settings} />
      <Footer />
    </div>
  );
}

const mapStateToProps = state => ({
  loggedInUser: state.loggedInUser
});

export default connect(mapStateToProps, {})(App);

{
  "first_name": string,
  "last_name": string,
  "businesses": [
      {
          "id": integer,
          "name": string,
          "location": {
              "city": string,
              "state": string
          }
          "yelp": {
              "id": string,
              "yelp_id": string,
              "url": string,
              "image_url": string
          }
      },
  ],
  "favorites": [
    {
        "id": integer,
        "name": string,
        "location": {
            "city": string,
            "state": string
        }
        "yelp": {
            "id": string,
            "yelp_id": string,
            "url": string,
            "image_url": string
        }
    },
]
}