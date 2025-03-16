import React from 'react';
import Card from './Card';

const Board = ({ title, cards }) => {
    return (
        <div className="board">
            <h2>{title}</h2>
            {cards.map(card => (
                <Card key={card.id} card={card} />
            ))}
        </div>
    );
};

export default Board;