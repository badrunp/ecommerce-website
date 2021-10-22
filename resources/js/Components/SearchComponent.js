import { Inertia } from '@inertiajs/inertia';
import React from 'react'
import { BiSearch } from 'react-icons/bi'

function SeacrhComponent({ width = 'w-full', value = '', placeholder = 'Search...', className, handleChange, query, redirect = '' }) {

    const handleSubmit = (e) => {
        e.preventDefault();
        let queries = query;
        queries.search = value        
        Inertia.get(route(`backend.${redirect}.index`, query))
        
    }

    return (
        <div className={`flex-grow ${className}`}>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-row space-x-2 items-center">
                    <div className={`relative flex flex-row items-center justify-start border bg-white border-gray-300 p-0 rounded-md px-3 ${width}`}>
                        <BiSearch className="text-gray-600 w-5 h-5 md:w-6 md:h-6" />
                        <input type="text" value={value} placeholder={placeholder} onChange={(e) => handleChange && handleChange(e)} className="border-none focus:outline-none text-sm md:text-base focus:border-none ring-0 focus:ring-0 w-full" />
                    </div>
                    <button type="submit" className="inline-block text-sm md:text-base rounded-md px-4 py-2 focus:ring-2 ring-blue-300 focus:ring-offset-1 font-semibold bg-blue-500 text-white">
                        <BiSearch className="text-white w-5 h-5 md:w-6 md:h-6" />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SeacrhComponent
