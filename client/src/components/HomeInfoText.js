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

import magnifier from "./images/Magnifier.png"
import wavyLine from "./images/wavyLine.png"

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
                    <img src={magnifier} alt="Magnifying glass image" style={{float:'left', width:'70vw'}}/>
                    <div className="leftpara-text">
                    <h1 style={{fontSize:'48px', lineHeight:'66px', fontWeight:'900', textAlign:'left'}}>Build the business your customers want</h1>
                    <p style={{fontSize:'20px', lineHeight:'32px', fontWeight:'800', fontStyle:'normal', textAlign:'left', marginTop:'-1%'}}>Understand your online reviews and feedback to improve ineffeciences.</p>
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
                    <h1 style={{fontSize:'48px', lineHeight:'66px', fontWeight:'900', textAlign:'left'}}>Keep track of your competitors</h1>
                    <p style={{fontSize:'20px', lineHeight:'32px', fontWeight:'800', textAlign:'left'}}>Keep a close eye on the competition by simply adding businesses to your easy-to-use dashboard and see what their customers are saying about them.</p>
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
                    <h1 style={{position:'absolute', marginLeft:'280px', marginTop:'200px', width:'380px', height:'167px', textAlign:'right', fontWeight:'900'}}>Be informed.  Make the right decisions.</h1>
                    <img src={wavyLine} alt="blue wavy line" style={{width:'100%'}} />
                    <h1 style={{position:'absolute', marginTop:'-350px', left:'60%', width:'380px', lineHeight:'50px', fontWeight:'900', textAlign:'left'}}>Build the business your customers want</h1>
                </div>

        </div>
    )
}

export default HomeInfo; 