import React from 'react'

function ButtonDropdown({children, className, bgColor = 'bg-white hover:bg-gray-50 focus:ring-2 focus:ring-blue-300 focus:border-transparent', handleClick}) {
    return (
        <button type="button" onClick={handleClick && handleClick} className={`relative px-2 md:px-7 py-2 md:py-3 flex flex-row items-center space-x-2 text-sm md:text-base text-gray-600 rounded md:rounded-md border border-gray-300 focus:outline-none ${bgColor} ${className} transition ease-in-out duration-150`}>
            {children}
        </button>
    )
}

export default ButtonDropdown
