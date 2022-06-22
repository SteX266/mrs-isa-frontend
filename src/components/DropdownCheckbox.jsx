
import React from 'react';
import Dropdown from 'react-bootstrap/esm/Dropdown';

export default function DropdownCheckbox(props) {
    return(<Dropdown name={props.name}>
        <Dropdown.Toggle variant='Secondary' id='dropdown'>
            {props.label}
        </Dropdown.Toggle>
        <Dropdown.Menu>
            {props.list?.map((item =>
                <div key={item} id={props.name}>{item}    <input type='checkbox' name={item} onChange={props.onCheck}></input></div>
                ))}
        </Dropdown.Menu>
    </Dropdown>);
}
