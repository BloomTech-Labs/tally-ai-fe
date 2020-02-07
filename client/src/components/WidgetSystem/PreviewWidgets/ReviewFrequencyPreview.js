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

import StarRatingImg from "../../images/BarGraphPreview.svg"

const ReviewFrequencyPreview = () => {

    return (
        <div>
            <h3>Review Frequency</h3>
            <img className="widgetPreviewImage" src={StarRatingImg}></img>
        </div>
    );
}

export default ReviewFrequencyPreview;