import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

//restricted to users who are logged in
const PublicRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        !localStorage.getItem("token") && !localStorage.getItem("userID") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/dashboard" />
        )
      }
    />
  );

  export default PublicRoute;