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

const exampleData = [
  { date: "2017-8-31", reviews: 5 },
  { date: "2017-9-30", reviews: 7 },
  { date: "2017-10-31", reviews: 4 },
  { date: "2017-11-30", reviews: 5 },
  { date: "2018-1-31", reviews: 4 },
  { date: "2018-2-28", reviews: 1 },
  { date: "2018-3-31", reviews: 3 },
  { date: "2018-4-30", reviews: 1 },
  { date: "2018-5-31", reviews: 2 },
  { date: "2018-6-30", reviews: 1 },
  { date: "2018-8-31", reviews: 3 },
  { date: "2018-10-31", reviews: 1 }
];

const ReviewsOverTime = props => {

  console.log(`\nData in ReviewsOverTime\n${props.data}\n`);

  if (props.isFetching || props.data === null) {
    return <div>Loading...</div>;
  }
  if (props.error) {
    return <div>Error!</div>;
  }

  return (
    <div className="exampleWidget4">
      <h3>Review Frequency Over Time</h3>
      <LineChart
        width={500}
        height={300}
        data={props.data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="reviews"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
  );
};

const mapStateToProps = state => ({
  data: state.widgetData.reviewsOverTime.data,
  isFetching: state.widgetData.reviewsOverTime.isFetching,
  error: state.widgetData.reviewsOverTime.error
});

export default connect(mapStateToProps)(ReviewsOverTime);
