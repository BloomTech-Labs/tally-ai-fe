import React from 'react'
import { faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { faChartBar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAssistiveListeningSystems } from "@fortawesome/free-solid-svg-icons"
import { faFlag } from "@fortawesome/free-solid-svg-icons"
import { faChartLine } from "@fortawesome/free-solid-svg-icons"

import AOS from 'aos';
import 'aos/dist/aos.css';

const HomeIcons = () => {
    AOS.init()
    return (
    <div className="home-icons"
        data-aos="fade-down"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="true"
            >
        <div>
            <div className="AIBusiness">
                <h2 className="AITitle">AI-Powered Business Intelligence....</h2>
            </div>
            <div className="CustomerBusiness">
                <h1 className="CustomerTitle">Spend less time reading, and more time with Customers.</h1>
            </div>
            <div className="mid-section">
                <div className="flag-icon">
                    <FontAwesomeIcon icon={faFlag} size="8x" style={{ color: '#DFAB26'}}/>
                    <h1>Download Reviews</h1>
                    <p className="DataPara" style={{fontWeight:'bold'}}>Download and review your data with ease!</p>
                </div>
                <div className="chart-icon">
                    <FontAwesomeIcon icon={faChartBar} size="8x" style={{ color: '#D496BB'}}/>
                    <h1>Analyze Data</h1>
                    <p className="DataPara" style={{fontWeight:'bold'}}>Quickly and easily analyze data using our simple yet effective Data Charts!</p>
                </div>
                <div className="arrow-icon">
                    <FontAwesomeIcon icon={faChartLine} size="8x" style={{ color: '#0D47A1'}}/>
                    <h1>Generate Insights</h1>
                    <p className="DataPara" style={{fontWeight:'bold'}}>Gather useful information that can help you improve your business!</p>
                </div>
            </div>
        </div>
    </div>
  )
}
  export default HomeIcons