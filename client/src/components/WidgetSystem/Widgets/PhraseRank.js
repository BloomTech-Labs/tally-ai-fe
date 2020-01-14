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

// let data = [
//   {
//     date: "2018-10-31",
//     data: [
//       { phrase: "cats", rank: 0.10585772170858118 },
//       { phrase: "cat trinkets", rank: 0.10276609484544037 },
//       { phrase: "lagattara cat lounge", rank: 0.057257664750850173 }
//     ]
//   },
//   {
//     date: "2018-10-01",
//     data: [
//       { phrase: "cats", rank: 0.11971089003312244 },
//       { phrase: "cat trinkets", rank: 0.1168975660874371 },
//       { phrase: "lagattara cat lounge", rank: 0.06877317438331688 }
//     ]
//   },
//   {
//     date: "2018-09-01",
//     data: [
//       { phrase: "cats", rank: 0.11971089003312244 },
//       { phrase: "cat trinkets", rank: 0.1168975660874371 },
//       { phrase: "lagattara cat lounge", rank: 0.06877317438331688 }
//     ]
//   },
//   {
//     date: "2018-08-02",
//     data: [
//       { phrase: "cats", rank: 0.07242538036797791 },
//       { phrase: "la gattara cat cafe", rank: 0.07022155054771707 },
//       { phrase: "lagattara cat lounge", rank: 0.060845456326491444 },
//       { phrase: "kitties", rank: 0.06028849990521333 },
//       { phrase: "numerous kitties", rank: 0.05952550442998647 }
//     ]
//   },
//   {
//     date: "2018-07-03",
//     data: [
//       { phrase: "cats", rank: 0.07086249241347795 },
//       { phrase: "la gattara cat cafe", rank: 0.06897468881731089 },
//       { phrase: "lagattara cat lounge", rank: 0.0597698146165342 },
//       { phrase: "kitties", rank: 0.05904150930590128 },
//       { phrase: "numerous kitties", rank: 0.05826887518919016 }
//     ]
//   },
//   {
//     date: "2018-06-03",
//     data: [
//       { phrase: "cats", rank: 0.06841957382380792 },
//       { phrase: "la gattara cat cafe", rank: 0.06587261961869183 },
//       { phrase: "lagattara cat lounge", rank: 0.05932166548658762 },
//       { phrase: "kitties", rank: 0.059087829814863504 },
//       { phrase: "numerous kitties", rank: 0.05785483210640082 }
//     ]
//   },
//   {
//     date: "2018-05-04",
//     data: [
//       { phrase: "more cats", rank: 0.09833681697376886 },
//       { phrase: "cats", rank: 0.09678053448395155 },
//       { phrase: "place", rank: 0.07263061257343 },
//       { phrase: "cat related games", rank: 0.0639522676311155 },
//       { phrase: "a cat lounge", rank: 0.05440661172891563 }
//     ]
//   },
//   {
//     date: "2018-04-04",
//     data: [
//       { phrase: "cats", rank: 0.09043479391028349 },
//       { phrase: "more cats", rank: 0.08981891122211824 },
//       { phrase: "place", rank: 0.06547762352874711 },
//       { phrase: "a cat lounge", rank: 0.052332338424630094 },
//       { phrase: "cat related games", rank: 0.04987447125305996 }
//     ]
//   },
//   {
//     date: "2018-03-05",
//     data: [
//       { phrase: "cats", rank: 0.09527793767077042 },
//       { phrase: "more cats", rank: 0.09464921599958132 },
//       { phrase: "place", rank: 0.06418727387229523 },
//       { phrase: "a cat lounge", rank: 0.055159543183497056 },
//       { phrase: "cat related games", rank: 0.052540543377104856 }
//     ]
//   }
// ];

//how phrases rank
const PhraseRank = props => {
  const [formattedData, setFormattedData] = useState();

  // useEffect(() => {
  //   props.fetchWordsOverTime();
  // }, []);

  useEffect(() => {
    console.log("useEfffect working");
    if (props.data != null) {
      console.log("Data? ", props.data);
      //format data
      let tempFormattedData = [];
      props.data.forEach(date => {
        let tempObject = {};
        tempObject.name = date.date;
        date.data.forEach(item => {
          //scale the rank from 1-5 stars (it's normally 0-1) and round decimals
          tempObject[item.phrase] = scaleFloat(item.rank, 1, 5, 0, 1).toFixed(2); //dynamically add a variable to tempObject with the name of data.phrase, and set its value as that phrase's rank
        });
        tempFormattedData.push(tempObject);
      });
      console.log("Result", tempFormattedData);
      setFormattedData(tempFormattedData);
    }
  }, [props.data]);

  function scaleFloat(num, min, max, inputMin, inputMax) {
    let scaled = ((num - inputMin) / (inputMax - inputMin)) * (max - min) + min;

    return scaled;
  }

  function getLineNames() {
    let allPhrases = [];
    formattedData.forEach(date => {
      Object.keys(date).forEach(phrase => {
        if (!allPhrases.includes(phrase)) {
          //this includes is always false, must be something to do with object comparisons instead of string comparisons
          allPhrases.push(phrase);
        }
      });
    });
    //we should have a comprehensive list of all line names now
    return allPhrases.filter(name => name !== "name"); //exlude the "name" variable cause it's the date, not the data
  }

  if (props.isFetching) {
    return <div className="phraseRank">Loading...</div>;
  }
  if (props.error) {
    return <div className="phraseRank">Error!</div>;
  }

  if (!formattedData) {
    return <div>formatting data</div>;
  }

  //a widget that maps the rank of a phrase over time
  return (
    <div>
    <h3>Word Sentiment Over Time</h3>
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
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />

      {getLineNames().map(lineName => {
        console.log("Adding line with name", lineName);
        return <Line type="monotone" dataKey={lineName} stroke="#B287A3" />;
      })}

      {/* <Line type="monotone" dataKey="food" stroke="#7E4E60" />
      <Line type="monotone" dataKey="menu" stroke="#B287A3" />
      <Line type="monotone" dataKey="wait" stroke="#82ca9d" />
      <Line type="monotone" dataKey="service" stroke="#C0F8D1" />
      <Line type="monotone" dataKey="coffee" stroke="#BDCFB5" />
      <Line type="monotone" dataKey="specials" stroke="#482728" /> */}
    </LineChart>
    </div>
  );
};
// wordsOverTime: {
//     isFetching: false,
//     error: null,
//     data: { words: dummyWordsOverTime }
const mapStateToProps = state => ({
  data: state.widgetData.wordsOverTime.data,
  error: state.widgetData.wordsOverTime.error,
  isFetching: state.widgetData.wordsOverTime.isFetching
});

export default connect(mapStateToProps, { fetchWordsOverTime })(PhraseRank);
