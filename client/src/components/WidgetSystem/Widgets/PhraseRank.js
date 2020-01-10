import React, { useState, useEffect } from "react";
import { fetchWordsOverTime } from "../../../actions/index";
import { connect } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

// const data = [
//   {
//     name: "Date 1",
//     music: 2.1,
//     food: 4,
//     menu: 3,
//     wait: 4,
//     service: 5,
//     coffee: 3,
//     specials: 4
//   },
//   {
//     name: "Date 2",
//     music: 3,
//     food: 4,
//     menu: 2,
//     wait: 3,
//     service: 5,
//     coffee: 3,
//     specials: 4
//   },
//   {
//     name: "Date 3",
//     music: 3,
//     food: 4,
//     menu: 2,
//     wait: 3,
//     service: 4,
//     coffee: 3,
//     specials: 3
//   },
//   {
//     name: "Date 4",
//     music: 4,
//     food: 5,
//     menu: 2,
//     wait: 3,
//     service: 4,
//     coffee: 2.5,
//     specials: 4
//   },
//   {
//     name: "Date 5",
//     music: 2,
//     food: 5,
//     menu: 3,
//     wait: 4,
//     service: 5,
//     coffee: 2.5,
//     specials: 4
//   },
//   {
//     name: "Date 6",
//     music: 1,
//     food: 5,
//     menu: 3,
//     wait: 5,
//     service: 5,
//     coffee: 3,
//     specials: 5
//   },
//   {
//     name: "Date 7",
//     music: 1,
//     food: 4,
//     menu: 3,
//     wait: 5,
//     service: 4,
//     coffee: 3,
//     specials: 3
//   }
// ];

// [
//   {
//       date: 'string with date',
//       data: [ { phrase: "phrase 1", rank: 1}, { phrase: "phrase 2", rank: 1}, { phrase: "phrase 3", rank: 1} ]
//   },
//   {
//       date: 'string with date',
//       data: [ { phrase: "phrase 1", rank: 2}, { phrase: "phrase 2", rank: 2}, { phrase: "phrase 3", rank: 1.5} ]
//   },
//   {
//       date: 'string with date',
//       data: [ { phrase: "phrase 1", rank: 2}, { phrase: "phrase 2", rank: 4}, { phrase: "phrase 3", rank: 2} ]
//   },
// ]

// ***** FORMAT OF DATA FROM API *****
// const data = [
//   {
//     "date": "2018-11-30",
//     "data": [
//       {
//         "phrase": "room service",
//         "rank": 0.07187422941187253
//       },
//       {
//         "phrase": "room",
//         "rank": 0.06953759794899689
//       }
//     ]
//   }
// ]

// function unpackData(oldData, newData) {
//   if (oldData.length === 0) {
//     return newData;
//   } else {
//     const nextPoint = oldData.pop();
//     return unpackData(oldData, newData.concat(...nextPoint));
//   }
// }

// function formatData(data) {
//   return data.map(dataPoint => ({
//     name: dataPoint.date,
//     ...dataPoint.data
//   }))
// }

//how phrases rank
const PhraseRank = props => {
  const [formattedData, setFormattedData] = useState();

  // useEffect(() => {
  //   props.fetchWordsOverTime();
  // }, []);

  useEffect(() => {
    console.log("useEfffect working");
    if (props.data) {
      //format data
      let tempFormattedData = [];
      props.data.forEach(date => {
        let tempObject = {};
        tempObject.name = date.name;
        date.data.forEach(data => {
          tempObject[data.phrase] = data.rank; //dynamically add a variable to tempObject with the name of data.phrase, and set its value as that phrase's rank
        });
        tempFormattedData.push(tempObject);
      });
      console.log("Result", tempFormattedData);
      setFormattedData(tempFormattedData);
    }
  }, [props.data]);

  if (props.isFetching) {
    return <div className="phraseRank">Loading...</div>;
  }
  if (props.error) {
    return <div className="phraseRank">Error!</div>;
  }

  //a widget that maps the rank of a phrase over time
  return (
    <LineChart
      width={500}
      height={300}
      data={formattedData}
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
        dataKey="music"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />

      <Line type="monotone" dataKey="food" stroke="#7E4E60" />
      <Line type="monotone" dataKey="menu" stroke="#B287A3" />
      <Line type="monotone" dataKey="wait" stroke="#82ca9d" />
      <Line type="monotone" dataKey="service" stroke="#C0F8D1" />
      <Line type="monotone" dataKey="coffee" stroke="#BDCFB5" />
      <Line type="monotone" dataKey="specials" stroke="#482728" />
    </LineChart>
  );
};
// wordsOverTime: {
//     isFetching: false,
//     error: null,
//     data: { words: dummyWordsOverTime }
const mapStateToProps = state => ({
  data: state.widgetData.wordsOverTime.data.words,
  error: state.widgetData.wordsOverTime.error,
  isFetching: state.widgetData.wordsOverTime.isFetching
});

export default connect(mapStateToProps, { fetchWordsOverTime })(PhraseRank);
