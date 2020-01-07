import React, { useState, useEffect } from "react";
import { fetchWordsOverTime } from "../../../actions/index";
import { connect } from "react-redux";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';
  
  const data = [
    {
      name: 'Date 1', music: 2.1, food: 4, menu: 3, wait: 4, service: 5, coffee: 3, specials: 4
    },
    {
      name: 'Date 2', music: 3, food: 4, menu: 2, wait: 3, service: 5, coffee: 3, specials: 4
    },
    {
      name: 'Date 3', music: 3, food: 4, menu: 2, wait: 3, service: 4, coffee: 3, specials: 3
    },
    {
      name: 'Date 4', music: 4, food: 5, menu: 2, wait: 3, service: 4, coffee: 2.5, specials: 4
    },
    {
      name: 'Date 5', music: 2, food: 5, menu: 3, wait: 4, service: 5, coffee: 2.5, specials: 4
    },
    {
      name: 'Date 6', music: 1, food: 5, menu: 3, wait: 5, service: 5, coffee: 3, specials: 5
    },
    {
      name: 'Date 7', music: 1, food: 4, menu: 3, wait: 5, service: 4, coffee: 3, specials: 3
    },
  ];

//how phrases rank
const PhraseRank = (props) => {

    useEffect(() => {
        props.fetchWordsOverTime();
    }, [])

    if(props.isFetching){
        return (
            <div className="phraseRank">
                Loading...
            </div>
        );
    }
    if (props.error) {
        return (
            <div className="phraseRank">
                Error!
            </div>
        );
    }

    // {
    //     word: "amazing pancakes",
    //     scores: [
    //         {
    //             date: "2018-01-04",
    //             score: 0.069998
    //         },
    //         {
    //             date: "2018-02-03",
    //             score: 0.0671104
    //         },
    //         {
    //             date: "2018-03-05",
    //             score: 0.0640681
    //         }
    //     ]
    // },
    // {
    //     word: "best breakfast",
    //     scores: [
    //         {
    //             date: "2018-01-04",
    //             score: 0.0702622
    //         },
    //         {
    //             date: "2018-02-03",
    //             score: 0.0732167
    //         },
    //         {
    //             date: "2018-03-05",
    //             score: 0.075564 	
    //         }
    //     ]
    // },

    //a widget that maps the rank of a phrase over time
    return (
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="music" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="food" stroke="#7E4E60" />
          <Line type="monotone" dataKey="menu" stroke="#B287A3" />
          <Line type="monotone" dataKey="wait" stroke="#82ca9d" />
          <Line type="monotone" dataKey="service" stroke="#C0F8D1" />
          <Line type="monotone" dataKey="coffee" stroke="#BDCFB5" />
          <Line type="monotone" dataKey="specials" stroke="#482728" />
        </LineChart>
      );

}
// wordsOverTime: {
//     isFetching: false,
//     error: null,
//     data: { words: dummyWordsOverTime }
const mapStateToProps = state => ({
    data: state.wordsOverTime.data,
    error: state.wordsOverTime.error,
    isFetching: state.wordsOverTime.isFetching,
  });
  
  export default connect(mapStateToProps, {fetchWordsOverTime})(PhraseRank);
