import React, {useState} from 'react';
import {ToggleButton} from "react-bootstrap";

function ProductToggleButton(props: any) {
    const {currentActive, updateActive} = props;
    const [checked, setChecked] = useState(currentActive);

    function UpdateToggle(e: any) {
        setChecked(e.currentTarget.checked)
        updateActive(e.currentTarget.checked)
    }

    return (<ToggleButton
            className="mb-2"
            id="toggle-check"
            type="checkbox"
            variant="outline-success"
            checked={checked}
            value="1"
            onChange={(e) => UpdateToggle(e)}
        >
            {checked ? "Active" : "InActive"}
        </ToggleButton>
    )
}

export default ProductToggleButton
