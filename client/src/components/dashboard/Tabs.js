import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Tab from "./Tab";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

//expects a prop called business which contains business data
const Tabs = props => {

  const [newTabs, setNewTabs] = useState(props.businesses.length + props.competitors.length === 0 ? ["defaultTab"] : []);

  return (
    <div className="tabs">
      {props.businesses.map(business => {
        return <Tab business={business} competitor={false}/>;
      })}
      {props.competitors.map(competitor => {
        return <Tab business={competitor} competitor={true}/>;
      })}
      {newTabs.map(newTab => {
        return <Tab business={newTab} competitor={false}/>;
      })}
      <div className="addTab" onClick={() => setNewTabs(newTabs.concat([ { id: Date.now() } ]))}> {/* Add an empty tab with a fake business, which means its an empty tab */}
        +
      </div>
    </div>
  );

};

const mapStateToProps = state => {
  return {
    businesses: state.userBusinesses.businesses,
    competitors: state.competitors.businesses
  };
};

export default connect(mapStateToProps, {} )(Tabs);
