import React, { useState, useEffect } from 'react';

export const ColorChangingLoading = () => {
    return (
        <div className="loading-container">
            <div style={{
                width: '100%',
                height: '5px',
                background: 'linear-gradient(to right, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8b00ff)',
                backgroundSize: '200% 100%',
                animation: 'gradientMovement 1s linear infinite'
            }} />
            <style>
                {`
                @keyframes gradientMovement {
                    0% {
                        background-position: 0% 50%;
                    }
                    100% {
                        background-position: 100% 50%;
                    }
                }
                `}
            </style>
        </div>
    );
};