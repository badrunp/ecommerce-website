import React from 'react'

function ButtonOutline({ children, className = 'text-gray-600 border-gray-300', bgColor = 'bg-white hover:bg-gray-50 focus:ring-2 focus:ring-blue-300 focus:border-transparent' }) {
    return (
        <button type="button" className={`px-4 md:px-7 py-2 flex flex-row items-center space-x-2 text-sm md:text-base rounded md:rounded-md border focus:outline-none transition ease-in-out duration-150 ${bgColor} ${className}`}>
            {children}
        </button>
    )
}

export default ButtonOutline
