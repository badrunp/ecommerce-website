import React, { useEffect, useState } from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { IoIosArrowDown, IoMdNotificationsOutline } from 'react-icons/io';
import {IoSettingsOutline} from 'react-icons/io5'
import { AnimatePresence, motion } from 'framer-motion';
import { menuSidebars } from '@/Config/menu';
import image from './unnamed.jpg';

let minLeftWidth = 600;

const itemSidebarVariants = {
    hidden: {
        x: -100
    },
    visible: i => ({
        x: 0,
        transition: {
            delay: i / 10,
            type: 'spring',
            stiffness: 300,
            damping: 30
        }
    }),
    exit: {
        opacity: 0
    }
}

const menuSidebarVariants = {
    hidden: {
        opacity: 0,
        height: 0,
        zIndex: -1
    },
    visible: {
        opacity: 1,
        height: 160,
        transition: {
            duration: .2,
            type: 'tween'
        }
    },
    exit: {
        opacity: 0,
        height: 0,
        zIndex: -1,
        transition: {
            delay: .2,
            type: 'tween'
        }
    }
}

const arrowVariants = {
    down: {
        rotate: 0,
        transition: {
            delay: .2
        }
    },
    up: {
        rotate: 180
    }
}

const openSidebarVariants = {
    open: {
        width: 240,
        zIndex: 100,
        transition: {
            type: 'tween'
        }
    },
    close: {
        width: 0,
        transition: {
            type: 'tween'
        }
    }
}

const containerVariants = {
    open: width => ({
        paddingLeft: width < minLeftWidth ? 0 : 240,
        transition: {
            type: 'tween'
        }
    }),
    close: {
        paddingLeft: 0,
        transition: {
            type: 'tween'
        }
    }
}

const overlayVariants = {
    hidden: {
        opacity: 0,
        zIndex: 50
    },
    visible: {
        opacity: 1
    }
}

export default function Welcome(props) {
    const [openItemSidebar, setOpenItemSidebar] = useState(Array(menuSidebars.length).fill(false));
    const [width, setWidth] = useState(window.innerWidth);
    const [sidebarOpen, setSidebarOpen] = useState(width > minLeftWidth ? true : false);

    const handleClickOpenItems = (index) => {
        const newOpen = openItemSidebar.map((open, key) => index === key ? !open : false);
        setOpenItemSidebar(newOpen);
    }

    useEffect(() => {
        window.addEventListener('resize', handleResizeWindow);
        return () => {
            window.removeEventListener('resize', handleResizeWindow);
        }
    })

    useEffect(() => {
        if (width < minLeftWidth) {
            setSidebarOpen(false)
        } else {
            setSidebarOpen(true)
        }
    }, [width])

    const handleResizeWindow = (e) => {
        setWidth(e.currentTarget.innerWidth)
    }

    return (
        <>
            <Head title="Welcome" />
            {/* <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
                <div className="fixed top-0 right-0 px-6 py-4 sm:block">
                    {props.auth.user ? (
                        <Link href="/dashboard" className="text-sm text-gray-700 underline">
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link href={route('login')} className="text-sm text-gray-700 underline">
                                Log in
                            </Link>

                            <Link href={route('register')} className="ml-4 text-sm text-gray-700 underline">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div> */}


            <div className="relative w-full h-screen overflow-hidden bg-gray-100">
                <div className="flex flex-row">
                    <motion.div variants={openSidebarVariants} initial={false} animate={sidebarOpen ? 'open' : 'close'} className="w-60 fixed top-0 left-0 bg-white shadow flex-shrink-0 h-screen overflow-hidden">
                        <div className="flex flex-col items-start py-4 pl-8">
                            {
                                menuSidebars && menuSidebars.map((menu, index) => (
                                    <div key={menu.id} className={`${index == 1 && 'mt-3'} w-full relative overflow-hidden`}>
                                        {
                                            menu.children && menu.children.length > 0 ? (
                                                <button onClick={() => handleClickOpenItems(index)} className={`flex flex-row items-center justify-between space-x-4 py-1 my-3 w-full pr-6 ${menu.id === 2 ? 'border-r-2 border-blue-600' : ''}`}>
                                                    <menu.icon className={`w-6 h-6 flex-shrink-0 ${menu.id === 2 ? 'text-blue-600' : 'text-gray-500'} fill-current`} />

                                                    <h1 className={`block flex-grow text-left ${menu.mt ? `${menu.id === 2 ? 'text-blue-600 font-semibold' : 'text-gray-700'} text-base tracking-wide` : 'text-gray-800 font-extrabold text-base'}`}>{menu.title}</h1>
                                                    {
                                                        menu.children && (
                                                            <motion.span variants={arrowVariants} initial={false} animate={openItemSidebar[index] ? 'up' : 'down'} className="flex-shrink">
                                                                <IoIosArrowDown className="w-4 h-4 text-gray-500" />
                                                            </motion.span>
                                                        )
                                                    }
                                                </button>
                                            ) : (
                                                <Link href={route('login')} className={`flex flex-row items-center justify-between space-x-4 py-1 my-3 w-full pr-6 ${menu.id === 2 ? 'border-r-2 border-blue-600' : ''}`}>
                                                    {menu.mt ? (
                                                        <menu.icon className={`w-6 h-6 flex-shrink-0 ${menu.id === 2 ? 'text-blue-600' : 'text-gray-500'} fill-current`} />
                                                    ) : (
                                                        <ApplicationLogo className="text-gray-800 w-6 h-6 flex-shrink-0" />
                                                    )}
                                                    <h1 className={`block flex-grow ${menu.mt ? `${menu.id === 2 ? 'text-blue-600 font-semibold' : 'text-gray-700'} text-base tracking-wide` : 'text-gray-800 font-extrabold text-base'}`}>{menu.title}</h1>
                                                </Link>
                                            )
                                        }
                                        <AnimatePresence key={index} exitBeforeEnter>
                                            {
                                                menu.children && menu.children.length > 0 && openItemSidebar[index] && (
                                                    <motion.div variants={menuSidebarVariants} initial="hidden" animate="visible" exit="exit" className="w-full bg-gray-50 flex flex-col items-start justify-center overflow-hidden rounded-md space-y-6">
                                                        {
                                                            menu.children.map((chil, i) => (
                                                                <motion.div variants={itemSidebarVariants} custom={i} key={chil.id} className="w-full">
                                                                    <Link href={route('login')} className={`flex flex-row items-center justify-between space-x-4 py-1 w-full pl-6`}>
                                                                        <chil.icon className={`w-5 h-5 text-gray-500 fill-current`} />
                                                                        <h1 className={`block flex-grow text-gray-700 text-sm tracking-wide`}>{chil.title}</h1>
                                                                    </Link>
                                                                </motion.div>
                                                            ))
                                                        }
                                                    </motion.div>
                                                )
                                            }
                                        </AnimatePresence>
                                    </div>
                                ))
                            }
                        </div>
                    </motion.div>
                    <AnimatePresence exitBeforeEnter>
                        {
                            width < minLeftWidth && sidebarOpen && (
                                <motion.div variants={overlayVariants} initial="hidden" animate="visible" exit="hidden" onClick={() => setSidebarOpen(!sidebarOpen)} className="fixed w-full h-screen bg-gray-800 bg-opacity-50 top-0 left-0 bottom-0 right-0"></motion.div>
                            )
                        }
                    </AnimatePresence>
                    <motion.div variants={containerVariants} initial={false} animate={sidebarOpen ? 'open' : 'close'} custom={width} className="w-full h-screen bg-gray-100 pl-60">
                        <motion.div variants={containerVariants}  custom={width} className="fixed w-full h-14 lg:h-16 bg-transparent left-0 pl-60">
                            <div className="flex flex-row items-center justify-between pl-3 md:pl-6 pr-3 md:pr-8 h-full">
                                <button className="flex flex-col space-y-2 justify-center w-7 h-7" onClick={() => setSidebarOpen(!sidebarOpen)}>
                                    <span className="block w-8/12 bg-gray-700 rounded" style={{ height: 2 }}></span>
                                    <span className="block w-full bg-gray-700 rounded" style={{ height: 2 }}></span>
                                    <span className="block w-10/12 bg-gray-700 rounded" style={{ height: 2 }}></span>
                                </button>

                                <ul className="flex flex-row justify-between items-center space-x-4 flex-shrink-0 md:space-x-6">
                                    <li>
                                        <button className="rounded-full hover:bg-gray-200">
                                            <IoSettingsOutline className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
                                        </button>
                                    </li>
                                    <li>
                                        <button className="rounded-full hover:bg-gray-200">
                                            <IoMdNotificationsOutline className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
                                        </button>
                                    </li>
                                    <li>
                                        <button className="relative overflow-hidden rounded-full" style={{ width: 30, height: 30 }}>
                                            <img src={image} alt="image profil" className="object-cover bg-center w-full h-full" />
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </motion.div>
                        <div className="w-full h-screen p-6 pt-14 md:pt-16 overflow-y-scroll">
                            lorem
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
}
