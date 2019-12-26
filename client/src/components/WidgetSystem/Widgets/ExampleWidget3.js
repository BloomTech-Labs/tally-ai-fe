import React, { useState, useEffect } from "react";

const ExampleWidget3 = (props) => {

    const [isSelected, setIsSelected] = useState(false);

    return (
        <div className="exampleWidget3">
            <p>Widget 3</p>
        </div>
    );
}

export default ExampleWidget3;
