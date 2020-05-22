import React, { useEffect, useState } from "react";

//simple component that renders on all pages with css media query that enables or disables it
const RestrictMobile = () => {
    return(
        <div className="restrictMobile" onClick={(e) => {e.preventDefault(); e.stopPropagation()}}>
            <h2>Sorry!</h2>
            <p>We don't support mobile screen sizes.</p>
        </div>
    );
}

export default RestrictMobile;