import React from "react";
import { Paper, Grid, Typography,  } from "@material-ui/core";

import { getWidgetFromName } from "./WidgetRegistry";

const WidgetContainer = (props) => {

    return (
        <Grid xs={12} sm={props.widgetName === "topbottomwords" || props.widgetName === "NegativeWords" ? 6: 12} item draggable={true} id={props.widgetName}  onDragStart={(ev) => {
            console.log("drag start")
            localStorage.setItem("dragged", props.widgetName);
        }}>
            <Typography variant="h5">{props.title}</Typography>
            {
                getWidgetFromName(props.widgetName)
            }
        </Grid>
    );
}

export default WidgetContainer;
