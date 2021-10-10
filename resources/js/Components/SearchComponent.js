import React from 'react'
import { BiSearch } from 'react-icons/bi'

function SeacrhComponent({width = 'w-full', placeholder = 'Search...'}) {
    return (
        <div className="flex-grow">
            <div className={`relative flex flex-row items-center justify-start border bg-white border-gray-300 p-0 rounded-md md:px-3 ${width}`}>
                <BiSearch className="text-gray-600 w-5 h-5 md:w-6 md:h-6" />
                <input type="text" placeholder={placeholder} className="border-none focus:outline-none focus:border-none ring-0 focus:ring-0 w-full" />
            </div>
        </div>
    )
}

export default SeacrhComponent
