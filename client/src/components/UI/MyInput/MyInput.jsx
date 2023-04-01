import React from 'react';
import classes from "./MyInput.module.css";

const MyInput = ({styleName, state, setState}) => {
    const changeFromInput = (event)=> {
        setState({...state, from: event.target.value});
    }
    const changeToInput = (event)=> {
        setState({...state, to: event.target.value});
    }
    return (
        <div className={[classes.Inputs, styleName].join(' ')}>
            <input
                value={state.from}
                onBlur={()=>setState({...state, focus:false})}
                onFocus={()=>setState({...state, focus:true})}
                onChange={changeFromInput} type="number" placeholder="от"/>
            <input
                value={state.to}
                onBlur={()=>setState({...state, focus:false})}
                onFocus={()=>setState({...state, focus:true})}
                onChange={changeToInput} type="number" placeholder="до"/>
        </div>
    );
};

export default MyInput;