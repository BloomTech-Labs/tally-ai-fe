import React from 'react';
import LineGraph from './LineGraph.svg'
import RadarGraph from './RadarGraph.svg'

const HomeInfo = () => {
    return (
        <div className="home-info">

            <div className="head-title">
                <p>Intelligent visualizations to understand data at a glance</p>
            </div>

            <div className="top-card">
                <div className="RadarIMG">
                    <img src={RadarGraph} alt='Radar Graph Displaying Data' />
                </div>
                <div className="rightpara">
                    <p>Take your evaluations to the next level by understanding how customers rank your competitors, find what you are doing better and build on it, or discover those things that you could do better and uncover growth opportunities.</p>
                </div>
            </div>

            <div className="bottom-card"> 
                <div className="leftpara">  
                    <p>Quickly find trends in word ranks to track improvements or identify reasons of decline. Take your service to the next by identifying your progress and acting on it</p>
                </div>
                <div className="LineIMG">
                    <img src={LineGraph} alt='Line Graph Displaying Data' />
                </div>
            </div> 

            <div className="bottom-info">
                <h1>Use these and many other visualizations to quickly identify problems and informed decisions</h1>
            </div>
        </div>
    )
}

export default HomeInfo; 