import React from "react";

import PositiveWords from "./Widgets/PositiveWords";
import PositiveWordsPreview from "./PreviewWidgets/PositiveWordsPreview"

import PhraseRank from "./Widgets/PhraseRank";
import PhraseRankPreview from "./PreviewWidgets/PhraseRankPreview";

import RadarWidget from "./Widgets/RadarWidget";
import RadarWidgetPreview from "./PreviewWidgets/RadarWidgetPreview";

import ReviewFrequency from "./Widgets/ReviewFrequency";
import ReviewFrequencyPreview from "./PreviewWidgets/ReviewFrequencyPreview";

import RatingOverTime from "./Widgets/RatingOverTime";
import RatingOverTimePreview from "./PreviewWidgets/RatingOverTimePreview";

import NegativeWords from "./Widgets/NegativeWords";
import NegativeWordsPreview from "./PreviewWidgets/NegativeWordsPreview";


//Update this array whenever a new widget is added
export let widgets = [
  { name: "topbottomwords", component: <PositiveWords />, previewComponent: <PositiveWordsPreview/> },
  { name: "NegativeWords", component: <NegativeWords />, previewComponent: <NegativeWordsPreview/> },
  { name: "phraserank", component: <PhraseRank />, previewComponent: <PhraseRankPreview/>  },
  // { name: "radarchart", component: <RadarWidget />, previewComponent: <RadarWidgetPreview/>},
  { name: "reviewfrequency", component: <ReviewFrequency />, previewComponent: <ReviewFrequencyPreview/>  },
  { name: "ratingovertime", component: <RatingOverTime />, previewComponent: <RatingOverTimePreview/>  },
  {
    name: "projection",
    component: (
      <div>
        {/* <p>YOU CAN DROP HERE</p> */}
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