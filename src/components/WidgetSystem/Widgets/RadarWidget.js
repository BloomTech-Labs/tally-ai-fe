import React, { useState, useEffect } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from "recharts";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

import { Typography, Paper,Container } from "@material-ui/core";
import { useStyles } from "../WidgetRegistry";

const RadarWidget = props => {
  const classes = useStyles();
  
  if (props.isFetching || props.error || !props.data) {
    return <div>Not enough data...</div>;
  }

  const data = props.data.map(item => {
    return {
      subject: item.subject,
      data1: item.data1,
      data2: item.data2,
      fullMark: item.maxValue
    };
  });
  //  [
  //     { subject: 'Food', A: 45, B: 70, fullMark: 150 },
  //     { subject: 'Service', A: 75, B: 95, fullMark: 150 },
  //     { subject: 'Speed', A: 20, B: 50, fullMark: 150 },
  //     { subject: 'Kindness', A: 65, B: 85, fullMark: 150 },
  //     { subject: 'Ambience', A: 35, B: 45, fullMark: 150}
  //   ];

  console.log("RADAR DATA", props.data);
  return (
    <>
      <Typography variant="h5" className={classes.title}>Radar Data</Typography>
      <Paper className={classes.paper}>
        <Typography variant="subtitle1" gutterBottom  className={classes.subTitle} className="widgetSubtitle">A cool Radar Chart</Typography>
        <Container className={classes.graph}>
          <ResponsiveContainer            
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 100
            }}
          >
            <RadarChart
              cx={250}
              cy={200}
              outerRadius={110}
              data={data}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name="Data 1"
                dataKey="data1"
                stroke="blue"
                fill="blue"
                fillOpacity={0.6}
              />
              <Radar
                name="Data 2"
                dataKey="data2"
                stroke="green"
                fill="green"
                fillOpacity={0.6}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </Container>
      </Paper>
    </>
  );
};

const mapStateToProps = state => ({
  data: state.widgets.widgetData.radarWidget.data,
  isFetching: state.widgets.widgetData.radarWidget.isFetching,
  error: state.widgets.widgetData.radarWidget.error
});

export default connect(mapStateToProps, {})(RadarWidget);
