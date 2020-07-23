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

import "./aboutus.scss";

const AboutUs = () => {
  return (
    <div>
      <div className="MeetTheTeam">
        <h1>Meet The Team</h1>
      </div>

      <div className="WebDev">
        <div className="WebTeam">
          <img src={Daniel} alt="Photo of developer" />
          <h1>Daniel Firpo</h1>
          <h3>Web Developer</h3>
          {/* <FontAwesomeIcon icon={faTwitter} size="6x" style={{color: '#15aabf'}} /> */}
        </div>
        <div className="WebTeam">
          <img src={David} alt="Photo of developer" />
          <h1>David Downes</h1>
          <h3>Web Developer</h3>
        </div>
        <div className="WebTeam">
          <img src={Patrick} alt="Photo of developer" />
          <h1>Patrick Stevenson</h1>
          <h3>Web Developer</h3>
        </div>
        <div className="WebTeam">
          <img src={Steve} alt="Photo of developer" />
          <h1>Steve Renner</h1>
          <h3>Web Developer</h3>
        </div>
      </div>

      <div className="DataScientist">
        <div className="DSTeam">
          <img src={Lily} alt="Photo of Data Scientist" />
          <h1>Lily Su</h1>
          <h3>Data Scientist</h3>
        </div>
        <div className="DSTeam">
          <img src={Rohan} alt="Photo of Data Scientist" />
          <h1>Rohan Kulkarni</h1>
          <h3>Data Scientist</h3>
        </div>
        <div className="DSTeam">
          <img src={Wenjing} alt="Photo of Data Scientist" />
          <h1>Wenjing Liu</h1>
          <h3>Data Scientist</h3>
        </div>
      </div>

      <div className="Leads">
        <div className="LeadUX">
          <img src={Colton} alt="Photo of UX Designer" />
          <h1>Colton Mortenson</h1>
          <h3>UI/UX Designer</h3>
        </div>
        <div className="LeadUX" id="leadUX">
          <img src={Liz} alt="Photo of Data Scientist" />
          <h1>Elizabeth Ter Sahakyan</h1>
          <h3>Team Lead</h3>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
