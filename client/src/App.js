import React, { useEffect } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import { axiosWithAuth } from "./auth/axiosWithAuth"
import { setUserInfo, shouldUpdateLoggedInUser } from "./actions/index";
import PrivateRoute from "./auth/PrivateRoute";
import PublicRoute from "./auth/PublicRoute";
import SearchPage from "./components/SearchPage"
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

          props.setUserInfo(localStorage.getItem("userID"));
          
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

  return (
    <div className="App">
      <NavBar />
      <PublicRoute exact path="/" component={Search} />
      <Route path="/Dashboard/" component={DashboardGrid} />
      <Route path="/Register/" component={registration} />
      <Route path="/Login/" component={Login} />
      <PrivateRoute path="/Settings/" component={Settings} />
      <PrivateRoute path="/Search/:searchMode" exact component={SearchPage} />
      <Footer />
    </div>
  );
}

const mapStateToProps = state => ({
  loggedInUser: state.loggedInUser
});

export default withRouter(connect(mapStateToProps, { setUserInfo, shouldUpdateLoggedInUser })(App));

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