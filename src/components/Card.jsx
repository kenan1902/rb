import React from 'react';

const Card = ({ card }) => {
    return (
        <div className={`card ${card.category}`}>
            <p>{card.content}</p>
            <span>{card.date}</span>
            <button>Comments</button>
        </div>
    );
};

export default Card;