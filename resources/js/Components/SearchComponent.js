import React from 'react'
import { BiSearch } from 'react-icons/bi'

function SeacrhComponent({width = 'w-full', value = '', placeholder = 'Search...', className, handleChange}) {
    return (
        <div className={`flex-grow ${className}`}>
            <div className={`relative flex flex-row items-center justify-start border bg-white border-gray-300 p-0 rounded-md px-3 ${width}`}>
                <BiSearch className="text-gray-600 w-5 h-5 md:w-6 md:h-6" />
                <input type="text" value={value} placeholder={placeholder} onChange={(e) => handleChange && handleChange(e)} className="border-none focus:outline-none text-sm md:text-base focus:border-none ring-0 focus:ring-0 w-full" />
            </div>
        </div>
    )
}

export default SeacrhComponent
