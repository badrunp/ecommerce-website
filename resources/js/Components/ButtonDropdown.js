import React from 'react'

function ButtonDropdown({children, className, bgColor = 'bg-white hover:bg-gray-100', handleClick}) {
    return (
        <button type="button" onClick={handleClick && handleClick} className={`relative px-4 md:px-7 py-2 flex flex-row items-center space-x-2 text-sm md:text-base text-gray-600 rounded md:rounded-md border border-gray-300 focus:outline-none ${bgColor} ${className}`}>
            {children}
        </button>
    )
}

export default ButtonDropdown
