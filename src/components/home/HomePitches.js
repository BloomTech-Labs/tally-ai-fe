import React from 'react';

import AOS from 'aos';
import 'aos/dist/aos.css';

import ipad from '../../components/images/ipad.png';
import './home.scss'
const HomePitches = () => { 
    AOS.init()
    return (
        <div
            data-aos="fade-down"
            data-aos-offset="200"
            data-aos-delay="50"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="true"
            style={{marginTop:'-10%'}}>
                <div className="bottom-home-pitch">
                    <div className="bottom-home-pitch2">
                        <img style={{height: '120vh'}} src={ipad} alt='2 hands holding iPad searching for a business using our site' />
                    </div>
                    <div  className="bottom-home-pitch3">
                        <p>Get advanced algorithmic power behind your marketing.</p>
                        <p style={{marginTop: '5%', marginBottom: '5%'}}>Analysis of your Yelp data.</p>
                        <p>Easy to understand graphs and visual breakdowns.</p>
                    </div>
                </div>
        </div>
    )
}

export default HomePitches; 
