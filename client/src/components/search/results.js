import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import Result from "./result";
import { selectBusiness, resetSearchResults } from "../../actions/index";

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
  const [tentativeSelection, setTentativeSelection] = useState("");

  let history = useHistory();

  /*
    select is used as the onClick for the select button.
    Calling the select function does the following:
    - adds the business information from tentativeSelection 
      to the store under state.businessInfo
    - routes the user to the dashboard
  */
  const select = e => {
    props.resetSearchResults();
    props.select(tentativeSelection);
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

  if (props.businesses.data.length === 0) {
    return <p>No results found</p>;
  } else {
    let animationClass = "";
    let fadeForm = document.querySelector(".search-form");

    if (active) {
      animationClass = " expand-search-results";
      fadeForm.classList.add("formFaded");
    }
    console.log("Animation class", animationClass);
    return (
      <div
        className={"search-results" + animationClass}
        style={{ overflow: "scroll", marginTop: "4%" }}
      >
        {props.businesses.data.map(result => (
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
        ))}
      </div>
    );
  }
};

const mapStateToProps = state => ({
  businesses: state.searchResults
});

export default connect(mapStateToProps, { selectBusiness, resetSearchResults })(Results);
