import React from "react";
import {
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Line
} from "recharts";

import data from "../../../dummyData/dummyReviewsOverTime";

const ReviewsOverTime = () => {

    return (
        <div className="exampleWidget4">
            
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="reviews" stroke="#8884d8" activeDot={{ r: 8 }} />
                
            </LineChart>
        </div>
    );
}

export default ReviewsOverTime;
