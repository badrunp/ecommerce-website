import { Inertia } from '@inertiajs/inertia';
import { Link, useForm, usePage } from '@inertiajs/inertia-react'
import React from 'react'
import { BiSearch } from 'react-icons/bi'

function SeacrhComponent({ width = 'w-full', value = '', placeholder = 'Search...', className, handleChange, query }) {

    const handleSubmit = (e) => {
        e.preventDefault();
        let queries = query;
        queries.search = value

        console.log(queries);
        
        Inertia.get(route('backend.categories.index', query))
        
    }

    return (
        <div className={`flex-grow ${className}`}>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-row space-x-2 items-center">
                    <div className={`relative flex flex-row items-center justify-start border bg-white border-gray-300 p-0 rounded-md px-3 ${width}`}>
                        <BiSearch className="text-gray-600 w-5 h-5 md:w-6 md:h-6" />
                        <input type="text" value={value} placeholder={placeholder} onChange={(e) => handleChange && handleChange(e)} className="border-none focus:outline-none text-sm md:text-base focus:border-none ring-0 focus:ring-0 w-full" />
                    </div>
                    <button type="submit" className="inline-block text-sm md:text-base rounded px-4 py-2 border border-gray-200 bg-blue-500 text-white">Search</button>
                </div>
            </form>
        </div>
    )
}

export default SeacrhComponent
