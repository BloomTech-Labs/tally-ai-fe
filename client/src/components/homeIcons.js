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
        <div className="lock-icon">
            <FontAwesomeIcon icon={faUnlockAlt} size="6x" style={{ color: '#DFAB26'}} />
            <h3>Unlock the data in your company reviews</h3>
        </div>
        <div className="chart-icon">
            <FontAwesomeIcon icon={faChartBar} size="6x" style={{ color: '#DFAB26'}}/>
            <h3>Find industry insights</h3>
        </div>
        <div className="hear-icon">
            <FontAwesomeIcon icon={faAssistiveListeningSystems} size="6x" style={{ color: '#DFAB26'}}/>
            <h3>Hear out your customers</h3>
        </div>
        <div className="flag-icon">
            <FontAwesomeIcon icon={faFlag} size="6x" style={{ color: '#DFAB26'}}/>
            <h3>Identify red flags earlier</h3>
        </div>
        <div className="arrow-icon">
            <FontAwesomeIcon icon={faChartLine} size="6x" style={{ color: '#DFAB26'}}/>
            <h3>Watch your company grow</h3>
        </div>
    </div>
  )
}
  export default HomeIcons