import React from 'react'
import { faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { faChartBar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAssistiveListeningSystems } from "@fortawesome/free-solid-svg-icons"
import { faFlag } from "@fortawesome/free-solid-svg-icons"
import { faChartLine } from "@fortawesome/free-solid-svg-icons"

import AOS from 'aos';
import 'aos/dist/aos.css';

import AnalyzeDataIcon from "../components/images/AnalyzeDataIcon.png";
import DownloadReviewsIcon from "../components/images/DownloadReviewsIcon.png";
import InsightsIcon from "../components/images/InsightsIcon.png";
import { fontSize } from '@material-ui/system';

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
                <h3 className="AITitle">AI-Powered Business Intelligence....</h3>
            </div>
            <div className="CustomerBusiness">
                <h1 className="CustomerTitle">Spend less time reading, and more time with customers.</h1>
            </div>
            <div className="mid-section">
                <div className="flag-icon">
                    {/* <FontAwesomeIcon icon={faFlag} size="8x" style={{ color: '#DFAB26'}}/> */}
                    <img src={AnalyzeDataIcon} alt="Analyzing Data Icon" />
                    <h1 style={{fontSize:'24px'}}>Download Reviews</h1>
                    {/* <p className="DataPara" style={{fontWeight:'bold'}}>Download and review your data with ease!</p> */}
                </div>
                <div className="chart-icon">
                    {/* <FontAwesomeIcon icon={faChartBar} size="8x" style={{ color: '#D496BB'}}/> */}
                    <img src={DownloadReviewsIcon} alt="Downloading Reviews Icon" />
                    <h1 style={{fontSize:'24px'}}>Analyze Data</h1>
                    {/* <p className="DataPara" style={{fontWeight:'bold'}}>Quickly and easily analyze data using our simple yet effective Data Charts!</p> */}
                </div>
                <div className="arrow-icon">
                    {/* <FontAwesomeIcon icon={faChartLine} size="8x" style={{ color: '#0D47A1'}}/> */}
                    <img src={InsightsIcon} alt="Insights Icon" />
                    <h1 style={{fontSize:'24px'}}>Generate Insights</h1>
                    {/* <p className="DataPara" style={{fontWeight:'bold'}}>Gather useful information that can help you improve your business!</p> */}
                </div>
            </div>
        </div>
    </div>
  )
}
  export default HomeIcons