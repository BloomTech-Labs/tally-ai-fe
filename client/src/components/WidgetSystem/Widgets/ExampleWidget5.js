import React from "react";
import { connect } from "react-redux";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";

const RatingOverTime = props => {
  return (
    <div className="exampleWidget5">
      <p>Rating Over Time</p>
      <ComposedChart
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
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="weekly_avg_rating" barSize={20} fill="#413ea0" />
        <Line
          type="monotone"
          dataKey="cumulative_avg_rating"
          stroke="#ff7300"
        />
      </ComposedChart>
    </div>
  );
};

const mapStateToProps = state => ({
  data: state.widgetData.ratingOverTime.data,
  isFetching: state.widgetData.ratingOverTime.isFetching,
  error: state.widgetData.ratingOverTime.data
});

export default connect(mapStateToProps)(RatingOverTime);
