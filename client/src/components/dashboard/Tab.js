import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { selectBusiness } from "../../actions/index";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

//expects a prop called business which contains business data
const Tabs = props => {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (props.selectedBusiness.id === props.business.id) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [props.selectedBusiness]);

  let className = props.competitor ? "competitorTab" : "businessTab";
  className += selected ? " selectedTab" : " unselectedTab";

  return businessesContains(props.business) ? (
    <div className={className} onClick={() => selectBusiness(props.business)}>
      {props.business.name}
      {selected ? <p> - selected</p> : <p></p>}
    </div>
  ) : (
    <div className={className} onClick={() => selectBusiness(props.business)}>
      New Tab
      {selected ? <p> - selected</p> : <p></p>}
    </div>
  );

  //used to check if this is an actual business or just a new tab
  function businessesContains (business) {
      let found = false;
      props.businesses.forEach(element => {
          if(element.id === business.id){
              found = true;
          }
      });
      return found;
  }

};

const mapStateToProps = state => {
  return {
    selectedBusiness: state.selectedBusiness,
    businesses: state.userBusinesses.businesses.concat(state.competitors.businesses)
  };
};

export default connect(mapStateToProps, { selectBusiness })(Tabs);
