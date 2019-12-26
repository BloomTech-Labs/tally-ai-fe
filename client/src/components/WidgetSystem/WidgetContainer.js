import React, { useState, useEffect } from "react";

import { getWidgetFromName } from "./WidgetRegistry";

const WidgetContainer = (props) => {

    // let GetWidgetFromName = (widgetName) => {
    //     switch (widgetName) {//Whenever we make a new widget we need to update this switch

    //         case "widget1":
    //             return (<ExampleWidget1/>);
    //         case "widget2":
    //             return (<ExampleWidget2/>);
    //         case "widget3":
    //             return (<ExampleWidget3/>);
    //         case "projection":
    //             return (<div>YOU CAN DROP HERE</div>);

    //     }
    // }

    return (
        <div draggable={true} id={props.widgetName} className="widgetContainer" onDragStart={(ev) => {
            localStorage.setItem("dragged", props.widgetName);
        }}>
            {
                getWidgetFromName(props.widgetName)
            }
        </div>
    );
}

export default WidgetContainer;
