import React from "react";


import LineGraph from "../../images/LineGraphPreview.svg"

const PhraseRankPreview = props => {

    return (
        <div>
            <h3>Phrase Sentiment Over Time</h3>
            <img className="widgetPreviewImage" alt="Line Graph" src={LineGraph}></img>
        </div>
    );
}

export default PhraseRankPreview;
