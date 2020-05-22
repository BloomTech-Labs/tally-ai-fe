import React from "react";
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

const ReviewFrequencyPreview = () => {

    return (
        <div>
            <h3>Review Frequency</h3>
            <img className="widgetPreviewImage" src={LineGraph}></img>
        </div>
    );
}

export default ReviewFrequencyPreview;