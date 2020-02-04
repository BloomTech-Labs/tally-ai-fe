import React, { useEffect } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import { axiosWithAuth } from "./auth/axiosWithAuth"
import { setUserInfo, getUserInfo, shouldUpdateLoggedInUser } from "./actions/index";
import PrivateRoute from "./auth/PrivateRoute";
import PublicRoute from "./auth/PublicRoute";
import SearchPage from "./components/SearchPage"
// Components
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import Search from "./components/search";
import DashboardGrid from "./components/dashboard/dashboard";
import registration from "./components/registration";
import Login from "./components/login";
import EditAccount from "./components/settings/editaccount";
import CompSet from "./components/compSet";
import AboutUs from "./components/aboutus";
import DashboardPlus from "./components/dashboard/dashboardPlus";
import Policy from "./components/TOS/legal";

import { widgets } from "./components/WidgetSystem/WidgetRegistry"


function App(props) {

  useEffect(() => {
    console.log("getting user data");
    if (localStorage.getItem("token") && localStorage.getItem("userID")) {//we're logged in but there's no user info in the store, lets fix that

      props.getUserInfo(localStorage.getItem("userID"));

    } else {
      //do we need to delete anything from state when they log out?
      let userInfo = {
        competitors: [],
        loggedInUser: { firstName: null, lastName: null },
        businesses: [],
        activeWidgets: [widgets[0].name, widgets[1].name],
        activeTabs: ["defaultTab"],
        currentlySelectedBusiness: {
          businessId: null,
          businessName: null,
          businessImg: null,
          reviewCount: 0,
          averageRating: 0,
          changeInRating: ""
        }
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
      <Route path="/Compset" component={CompSet} />
      <Route path="/AboutUs" component={AboutUs} />
      <Route path="/Policy" component={Policy} />
      <Route path="/DashboardPlus/" component={DashboardPlus} />
      <PrivateRoute path="/Settings/" component={EditAccount} />
      <PrivateRoute path="/Search/:searchMode" exact component={SearchPage} />
      <Footer />
    </div>
  );
}

const mapStateToProps = state => ({
  loggedInUser: state.loggedInUser,
  activeTabs: state.activeTabs
});

export default withRouter(connect(mapStateToProps, { setUserInfo, getUserInfo, shouldUpdateLoggedInUser })(App));

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