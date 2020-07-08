import React, { useEffect, useState } from "react";
import Adrian from './images/Adrian.png'
import DanielM from './images/Daniel_Morales.png'
import Ben from './images/Ben.png'
import Mike from './images/Mike.png'
import Raudel from './images/Raudel.png'
import Ofer from './images/Ofer.png'
import Blake from './images/Blake.png'
import Tara from './images/Tara.png'
import Shanthi from './images/Shanthi.png'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
// import { faTwitter } from "@fortawesome/free-solid-svg-icons"; 

const AboutUs = () => {
    return(
        <div>
            <div className="MeetTheTeam" style={{paddingTop: "10vh"}}>
                <h1 style={{fontWeight: "800", fontSize: "80px", lineHeight: "109px", letterSpacing: "0.25px"}}>Meet The Team</h1>
            </div>

            <div className="WebDev" style={{display: "flex", flexDirection: "row", marginLeft:"10%", marginRight:"10%", marginTop:"5%", justifyContent: "space-between" }}>
                <div className="WebTeam" style={{width: "22%"}}>
                    <img src={Adrian} alt="Photo of developer" style={{borderRadius:"100%", height: '18vh'}} />
                    <h1 style={{fontStyle: 'normal', fontWeight: '500', fontSize: '22px', lineHeight: '25px'}}>Adrian Parra</h1>
                    <h3 style={{fontStyle: 'normal', fontWeight: '500', fontSize: '15px', lineHeight: '15px'}}>Web Developer</h3>
                    {/* <FontAwesomeIcon icon={faTwitter} size="6x" style={{color: '#15aabf'}} /> */}
                </div>
                <div className="WebTeam" style={{width: "22%"}}>
                    <img src={DanielM} alt="Photo of developer" style={{borderRadius:"100%", height: '18vh'}} />
                    <h1 style={{fontStyle: 'normal', fontWeight: '500', fontSize: '22px', lineHeight: '25px'}}>Daniel Morales</h1>
                    <h3 style={{fontStyle: 'normal', fontWeight: '500', fontSize: '15px', lineHeight: '15px'}}>Web Developer</h3>
                </div>
                <div className="WebTeam" style={{width: "22%"}}>
                    <img src={Ben} alt="Photo of developer" style={{borderRadius:"100%", height: '18vh'}} />
                    <h1 style={{fontStyle: 'normal', fontWeight: '500', fontSize: '22px', lineHeight: '25px'}}>Benjamin Koehler</h1>
                    <h3 style={{fontStyle: 'normal', fontWeight: '500', fontSize: '15px', lineHeight: '15px'}}>Web Developer</h3>
                </div>
                <div className="WebTeam" style={{width: "22%"}}>
                    <img src={Mike} alt="Photo of developer" style={{borderRadius:"100%", height: '18vh'}} />
                    <h1 style={{fontStyle: 'normal', fontWeight: '500', fontSize: '22px', lineHeight: '25px'}}>Michael Phelps</h1>
                    <h3 style={{fontStyle: 'normal', fontWeight: '500', fontSize: '15px', lineHeight: '15px'}}>Web Developer</h3>
                </div>
                <div className="WebTeam" style={{width: "22%"}}>
                    <img src={Raudel} alt="Photo of developer" style={{borderRadius:"100%", height: '18vh'}} />
                    <h1 style={{fontStyle: 'normal', fontWeight: '500', fontSize: '22px', lineHeight: '25px'}}>Raudel Flores</h1>
                    <h3 style={{fontStyle: 'normal', fontWeight: '500', fontSize: '15px', lineHeight: '15px'}}>Web Developer</h3>
                </div>
            </div>

            <div className="DataScientist" style={{display: "flex", flexDirection: "row", marginLeft:"10%", marginRight:"10%", justifyContent: "space-evenly", marginTop:"100px" }}>
                <div className="DSTeam" style={{width: "20%"}}>
                    <img src={Ofer} alt="Photo of Data Scientist" style={{borderRadius:"100%", height: '18vh'}} />
                    <h1 style={{fontStyle: 'normal', fontWeight: '500', fontSize: '22px', lineHeight: '25px'}}>Ofer Baharav</h1>
                    <h3 style={{fontStyle: 'normal', fontWeight: '500', fontSize: '15px', lineHeight: '15px'}}>Data Scientist</h3>
                </div>
                <div className="DSTeam" style={{width: "20%"}}>
                    <img src={Blake} alt="Photo of Data Scientist" style={{borderRadius:"100%", height: '18vh'}} />
                    <h1 style={{fontStyle: 'normal', fontWeight: '500', fontSize: '22px', lineHeight: '25px'}}>Blake Lobato</h1>
                    <h3 style={{fontStyle: 'normal', fontWeight: '500', fontSize: '15px', lineHeight: '15px'}}>Data Scientist</h3>
                </div>
                
            </div>

            <div className="Leads" style={{display: "flex", flexDirection: "row", marginLeft:"10%", marginRight:"10%", justifyContent: "center", marginTop:"100px", paddingBottom: "80px" }}>
                <div className="LeadUX" style={{width: "20%"}}>
                    <img src={Tara} alt="Photo of UX Designer" style={{borderRadius:"100%", height: '18vh'}} />
                    <h1 style={{fontStyle: 'normal', fontWeight: '500', fontSize: '22px', lineHeight: '25px'}}>Tara Bramwell</h1>
                    <h3 style={{fontStyle: 'normal', fontWeight: '500', fontSize: '15px', lineHeight: '15px'}}>UI/UX Designer</h3>
                </div>
                <div className="LeadUX" style={{width: "20%"}}>
                    <img src={Shanthi} alt="Photo of UX Designer" style={{borderRadius:"100%", height: '18vh'}} />
                    <h1 style={{fontStyle: 'normal', fontWeight: '500', fontSize: '22px', lineHeight: '25px'}}>Shanthi Madheswarn</h1>
                    <h3 style={{fontStyle: 'normal', fontWeight: '500', fontSize: '15px', lineHeight: '15px'}}>UI/UX Designer</h3>
                </div>
                
            </div>

        </div>
    );
}

export default AboutUs;