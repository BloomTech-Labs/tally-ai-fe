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
        <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={data}>
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
