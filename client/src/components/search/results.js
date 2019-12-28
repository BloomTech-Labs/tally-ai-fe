import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import Result from "./result";
import { postBusiness } from "../../actions/index";

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
  const [tentativeSelection, setTentativeSelection] = useState();

  let history = useHistory();

  const select = e => {
    console.log("Selection: ", tentativeSelection);
    e.preventDefault();
    props.postBusiness(tentativeSelection);
    history.push("/dashboard");
  };

  console.log("props", props);

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
      <div className={"search-results" + animationClass} style={{overflow:'scroll'}}>
        {props.businesses.data.map(result => (
          <Result
            data={result}
            select={select}
            key={result.id}
            setTentativeSelection={setTentativeSelection}
            className={`result ${
              result.id === tentativeSelection ? "selected" : "not-selected"
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

export default connect(mapStateToProps, { postBusiness })(Results);
