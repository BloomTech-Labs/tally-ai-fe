import React, { useState, useEffect } from "react";

import { getWidgetFromName } from "./WidgetRegistry";

const WidgetContainer = (props) => {

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
