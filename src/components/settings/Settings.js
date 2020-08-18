import React from 'react'

import EditAccount from "./EditAccount.js";
import EditPassword from "./EditPassword.js";
import HelpForm from "./Help.js";

import { makeStyles,withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {AccountCircle,Lock,Help} from '@material-ui/icons';



import { selectBusiness } from '../../actions/businessActions'

import { connect } from 'react-redux'

const StyledTab = withStyles((theme) => ({
    root: {
      textTransform: 'none',
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.pxToRem(16),
      '&:focus': {
        opacity: 1,
        fontWeight: "bold",
        
      },
      '&$selected': {
        color: 'black',
        fontWeight: theme.typography.fontWeightMedium,
      },
      '&:hover':{
          opacity: 1,
          fontWeight: "bold",
      }
    },
    wrapper: ()=>({
        flexDirection: 'row',
        justifyContent: 'flex-start',
    }),
    labelIcon: {
        '& $wrapper *:first-child': {
              marginBottom: 0,
              marginRight: 16,
              fontSize: 20,
        },    
    },
    selected: () => ({
        '& $wrapper': {
          fontWeight: `bold`,
          color: "black !important"
        },
      }),
  }))((props) => <Tab disableRipple {...props} />);

  const StyledTabs = withStyles({
    root:{
        minWidth: 200,
        paddingLeft: "2%",
    },
    indicator: {
      display: 'none',
    },
  })((props) => <Tabs {...props}  TabIndicatorProps={{ children: <span /> }}/>);

const useStyles = makeStyles(theme => ({
    root: {

        
        boxSizing: "border-box",
        
        minHeight: "95vh",
        
        marginLeft: "15%", 
        marginRight: "15%", 
        paddingBottom: "4rem",
        borderRadius: "2px",
        paddingTop: "8rem",
    },
    title:{
        textAlign: "left",
        paddingLeft: "2rem",
        paddingTop:" 0",
        backgroundColor: "rgba(223, 223, 223, 0.46)",
    },
    textTitle:{
        margin:"0",
        paddingBottom: ".5rem",
        paddingTop: "1.4rem",
    },
    textTitle2:{
        margin: "0",
        paddingBottom: "1.4rem"
    },
    tabContainer:{
        display: 'flex',
        flexDirection: "row",
        backgroundColor: "rgba(223, 223, 223, 0.46)",
        
    },

}));

function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }

function Settings(props) {

    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <div className={classes.root}>
        <div className={classes.title}>
            <h1 className={classes.textTitle}>Settings</h1>
            <h2 className={classes.textTitle2}>Change basic account settings</h2>
        </div>
        <div className={classes.tabContainer}>
            <StyledTabs
            orientation="vertical"
            indicatorColor="primary"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs"
            >
            <StyledTab label="Account" icon={<AccountCircle/>} {...a11yProps(0)} />
            <StyledTab disabled={props.type === "google"} label="Password" icon={<Lock/>} {...a11yProps(1)} />
            <StyledTab label="Help" icon={<Help/>} {...a11yProps(2)} />


            </StyledTabs>
            {value === 0 && <EditAccount index={0}/>}
            {value === 1 && <EditPassword index={1}/>}
            {value === 2 && <HelpForm index={2}/>}
        </div>
      </div>
    );
  }

const mapStateToProps = state => {
	return {
    type: state.settings.data.type,
		isFetching: state.settings.isFetching,
		error: state.settings.error,
	}
}

export default connect(mapStateToProps, {
	addBusiness: selectBusiness
})(Settings)
