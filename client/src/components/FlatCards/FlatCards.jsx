import React from 'react';
import FlatCard from "../FlatCard/FlatCard";
import classes from "./FlatCards.module.css";

const FlatCards = ({cards, callback}) => {
    return (
        <div className={classes.flatCards}>
            {cards.map(card =>
                <FlatCard card={card} callback={callback} key={card.id}/>
            )}
        </div>
    );
};

export default FlatCards;