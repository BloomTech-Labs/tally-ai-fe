import React from "react";

import ExampleWidget1 from "./Widgets/ExampleWidget1";
import PhraseRank from "./Widgets/PhraseRank";
import ExampleWidget3 from "./Widgets/ExampleWidget3";
import ExampleWidget4 from "./Widgets/ExampleWidget4";
import ExampleWidget5 from "./Widgets/ExampleWidget5";
import ExampleWidget6 from "./Widgets/ExampleWidget6";

//Update this array whenever a new widget is added
export let widgets = [
    {name: "widget1", component: <ExampleWidget1 />},
    {name: "phraserank", component: <PhraseRank />},
    {name: "widget3", component: <ExampleWidget3 />},
    {name: "widget4", component: <ExampleWidget4 />},
    {name: "widget5", component: <ExampleWidget5 />},
    {name: "widget6", component: <ExampleWidget6 />},
    {name: "projection", component: <div><p>YOU CAN DROP HERE</p></div>}
];

export function getWidgetFromName(widgetName) {
    return widgets.find(widget => widget.name === widgetName).component;
};