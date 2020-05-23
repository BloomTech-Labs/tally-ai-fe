import React, { useState, useEffect } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

import LineGraph from "../../images/LineGraphPreview.svg"

const PhraseRankPreview = props => {

    return (
        <div>
            <h3>Phrase Sentiment Over Time</h3>
            <img className="widgetPreviewImage" src={LineGraph}></img>
        </div>
    );
}

export default PhraseRankPreview;
