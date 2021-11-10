import React from 'react'
import ApplicationLogo from '../../ApplicationLogo'
import { IoIosArrowDown } from 'react-icons/io';
import { arrowVariants } from '@/Config/variants/sidebar';
import { Link, usePage } from '@inertiajs/inertia-react';
import { motion } from 'framer-motion';
 

function SidebarItem({ menu, index, handleClickOpenItems, openItemSidebar }) {
    const {url} = usePage();
        return (
        <Link as={menu.children && menu.children.length > 0 ? 'button' : 'a'} href={menu.link} onClick={(e) => handleClickOpenItems(e, index, menu.children && menu.children.length > 0 ? 'button' : 'a')} className={`flex flex-row items-center justify-between space-x-4 py-1 my-3 w-full pr-6 pl-8 ${url.startsWith(`/dashboard/${menu.title.toLowerCase()}`) ? 'bg-gray-50' : ''}`}>
            {menu.mt ? (
                <menu.icon className={`w-6 h-6 flex-shrink-0 ${url.startsWith(`/dashboard/${menu.title.toLowerCase()}`) ? 'text-blue-800' : 'text-white'} fill-current`} />
            ) : (
                <ApplicationLogo className="text-white w-6 h-6 flex-shrink-0" />
            )}

            <h1 className={`block flex-grow text-left ${menu.mt ? `${url.startsWith(`/dashboard/${menu.title.toLowerCase()}`) ? 'text-blue-800 font-semibold' : 'text-white'} text-base tracking-wide` : 'text-white font-extrabold text-base'}`}>{menu.title === 'Dashboard' ? 'Dashboard' : menu.title}</h1>

            {
                menu.children && (
                    <motion.span variants={arrowVariants} initial={false} animate={openItemSidebar[index] ? 'up' : 'down'} className="flex-shrink">
                        <IoIosArrowDown className={`w-4 h-4 ${url.startsWith(`/dashboard/${menu.title.toLowerCase()}`) ? 'text-black' : 'text-white'}`} />
                    </motion.span>
                )
            }
        </Link>
    )
}

export default SidebarItem
