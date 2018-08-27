import React from 'react';

const Tile = ({number, colorClass}) => (
    <div className={`number-swatch bg-primary ${colorClass}`}>
        <span className='number-container'>
            {number}
        </span>
    </div>
);

export default Tile;