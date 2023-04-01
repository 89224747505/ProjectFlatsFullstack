import React, {useState} from 'react';
import classes from "./InteractiveFloorPlan.module.css";


/*
Information props:
    numberOfFloors - number
    callback - return 2 values. 1. Selected floor on the map
                                2. Selected flat on the map
*/
const InteractiveFloorPlan = ({numberOfFloors, callback}) => {
    const [selectedFloor, setSelectedFloor] = useState(1);
    const arrayNumOfFloors = (floors) => {
        const arr = [];
        for (let i=1; i < floors+1; i++)
            arr.push(i);
        return arr;
    }

    const selectOnThePlan = (selFloor, selFlat) => {
        callback(selFloor, selFlat);
    }

    return (
        <div className={classes.planOfFloor}>
            <div className={classes.containerFloors}>
                {arrayNumOfFloors(numberOfFloors).map(floor =>
                    <button onClick={()=>setSelectedFloor(floor)} className={floor === selectedFloor ? classes.selectedBtn : classes.unselectedBtn} key={floor}>{floor}</button>
                )}
            </div>

            <h2 className={classes.planBlockName}>
                План {selectedFloor} этажа
            </h2>

            <div className={classes.imgContainer}>
                <img src={"https://cdn.esoft.digital/content/layouts//cluster/layouts/18/0c/e293cb975e87b72b6fba22106422e03e9f8b0c18.png"} alt="План этажа"/>
                <svg className={classes.flat} viewBox="0 0 546 737" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path onClick={()=>selectOnThePlan(selectedFloor, 1)} d="M232 610V737H422V648.5H431.5V559H283V601.5H246V610H232Z" fill="yellow" fillOpacity="0.22"/>
                    <path onClick={()=>selectOnThePlan(selectedFloor, 2)} d="M9 737H232L231.5 484.5H0V566.5H9V737Z" fill="orange" fillOpacity="0.22"/>
                    <path onClick={()=>selectOnThePlan(selectedFloor, 3)} d="M232 325.5V484.5H0V325.5H232Z" fill="skyblue" fillOpacity="0.22"/>
                    <path onClick={()=>selectOnThePlan(selectedFloor, 4)} d="M0 247V325.5H232V219H165.5V168H9.5V247H0Z" fill="purple" fillOpacity="0.22"/>
                    <path onClick={()=>selectOnThePlan(selectedFloor, 5)} d="M9.5 56.5V168H165V219H278V210H291.5V217.5H349V175.5H357.5V25.5H332.5V0.5H254V25.5H131.5V0.5H23V56.5H9.5Z" fill="blue" fillOpacity="0.22"/>
                    <path onClick={()=>selectOnThePlan(selectedFloor, 6)} d="M348.5 217.5H292V268H357.5V408H546V25.5H357V175.5H348.5V217.5Z" fill="red" fillOpacity="0.22"/>
                </svg>
            </div>

        </div>
    );
};

export default InteractiveFloorPlan;