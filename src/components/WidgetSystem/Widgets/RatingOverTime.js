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
  CartesianGrid,
  ResponsiveContainer
} from "recharts";
import CircularProgress from '@material-ui/core/CircularProgress';

import { Typography, Paper,Container } from "@material-ui/core";
import { useStyles } from "../WidgetRegistry";

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
  const classes = useStyles();

  console.log("Data in RatingOverTime: ", props.data);

  if (props.isFetching || !props.data) {
    return <div><CircularProgress>Loading...</CircularProgress></div>;
  }
  if (props.error) {
    return <div>Error!</div>;
  }

  return (
    <>
      <Typography variant="h5" className={classes.title}>Star Rating</Typography>
      <Paper className={classes.paper}>
        <Typography variant="subtitle1" gutterBottom  className={classes.subTitle}>Look at how your star rating changes over time compared to the weekly average to identify important time periods.</Typography>

        <Container className={classes.graph}>
          <ResponsiveContainer>
            <ComposedChart
              data={props.data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <XAxis dataKey="date" />
              <YAxis type="number" domain={[0, 5]}/>
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
          </ResponsiveContainer>
        </Container>
      </Paper>
    </>
  );
};

const mapStateToProps = state => ({
  data: state.widgets.widgetData.ratingOverTime.data,
  isFetching: state.widgets.widgetData.ratingOverTime.isFetching,
  error: state.widgets.widgetData.ratingOverTime.error
});

export default connect(mapStateToProps)(RatingOverTime);
