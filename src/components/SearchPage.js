import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import GpsFixedIcon from "@material-ui/icons/GpsFixed";
import { InputAdornment } from "@material-ui/core";
import Results from "../components/search/results";

import { addCompetitor, removeCompetitor } from "../actions/competitorsActions";

import {
  fetchBusinesses,
  selectBusiness,
  addBusiness,
  removeBusiness,
} from "../actions/businessActions";

import "./searchPage.scss";

import axios from "axios";

const mapsKey = process.env.REACT_APP_MAPS_KEY;

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    alignItems: "center",
    margin: "auto",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%",
  },
  button: {
    margin: theme.spacing(1),
    marginTop: "2%",
    marginBottom: "6%",
    width: "15%",
  },
}));

//searchMode true = competitor search
//searchMode false = my biz search
const SearchPage = (props) => {
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
    } //.filter((item) => !(item.businessId === props.selectedBusiness.businessId))

    props.selectBusiness(props.selectedBusiness, selection); //lets go ahead and assume they want to view this new bussiness/competitor on the dashboard as well
    props.history.push("/dashboard");
  }

  useEffect(() => {
    console.log(
      "Added business resulting in new state: competitors ",
      props.competitors,
      "businesses",
      props.businesses
    );
  }, [props.competitors, props.businesses]);

  useEffect(() => {
    if (searchLocation.latitude && searchLocation.longitude) {
      //The searchLocation has changed to use latitude and a logitude, lets get the user friendly location from these coords and fill in the location field with it
      axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${searchLocation.latitude},${searchLocation.longitude}&sensor=true&key=${mapsKey}`
        )
        .then((res) => {
          console.log("Got location", res);
          setReadableLocation(res.data.results[4].formatted_address);
        })
        .catch((err) => {
          console.error("Could not get location from coords");
        });
    }
  }, [searchLocation]);

  console.log("SearchMode ", props.match.params);

  return (
    <div>
      <div>
        <div className="search-widget">
          {/* <h1>See what customers are saying about your business!</h1> */}

          <div className="search-form">
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
                onChange={(e) => {
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
                onChange={(e) => {
                  setSearchLocation(e.target.value);
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="Use your current location" arrow>
                        <GpsFixedIcon
                          className="gps-fixed-icon"
                          onClick={() => {
                            if (navigator.geolocation) {
                              navigator.geolocation.getCurrentPosition(
                                (loc) => {
                                  setSearchLocation(loc.coords);
                                }
                              );
                            } else {
                              alert("Failed to access browser geolocation");
                            }
                          }}
                        />
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
              ></TextField>
              <Button
                className={classes.button}
                variant="outlined"
                color="blue"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  // props.searchResultsPlaceholder(placeholderBusinesses);
                  props.fetchBusinesses({
                    name: searchTerm,
                    location: searchLocation,
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

const mapStateToProps = (state) => ({
  competitors: state.competitor.competitors.businesses,
  businesses: state.business.userBusinesses.businesses,
  selectedBusiness: state.business.currentlySelectedBusiness,
});

export default connect(mapStateToProps, {
  fetchBusinesses,
  addBusiness,
  addCompetitor,
  removeBusiness,
  removeCompetitor,
  selectBusiness,
})(SearchPage);
