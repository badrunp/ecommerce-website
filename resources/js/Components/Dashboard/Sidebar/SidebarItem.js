import React from 'react'
import ApplicationLogo from '../../ApplicationLogo'
import { IoIosArrowDown } from 'react-icons/io';
import { arrowVariants } from '@/Config/variants/sidebar';
import { Link } from '@inertiajs/inertia-react';
import { motion } from 'framer-motion';

function SidebarItem({ menu, index, handleClickOpenItems, openItemSidebar }) {
    return (
        <Link as={menu.children && menu.children.length > 0 ? 'button' : 'a'} href={route('test')} onClick={(e) => handleClickOpenItems(e, index, menu.children && menu.children.length > 0 ? 'button' : 'a')} className={`flex flex-row items-center justify-between space-x-4 py-1 my-3 w-full pr-6 ${menu.id === 2 ? 'border-r-2 border-blue-600' : ''}`}>
            {menu.mt ? (
                <menu.icon className={`w-6 h-6 flex-shrink-0 ${menu.id === 2 ? 'text-blue-600' : 'text-gray-500'} fill-current`} />
            ) : (
                <ApplicationLogo className="text-gray-800 w-6 h-6 flex-shrink-0" />
            )}

            <h1 className={`block flex-grow text-left ${menu.mt ? `${menu.id === 2 ? 'text-blue-600 font-semibold' : 'text-gray-700'} text-base tracking-wide` : 'text-gray-800 font-extrabold text-base'}`}>{menu.title}</h1>

            {
                menu.children && (
                    <motion.span variants={arrowVariants} initial={false} animate={openItemSidebar[index] ? 'up' : 'down'} className="flex-shrink">
                        <IoIosArrowDown className="w-4 h-4 text-gray-500" />
                    </motion.span>
                )
            }
        </Link>
    )
}

export default SidebarItem
