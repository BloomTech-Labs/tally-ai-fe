import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Tab from "./Tab";

import { setActiveTabs, selectBusiness } from "../../actions/index";

//expects a prop called business which contains business data
const Tabs = props => {

  return (
    <div className="tabs">
      {/* {props.businesses.map(business => {
        return <Tab business={business} competitor={false}/>;
      })}
      {props.competitors.map(competitor => {
        return <Tab business={competitor} competitor={true}/>;
      })} */}
      {props.activeTabs.map(tab => {
        return <Tab business={tab} />;
      })}
      <div className="addTab" onClick={() => {
          let uniqueID = Date.now() + "";
          if (props.activeTabs.length < 20) {
            props.setActiveTabs(props.activeTabs, props.activeTabs.concat([{ businessId: uniqueID }]), localStorage.getItem("userID"));
            props.selectBusiness({ businessId: uniqueID });
            console.log("adding new tab with ID ", uniqueID);
          }
      }}> {/* Add an empty tab with a fake business, which means its an empty tab */}
        <p>+</p>
      </div>
    </div>
  );

};

const mapStateToProps = state => {
  return {
    activeTabs: state.tabs.activeTabs,
    businesses: state.userBusinesses.businesses,
    competitors: state.competitors.businesses
  };
};

export default connect(mapStateToProps, { setActiveTabs, selectBusiness })(Tabs);
