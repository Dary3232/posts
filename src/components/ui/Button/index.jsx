import React from 'react';
import * as SC from './styles'; 

export const Button = ({ label, type = 'button', onClick, variant = 'primary', disabled = false }) => {
    return (
        <SC.Button
            onClick={onClick}
            disabled={disabled}
            className={`button-${variant} ${disabled ? 'disabled' : ''}`}
        >
            {label}
        </SC.Button>
    );
};

