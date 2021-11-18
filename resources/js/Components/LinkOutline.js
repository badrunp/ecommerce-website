import { Link } from '@inertiajs/inertia-react'
import React from 'react'

function LinkOutline({children, link, className = 'text-gray-600 border-gray-300', bgColor = 'hover:bg-gray-50 bg-white focus:ring-2 focus:ring-blue-300 focus:border-transparent' }) {
    return (
        <Link href={link} type="button" className={`px-4 md:px-7 py-2 md:py-1008 flex flex-row items-center space-x-2 text-sm md:text-base rounded md:rounded-md border focus:outline-none transition ease-in-out duration-150 ${bgColor} ${className}`}>
            {children}
        </Link>
    )
}

export default LinkOutline
