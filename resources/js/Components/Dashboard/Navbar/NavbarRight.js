import React, { useEffect, useRef, useState } from 'react'
import { IoIosLogOut, IoMdNotificationsOutline } from 'react-icons/io'
import { IoSettingsOutline } from 'react-icons/io5'
import ButtonRoundedHover from '../../ButtonRoundedHover'
import image from '../../../Assets/images/unnamed.jpg'
import { Link } from '@inertiajs/inertia-react'
import { BiUser } from 'react-icons/bi'
import { AnimatePresence, motion } from 'framer-motion';

const userDropdownVariants = {
    hidden: {
        opacity: 0,
        x: 250
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: 'spring',
            damping: 30,
            stiffness: 300
        }
    }
}

function NavbarRight() {
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const refUserDropdown = useRef(null);

    useEffect(() => {
        window.addEventListener('click', handleClickWindow);

        return () => {
            window.removeEventListener('click', handleClickWindow);
        }
    })

    const handleClickWindow = (e) => {
        if(userDropdownOpen && !refUserDropdown.current.contains(e.target)){
            setUserDropdownOpen(false);
        }
    }

    return (
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
                <button className="block rounded-full" onClick={() => setUserDropdownOpen(!userDropdownOpen)}>
                    <img src={image} alt="image profil" className="object-cover bg-center rounded-full" style={{ width: 30, height: 30 }} />
                </button>
                <AnimatePresence exitBeforeEnter>
                    {
                        userDropdownOpen && (
                            <motion.div ref={refUserDropdown} variants={userDropdownVariants} initial="hidden" animate="visible" exit="hidden" className="absolute right-0 top-0 mt-14">
                                <div className="bg-white shadow rounded-md py-2 px-4 w-64">
                                    <div className="w-full py-6 border-b border-gray-300">
                                        <div className="flex flex-col items-center justify-center space-y-1">
                                            <div className="w-16 mb-2" style={{ height: 66 }}>
                                                <img src={image} alt="image profil" className="object-cover bg-center rounded-full w-full h-full" />
                                            </div>
                                            <h3 className="block text-base truncate font-bold text-gray-800 tracking-tight">Muhammad Badrun</h3>
                                            <h5 className="block text-blue-500 text-sm font-bold">(Admin)</h5>
                                        </div>
                                    </div>
                                    <div className="relative w-full h-auto py-4 flex flex-col space-y-1">
                                        <Link href={route('login')} className="text-gray-700 font-semibold py-2 w-full px-2 flex items-center space-x-3 rounded hover:bg-gray-100">
                                            <BiUser className="text-gray-600 w-5 h-5" />
                                            <span className="block">Profil</span>
                                        </Link>
                                        <Link href={route('logout')} method="POST" className="text-gray-700 font-semibold py-2 w-full px-2 flex items-center space-x-3 rounded hover:bg-gray-100">
                                            <IoIosLogOut className="text-gray-600 w-5 h-5" />
                                            <span className="block">Logout</span>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    }
                </AnimatePresence>
            </div>
        </div>
    )
}

export default NavbarRight
