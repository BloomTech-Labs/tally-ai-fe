import React from "react";
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';

import BusinessTab from "./Tab";

import { setActiveTabs, selectBusiness } from "../../actions/index";

const useStyles= makeStyles({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // width: '100%'
  },
});

//expects a prop called business which contains business data
const BusinessTabs = props => {
  
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <div className="tabs" >
      {/* {props.businesses.map(business => {
        return <Tab business={business} competitor={false}/>;
      })}
      {props.competitors.map(competitor => {
        return <Tab business={competitor} competitor={true}/>;
      })} */}
      {props.activeTabs.map(tab => {
        return <BusinessTab business={tab} />;
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

export default connect(mapStateToProps, { setActiveTabs, selectBusiness })(BusinessTabs);
