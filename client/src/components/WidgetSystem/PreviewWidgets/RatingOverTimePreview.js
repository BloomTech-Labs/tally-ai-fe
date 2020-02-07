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
import StarRatingImg from "../../images/StarRatingGraphPreview.svg"

const RatingOverTimePreview = () => {

    return (
        <div>
            <h3>Star Rating</h3>
            <img className="widgetPreviewImage" src={StarRatingImg}></img>
        </div>
    );
}

export default RatingOverTimePreview;