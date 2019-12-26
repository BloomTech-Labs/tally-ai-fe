import React, { useState, useEffect } from "react";

const ExampleWidget2 = (props) => {

    const [isSelected, setIsSelected] = useState(false);

    return (
        <div className="exampleWidget2">
            <p>Widget 2</p>
        </div>
    );
}

export default ExampleWidget2;
