import React, { useState, useEffect } from "react";

const ExampleWidget1 = (props) => {

    const [isSelected, setIsSelected] = useState(false);

    return (
        <div className="exampleWidget1">
            <p>Widget 1</p>
        </div>
    );
}

export default ExampleWidget1;
