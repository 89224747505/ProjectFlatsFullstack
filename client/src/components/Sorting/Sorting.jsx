import React, {useState} from 'react';
import classes from "./Sorting.module.css";
import MySelect from "../UI/MySelect/MySelect";

const Sorting = ({value, params, onChangeValue, onChangeParams}) => {

    return (
        <div className={classes.containerSorting}>
           <MySelect
               defaultValue="Сортировка ↑↓"
               value={value}
               onChange={(event) => onChangeValue(event)}
               options={[
                    {value: 0, name:'По убыванию'},
                    {value: 1, name:'По возрастанию'}
               ]}

           />
            <MySelect
                defaultValue="Сортировка..."
                value={params}
                onChange={(event) => onChangeParams(event)}
                options={[
                    {value: 0, name:'По этажу'},
                    {value: 1, name:'По цене'},
                    {value: 2, name:'По кол-ву комнат'},
                    {value: 3, name:'По общей площади'},
                    {value: 4, name:'По жилой площади'},
                    {value: 5, name:'По площади кухни'},
                ]}
            />
        </div>
    );
};

export default Sorting;