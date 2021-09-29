import React, { useEffect, useState } from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { IoIosArrowDown, IoIosLogOut, IoMdNotificationsOutline } from 'react-icons/io';
import { IoSettingsOutline } from 'react-icons/io5'
import { AnimatePresence, motion } from 'framer-motion';
import { menuSidebars } from '@/Config/menu';
import image from '../Assets/images/unnamed.jpg';
import ButtonRoundedHover from '@/Components/ButtonRoundedHover';
import { BiSearch, BiUser } from 'react-icons/bi';

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
                    <motion.div variants={openSidebarVariants} initial={false} animate={sidebarOpen ? 'open' : 'close'} className="w-60 fixed top-0 left-0 bg-white flex-shrink-0 h-screen overflow-hidden">
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
                        <motion.div variants={containerVariants} custom={width} className="fixed w-full h-14 lg:h-16 bg-transparent left-0 pl-60 shadow-sm bg-gradient-to-br bg-white">
                            <div className="flex flex-row items-center justify-between pl-3 md:pl-6 pr-3 md:pr-8 h-full space-x-4 md:space-x-6">

                                <button className="flex flex-col space-y-2 justify-center w-7 h-7 flex-shrink-0" onClick={() => setSidebarOpen(!sidebarOpen)}>
                                    <span className="block w-8/12 bg-gray-700 rounded" style={{ height: 2 }}></span>
                                    <span className="block w-full bg-gray-700 rounded" style={{ height: 2 }}></span>
                                    <span className="block w-10/12 bg-gray-700 rounded" style={{ height: 2 }}></span>
                                </button>

                                <div className="flex-grow">
                                    <div className="relative flex flex-row items-center justify-start border bg-white border-gray-300 p-2 md:p-0 rounded-full md:rounded-md md:px-3 w-max md:w-4/5 lg:w-3/5">
                                        <BiSearch className="text-gray-600 w-5 h-5 md:w-6 md:h-6" />
                                        <input type="text" placeholder="Search for products..." className="border-none focus:outline-none focus:border-none ring-0 focus:ring-0 w-full hidden md:block" />
                                    </div>
                                </div>

                                <div className="flex flex-row justify-between items-center space-x-2 flex-shrink-0 md:space-x-4">
                                    <ButtonRoundedHover>
                                        <IoSettingsOutline className="w-5 h-5 text-gray-600" />
                                    </ButtonRoundedHover>
                                    <ButtonRoundedHover>
                                        <IoMdNotificationsOutline className="w-5 h-5 text-gray-600" />
                                        <div className="absolute right-0 bottom-0 bg-red-500 rounded-full overflow-hidden h-4 w-4">
                                            <span className="block text-xs text-white">1</span>
                                        </div>
                                    </ButtonRoundedHover>
                                    <div className="relative">
                                        <button className="block rounded-full">
                                            <img src={image} alt="image profil" className="object-cover bg-center rounded-full" style={{ width: 30, height: 30 }} />
                                        </button>
                                        <div className="absolute right-0 top-0 mt-16">
                                            <div className="bg-white shadow rounded-md py-2 px-4 w-64">
                                                <div className="w-full py-6 border-b border-gray-300">
                                                    <div className="flex flex-col items-center justify-center space-y-1">
                                                        <div className="w-16 mt-2" style={{ height: 66 }}>
                                                            <img src={image} alt="image profil" className="object-cover bg-center rounded-full w-full h-full" />
                                                        </div>
                                                        <h3 className="block text-base truncate font-bold text-gray-800 tracking-tight">Muhammad Badrun</h3>
                                                        <h5 className="block text-blue-500 text-sm font-bold">Administrator (Admin)</h5>
                                                    </div>
                                                </div>
                                                <div className="relative w-full h-auto py-4 flex flex-col space-y-1">
                                                    <Link href={route('login')} className="text-gray-700 font-semibold py-2 w-full px-2 flex items-center space-x-3 rounded hover:bg-gray-100">
                                                        <BiUser className="text-gray-600 w-6 h-6" />
                                                        <span className="block">Profil</span>
                                                    </Link>
                                                    <Link href={route('login')} className="text-gray-700 font-semibold py-2 w-full px-2 flex items-center space-x-3 rounded hover:bg-gray-100">
                                                        <IoIosLogOut className="text-gray-600 w-6 h-6" />
                                                        <span className="block">Logout</span>
                                                    </Link> 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                        <div className="w-full h-screen p-6 pt-14 md:pt-16 overflow-y-auto">
                            <div className="">
                                lorem
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
}
