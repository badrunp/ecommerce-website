import { Link } from '@inertiajs/inertia-react';
import React from 'react'

function Pagination({ items }) {
    return (
        <div className="flex flex-row items-center relative border border-gray-200 rounded mt-6 w-max">
            {
                items && items.links.map((link, index) => {

                    let label = '';

                    if (index === 0) {
                        label = 'prev'
                    } else if (index === items.links.length - 1) {
                        label = 'next'
                    } else {
                        label = link.label
                    }

                    return (
                        <Link key={index} as={link.url === null ? 'button' : 'a'} disabled={link.url === null ? true : false} href={link.url !== null && link.url} className={`w-max text-sm md:text-base py-2 px-4 ${link.active && 'bg-blue-500 text-white'} ${index !== items.links.length - 1 && 'border-r'} border-gray-200 ${link.url === null ? 'bg-gray-100 cursor-text' : ''}`}>{label}</Link>
                    )
                })
            }
        </div>
    )
}

export default Pagination
