import React from "react";

import WidgetContainer from "./WidgetContainer";
import { setActiveWidgets } from "../../actions/widgetsActions";
import { connect } from "react-redux";


import { Grid,  } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: "2rem",
    }
}))

const WidgetDisplayList = (props) => {
    const classes = useStyles();
    return (    
        <Grid className={classes.root} container spacing={3}        >
            {
                props.activeWidgets.map((widgetName) => {
                    return (
                        <WidgetContainer widgetName={widgetName} />
                    )
                })
            }
            
        </Grid>
        
    );
}

const mapStateToProps = state => ({
    activeWidgets: state.widgets.activeWidgets
  });
  
  export default connect(mapStateToProps, { setActiveWidgets })(WidgetDisplayList);
