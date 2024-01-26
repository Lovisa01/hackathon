import React from 'react';

// The individual cells of the board

const Cell = ({ value, onClick }) => {
    return (
        <div className="cell" onClick={onClick}>
            {value}
        </div>
    );
};

export default Cell;