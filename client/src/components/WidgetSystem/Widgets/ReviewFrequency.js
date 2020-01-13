import React from "react";
import { connect } from "react-redux";
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

const ReviewsOverTime = props => {

    return (
        <div className="exampleWidget4">
            
            <LineChart
                width={500}
                height={300}
                data={props.data}
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

const mapStateToProps = state => ({
    data: state.widgetData.reviewsOverTime.data,
    isFetching: state.widgetData.reviewsOverTime.isFetching,
    error: state.widgetData.reviewsOverTime.error
})

export default connect(mapStateToProps)(ReviewsOverTime);
