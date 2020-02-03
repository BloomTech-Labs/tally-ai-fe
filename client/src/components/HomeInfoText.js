import React from 'react';
import toptablet from "./images/toptablet.png"
import bottomtablet from "./images/bottomtablet.png"
import TopOrangePolygon from "./images/TopOrangePolygon.png"
import YellowTopReactangle from "./images/YellowTopReactangle.png"
import BlueTopRectangle from "./images/BlueTopRectangle.png"
import BottomBlueRectangle from "./images/BottomBlueRectangle.png"
import BottomPolygon2 from "./images/BottomPolygon2.png"
import BottomRectangle from "./images/BottomRectangle.png"
import Divider from "@material-ui/core/Divider";

import AOS from 'aos';
import 'aos/dist/aos.css';

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
                    <h1 style={{borderBottom:'1px solid grey'}}>Build the business your customers want</h1>
                    <p>For small businesses, there are often too many reviews to sort through to get useful data out of them.  Tally AI allows business owners to save time by giving insights into specific industry trends</p>
                </div>
                <div className="TopTabletIMG">
                    <img className="HomePicture" src={TopOrangePolygon} alt='Orange Polygon' />
                    <img className="HomePicture2" src={YellowTopReactangle} alt='Yellow Reactangle' />
                    <img className="HomePicture3" src={BlueTopRectangle} alt='Blue Rectangle' />
                    <img className="HomePicture4" src={toptablet} alt='Radar Graph Displaying Data' />
                </div>   
            </div>

            <div className="bottom-card"> 
                <div className="BottomTabletIMG">
                    <img className="HomePicture5" src={BottomBlueRectangle} alt='Blue Rectangle' />
                    <img className="HomePicture6" src={BottomPolygon2} alt='Blue Polygon' />
                    <img className="HomePicture7" src={BottomRectangle} alt='Yellow Rectangle' />
                    <img className="HomePicture8" src={bottomtablet} alt='Line Graph Displaying Data' />
                </div>
                <div className="rightpara">  
                    <h1 style={{borderBottom:'1px solid grey'}}>Keep Track of your competitors</h1>
                    <p>Keep a close eye on the competition by simply adding businesses to your easy-to-use dashboard and see what their customers are saying about them</p>
                </div>
            </div> 

        </div>
    )
}

export default HomeInfo; 