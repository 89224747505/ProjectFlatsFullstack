import React from 'react';
import ruble from "../../img/ruble.svg";
import classes from "./FlatCard.module.css";

/*
Information props:

card = {
        id: number
        floor: number
        price: number
        rooms: number
        area_total : float
        layout_image: string
        };
callback: return ID number of Card
*/
const FlatCard = ({card, callback}) => {

    const numberOfRooms = (rooms)=> {
        switch (rooms) {
            case 1: return 'однокомнатная';
            case 2: return 'двухкомнатная';
            case 3: return 'трехкомнатная';
            default : return '';
        }
    }

    const priceCardToString = (number)=> {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    const openCartForMoreInformation = ()=> {
        callback(card.id);
    }
    return (
        <div className={classes.flatCard} onClick={openCartForMoreInformation}>
            <div className={classes.flatCard__img}>
                <img src={card.layout_image} alt={`Квартира ${numberOfRooms(card.rooms)} ${card.area_total} м²`}/>
            </div>

            <div className={classes.flatCard__price}>
                <span>{priceCardToString(card.price)}</span>
                <div className={classes.flatCard__rubleImg}><img src={ruble} alt="руб."/></div>
            </div>

            <div className={classes.flatCard__priceSqrMtr}>
                <span>{priceCardToString(Math.round(card.price/card.area_total))}</span>
                <div className={classes.flatCard__rubleImgSqrMtr}><img src={ruble} alt="руб."/></div>
                <span>/м²</span>
            </div>

            <div className={classes.flatCard__params}>
                <div className={classes.flatCard__rooms}>{`${card.rooms}-комн.кв.`}</div>
                <div className={classes.flatCard__area}>{`${card.area_total} м²`}</div>
                <div className={classes.flatCard__floor}>{`${card.floor}/4 эт.`}</div>
            </div>
        </div>
    );
};

export default FlatCard;