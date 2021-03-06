import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Overlay from '../../Overlay';
import { menuSidebarVariants, openSidebarVariants } from '@/Config/variants/sidebar';
import { minSidebarHide } from '@/Config/app';
import SidebarItem from './SidebarItem';
import SidebarSubItem from './SidebarSubItem';
import { menuSidebars } from '@/Config/menu/dashboard/sidebar';


function Sidebar({ sidebarOpen, setSidebarOpen, width }) {
    const [openItemSidebar, setOpenItemSidebar] = useState(Array(menuSidebars.length).fill(true));
    const [initial, setInitial] = useState(true);

    const handleClickOpenItems = (e, index, type) => {
        if (type === 'button') {
            e.preventDefault()
            const newOpen = openItemSidebar.map((open, key) => index === key ? !open : false);
            setOpenItemSidebar(newOpen);
        }
    }

    useEffect(() => {
        setInitial(false);
    }, [setInitial])

    useEffect(() => {
        if (width < minSidebarHide) {
            setSidebarOpen(false)
        } else {
            setSidebarOpen(true)
        }
    }, [width])
    return (
        <>
            <motion.div variants={openSidebarVariants} initial={false} animate={sidebarOpen ? 'open' : 'close'} className="w-60 fixed top-0 left-0 bg-gradient-to-bl from-blue-800 via-blue-800 to-blue-700 flex-shrink-0 h-screen overflow-x-hidden">
                <div className="flex flex-col items-start py-4">
                    {
                        menuSidebars && menuSidebars.map((menu, index) => (
                            <div key={menu.id} className={`${index == 1 && 'mt-3'} w-full relative overflow-hidden`}>
                                {
                                    <SidebarItem menu={menu} index={index} key={menu.id} openItemSidebar={openItemSidebar} handleClickOpenItems={handleClickOpenItems} />
                                }
                                <div className="pl-8">
                                <AnimatePresence key={index} exitBeforeEnter>
                                    {
                                        menu.children && menu.children.length > 0 && openItemSidebar[index] && (
                                            <motion.div variants={menuSidebarVariants} custom={260} initial={initial ? false : 'hidden'} animate="visible" exit="exit" className="w-full bg-white flex flex-col items-start justify-center overflow-hidden rounded-l-md space-y-6">
                                                {
                                                    menu.children.map((chil, i) => (
                                                        <SidebarSubItem key={chil.id} index={i} data={chil} />
                                                    ))
                                                }
                                            </motion.div>
                                        )
                                    }
                                </AnimatePresence>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </motion.div>

            <Overlay width={width} min={minSidebarHide} open={sidebarOpen} setOpen={setSidebarOpen} />

        </>
    )
}

export default Sidebar
