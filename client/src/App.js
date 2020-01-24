import React, { useEffect } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { axiosWithAuth } from "./utils/axiosWithAuth"
import { setUserInfo, shouldUpdateLoggedInUser } from "./actions/index";
// Components
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import Search from "./components/search";
import DashboardGrid from "./components/dashboard";
import registration from "./components/registration";
import Login from "./components/login";
import Settings from "./components/settings/settings"

function App(props) {

  useEffect(() => {
    console.log("getting user data");
    if (localStorage.getItem("token") && localStorage.getItem("userID")) {//we're logged in but there's no user info in the store, lets fix that
      axiosWithAuth()
        .get("users/" + localStorage.getItem("userID"))
        .then(res => {
          //setUserInfo expects
          // userInfo: {  
          //   favorites
          //   loggedInUser
          //   businessInfo
          //   activeWidgets
          // }
          //so map data from res.data into that format

          let userInfo = {
            favorites: res.data.favorites,
            loggedInUser: { firstName: res.data.first_name, lastName: res.data.last_name },
            businessInfo: res.data.businesses,
            activeWidgets: null//TODO: endpoint should return widgets
          }

          console.log("Got user data, ", res);//{user_id: 13, first_name: "Test", last_name: "Test", businesses: Array(0), favorites: Array(0)}
          props.setUserInfo(userInfo);
        })
        .catch(err => {
          console.error("Error getting user data", err);
        })
    } else {
      //do we need to delete anything from state when they log out?
      let userInfo = {
        favorites: [],
        loggedInUser: { firstName: null, lastName: null },
        businessInfo: null,
        activeWidgets: null//TODO: endpoint should return widgets
      }
      props.setUserInfo(userInfo);
    }
    props.shouldUpdateLoggedInUser(false);
  }, [props.loggedInUser.shouldUpdate])

  console.log("props.loggedInUser", props.loggedInUser);

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

export default connect(mapStateToProps, { setUserInfo, shouldUpdateLoggedInUser })(App);

// {
//   "first_name": string,
//   "last_name": string,
//   "businesses": [
//       {
//           "id": integer,
//           "name": string,
//           "location": {
//               "city": string,
//               "state": string
//           }
//           "yelp": {
//               "id": string,
//               "yelp_id": string,
//               "url": string,
//               "image_url": string
//           }
//       },
//   ],
//   "favorites": [
//     {
//         "id": integer,
//         "name": string,
//         "location": {
//             "city": string,
//             "state": string
//         }
//         "yelp": {
//             "id": string,
//             "yelp_id": string,
//             "url": string,
//             "image_url": string
//         }
//     },
// ]
// }