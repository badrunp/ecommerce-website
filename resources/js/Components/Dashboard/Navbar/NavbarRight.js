import React, { useEffect, useRef, useState } from 'react'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { IoSettingsOutline } from 'react-icons/io5'
import ButtonRoundedHover from '../../ButtonRoundedHover'
import image from '../../../Assets/images/unnamed.jpg'
import { Link, useForm } from '@inertiajs/inertia-react'
import { AnimatePresence, motion } from 'framer-motion';
import { userDropdownVariants, userNotifVariants } from '@/Config/variants/navbar'
import { menuUserNavbarDropdown } from '@/Config/menu/dashboard/navbar'
import { AuthContext } from '@/app'


function NavbarRight(props) {
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const [userNotifOpen, setNotifDropdownOpen] = useState(false);
    const refUserDropdown = useRef(null);
    const refNotifDropdown = useRef(null);
    const { post } = useForm()

    const auth = React.useContext(AuthContext);

    useEffect(() => {
        window.addEventListener('click', handleClickWindow);

        return () => {
            window.removeEventListener('click', handleClickWindow);
        }
    })

    const handleClickWindow = (e) => {
        if (userDropdownOpen && !refUserDropdown.current.contains(e.target)) {
            setUserDropdownOpen(false);
        }
        if (userNotifOpen && !refNotifDropdown.current.contains(e.target)) {
            setNotifDropdownOpen(false);
        }
    }

    const handleLogout = (e, method) => {
        if (method != "GET") {
            e.preventDefault()
            post(route('logout'))
        }
    }

    return (
        <div className="flex flex-row justify-between items-center space-x-2 flex-shrink-0 md:space-x-4">
            <ButtonRoundedHover>
                <IoSettingsOutline className="w-5 h-5 text-gray-600" />
            </ButtonRoundedHover>
            <div className="relative">
                <ButtonRoundedHover handleClick={() => setNotifDropdownOpen(!userNotifOpen)}>
                    <IoMdNotificationsOutline className="w-5 h-5 text-gray-600" />
                    <div className="absolute right-0 bottom-0 bg-red-500 rounded-full overflow-hidden h-4 w-4">
                        <span className="block text-xs text-white">1</span>
                    </div>
                </ButtonRoundedHover>
                <AnimatePresence>
                    {
                        userNotifOpen && (
                            <motion.div variants={userNotifVariants} initial="hidden" animate="visible" exit="hidden" className="absolute top-0 right-0 mt-14" ref={refNotifDropdown}>
                                <div className="bg-white rounded-md shadow w-56 ">
                                    <div className="py-2">
                                        <div className="w-full flex flex-col justify-start items-start divide-y-2 divide-gray-200">
                                            <div className="px-4 py-2">
                                                <span className="block text-gray-600 text-sm">Itaque exercitationem culpa illo blanditiis nesciunt excepturi reprehenderit. Alias impedit repellendus ducimus?</span>
                                            </div>
                                            <div className="px-4 py-2">
                                                <span className="block text-gray-600 text-sm">Itaque exercitationem culpa illo blanditiis nesciunt excepturi reprehenderit. Alias impedit repellendus ducimus?</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    }
                </AnimatePresence>
            </div>

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
                                            <h3 className="block text-base truncate font-bold text-gray-600 tracking-tight">{auth && auth.name}</h3>
                                            <h3 className="block text-base truncate font-bold text-gray-600 tracking-tight">{auth && auth.email}</h3>
                                            <h5 className="block text-blue-500 text-sm font-bold">(Admin)</h5>
                                        </div>
                                    </div>
                                    <div className="relative w-full h-auto py-4 flex flex-col space-y-1">
                                        {
                                            menuUserNavbarDropdown.map((item) => (
                                                <Link key={item.id} href={item.link} as={item.method != 'GET' ? 'button' : 'a'} onClick={(e) => handleLogout(e, item.method)} className="text-gray-500 font-semibold py-2 w-full px-2 flex items-center space-x-3 rounded hover:bg-gray-100">
                                                    <item.icon className="text-gray-600 w-5 h-5" />
                                                    <span className="block">{item.title}</span>
                                                </Link>
                                            ))
                                        }
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
