import React, { useState } from "react";

import WidgetContainer from "./WidgetContainer";

import { widgets } from "./WidgetRegistry";

const WidgetDisplayList = () => {

    let defaultWidgets = [widgets[0].name, widgets[1].name];//Later we can load some saved dashboard widgets from the db (should still have a default value here so they don't start out with an empty dashboard)

    //TODO: Change to Redux state
    const [activeWidgets, setActiveWidgets] = useState(defaultWidgets);//Array order really matters here, since it determines in which order they'll render. When the user drags an element to a new position on the screen, we need to translate that position to array position

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
        activeWidgets.forEach(element => {

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

    return (
        <div>
            <hr />
            <h4>Widgets</h4>
            <div className="widgetList" onDragOver={(event) => {

                event.preventDefault(); /* allow widgets to be droppable when being dragged over widgetList by preventingDefault*/

                //The widget that's being dragged, we need this in storage since it's set in another file. Could change to redux state?
                let draggedWidget = localStorage.getItem("dragged");//So we can delete the widget while its being dragged

                //mouse position vector
                let mousePosition = { x: event.pageX, y: event.pageY }

                let closestWidget = getClosestWidgetToMouse(mousePosition);

                let closestIndex = activeWidgets.indexOf(closestWidget.id);

                //If the widgets array doesn't already contain a projection widget in projectedLocation, add one and remove any out of position ones. 
                //Otherwise, even though the mouse location changed, the projection is still correct and there is no need to re-render
                if (!(activeWidgets[closestIndex] === "projection")) {

                    let activeWidgetsClone = activeWidgets.map((item) => item);

                    //remove out-of-position projections
                    activeWidgetsClone = activeWidgetsClone.filter((widget) => { return widget === "projection" || widget === draggedWidget ? false : true; })
                    //Add new projection in correct position
                    activeWidgetsClone.splice(closestIndex, 0, "projection")

                    setActiveWidgets(activeWidgetsClone);

                }

            }
            } onDrop={(event) => {

                //FIXME: If the user drops the widget outside of the WidgetList, this method is never called, and projections are left/dragged widgets are never added back

                let draggedWidget = localStorage.getItem("dragged");//So we can add the widget (that was deleted while dragging) back, where the user dropped it

                //mouse position vector
                let mousePosition = { x: event.pageX, y: event.pageY }

                let closestWidget = getClosestWidgetToMouse(mousePosition);

                let closestIndex = activeWidgets.indexOf(closestWidget.id);

                let activeWidgetsClone = activeWidgets.map((item) => item);
                //Remove projections and widgets that are of the same type as draggedWidget as well so you can't have duplicate widgets on your dashboard
                activeWidgetsClone = activeWidgetsClone.filter((widget) => { return widget === "projection" || widget === draggedWidget ? false : true; })
                //Add back draggedWidget in its new spot
                activeWidgetsClone.splice(closestIndex, 0, draggedWidget)
                setActiveWidgets(activeWidgetsClone);
            }
            }>

                {/* Render Active Widgets */}
                {
                    activeWidgets.map((widgetName) => {
                        return (
                            <WidgetContainer widgetName={widgetName} />//WidgetContainer will render the correct widget based on widgetName
                        )
                    })
                }

            </div>
        </div>
    );
}

export default WidgetDisplayList;
