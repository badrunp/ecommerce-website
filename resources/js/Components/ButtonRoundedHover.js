import React from 'react'

function ButtonRoundedHover({ children, handleClick, className, bgColor = 'bg-gray-50 hover:bg-gray-100' }) {
    return (
        <button onClick={handleClick && handleClick} className={`block relative rounded-full p-2 transition ease-in-out duration-150 ${bgColor} ${className}`}>
            {children}
        </button>
    )
}

export default ButtonRoundedHover
