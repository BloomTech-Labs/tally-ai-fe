import React from 'react';

import AOS from 'aos';
import 'aos/dist/aos.css';

import ipad from './images/ipad.png';

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
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <div style={{width: '50%', display: 'flex', justifyContent: 'flexStart', alignItems: 'flexStart'}}>
                        <img style={{height: '120vh'}} src={ipad} alt='2 hands holding iPad searching for a business using our site' />
                    </div>
                    <div style={{fontSize: '38px', width: '30%', textAlign: 'left', fontWeight: 'bold', marginLeft: '10%'}}>
                        <p>Get advanced algorithmic power behind your marketing.</p>
                        <p style={{marginTop: '5%', marginBottom: '5%'}}>Analysis of your Yelp data.</p>
                        <p>Easy to understand graphs and visual breakdowns.</p>
                    </div>
                </div>
        </div>
    )
}

export default HomePitches; 
