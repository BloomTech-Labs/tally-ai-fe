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

import RadarImg from "../../images/RadarGraphPreview.svg";

const RadarWidgetPreview = () => {

    return (
        <div>
            <h3>Radar Widget</h3>
            <img src={RadarImg}></img>
        </div>
    );
}

export default RadarWidgetPreview;