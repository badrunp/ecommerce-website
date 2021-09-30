import { Link } from '@inertiajs/inertia-react'
import { motion } from 'framer-motion'
import React from 'react'
import { BiSearch, BiUser } from 'react-icons/bi'
import { IoIosLogOut, IoMdNotificationsOutline } from 'react-icons/io'
import { IoSettingsOutline } from 'react-icons/io5'
import ButtonRoundedHover from '../ButtonRoundedHover'
import image from '../../Assets/images/unnamed.jpg'
import { containerVariants } from '@/Config/variants/navbar'
import HamburgerList from './HamburgerList'

function Navbar({ sidebarOpen, setSidebarOpen, width }) {
    return (
        <motion.div variants={containerVariants} custom={width} className="fixed w-full h-14 lg:h-16 bg-transparent left-0 pl-60 shadow-sm bg-gradient-to-br bg-white z-20">
            <div className="flex flex-row items-center justify-between pl-3 md:pl-6 pr-3 md:pr-8 h-full space-x-4 md:space-x-6">

                <button className="flex flex-col space-y-2 justify-center w-7 h-7 flex-shrink-0" onClick={() => setSidebarOpen(!sidebarOpen)}>
                    {
                        ['w-8/12', 'w-full', 'w-10/12'].map((item, index) => (
                            <HamburgerList width={item} key={index} />
                        ))
                    }
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
                                        <h5 className="block text-blue-500 text-sm font-bold">(Admin)</h5>
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
    )
}
 
export default Navbar
