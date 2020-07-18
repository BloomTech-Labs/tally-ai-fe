import React from 'react';

import bottomtablet from "../../components/images/bottomtablet.png"

import BottomBlueRectangle from "../../components/images/BottomBlueRectangle.png"
import BottomPolygon2 from "../../components/images/BottomPolygon2.png"
import BottomRectangle from "../../components/images/BottomRectangle.png"


import AOS from 'aos';
import 'aos/dist/aos.css';
import './home.scss'

import magnifier from "../../components/images/Magnifier.png"
import wavyLine from "../../components/images/wavyLine.png"

const HomeInfo = () => {
    AOS.init()
    return (
        <div className="home-info"
            data-aos="fade-down"
            data-aos-offset="200"
            data-aos-delay="50"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="true"
            >

            <div className="top-card">
                <div className="leftpara">
                    <img src={magnifier} alt="Magnifying glass image" />
                    <div className="leftpara-text">
                    <h1 >Build the business your customers want</h1>
                    <p>Understand your online reviews and feedback to improve ineffeciences.</p>
                    </div>
                </div>
                <div className="TopTabletIMG">
                    {/* <img className="HomePicture" src={TopOrangePolygon} alt='Orange Polygon' />
                    <img className="HomePicture2" src={YellowTopReactangle} alt='Yellow Reactangle' />
                    <img className="HomePicture3" src={BlueTopRectangle} alt='Blue Rectangle' />
                    <img className="HomePicture4" src={toptablet} alt='Radar Graph Displaying Data' /> */}
                </div>   
            </div>

            <div className="bottom-card"
                    data-aos="fade-down"
                    data-aos-offset="200"
                    data-aos-delay="50"
                    data-aos-duration="1000"
                    data-aos-easing="ease-in-out"
                    data-aos-mirror="true"
                    data-aos-once="true"> 
                <div className="rightpara">  
                    <h1>Keep track of your competitors</h1>
                    <p>Keep a close eye on the competition by simply adding businesses to your easy-to-use dashboard and see what their customers are saying about them.</p>
                </div>
                <div className="BottomTabletIMG">
                    <img className="HomePicture5" src={BottomBlueRectangle} alt='Blue Rectangle' />
                    <img className="HomePicture6" src={BottomPolygon2} alt='Blue Polygon' />
                    <img className="HomePicture7" src={BottomRectangle} alt='Yellow Rectangle' />
                    <img className="HomePicture8" src={bottomtablet} alt='Line Graph Displaying Data' />
                </div>
               
            </div> 
            <div className="wavy-line"
                    data-aos="fade-down"
                    data-aos-offset="200"
                    data-aos-delay="50"
                    data-aos-duration="1000"
                    data-aos-easing="ease-in-out"
                    data-aos-mirror="true"
                    data-aos-once="true">
                    <h1>Be informed.  Make the right decisions.</h1>
                    <img src={wavyLine} alt="blue wavy line"  />
                    <h1 className="bottom-h1-info">Build the business your customers want</h1>
                </div>

        </div>
    )
}

export default HomeInfo; 