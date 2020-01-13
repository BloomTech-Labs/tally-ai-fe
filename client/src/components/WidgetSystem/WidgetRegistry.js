import React from "react";

import TopBottomWords from "./Widgets/TopBottomWords";
import PhraseRank from "./Widgets/PhraseRank";
import RadarWidget from "./Widgets/RadarWidget";
import ReviewFrequency from "./Widgets/ReviewFrequency";
import RatingOverTime from "./Widgets/RatingOverTime";
import ExampleWidget6 from "./Widgets/ExampleWidget6";

//Update this array whenever a new widget is added
export let widgets = [
  { name: "topbottomwords", component: <TopBottomWords /> },
  { name: "phraserank", component: <PhraseRank /> },
  { name: "radarchart", component: <RadarWidget /> },
  { name: "reviewfrequency", component: <ReviewFrequency /> },
  { name: "ratingovertime", component: <RatingOverTime /> },
  { name: "widget6", component: <ExampleWidget6 /> },
  {
    name: "projection",
    component: (
      <div>
        <p>YOU CAN DROP HERE</p>
      </div>
    )
  }
];

export function getWidgetFromName(widgetName) {
  return widgets.find(widget => widget.name === widgetName).component;
}
