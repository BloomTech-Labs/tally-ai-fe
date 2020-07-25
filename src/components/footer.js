import React from "react";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import "./footer.scss";

import GitHub from "./images/GitHubIconWhite.svg";

export default function Footer() {
  function isOnLogin() {
    //this function is neccessary because match.params will always be "/" even while on /dashboard since the nav bar is always rendered to "/" (path is unexact "/")

    var url = window.location;
    var firstParam = url.pathname.split("/")[1];

    return firstParam.toUpperCase() === "Login".toUpperCase();
  }

  function isOnDashboard() {
    //this function is neccessary because match.params will always be "/" even while on /dashboard since the nav bar is always rendered to "/" (path is unexact "/")

    var url = window.location;
    var firstParam = url.pathname.split("/")[1];

    return firstParam.toUpperCase() === "Dashboard".toUpperCase();
  }

  function isOnRegister() {
    //this function is neccessary because match.params will always be "/" even while on /dashboard since the nav bar is always rendered to "/" (path is unexact "/")

    var url = window.location;
    var firstParam = url.pathname.split("/")[1];

    return firstParam.toUpperCase() === "Register".toUpperCase();
  }

  let position = isOnDashboard() ? "fixed" : "relative";

  return (
    <footer>
      {isOnLogin() || isOnRegister() ? (
        <div className="is-on"></div>
      ) : (
        <div className="root" style={{ position: position }}>
          <div className="copyright-container">
            <Typography className="footerTitle" align="center">
              <p>TallyAI Copyright © 2020</p>
            </Typography>
          </div>
          <div className="socials-container">
            <a href="https://github.com/Lambda-School-Labs/tally-ai-fe">
              <img src={GitHub} alt="github logo"/>
            </a>
            <Link className="FooterButton" to="/About">
              About
            </Link>
            <Link id="footer-btn" className="FooterButton" to="/Legal/tos">
              Terms Of Service
            </Link>
            <Link className="FooterButton" to="/Legal/privacy">
              Privacy Policy
            </Link>
          </div>
        </div>
      )}
    </footer>
  );
}
