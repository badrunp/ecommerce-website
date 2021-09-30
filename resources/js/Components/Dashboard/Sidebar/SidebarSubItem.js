import { itemSidebarVariants } from '@/Config/variants/sidebar'
import { Link } from '@inertiajs/inertia-react'
import { motion } from 'framer-motion'
import React from 'react'

function SidebarSubItem({ data, index }) {
    return (
        <motion.div variants={itemSidebarVariants} custom={index} key={data.id} className="w-full">
            <Link href={route('test')} className={`flex flex-row items-center justify-between space-x-4 py-1 w-full pl-6`}>
                <data.icon className={`w-5 h-5 text-gray-500 fill-current`} />
                <h1 className={`block flex-grow text-gray-700 text-sm tracking-wide`}>{data.title}</h1>
            </Link>
        </motion.div>
    )
}

export default SidebarSubItem
