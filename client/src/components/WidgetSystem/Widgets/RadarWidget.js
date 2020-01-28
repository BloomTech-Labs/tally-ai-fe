import React, { useState, useEffect } from "react";
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis } from "recharts";

const RadarWidget = (props) => {
    const data = [
        { subject: 'Food', A: 45, B: 70, fullMark: 150 },
        { subject: 'Service', A: 75, B: 95, fullMark: 150 },
        { subject: 'Speed', A: 20, B: 50, fullMark: 150 },
        { subject: 'Kindness', A: 65, B: 85, fullMark: 150 },
        { subject: 'Ambience', A: 35, B: 45, fullMark: 150}
      ];
    return (
        <div className="radarChart">
        <h3 style={{margin: "5%", textAlign:"start", fontWeight:"bold", fontSize:"30px"}}>Review Frequency</h3>
        <p style={{margin: "5%", textAlign:"start", fontSize:"18px"}}>View the frequency in reviews over time to keep track if promotional efforts are working!</p>
        <RadarChart cx={250} cy={200} outerRadius={110} width={500} height={375} data={data} style={{marginLeft: "100px", marginTop: "-75px"}}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 100]}/>
            <Radar name="Tally" dataKey="A" stroke="blue" fill="blue" fillOpacity={0.6}/>
            <Radar name="Tally2" dataKey="B" stroke="green" fill="green" fillOpacity={0.6}/>
            <Legend />
        </RadarChart>
        </div>
    );
}

export default RadarWidget;
