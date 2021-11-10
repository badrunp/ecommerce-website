import { itemSidebarVariants } from '@/Config/variants/sidebar'
import { Link, usePage } from '@inertiajs/inertia-react'
import { motion } from 'framer-motion'
import React from 'react'

function SidebarSubItem({ data, index }) {

    const {url} = usePage();

    return (
        <motion.div variants={itemSidebarVariants} custom={index} key={data.id} className="w-full">
            <Link href={data.link} className={`flex flex-row items-center justify-between space-x-4 py-1 w-full pl-6`}>
                <data.icon className={`w-5 h-5 fill-current ${url.startsWith(`/dashboard/products/${data.title.toLowerCase()}`) ? 'text-blue-800' : 'text-white'}`} />
                <h1 className={`block flex-grow text-sm tracking-wide ${url.startsWith(`/dashboard/products/${data.title.toLowerCase()}`) ? 'text-blue-800 font-semibold  ' : 'text-white'}`}>{data.title}</h1>
            </Link>
        </motion.div>
    )
}

export default SidebarSubItem
                                 