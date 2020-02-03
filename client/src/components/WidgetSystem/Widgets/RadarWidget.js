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

const RadarWidget = props => {
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
    <div className="radarChart" style={{ width: "100%", height: "100%" }}>
      <h3 className="widgetTitle">Radar Data</h3>
      <p className="widgetSubtitle">A cool Radar Chart</p>
      <div style={{ width: "90%", height: "65%" }}>
        <ResponsiveContainer            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 100
              }}>
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
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  data: state.widgetData.radarWidget.data,
  isFetching: state.widgetData.radarWidget.isFetching,
  error: state.widgetData.radarWidget.error
});

export default connect(mapStateToProps, {})(RadarWidget);
