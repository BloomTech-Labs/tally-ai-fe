import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import GpsFixedIcon from "@material-ui/icons/GpsFixed";
import { InputAdornment } from "@material-ui/core";
import Results from "../components/search/results";

import {
  addCompetitor,
  removeCompetitor,
} from "../actions/competitorsActions";

import {
  fetchBusinesses,
  selectBusiness,
  addBusiness,
  removeBusiness
} from '../actions/businessActions';

import axios from "axios";

const mapsKey = process.env.REACT_APP_MAPS_KEY;

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    alignItems: "center",
    margin: "auto"
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
  },
  card: {
    display: "flex",
    flexDirection: "column",
    transitionDuration: "0.3s",
    width: "35%",
    height: "50%",
    margin: 20,
    padding: 20,
    borderRadius: 20
  },
  paper: {
    position: "absolute",
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

//searchMode true = competitor search
//searchMode false = my biz search
const SearchPage = props => {
  const classes = useStyles();

  const [searchTerm, setSearchTerm] = useState();
  const [searchLocation, setSearchLocation] = useState("");
  const [readableLocation, setReadableLocation] = useState();

  function resultsSelection(selection) {
    console.log("Selection: ", selection);

    if (props.match.params.searchMode === "competitor") {
      console.log("Adding competitor");
      props.addCompetitor(selection, localStorage.getItem("userID"));
    } else {
      console.log("Adding business", selection);
      props.addBusiness(selection, localStorage.getItem("userID"));
    }//.filter((item) => !(item.businessId === props.selectedBusiness.businessId))
   
    props.selectBusiness(props.selectedBusiness, selection); //lets go ahead and assume they want to view this new bussiness/competitor on the dashboard as well
    props.history.push("/dashboard");
  }

  useEffect(() => {
    console.log("Added business resulting in new state: competitors ", props.competitors, "businesses", props.businesses);
  }, [props.competitors, props.businesses])

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

  console.log("SearchMode ", props.match.params);

  return (
    <div>
      <div>
        <div
          className="search-widget"
          style={{
            backgroundSize: "cover",
            minHeight: "110vh"
          }}
        >
          {/* <h1>See what customers are saying about your business!</h1> */}

          <div
            className="search-form"
            style={{
              minHeight: "90vh",
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              color: "#0D47A1",
              
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
                {props.match.params.searchMode === "competitor" ? (

                  <h1>Search for a Competitor</h1>
                ) : (
                  <h1>Search for your Business</h1>
                )}
              </div>
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
                Search
              </Button>
            </form>
          </div>
          <Results select={resultsSelection} />
        </div>
      </div>

      {/*  closes div containing backgroundcolor */}
    </div>
  );
};

const mapStateToProps = state => ({
  competitors: state.competitor.competitors.businesses,
  businesses: state.business.userBusinesses.businesses,
  selectedBusiness: state.business.currentlySelectedBusiness
});

export default connect(mapStateToProps, {
  fetchBusinesses,
  addBusiness,
  addCompetitor,
  removeBusiness,
  removeCompetitor,
  selectBusiness
})(SearchPage);
