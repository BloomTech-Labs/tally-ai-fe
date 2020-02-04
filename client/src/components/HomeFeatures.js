import React from 'react';

import AOS from 'aos';
import 'aos/dist/aos.css';

const HomeFeatures = () => {
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
            <div className="HomeFeaturesTitle">
                <h1>Features</h1>
            </div>

            <div className="FeaturesTables">
                <div className="FeatuesTable1">
                    <h2 className="FeaturesHeaders">Customizable Dashboard</h2>
                    <p>Easily customize your dashboard with graphs that are meaningful to you.  See what customers are saying about your business and keep track of industry trends.</p>
                </div>

                <div className="FeatuesTable2">
                    <h2 className="FeaturesHeaders">All Your Businesses in One Piece</h2>
                    <p>Add all the businesses you own and easily track of them using our advanced dashboard.</p>
                </div>

                <div className="FeatuesTable3">
                    <h2 className="FeaturesHeaders">Track Your Competitors</h2>
                    <p>Add all your competitors and easily track of them using our advanced dashboard.</p>
                </div>

                {/* <div className="FeatuesTable4">
                    <h2 className="FeaturesHeaders">Email Delivery</h2>
                    <p>Description about the feature goes here.Description about the feature goes here.Description about the feature goes here.Description about the feature goes here.</p>
                </div> */}
            </div>

        </div>
    )
}

export default HomeFeatures;