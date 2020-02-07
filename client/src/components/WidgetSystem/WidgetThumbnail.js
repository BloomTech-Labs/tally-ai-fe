import React, { useState, useEffect } from "react";

import { getWidgetPreviewFromName } from "./WidgetRegistry";

import { setActiveWidgets } from "../../actions/index";
import { connect } from "react-redux";

import Hovered from "../../images/PreviewHovered.png";
import Selected from "../../images/PreviewSelected.png";

//It's like WidgetContainer but it renders a preview instead of the actual widget
const WidgetThumbnail = props => {
  const [selected, setSelected] = useState(false);
  const [hovered, setHovered] = useState(false);

//   function getOverlay() {
//     if (selected) {
//       return "";
//     } else if (hovered) {
//       return <img src={Hovered} alt="Selected" class="overlayImg"></img>;
//     } else {
//       return;
//     }
//   }

  useEffect(() => {
    if (props.activeWidgets.includes(props.widgetName)) {
      //this widget is in activeWidgets, that means we're selected
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [props.activeWidgets]);

  return (
    <div
      id={props.widgetName + "Thumbnail"}
      className="widgetThumbnail"
      onClick={() => {
        if (!selected) {
          //add since it's selected now:
          props.setActiveWidgets([...props.activeWidgets, props.widgetName]);
        } else {
          //remove
          props.setActiveWidgets(
            props.activeWidgets.filter(name => props.widgetName != name)
          );
        }
      }}
      onMouseOver={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
    >
      {getWidgetPreviewFromName(props.widgetName)}
    </div>
  );
};

const mapStateToProps = state => ({
  activeWidgets: state.activeWidgets
});

export default connect(mapStateToProps, { setActiveWidgets })(WidgetThumbnail);
