import React from "react";
import { connect } from "react-redux";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer
} from "recharts";
import CircularProgress from '@material-ui/core/CircularProgress';

import { Typography, Paper,Container } from "@material-ui/core";
import { useStyles } from "../WidgetRegistry";

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
  const classes = useStyles();

  console.log(`\nData in ReviewsOverTime\n${props.data}\n`);

  // Conditionally render
  if (props.isFetching || props.data === null) {
    return <div><CircularProgress>Loading...</CircularProgress></div>;
  }
  if (props.error) {
    return <div>Error!</div>;
  }

  return (
    <>
      <Typography variant="h5" className={classes.title}> Review Frequency</Typography>
      <Paper className={classes.paper}>
        <Typography variant="subtitle1" gutterBottom  className={classes.subTitle}>View the frequency in reviews over time to keep track if promotional efforts are working!</Typography>
        <Container className={classes.graph}>
          <ResponsiveContainer>
            <LineChart
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
          </ResponsiveContainer>
        </Container>
      </Paper>
    </>
  );
};

const mapStateToProps = state => ({
  data: state.widgets.widgetData.reviewsOverTime.data,
  isFetching: state.widgets.widgetData.reviewsOverTime.isFetching,
  error: state.widgets.widgetData.reviewsOverTime.error
});

export default connect(mapStateToProps)(ReviewsOverTime);
