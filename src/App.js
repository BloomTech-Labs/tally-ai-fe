import React, { useEffect } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  setUserInfo,
  getUserInfo,
  shouldUpdateLoggedInUser,
} from "./actions/settingsActions";
import PrivateRoute from "./auth/PrivateRoute";
import PublicRoute from "./auth/PublicRoute";
// Components
import RestrictMobile from "./components/RestrictMobile";
import NavBar from "./components/navbar";
import Search from "./components/search/search.js";
import SearchPage from "./components/search/SearchPage"
import DashboardGrid from "./components/dashboard/dashboard";
import Registration from "./components/authentication/Registration";
import Login from "./components/authentication/Login";
import Settings from "./components/settings/Settings.js";
import CompSet from "./components/compSet";
import AboutUs from "./components/aboutus";
import DashboardPlus from "./components/dashboard/dashboardPlus";
import Policy from "./components/TOS/legal";
import Menubar from './components/menubar/Menubar'
import { widgets } from "./components/WidgetSystem/WidgetRegistry";

function App(props) {
	useEffect(() => {
		console.log('getting user data');
		if (localStorage.getItem('token') && localStorage.getItem('userID') && props.loggedInUser.shouldUpdate) {
			//we're logged in but there's no user info in the store, lets fix that

			props.getUserInfo(localStorage.getItem('userID'));
		} else {
			//do we need to delete anything from state when they log out?
			let userInfo = {
				competitors: [],
				loggedInUser: { firstName: null, lastName: null },
				businesses: [],
				activeWidgets: [widgets[0].name, widgets[1].name, widgets[2].name, widgets[3].name, widgets[4].name],
				activeTabs: ['defaultTab'],
				currentlySelectedBusiness: {
					business_id: null,
					businessName: null,
					businessImg: null,
					review_count: 0,
					business_stars: 0,
					changeInRating: ''
				}
			};

      props.setUserInfo(userInfo);
    }
    props.shouldUpdateLoggedInUser(false);
  }, [props.loggedInUser.shouldUpdate]);

  return (
    <div className={(localStorage.getItem("token") ? ('displayFlex') : ('App'))}>
      <RestrictMobile />
      <NavBar />
      <PublicRoute exact path='/' component={SearchPage} />
      <Route path="/Dashboard/" component={DashboardGrid} />
      <Route path="/Register/" component={Registration} />
      <Route path="/Login/" component={Login} />
      <Route path="/Compset" component={CompSet} />
      <Route path="/About" component={AboutUs} />
      <Route path="/Menu" component={Menubar} />
      <Route path="/Legal/:doc" component={Policy} />
      <Route path="/DashboardPlus/" component={DashboardPlus} />
      <PrivateRoute path="/Settings/" component={Settings} />
      <PrivateRoute path="/Search/:searchMode" exact component={SearchPage} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  loggedInUser: state.settings.loggedInUser,
  success: state.settings.loggedInUser.success,
  activeTabs: state.settings.activeTabs,
});

export default withRouter(
  connect(mapStateToProps, {
    setUserInfo,
    getUserInfo,
    shouldUpdateLoggedInUser,
  })(App)
);
