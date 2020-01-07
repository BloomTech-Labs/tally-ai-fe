import React, { useState, useEffect } from "react";
import node from '../D3Graphs/PhraseRank';
import rd3 from 'react-d3-library';

const RD3Component = rd3.Component;

const PhraseRank = (props) => {

    // const [d3, setD3] = useState('');

    // useEffect(() => {
    //     setD3(node);
    // }, [])

    //a widget that maps the rank of a phrase over time
    return (
        <div className="phraseRank">

            {/* <RD3Component data={d3} /> */}

        </div>
    );

}

export default PhraseRank;
