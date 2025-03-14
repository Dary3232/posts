import React from 'react';

export const Sort = ({ value, onChange }) => {
    return (
        <select onChange={(e) => onChange(e.target.value)} value={value}>
            <option value="none">-</option>
            <option value="ASC">ASC</option>
            <option value="DESC">DESC</option>
        </select>
    );
};

