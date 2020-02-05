import React, { useEffect, useState } from "react";
import Daniel from "./images/Daniel.png"
import David from "./images/David.png"
import Patrick from "./images/Patrick.png"
import Steve from "./images/Steve.png"
import Wenjing from "./images/Wenjing.png"
import Rohan from "./images/Rohan.png"
import Lily from "./images/Lily.png"
import Colton from "./images/Colton.png"
import Liz from "./images/Liz.png"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
// import { faTwitter } from "@fortawesome/free-solid-svg-icons"; 

const AboutUs = () => {
    return(
        <div style={{marginTop: "10vh"}}>
            <div className="MeetTheTeam">
                <h1 style={{marginTop: "-60px", paddingTop: "100px", fontWeight: "800", fontSize: "80px", lineHeight: "109px", letterSpacing: "0.25px"}}>Meet The Team</h1>
            </div>

            <div className="WebDev" style={{display: "flex", flexDirection: "row", marginLeft:"10%", marginRight:"10%", justifyContent: "space-between", marginTop:"100px" }}>
                <div className="Daniel" style={{width: "20%"}}>
                    <img src={Daniel} alt="Photo of developer" style={{borderRadius:"100%"}} />
                    <h1>Daniel Firpo</h1>
                    <h3>Web Developer</h3>
                    {/* <FontAwesomeIcon icon={faTwitter} size="6x" style={{color: '#15aabf'}} /> */}
                </div>
                <div className="David" style={{width: "20%"}}>
                    <img src={David} alt="Photo of developer" style={{borderRadius:"100%"}} />
                    <h1>David Downes</h1>
                    <h3>Web Developer</h3>
                </div>
                <div className="Patrick" style={{width: "20%"}}>
                    <img src={Patrick} alt="Photo of developer" style={{borderRadius:"100%"}} />
                    <h1>Patrick Stevenson</h1>
                    <h3>Web Developer</h3>
                </div>
                <div className="Steve" style={{width: "20%"}}>
                    <img src={Steve} alt="Photo of developer" style={{borderRadius:"100%"}} />
                    <h1>Steve Renner</h1>
                    <h3>Web Developer</h3>
                </div>
            </div>

            <div className="DataScientist" style={{display: "flex", flexDirection: "row", marginLeft:"10%", marginRight:"10%", justifyContent: "space-evenly", marginTop:"100px" }}>
                <div className="Lily" style={{width: "20%"}}>
                    <img src={Lily} alt="Photo of Data Scientist" style={{borderRadius:"100%"}} />
                    <h1>Lily Su</h1>
                    <h3>Data Scientist</h3>
                </div>
                <div className="Rohan" style={{width: "20%"}}>
                    <img src={Rohan} alt="Photo of Data Scientist" style={{borderRadius:"100%"}} />
                    <h1>Rohan Kulkarni</h1>
                    <h3>Data Scientist</h3>
                </div>
                <div className="Wenjing" style={{width: "20%"}}>
                    <img src={Wenjing} alt="Photo of Data Scientist" style={{borderRadius:"100%"}} />
                    <h1>Wenjing Liu</h1>
                    <h3>Data Scientist</h3>
                </div>
            </div>

            <div className="Leads" style={{display: "flex", flexDirection: "row", marginLeft:"10%", marginRight:"10%", justifyContent: "center", marginTop:"100px", paddingBottom: "80px" }}>
                <div className="Colton" style={{width: "20%"}}>
                    <img src={Colton} alt="Photo of UX Designer" style={{borderRadius:"100%"}} />
                    <h1>Colton Mortenson</h1>
                    <h3>UI/UX Designer</h3>
                </div>
                <div className="Liz" style={{width: "20%", marginLeft: "150px"}}>
                    <img src={Liz} alt="Photo of Data Scientist" style={{borderRadius:"100%"}} />
                    <h1 style={{width: "120%", marginLeft: "-20px"}}>Elizabeth Ter Sahakyan</h1>
                    <h3>Team Lead</h3>
                </div>
            </div>

        </div>
    );
}

export default AboutUs;