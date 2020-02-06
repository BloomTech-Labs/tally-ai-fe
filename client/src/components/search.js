import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import GpsFixedIcon from "@material-ui/icons/GpsFixed";
import { InputAdornment } from "@material-ui/core";
import Results from "../components/search/results";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheckSquare, faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HomeIcons from "./homeIcons";
import HomeInfo from "./HomeInfoText";
import HomeFeatures from "./HomeFeatures";
import HomeBottomSection from "./HomeBottomSection";
import HomePitches from './HomePitches';

import { fetchBusinesses, selectBusiness } from "../actions/index";
import { searchResultsPlaceholder } from "../actions/index";

import axios from "axios";

import tallySearchLogo from "../components/images/tallySearchLogo.png";

const mapsKey = process.env.REACT_APP_MAPS_KEY;

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    textAlign:"left",
    alignContent:'center',
    width: "40%"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%",
    marginTop: "1%"
  },
  dense: {
    marginTop: theme.spacing(2)
  },

  button: {
    margin: theme.spacing(1),
    marginTop: "2%",
    marginBottom: "6%",
    width: "15%",
    backgroundColor: "#619FFF",
    color: "white"

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

  function resultsSelection(selection) {
    console.log("Selection: ", selection);

    props.selectBusiness(props.selectedBusiness, selection);

    props.history.push("/dashboard");
}

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
    <div className="backgroundcolor">
      <div >
      <div
        className="search-widget"
        style={{
          backgroundSize: "cover",
          
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
            marginTop: "16vh",
            color: "black",
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
          <form className={(props.searchResults ? " growSearch" : classes.container)}>
            <div className="YelpBusinessH1" style={{textAlign:'left', fontSize:'135%', fontWeight:'900'}}>
            <h1 style={{paddingLeft:'2%'}}>See what customers are saying about your business!</h1>
            </div>
            <h2 className="YelpBusinessH2" style={{paddingLeft: '2%', textAlign:'left'}}>Search for a Yelp Business to get started</h2>
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
              style={{borderRadius:'40px', width:'20%'}}
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
        <Results select={resultsSelection}/>
      </div>
      
      {/*  closes div containing backgroundcolor */}
      {/* Made it conditionally render the content at the bottom of the landing page. Once the results come in, the marketing content disappears */}
      {!props.searchResults
        ? (
          <div>
          <img src={tallySearchLogo} alt="tally search logo" style={{position:'absolute', top:'0px', right:'0px', width:'50%' }} />
            <div>
              <HomeIcons />
              <HomeInfo />
              <HomeFeatures />
              <HomePitches />
              <HomeBottomSection />
            </div>
            </div>   
        )
        : (
          <div></div>
        )
      }
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  searchResults: state.searchResults.data,
  selectedBusiness: state.currentlySelectedBusiness
});

export default connect(mapStateToProps, {
  fetchBusinesses,
  selectBusiness
})(Search);
