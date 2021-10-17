import React from 'react';

export default function Button({ type = 'submit', className = '', processing, children, handleClick }) {
    return (
        <button
            type={type}
            onClick={handleClick && handleClick}
            className={
                `inline-flex items-center px-4 py-2 md:px-5 md:py-3 bg-gray-900 border border-transparent rounded-md md:rounded-lg font-semibold text-sm text-white tracking-widest active:bg-gray-900 transition ease-in-out duration-150 focus:ring-offset-1 ${
                    processing && 'opacity-25'
                } ` + className
            }
            disabled={processing}
        >
            {children}
        </button>
    );
}
