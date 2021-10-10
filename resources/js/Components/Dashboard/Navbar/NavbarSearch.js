import React from 'react'
import { BiSearch } from 'react-icons/bi'

function NavbarSearch({width = 'w-max md:w-4/5 lg:w-3/5'}) {
    return (
        <div className="flex-grow">
            <div className={`relative flex flex-row items-center justify-start border bg-white border-gray-300 p-2 md:p-0 rounded-full md:rounded-md md:px-3 ${width}`}>
                <BiSearch className="text-gray-600 w-5 h-5 md:w-6 md:h-6" />
                <input type="text" placeholder="Search for products..." className="border-none focus:outline-none focus:border-none ring-0 focus:ring-0 w-full hidden md:block" />
            </div>
        </div>
    )
}

export default NavbarSearch
