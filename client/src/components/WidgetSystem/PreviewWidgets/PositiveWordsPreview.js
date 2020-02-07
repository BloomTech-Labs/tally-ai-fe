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

import PositivePreview from "../../images/PositiveWordsPreview.svg"

const TopBottomWordsPreview = () => {

    return (
        <div>
            <h3>Positive Words</h3>
            <img className="widgetPreviewImage" src={PositivePreview}></img>
        </div>
    );
}

export default TopBottomWordsPreview;