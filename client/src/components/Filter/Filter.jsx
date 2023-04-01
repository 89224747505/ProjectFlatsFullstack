import React, {useEffect, useState} from 'react';
import classes from "./Filter.module.css";
import ButtonSet from "../UI/ButtonSet/ButtonSet";
import MyCheckBox from "../UI/MyCheckBox/MyCheckBox";
import MyInput from "../UI/MyInput/MyInput";
import axios from "axios";

const Filter = ({selectedByValue, selectedByParams, callbackFetching}) => {
    const [floorState, setFloorState] = useState([]);
    const [roomsState, setRoomsState] = useState([]);
    const [checked, setChecked] = useState(false);
    const [price, setPrice] = useState({from:'', to:'', focus: false});
    const [totalArea, setTotalArea] = useState({from:'', to:'', focus: false});
    const [liveArea, setLiveArea] = useState({from:'', to:'', focus: false});
    const [kitchenArea, setKitchenArea] = useState({from:'', to:'', focus: false});
    const [numberVariants, setNumberVariants] = useState(0);

    const fetchingNumberVariants = async (queryString) => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/elements?sv=${selectedByValue}&sp=${selectedByParams}${queryString}`);
        setNumberVariants(response.data?.elements);
    }

    const queryParamsTransform = ()=> {
        let floor, rooms, priceS, priceE, totalS, totalE, liveS, liveE, kitchenS, kitchenE;
        let queryString = '';
            floor = `${floorState[0]?.active ? '1' : ''}${floorState[1]?.active ? '2' : ''}${floorState[2]?.active ? '3' : ''}${floorState[3]?.active ? '4' : ''}`;
            if (floor) queryString += `&fl=${floor}`;
            rooms = `${roomsState[0]?.active ? '1' : ''}${roomsState[1]?.active ? '2' : ''}${roomsState[2]?.active ? '3' : ''}`;
            if (rooms) queryString +=`&rm=${rooms}`;
            priceS = String(price.from);
            if (priceS) queryString +=`&ps=${priceS}`;
            priceE = String(price.to);
            if (priceE) queryString +=`&pe=${priceE}`;
            totalS = String(totalArea.from);
            if (totalS) queryString +=`&ts=${totalS}`;
            totalE = String(totalArea.to);
            if (totalE) queryString +=`&te=${totalE}`;
            liveS = String(liveArea.from);
            if (liveS) queryString +=`&ls=${liveS}`;
            liveE = String(liveArea.to);
            if (liveE) queryString +=`&le=${liveE}`;
            kitchenS = String(kitchenArea.from);
            if (kitchenS) queryString +=`&ks=${kitchenS}`;
            kitchenE = String(kitchenArea.to);
            if (kitchenE) queryString +=`&ke=${kitchenE}`;
        return queryString;
    }

    useEffect(() => {
        if (!price.focus && !totalArea.focus && !liveArea.focus && !kitchenArea.focus) {
            fetchingNumberVariants(queryParamsTransform());
        }
    }, [floorState, roomsState, price, totalArea, liveArea, kitchenArea])

    const pushTheButton = ()=> {
        callbackFetching(queryParamsTransform());
    }

    const clearFunction = ()=> {
        setFloorState([{id: 1, active: false},
                            {id: 2, active: false},
                            {id: 3, active: false},
                            {id: 4, active: false}]);
        setRoomsState([{id: 1, active: false},
                            {id: 2, active: false},
                            {id: 3, active: false}]);
        setPrice({from:'', to:'', focus:false});
        setTotalArea({from:'', to:'', focus:false});
        setLiveArea({from:'', to:'', focus:false});
        setKitchenArea({from:'', to:'', focus:false});
        callbackFetching('');
    }

    return (
        <div className={classes.filterByParams}>

            <div className={classes.filterByParams__head}>
                <h2 className={classes.filterByParams__changeTheFlatName}>Выбрать квартиру</h2>
                <MyCheckBox defaultCheck={false} checked={checked} setChecked={setChecked}>Расширенный поиск</MyCheckBox>
            </div>

            <div className={classes.filterByParams__defaultOptions}>

                <div className={classes.filterByParams__containerFloor}>
                    <div>Этаж</div>
                    <ButtonSet numSetLength={4} buttonState={floorState} setButtonState={setFloorState}/>
                </div>

                <div className={classes.filterByParams__containerRooms}>
                    <div>Комнатность</div>
                    <ButtonSet numSetLength={3} buttonState={roomsState} setButtonState={setRoomsState}/>
                </div>

                <div className={classes.containerForPriceAndTotalArea}>
                    <div className={classes.filterByParams__containerPrice}>
                        <div>Стоимость, руб.</div>
                        <MyInput styleName={classes.MyInputPrice} state={price} setState={setPrice}/>
                    </div>

                    <div className={classes.filterByParams__containerTotalArea}>
                        <div>Общая площадь, м²</div>
                        <MyInput styleName={classes.MyInputTotalArea} state={totalArea} setState={setTotalArea}/>
                    </div>
                </div>
            </div>

            <div className={classes.containerForBtnsAndAdvOptions}>
                { checked
                    ? <div className={classes.filterByParams__advancedOptionsAndBtns}>

                        <div className={classes.filterByParams__containerLiveArea}>
                            <div>Жилая площадь, м²</div>
                            <MyInput styleName={classes.MyInputLiveArea} state={liveArea} setState={setLiveArea}/>
                        </div>

                        <div className={classes.filterByParams__containerKitchenArea}>
                            <div>Площадь кухни, м²</div>
                            <MyInput styleName={classes.MyInputKitchenArea} state={kitchenArea} setState={setKitchenArea}/>
                        </div>

                    </div>
                    :null}

                <div className={classes.filterByParams__ShowAndClearBtns}>
                    <button className={classes.filterByParams__ClearBtn} onClick={clearFunction}>Очистить</button>
                    <button onClick={pushTheButton} className={classes.filterByParams__ShowBtn}>
                        {(numberVariants > 0)
                            ? `Показать ${numberVariants} ${numberVariants < 2 ? "предложение" : ""}${(numberVariants > 1 && numberVariants < 5) ? "предложения" : ""}${(numberVariants > 4) ? "предложений" : ""}`
                            : `Предложения отсутствуют`}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Filter;