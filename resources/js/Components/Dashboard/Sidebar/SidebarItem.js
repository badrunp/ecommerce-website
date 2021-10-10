import React from 'react'
import ApplicationLogo from '../../ApplicationLogo'
import { IoIosArrowDown } from 'react-icons/io';
import { arrowVariants } from '@/Config/variants/sidebar';
import { Link, usePage } from '@inertiajs/inertia-react';
import { motion } from 'framer-motion';
 

function SidebarItem({ menu, index, handleClickOpenItems, openItemSidebar }) {
    const {url} = usePage();
        return (
        <Link as={menu.children && menu.children.length > 0 ? 'button' : 'a'} href={menu.link} onClick={(e) => handleClickOpenItems(e, index, menu.children && menu.children.length > 0 ? 'button' : 'a')} className={`flex flex-row items-center justify-between space-x-4 py-1 my-3 w-full pr-6 ${url === `/dashboard/${menu.title.toLowerCase()}` ? 'border-r-2 border-blue-600' : ''}`}>
            {menu.mt ? (
                <menu.icon className={`w-6 h-6 flex-shrink-0 ${url === `/dashboard/${menu.title.toLowerCase()}` ? 'text-blue-600' : 'text-gray-500'} fill-current`} />
            ) : (
                <ApplicationLogo className="text-gray-800 w-6 h-6 flex-shrink-0" />
            )}

            <h1 className={`block flex-grow text-left ${menu.mt ? `${url === `/dashboard/${menu.title.toLowerCase()}` ? 'text-blue-600 font-semibold' : 'text-gray-700'} text-base tracking-wide` : 'text-gray-800 font-extrabold text-base'}`}>{menu.title === 'Dashboard' ? 'Dashboard' : menu.title}</h1>

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
