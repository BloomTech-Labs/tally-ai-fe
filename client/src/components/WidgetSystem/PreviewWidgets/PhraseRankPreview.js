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

const data = [
    {
        name: "",
        example: 2.1,
    },
    {
        name: "",
        example: 2.4,
    },
    {
        name: "",
        example: 2.9,
    },
    {
        name: "",
        example: 3.5,
    },
    {
        name: "",
        example: 2.4,
    },
    {
        name: "",
        example: 2.6,
    },
    {
        name: "",
        example: 2.9,
    }
];

const PhraseRankPreview = props => {

    return (
        <div>
            <h3>Phrase Sentiment Over Time</h3>
            {/* <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="example" stroke="#B287A3" />;

            </LineChart> */}
        </div>
    );
}

export default PhraseRankPreview;