import React, { useState } from "react";

import WidgetContainer from "./WidgetContainer";

import { widgets } from "./WidgetRegistry";

const WidgetAdditionList = () => {
  let widgetList = [];
  widgets.forEach(widget => {
    if (widget.name !== "projection") widgetList.push(widget.name);
  });

  const [availableWidgets, setAvailableWidgets] = useState(widgetList);

  return (
    <div>
      <hr />
      <h4>Add A Widget</h4>

      <div className="widgetList">
        {/* Render Available Widgets */}
        {availableWidgets.map(widgetName => {
          return (
            <WidgetContainer widgetName={widgetName} /> //WidgetContainer will render the correct widget based on widgetName
          );
        })}
      </div>
    </div>
  );
};

export default WidgetAdditionList;
