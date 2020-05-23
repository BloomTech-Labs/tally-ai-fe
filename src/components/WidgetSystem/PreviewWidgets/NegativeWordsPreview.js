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

import NegativePreview from "../../images/NegativeWordsPreview.svg"

const NegativeWordsPreview = () => {

    return (
        <div>
            <h3>Negative Words</h3>
            <img className="widgetPreviewImage" src={NegativePreview}></img>
        </div>
    );
}

export default NegativeWordsPreview;