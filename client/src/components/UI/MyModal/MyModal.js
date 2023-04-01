import React from 'react';
import classes from "./MyModal.module.css";
import ruble from "../../../img/ruble.svg";

const MyModal = ({flat, visible, setVisible}) => {

    const numberOfRooms = (rooms)=> {
        switch (rooms) {
            case 1: return 'однокомнатная';
            case 2: return 'двухкомнатная';
            case 3: return 'трехкомнатная';
            default : return '';
        }
    }

    const priceCardToString = (number)=> {
        return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    const rootClasses = [classes.myModal];

    if (visible)
        rootClasses.push(classes.active)

    return (
        <div className={rootClasses.join(' ')} onClick={()=>setVisible(false)}>
            <div className={classes.myModalContent} onClick={(e)=>e.stopPropagation()}>
                <div className={classes.closeBtn} onClick={()=>setVisible(false)}>X</div>
                <div className={classes.MyModal__img}>
                    <img src={flat.layout_image} alt={`Квартира ${numberOfRooms(flat.rooms)} ${flat.area_total} м²`}/>
                </div>
                <div className={classes.MyModalInformation}>
                    <div className={classes.MyModalInformation__price}>
                        <span>{priceCardToString(flat.price)}</span>
                        <div className={classes.MyModalInformation__rubleImg}><img src={ruble} alt="руб."/></div>
                    </div>

                    <div className={classes.MyModalInformation__priceSqrMtr}>
                        <span>{priceCardToString(Math.round(flat.price/flat.area_total))}</span>
                        <div className={classes.MyModalInformation__rubleImgSqrMtr}><img src={ruble} alt="руб."/></div>
                        <span>/м²</span>
                    </div>

                    <div className={classes.MyModalInformation__commonInfo}>Общая информация</div>
                    <div className={classes.MyModalInformation__flexElement}>
                        <p>Этаж</p><p>{flat.floor} из 4</p>
                    </div>
                    <div className={classes.MyModalInformation__flexElement}>
                        <p>Комнатность</p><p>{flat.rooms} комн.</p>
                    </div>
                    <div className={classes.MyModalInformation__flexElement}>
                        <p>Общая площадь</p><p>{flat.area_total} м²</p>
                    </div>
                    <div className={classes.MyModalInformation__flexElement}>
                        <p>Жилая площадь</p><p>{flat.area_live} м²</p>
                    </div>
                    <div className={classes.MyModalInformation__flexElement}>
                        <p>Площадь кухни</p><p>{flat.area_kitchen} м²</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyModal;