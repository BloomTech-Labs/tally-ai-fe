import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { selectBusiness, setActiveTabs } from "../../actions/index";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

//expects a prop called business which contains business data
const Tabs = props => {

  const [selected, setSelected] = useState(false);

  const [tabBusiness, setTabBusiness] = useState(props.business);

  useEffect(() => {
    setTabBusiness(props.business);
  }, [props.business])

  function getBusinessFromID(id) {
    return props.businesses.filter((business) => {
      return id === business.businessId;
    })[0]
  }

  useEffect(() => {
    if (props.selectedBusiness) {
      if (props.selectedBusiness.businessId === tabBusiness.businessId) {
        setSelected(true);
      } else {
        setSelected(false);
      }
    }

    //make sure this tab's business hasn't been deleted. If it has, turn tab into new window
    let found = false;
    props.businesses.forEach((item) => {
      if(item.businessId === tabBusiness.businessId){
        found = true;
      }
    })
    if(!found){
      setTabBusiness ({ businessId: Date.now() });
    }
  }, [props.selectedBusiness, props.activeTabs, props.businesses]);

  let className = "tab";
  // className += props.competitor ? " competitorTab" : " businessTab";
  if (props.competitors.filter(item => tabBusiness.businessId === item.businessId).length >= 1) {
    className += " competitorTab";
  }else if (props.businesses.filter(item => tabBusiness.businessId === item.businessId).length >= 1) {
    className += " businessTab";
  }else{
    className += " newTab";
  }
  className += selected ? " selectedTab" : " unselectedTab";

  function deleteTab() {
    let newActiveTabs = props.activeTabs.filter((tab) => {
      console.log("tab.businessId === tabBusiness.businessId " + tab.businessId + " === " + tabBusiness.businessId);
      return !(tab.businessId === tabBusiness.businessId);
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
    <div className={className} onClick={() => { props.selectBusiness(tabBusiness); }}>
      <div className="deleteTab" onClick={(e) => e.stopPropagation() & deleteTab()}>X</div>
      {businessesContains(tabBusiness) ? (
        <div>

          <p>
            {getBusinessFromID(tabBusiness.businessId).businessName}
            {/* {selected ? (" - selected") : ("")} */}
          </p>

        </div>
      ) : (
          <div>

            <p>
              New Business
        {/* {selected ? (" - selected") : ("")} */}
            </p>

          </div>
        )
      }
      <div className="tabSpace"></div>{/* For styling, don't delete*/}
    </div>
  )

  //used to check if this is an actual business or just a new tab
  function businessesContains(business) {
    let found = false;
    // console.log("Checking ", tabBusinesses, " for ", business);
    props.businesses.forEach(element => {
      // console.log("element.businessId === business.businessId", element.businessId, "===", business.businessId)
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
    activeTabs: state.tabs.activeTabs,
    userBusinesses: state.userBusinesses.businesses,
    competitors: state.competitors.businesses
  };
};

export default connect(mapStateToProps, { selectBusiness, setActiveTabs })(Tabs);
