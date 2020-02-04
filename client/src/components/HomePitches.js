import React from 'react';

import AOS from 'aos';
import 'aos/dist/aos.css';

import ipadwithhands from './images/ipadwithhands.png';
import lazytext from './images/lazytext.png';

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
                <div style={{display: 'flex'}}>
                    <img src={ipadwithhands} alt='2 hands holding iPad searching for a business using our site' />
                    <img style={{height: '60vh', marginLeft: '150px', marginTop: '100px'}} src={lazytext} alt='Text' />
                </div>
        </div>
    )
}

export default HomePitches; 
