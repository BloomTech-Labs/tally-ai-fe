import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import GpsFixedIcon from "@material-ui/icons/GpsFixed";
import { InputAdornment } from "@material-ui/core";
import Results from "./results";


import {
  fetchBusinesses,
  selectBusiness,
  addBusiness,
  removeBusiness,
  addCompetitor,
  removeCompetitor,
} from '../../actions/businessActions';

import axios from "axios";

const mapsKey = process.env.REACT_APP_MAPS_KEY;

const useStyles = makeStyles(theme => ({
  container: {
    marginLeft: "12.5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100vh",
    

    [theme.breakpoints.up('lg')]: {
      
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
    },
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.up('lg')]: {
      marginLeft: "10%",
    }
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%"
  },

  gpsIcon: {
    cursor: "pointer"
  },

  button: {
    margin: "2rem auto 0 auto",
    width: '6rem',
    backgroundColor: '#1E4DC7',
    color: 'white',
    borderRadius:'20px',
  },

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
    }
   
    props.selectBusiness(selection); //lets go ahead and assume they want to view this new bussiness/competitor on the dashboard as well
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
					`https://us1.locationiq.com/v1/reverse.php?key=${mapsKey}&lat=${searchLocation.latitude}&lon=${searchLocation.longitude}&format=json`
				)
				.then(res => {
					console.log('Got location', res)
					setReadableLocation(res.data.address.city)
				})
				.catch(err => {
					console.error('Could not get location from coords')
				})
		}
	}, [searchLocation])

  function Title(params) {
    if(params.searchMode === "business"){
      return <h1>Search for your Business</h1>
    } else if( params.searchMode === "competitor"){
      return <h1>Search for a Competitor</h1>
    } else {
      return <h1>See what customers are saying about your business!</h1>
    }

  }
  return (
    <div className={classes.container}>
      <form className={classes.form}>    
          {Title(props.match.params)}   
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
          label="City"
          value={
            searchLocation.longitude && searchLocation.latitude
              ? readableLocation
              : searchLocation
          }
          variant="outlined"
          margin="normal"
          type="text"
          className={classes.textField}
          placeholder={
            searchLocation.logitude && searchLocation.latitude
              ? readableLocation
              : "City"
          }
          onChange={e => {
            setSearchLocation(e.target.value);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title="Use your current location" arrow>
                  <GpsFixedIcon
                    className={classes.gpsIcon}
                    onClick={() => {
                      if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(loc => {
                          console.log(loc.coords)
                          setSearchLocation(loc.coords);
                        });
                      } else {
                        alert("Failed to access browser geolocation");
                      }
                    }}
                  />
                </Tooltip>
              </InputAdornment>
            )
          }}
        ></TextField>
        <Button
          disabled={props.searchResults.isFetching}
          className={classes.button}
          variant="outlined"
          color="blue"
          type="submit"
          onClick={e => {
            e.preventDefault();
            console.log(searchTerm, searchLocation)
            // props.searchResultsPlaceholder(placeholderBusinesses);
            props.fetchBusinesses({
              name: searchTerm,
              city: searchLocation
            });
          }}
        >
          Search
        </Button>
      </form>
      
      <Results select={resultsSelection} />      
    </div>
  );
};

const mapStateToProps = state => ({
  competitors: state.business.competitors,
  businesses: state.business.businesses, 
  selectedBusiness: state.business.currentlySelectedBusiness,
  searchResults : state.business.searchResults
});

export default connect(mapStateToProps, {
  fetchBusinesses,
  addBusiness,
  addCompetitor,
  removeBusiness,
  removeCompetitor,
  selectBusiness
})(SearchPage);
