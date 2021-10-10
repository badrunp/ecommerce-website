import React from 'react'

function ButtonDropdown({children, className}) {
    return (
        <button type="button" className={`relative px-4 md:px-7 py-2 flex flex-row items-center space-x-2 text-sm md:text-base text-gray-600 rounded md:rounded-md border border-gray-300 focus:outline-none ${className}`}>
            {children}
        </button>
    )
}

export default ButtonDropdown
