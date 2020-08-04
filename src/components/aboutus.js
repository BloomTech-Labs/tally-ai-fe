import React from "react";
import Daniel from "./images/Daniel.png";
import David from "./images/David.png";
import Patrick from "./images/Patrick.png";
import Steve from "./images/Steve.png";
import Wenjing from "./images/Wenjing.png";
import Rohan from "./images/Rohan.png";
import Lily from "./images/Lily.png";
import Colton from "./images/Colton.png";
import Liz from "./images/Liz.png";
import Raudel from "./images/Raudel.png";
import Ben from "./images/Ben.png";
import Adrian from "./images/Adrian.png";
import DanielM from "./images/Daniel_Morales.png";
import Mike from "./images/Mike.png";
import Blake from "./images/Blake.png";
import Ofer from "./images/Ofer.png";
import Tara from "./images/Tara.png";
import Shanthi from "./images/Shanthi.png";
import Anh from "./images/Anh.png";
import Bobby from "./images/Bobby.png";
 
import "./aboutus.scss";

const AboutUs = () => {
  return (
    <div>
      <div className="MeetTheTeam">
        <h1>Meet The Team</h1>
      </div>
      
      <div className="WebDev">
      <div className="WebTeam">
          <img src={Adrian} alt="Web developer" />
          <h1>Adrian Parra</h1>
          <h3>Web Developer</h3>
        </div>

      <div className="WebTeam">
          <img src={Ben} alt="Web developer" />
          <h1>Benjamin Koehler</h1>
          <h3>Web Developer</h3>
        </div>
        <div className="WebTeam">
          <img src={Daniel} alt="Web developer" />
          <h1>Daniel Firpo</h1>
          <h3>Web Developer</h3>
          {/* <FontAwesomeIcon icon={faTwitter} size="6x" style={{color: '#15aabf'}} /> */}
        </div>
        <div className="WebTeam">
          <img src={DanielM} alt="Web developer" />
          <h1>Daniel Morales</h1>
          <h3>Web Developer</h3>
        </div>
        <div className="WebTeam">
          <img src={David} alt="Web developer" />
          <h1>David Downes</h1>
          <h3>Web Developer</h3>
        </div>
        <div className="WebTeam">
          <img src={Mike} alt="Web developer" />
          <h1>Michael Phelps</h1>
          <h3>Web Developer</h3>
        </div>
        <div className="WebTeam">
          <img src={Patrick} alt="Web developer" />
          <h1>Patrick Stevenson</h1>
          <h3>Web Developer</h3>
        </div>
        <div className="WebTeam">
          <img src={Raudel} alt="Web developer" />
          <h1>Raudel Flores</h1>
          <h3>Web Developer</h3>
        </div>
        <div className="WebTeam">
          <img src={Steve} alt="Web developer" />
          <h1>Steve Renner</h1>
          <h3>Web Developer</h3>
        </div>
       
      </div>

      < div className="DataScientist">
         <div className="DSTeam">
           <img src={Anh} alt=" Data Scientist" />
          <h1>Anh Vu</h1>
          <h3>Data Scientist</h3>
        </div>

        <div className="DSTeam">
          <img src={Blake} alt="Data Scientist" />
          <h1>Blake Lobato</h1>
          <h3>Data Scientist</h3>
        </div>

        <div className="DSTeam">
          <img src={Lily} alt="Data Scientist" />
          <h1>Lily Su</h1>
          <h3>Data Scientist</h3>
        </div>

        <div className="DSTeam">
          <img src={Ofer} alt="Data Scientist" />
          <h1>Ofer Baharav</h1>
          <h3>Data Scientist</h3>
        </div>

        <div className="DSTeam">
          <img src={Rohan} alt="Data Scientist" />
          <h1>Rohan Kulkarni</h1>
          <h3>Data Scientist</h3>
        </div>

        <div className="DSTeam">
          <img src={Wenjing} alt="Data Scientist" />
          <h1>Wenjing Liu</h1>
          <h3>Data Scientist</h3>
        </div>
</div>
      <div className="Leads">
        <div className="LeadUX">
          <img src={Colton} alt="UX Designer" />
          <h1>Colton Mortenson</h1>
          <h3>UI/UX Designer</h3>
        </div>
        <div className="LeadUX">
          <img src={Tara} alt="UX Designer" />
          <h1>Tara Bramwell</h1>
          <h3>UI/UX Designer</h3>
        </div>
        <div className="LeadUX">
          <img src={Shanthi} alt="UX Designer" />
          <h1>Shanthi Madheswaran</h1>
          <h3>UI/UX Designer</h3>
        </div>
        
      </div>
      <div className="Leads">
      <div className="LeadUX" id="leadUX">
          <img src={Bobby} alt="Data Lead" />
          <h1>Bobby Hall</h1>
          <h3>Team Lead</h3>
        </div>

      <div className="LeadUX" id="leadUX">
          <img src={Liz} alt="Data Lead" />
          <h1>Elizabeth Ter Sahakyan</h1>
          <h3>Team Lead</h3>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;
