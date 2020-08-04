import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import PositiveWords from "./Widgets/PositiveWords";
import PositiveWordsPreview from "./PreviewWidgets/PositiveWordsPreview"

import PhraseRank from "./Widgets/PhraseRank";
import PhraseRankPreview from "./PreviewWidgets/PhraseRankPreview";



import ReviewFrequency from "./Widgets/ReviewFrequency";
import ReviewFrequencyPreview from "./PreviewWidgets/ReviewFrequencyPreview";

import RatingOverTime from "./Widgets/RatingOverTime";
import RatingOverTimePreview from "./PreviewWidgets/RatingOverTimePreview";

import NegativeWords from "./Widgets/NegativeWords";
import NegativeWordsPreview from "./PreviewWidgets/NegativeWordsPreview";


//Update this array whenever a new widget is added
export let widgets = [
  { name: "topbottomwords",  component: <PositiveWords />, previewComponent: <PositiveWordsPreview/> },
  { name: "NegativeWords", component: <NegativeWords />, previewComponent: <NegativeWordsPreview/> },
  { name: "phraserank", component: <PhraseRank />, previewComponent: <PhraseRankPreview/>  },
  // { name: "radarchart", component: <RadarWidget />, previewComponent: <RadarWidgetPreview/>},
  { name: "reviewfrequency",  component: <ReviewFrequency />, previewComponent: <ReviewFrequencyPreview/>  },
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


export const useStyles = makeStyles(theme => ({
  paper: {
    display: "flex",
    paddingTop: "5%",
    flexDirection: "column",
    alignItems: "center"
  },
  title: {
    textAlign: "left",
    fontWeight: "700",
    [theme.breakpoints.down('sm')]: {
      fontSize: "1.2rem"
    },
  },
  subTitle: {
    height: "3.3rem",
    textAlign: "left",
    alignSelf: "flex-start",
    margin: "0 1.2rem",
    width: "calc(100% - 2.4rem)",
    lineHeight: "1.1",
    borderBottom: "1px solid #DFDFDF",
  },
  container: {
    marginTop: "2rem",
  },
  item: {
    height: "3rem",
  },  
  graph: {
    
    height: "340px",
  }
}));