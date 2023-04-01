import React, {useState} from 'react';
import classes from "./MyCheckBox.module.css";

const MyCheckBox = ({checked, setChecked, children}) => {

    const onChangeCheckBox = () => {
        setChecked(!checked);
    }

    return (
        <div className={classes.btnCheck}>
            <input onChange={onChangeCheckBox} checked={checked} type="checkbox"/><label>{children}</label>
        </div>
    );
};

export default MyCheckBox;