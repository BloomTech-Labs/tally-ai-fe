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
                    <p>Description about the feature goes here. Description about the feature goes here.Description about the feature goes here.Description about the feature goes here.Description about the feature goes here.</p>
                </div>

                <div className="FeatuesTable2">
                    <h2 className="FeaturesHeaders">Favorites</h2>
                    <p>Description about the feature goes here. Description about the feature goes here. Description about the feature goes here.
                    Description about the feature goes here.</p>
                </div>

                <div className="FeatuesTable3">
                    <h2 className="FeaturesHeaders">Multiple Businesses</h2>
                    <p>Description about the feature goes here. Description about the feature goes here. Description about the feature goes here. Description about the feature goes here.</p>
                </div>

                <div className="FeatuesTable4">
                    <h2 className="FeaturesHeaders">Email Delivery</h2>
                    <p>Description about the feature goes here.Description about the feature goes here.Description about the feature goes here.Description about the feature goes here.</p>
                </div>
            </div>

        </div>
    )
}

export default HomeFeatures;