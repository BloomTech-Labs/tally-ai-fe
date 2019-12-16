import React from "react";
import { connect } from "react-redux";

import Result from "./result";
import { postBusiness } from "../../actions/index";

const Results = ({ data }) => {
  return (
    <div className="results">
      {businesses.map(result => (
        <Result data={result} postBusiness={postBusiness} />
      ))}
    </div>
  );
};

const mapStateToProps = state => ({
  businesses: state.searchResults.data.businesses
});

export default connect(mapStateToProps, { postBusiness })(Results);
