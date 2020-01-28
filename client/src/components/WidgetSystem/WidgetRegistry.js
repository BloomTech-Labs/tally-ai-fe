import React from "react";

import TopBottomWords from "./Widgets/PositiveWords";
import PhraseRank from "./Widgets/PhraseRank";
import RadarWidget from "./Widgets/RadarWidget";
import ReviewFrequency from "./Widgets/ReviewFrequency";
import RatingOverTime from "./Widgets/RatingOverTime";
import ExampleWidget6 from "./Widgets/NegativeWords";
import PhraseRankPreview from "./PreviewWidgets/PhraseRankPreview";
import TopBottomWordsPreview from "./PreviewWidgets/TopBottomWordsPreview";
import RatingOverTimePreview from "./PreviewWidgets/RatingOverTimePreview";
import ExampleWidget6Preview from "./PreviewWidgets/ExampleWidget6Preview";
import ReviewFrequencyPreview from "./PreviewWidgets/ReviewFrequencyPreview";
import RadarWidgetPreview from "./PreviewWidgets/RadarWidgetPreview";

//Update this array whenever a new widget is added
export let widgets = [
  { name: "topbottomwords", component: <TopBottomWords />, previewComponent: <TopBottomWordsPreview/> },
  { name: "NegativeWords", component: <ExampleWidget6 />, previewComponent: <ExampleWidget6Preview/> },
  { name: "phraserank", component: <PhraseRank />, previewComponent: <PhraseRankPreview/>  },
  { name: "radarchart", component: <RadarWidget />, previewComponent: <RadarWidgetPreview/>},
  { name: "reviewfrequency", component: <ReviewFrequency />, previewComponent: <ReviewFrequencyPreview/>  },
  { name: "ratingovertime", component: <RatingOverTime />, previewComponent: <RatingOverTimePreview/>  },
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

export function getWidgetPreviewFromName(widgetName) {
  return widgets.find(widget => widget.name === widgetName).previewComponent;
}