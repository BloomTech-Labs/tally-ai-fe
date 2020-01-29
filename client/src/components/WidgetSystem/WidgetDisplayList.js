import React, { useState } from "react";

import WidgetContainer from "./WidgetContainer";
import { setActiveWidgets } from "../../actions/index";
import { connect } from "react-redux";

import { widgets } from "./WidgetRegistry";

const WidgetDisplayList = (props) => {

    function getElementCenter(element) {

        let boundingRect = element.getBoundingClientRect();

        return { x: boundingRect.left + boundingRect.width / 2, y: boundingRect.top + boundingRect.height / 2 }

    }

    function distance(point1, point2) {
        return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
    }

    function getClosestWidgetToMouse(mousePosition) {

        //the closest element to the mouse we've encountered so far, at the end of the loop it will be the closest element out of them all to the mouse
        let closestElementToMouse;

        //the closest distance we've encountered so far between the mouse and a widget on the screen
        let closestDistanceFromMouse = 9999999;//gotta be a big screen for this loop to not find a new closest distance
        //Loop through all the widgets on the screen and find the closest widget to the mouse position
        props.activeWidgets.forEach(element => {
            
            let widget = document.getElementById(element);
            
            //Lets get the distance from the mouse to this widget
            let distanceFromMouseToWidget = distance(mousePosition, getElementCenter(widget));

            if (distanceFromMouseToWidget < closestDistanceFromMouse) {
                //We found a new closest! Lets update our closest variables
                closestDistanceFromMouse = distanceFromMouseToWidget;
                closestElementToMouse = widget;
            }
        });

        return closestElementToMouse;

    }

    function DropWidget(event) {

        //FIXME: If the user drops the widget outside of the WidgetList, this method is never called, and projections are left/dragged widgets are never added back

        let draggedWidget = localStorage.getItem("dragged");//So we can add the widget (that was deleted while dragging) back, where the user dropped it

        //mouse position vector
        let mousePosition = { x: event.screenX, y: event.screenY }

        let closestWidget = getClosestWidgetToMouse(mousePosition);

        let closestIndex = props.activeWidgets.indexOf(closestWidget.id);

        let activeWidgetsClone = props.activeWidgets.map((item) => item);
        //Remove projections and widgets that are of the same type as draggedWidget as well so you can't have duplicate widgets on your dashboard
        activeWidgetsClone = activeWidgetsClone.filter((widget) => { return widget === "projection" || widget === draggedWidget ? false : true; })
        //Add back draggedWidget in its new spot
        activeWidgetsClone.splice(closestIndex, 0, draggedWidget)
        props.setActiveWidgets(activeWidgetsClone);
    }

    return (
        <div>
            <hr />
            {/* <h4>Widgets</h4> */}
            <div className="widgetList" onDragOver={(event) => {

                event.preventDefault(); /* allow widgets to be droppable when being dragged over widgetList by preventingDefault*/

                //The widget that's being dragged, we need this in storage since it's set in another file. Could change to redux state?
                let draggedWidget = localStorage.getItem("dragged");//So we can delete the widget while its being dragged

                //mouse position vector
                let mousePosition = { x: event.pageX, y: event.pageY }

                let closestWidget = getClosestWidgetToMouse(mousePosition);

                let closestIndex = props.activeWidgets.indexOf(closestWidget.id);

                //If the widgets array doesn't already contain a projection widget in closestIndex, add one and remove any out of position ones. 
                //Otherwise, even though the mouse location changed, the projection is still correct and there is no need to re-render
                if (!(props.activeWidgets[closestIndex] === "projection")) {

                    let activeWidgetsClone = props.activeWidgets.map((item) => item);

                    //remove out-of-position projections
                    activeWidgetsClone = activeWidgetsClone.filter((widget) => { return widget === "projection" || widget === draggedWidget ? false : true; })
                    //Add new projection in correct position
                    activeWidgetsClone.splice(closestIndex, 0, "projection")

                    props.setActiveWidgets(activeWidgetsClone);

                }

            }
            } onDragLeave={
                (e) => DropWidget(e)
            } onDrop= {
                (e) => DropWidget(e)
            }>

                {/* Render Active Widgets */}
                {
                    props.activeWidgets.map((widgetName) => {
                        return (
                            <WidgetContainer widgetName={widgetName} />//WidgetContainer will render the correct widget based on widgetName
                        )
                    })
                }

            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    activeWidgets: state.activeWidgets
  });
  
  export default connect(mapStateToProps, { setActiveWidgets })(WidgetDisplayList);
