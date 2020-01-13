import React from "react";
import { connect } from "react-redux";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from "recharts";

const exampleData = {
  star_data: [
    {date: "2019-12-07", cumulative_avg_rating: 4.5, weekly_avg_rating: 3.0}, 
    {date: "2019-11-23", cumulative_avg_rating: 4.5, weekly_avg_rating: 5.0}, 
    {date: "2019-10-19", cumulative_avg_rating: 4.5, weekly_avg_rating: 5.0}, 
    {date: "2019-09-14", cumulative_avg_rating: 4.5, weekly_avg_rating: 5.0}, 
    {date: "2019-08-17", cumulative_avg_rating: 4.5, weekly_avg_rating: 3.0}, 
    {date: "2019-08-03", cumulative_avg_rating: 4.5, weekly_avg_rating: 5.0}, 
    {date: "2019-07-13", cumulative_avg_rating: 4.5, weekly_avg_rating: 5.0}, 
    {date: "2019-05-25", cumulative_avg_rating: 4.5, weekly_avg_rating: 5.0}
  ]
};

const RatingOverTime = props => {
  return (
    <div className="rating-over-time">
      <ComposedChart
        width={500}
        height={300}
        data={exampleData.star_data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <XAxis dataKey="date" />
        <YAxis />
        <CartesianGrid />
        <Tooltip />
        <Legend />
        {/* {exampleData.star_data.map(point => (<Bar dataKey={point.weekly_avg_rating} barSize={20} fill="#413ea0" />))} */}
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
