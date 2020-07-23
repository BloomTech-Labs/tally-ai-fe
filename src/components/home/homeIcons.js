import React from 'react'

import AOS from 'aos';
import 'aos/dist/aos.css';
import './home.scss'

import AnalyzeDataIcon from "../../components/images/AnalyzeDataIcon.png";
import DownloadReviewsIcon from "../../components/images/DownloadReviewsIcon.png";
import InsightsIcon from "../../components/images/InsightsIcon.png";


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
                   
                    <img src={AnalyzeDataIcon} alt="Analyzing Data Icon" />
                    <h1 style={{fontSize:'24px'}}>Download Reviews</h1>
                   
                </div>
                <div className="chart-icon">
                  
                    <img src={DownloadReviewsIcon} alt="Downloading Reviews Icon" />
                    <h1>Analyze Data</h1>
                    
                </div>
                <div className="arrow-icon">
                    
                    <img src={InsightsIcon} alt="Insights Icon" />
                    <h1>Generate Insights</h1>
                    
                </div>
            </div>
        </div>
    </div>
  )
}
  export default HomeIcons