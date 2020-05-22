import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import Result from "./result";
import { selectBusiness, resetSearchResults } from "../../actions/index";

import dbContains from "../../dbIds";

/*Required business data for Result
data {
  image_url
  name
  rating (1-5)
  phone
    location {
      address1
      state
      zip_code
    }
}
*/

const Results = props => {
  /* 
    tentativeSelection is made by clicking on the result component.
    Once tentativeSelection is made, the select button appears.
    The tentativeSelection contains business information from Yelp,
    including the businessId used for requests to DS API.
  */
 
/*  
    ten·ta·tive
    /ˈten(t)ədiv/

    adjective

    not certain or fixed; provisional.
    "a tentative conclusion"

    done without confidence; hesitant.
    "he eventually tried a few tentative steps round his hospital room" 
*/
  const [tentativeSelection, setTentativeSelection] = useState("");

  useEffect(() => {
    if(tentativeSelection != ""){
      select();
    }
  }, [tentativeSelection])

  let history = useHistory();

  /*
    select is used as the onClick for the select button.
    Calling the select function does the following:
    - adds the business information from tentativeSelection 
      to the store under state.businessInfo
    - routes the user to the dashboard
  */
  const select = () => {
    props.resetSearchResults();
    props.select(tentativeSelection);
    console.log("Select working, tentative", tentativeSelection);
  };

  console.log("props", props);

  /*
    active, props.businesses.error, and props.businesses.isFetching
    are used to conditionally render the results section.
    
    active is true if the request to Yelp was successful and the
    search results are in
  */
  const [active, setActive] = useState();

  useEffect(() => {
    if (props.businesses.data) {
      //There are now search results to display from state, lets do our CSS animation and render results
      setActive(true);
    }
  }, [props.businesses.data]);

  //TODO: style loading and error messages
  if (props.businesses.error) {
    return <p>Error loading search results...</p>;
  }

  if (props.businesses.isFetching) {
    return <p>Loading search results...</p>;
  }

  if (!active) {
    //we don't want to try to render until state has been touched
    return <></>;
  }

  if(!props.businesses.data){
    return <div></div>
  }

  // if (props.businesses.data.length === 0) {
  //   return <h2>No results found</h2>;
  // } else {
    let animationClass = "";
    let fadeForm = document.querySelector(".search-form");

    if (active) {
      animationClass = " expand-search-results";
      fadeForm.classList.add("formFaded");
    }
    console.log("Animation class", animationClass);

    const results = props.businesses.data.reduce((acc, result) => //acc?
        // For now, only render results that already exist in the database
        dbContains(result.id)
          ? [...acc, ( 
            <Result
              data={result}
              select={select}
              key={result.id}
              setTentativeSelection={setTentativeSelection}
              className={`result ${
                result.id === tentativeSelection.businessId
                  ? "selected"
                  : "not-selected"
              }`}
            />
          )]
          : acc
          , []
    );

    const Sorry = () => (
      <div>
        <h2>Sorry, your business is not currently supported, please try a cafe in Phoenix, AZ!</h2>
      </div>
    );

    const NoResults = () => (
      <div>
        <h2>Sorry, no results for this business.</h2>
      </div>
    );
    

    return (
      <div
        className={"search-results" + animationClass}
        style={{ overflowY: "scroll", marginTop: "8vh", height: "102vh" }} // change margin top to 20vh if you want it to be even with the left div
      >
        {
          props.businesses.data.length 
            ? results.length 
              ? results 
              : <Sorry/>
            : <NoResults />
        }
      </div>
    );
  // }
};

const mapStateToProps = state => ({
  businesses: state.searchResults,
  selectedBusiness: state.currentlySelectedBusiness
});

export default connect(mapStateToProps, { selectBusiness, resetSearchResults })(Results);
