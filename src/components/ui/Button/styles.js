import styled from 'styled-components';

export const Button = styled.button`
    padding: 10px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &.button-primary {
        background-color: #007bff;
        color: white;

        &:hover {
            background-color: #0056b3;
        }
    }

    &.button-danger {
        background-color: #dc3545;
        color: white;

        &:hover {
            background-color: #c82333;
        }
    }

    &.disabled {
        background-color: #e0e0e0; 
        color: #a0a0a0; 
        cursor: not-allowed; 
        pointer-events: none; 
    }
`;
