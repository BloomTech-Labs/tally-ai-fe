import React from 'react';

import AOS from 'aos';
import 'aos/dist/aos.css';

const HomeBottomSection = () => {
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
        >
            <div className="BottomSection">
                <h1 className="BottomTitle">Unlock your business data with Tally AI</h1>
                <button className="FeaturesButton">Get Started Today!</button>
            </div>
        </div>
    )
}

export default HomeBottomSection;