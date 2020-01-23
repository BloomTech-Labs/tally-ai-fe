import React from 'react'
import { faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { faChartBar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAssistiveListeningSystems } from "@fortawesome/free-solid-svg-icons"
import { faFlag } from "@fortawesome/free-solid-svg-icons"
import { faChartLine } from "@fortawesome/free-solid-svg-icons"

const HomeIcons = () => {
    return (
    <div className="home-icons">
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
                    <h3>Download Reviews</h3>
                    <p className="DataPara">Be able to download and review you data with ease!</p>
                </div>
                <div className="chart-icon">
                    <FontAwesomeIcon icon={faChartBar} size="8x" style={{ color: '#D496BB'}}/>
                    <h3>Analyze Data</h3>
                    <p className="DataPara">Quickly and easily Analyze Data using our simply yet effective Data Charts!</p>
                </div>
                <div className="arrow-icon">
                    <FontAwesomeIcon icon={faChartLine} size="8x" style={{ color: '#0D47A1'}}/>
                    <h3>Generate Insights</h3>
                    <p className="DataPara">Gather useful information that can help you improve your business!</p>
                </div>
            </div>
        </div>
    </div>
  )
}
  export default HomeIcons