import React from 'react';

const Score = ({count, isBot = false}) => (
    <div>
        <span className={`score ${isBot ? 'bg-blue':'bg-pink'}`}>
            {
                isBot ? 'Bot':'You'
            } : <span>{count || 0}</span>
        </span>
    </div>
);

export default Score;
