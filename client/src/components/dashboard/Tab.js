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
    if (props.selectedBusiness) {
      if (props.selectedBusiness.businessId === props.business.businessId) {
        setSelected(true);
      } else {
        setSelected(false);
      }
    }
  }, [props.selectedBusiness]);

  let className = "tab";
  className += props.competitor ? " competitorTab" : " businessTab";
  className += selected ? " selectedTab" : " unselectedTab";

  return businessesContains(props.business) ? (
    <div className={className} onClick={() => { props.selectBusiness(props.business); console.log("select onclick working - actual") } }>
      {console.log("actual tab: id ", props.business.businessId, " name: ", props.business.name)}
      <p>
      {props.business.name}
      {selected ? (" - selected") : ("")}</p> 
    </div>
  ) : (
      <div className={className} onClick={() => { props.selectBusiness(props.business); console.log("select onclick working - fake") } }>
        {console.log("new tab")}
        <p>
        New Tab
      {selected ? (" - selected") : ("")}</p> 
      </div>
    );

  //used to check if this is an actual business or just a new tab
  function businessesContains(business) {
    console.log("Checking if businesses contains, businesses:", props.businesses);
    let found = false;
    props.businesses.forEach(element => {
      if (element.businessId === business.businessId) {
        console.log("element.id === business.id", element.id, "===", business.id);
        found = true;
      }
    });
    return found;
  }

};

const mapStateToProps = state => {
  return {
    selectedBusiness: state.currentlySelectedBusiness,
    businesses: state.userBusinesses.businesses.concat(state.competitors.businesses)
  };
};

export default connect(mapStateToProps, { selectBusiness })(Tabs);
