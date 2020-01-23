import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import GpsFixedIcon from "@material-ui/icons/GpsFixed";
import { InputAdornment } from "@material-ui/core";
import Results from "../components/search/results";
import Finder from "./Finder.png";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheckSquare, faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HomeIcons from "./homeIcons";
import HomeInfo from "./HomeInfoText";
import HomeFeatures from "./HomeFeatures";
import HomeBottomSection from "./HomeBottomSection";

import { fetchBusinesses } from "../actions/index";
import { searchResultsPlaceholder } from "../actions/index";

import axios from "axios";

const mapsKey = process.env.REACT_APP_MAPS_KEY;

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    alignItems: "center"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%"
  },
  dense: {
    marginTop: theme.spacing(2)
  },

  button: {
    margin: theme.spacing(1),
    marginTop: "2%",
    marginBottom: "6%",
    width: "15%"
  },
  input: {
    display: "none"
  }
}));

const Search = props => {
  const classes = useStyles();

  const [searchTerm, setSearchTerm] = useState();
  const [searchLocation, setSearchLocation] = useState("");
  const [readableLocation, setReadableLocation] = useState();

  useEffect(() => {
    if (searchLocation.latitude && searchLocation.longitude) {
      //The searchLocation has changed to use latitude and a logitude, lets get the user friendly location from these coords and fill in the location field with it
      axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${searchLocation.latitude},${searchLocation.longitude}&sensor=true&key=${mapsKey}`
        )
        .then(res => {
          console.log("Got location", res);
          setReadableLocation(res.data.results[4].formatted_address);
        })
        .catch(err => {
          console.error("Could not get location from coords");
        });
    }
  }, [searchLocation]);

  return (
    <div>
      <div className="backgroundcolor">
      {/* <img src={Finder} alt="Guy with Magnifier" /> */}
      <div
        className="search-widget"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(${Finder})`,
        }}
      >
        {/* <h1>See what customers are saying about your business!</h1> */}

        <div
          className="search-form"
          style={{
            height: "100vh",
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            color: "#0D47A1",
            marginLeft: "10%",
          }}
        >
          {/* <div class="mdc-text-field mdc-text-field--outlined">
            <input type="text" id="tf-outlined" class="mdc-text-field__input"></input>
            <div class="mdc-notched-outline"></div>
            <div class="mdc-notched-outline__notch">
            <label for="tf-outlined" class="mdc-floating-label">Your Name</label>
            </div>
            <div class="mdc-notched-outline__trailing"></div>
            </div> */}
          {/* <h1>Search for a business to get started</h1> */}
          <form className={classes.container}>
            <div className="YelpBusinessH1">
            <h1>See what customers are saying about your business!</h1>
            </div>
            <h2 className="YelpBusinessH2">Search for a Yelp Business to get started!</h2>
            <TextField
              label="Business Name"
              variant="outlined"
              margin="normal"
              type="text"
              className={classes.textField}
              placeholder="Business Name"
              onChange={e => {
                setSearchTerm(e.target.value);
                console.log(
                  "Setting search term value to state",
                  e.target.value
                );
              }}
            />
            <TextField
              label="City or State"
              value={
                searchLocation.longitude && searchLocation.latitude
                  ? readableLocation
                  : searchLocation
              }
              variant="outlined"
              margin="normal"
              type="text"
              className={`${classes.textField} `}
              placeholder={
                searchLocation.logitude && searchLocation.latitude
                  ? readableLocation
                  : "City or State"
              }
              onChange={e => {
                setSearchLocation(e.target.value);
              }}
              //     endAdornment={<InputAdornment position="end">
              //     <GpsFixedIcon
              //       aria-label="locator-icon"
              //     //   onClick={handleClickShowPassword}
              //     //   onMouseDown={handleMouseDownPassword}
              //       edge="end"
              //     >
              //       {/* {values.showPassword ? <Visibility /> : <VisibilityOff />} */}
              //     </GpsFixedIcon>
              //   </InputAdornment>

              // <Tooltip title="Use your current location" arrow>
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Use your current location" arrow>
                      <GpsFixedIcon
                        onClick={() => {
                          if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition(loc => {
                              setSearchLocation(loc.coords);
                            });
                          } else {
                            alert("Failed to access browser geolocation");
                          }
                        }}
                        style={{ cursor: "pointer" }}
                      />
                    </Tooltip>
                  </InputAdornment>
                )
              }}
            ></TextField>
            <Button
              className={classes.button}
              variant="outlined"
              color="blue"
              type="submit"
              onClick={e => {
                e.preventDefault();
                // props.searchResultsPlaceholder(placeholderBusinesses);
                props.fetchBusinesses({
                  name: searchTerm,
                  location: searchLocation
                });
              }}
            >
              Submit
            </Button>
          </form>
        </div>
        <Results />
      </div>
      </div>{/*  closes div containing backgroundcolor */}
      <div>
        <HomeIcons />
        <HomeInfo />
        <HomeFeatures />
        <HomeBottomSection />
      </div>
      
    </div>
  );
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {
  fetchBusinesses,
  searchResultsPlaceholder
})(Search);
