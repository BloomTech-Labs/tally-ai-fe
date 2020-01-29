import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { selectBusiness, setActiveTabs } from "../../actions/index";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

//expects a prop called business which contains business data
const Tabs = props => {

  const [selected, setSelected] = useState(false);

  function getBusinessFromID(id) {
    return props.businesses.filter((business) => {
      return id === business.businessId;
    })[0]
  }

  useEffect(() => {
    if (props.selectedBusiness) {
      if (props.selectedBusiness.businessId === props.business.businessId) {
        setSelected(true);
      } else {
        setSelected(false);
      }
    }
  }, [props.selectedBusiness, props.activeTabs]);

  let className = "tab";
  className += props.competitor ? " competitorTab" : " businessTab";
  className += selected ? " selectedTab" : " unselectedTab";

  function deleteTab() {
    let newActiveTabs = props.activeTabs.filter((tab) => {
      console.log("tab.businessId === props.business.businessId " + tab.businessId + " === " + props.business.businessId);
      return !(tab.businessId === props.business.businessId);
    })
    if (newActiveTabs.length <= 0) {
      let uniqueID = Date.now() + "";
      newActiveTabs.push({ businessId: uniqueID });
      props.selectBusiness({ businessId: uniqueID });
      console.log("selecting biz:", { businessId: uniqueID });
    } else if (selected) {
      let biz = getBusinessFromID(newActiveTabs[0].businessId);
      if (biz) {
        props.selectBusiness(biz);
        console.log("selecting biz:", biz);
      } else {
        props.selectBusiness(newActiveTabs[0]);
        console.log("selecting biz:", newActiveTabs[0]);
      }
    }
    console.log("newActiveTabs: ", newActiveTabs);
    props.setActiveTabs(newActiveTabs, localStorage.getItem("userID"));
  }

  return (
    <div className={className}>
      <div className="deleteTab" onClick={() => deleteTab()}>X</div>
      {businessesContains(props.business) ? (
        <div onClick={() => { props.selectBusiness(props.business); }}>

          <p>
            {getBusinessFromID(props.business.businessId).businessName}
            {selected ? (" - selected") : ("")}
          </p>

        </div>
      ) : (
          <div onClick={() => { props.selectBusiness(props.business); }}>

            <p>
              New Business
        {selected ? (" - selected") : ("")}
            </p>

          </div>
        )
      }
    </div>
  )

  //used to check if this is an actual business or just a new tab
  function businessesContains(business) {
    let found = false;
    props.businesses.forEach(element => {
      if (element.businessId === business.businessId) {
        found = true;
      }
    });
    return found;
  }

};

const mapStateToProps = state => {
  return {
    selectedBusiness: state.currentlySelectedBusiness,
    businesses: state.userBusinesses.businesses.concat(state.competitors.businesses),
    activeTabs: state.tabs.activeTabs
  };
};

export default connect(mapStateToProps, { selectBusiness, setActiveTabs })(Tabs);
