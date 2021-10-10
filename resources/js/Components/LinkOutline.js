import { Link } from '@inertiajs/inertia-react'
import React from 'react'

function LinkOutline({children, link, className = 'text-gray-600 border-gray-300 hover:bg-gray-100' }) {
    return (
        <Link href={link} type="button" className={`px-4 md:px-7 py-2 flex flex-row items-center space-x-2 text-sm md:text-base rounded md:rounded-md border focus:outline-none transition ease-in-out duration-150 ${className}`}>
            {children}
        </Link>
    )
}

export default LinkOutline