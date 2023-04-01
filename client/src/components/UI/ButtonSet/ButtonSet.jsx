import React, {useEffect, useState} from 'react';
import classes from "./ButtonSet.module.css";

const ButtonSet = ({numSetLength, buttonState, setButtonState}) => {

    useEffect(()=> {
        const arr = [];

        for (let i=1; i <= numSetLength; i++)
            arr.push({id: i, active: false})

        setButtonState([...arr]);
    },[]);

    const pushTheButton = (indexInState) => {
        const stateCopy = buttonState.slice();
        stateCopy[indexInState].active = !stateCopy[indexInState].active;
        setButtonState(stateCopy);
    }

    return (
        <div className={classes.btns}>
            {[...buttonState].map((btn, index) =>
                    <button className={btn.active ? [classes.disable,classes.active].join(' ') : classes.disable} key={btn.id} onClick={()=>pushTheButton(index)}>{btn.id}</button>
            )}
        </div>
    );
};

export default ButtonSet;