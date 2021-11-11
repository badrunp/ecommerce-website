import React from 'react'
import { IoClose } from 'react-icons/io5'
import { RiMenu2Fill } from 'react-icons/ri'

function NavbarLeft({ setSidebarOpen, sidebarOpen }) {
    return (
        <div>
            <button className="flex flex-col space-y-2 justify-center w-7 h-7 flex-shrink-0" onClick={() => setSidebarOpen(!sidebarOpen)}>
                {
                    sidebarOpen ? (
                        <IoClose className="w-7 h-7 text-gray-500" />
                    ) : (
                        <RiMenu2Fill className="w-7 h-7 text-gray-500" />
                    )
                }

            </button>
        </div>
    )
}

export default NavbarLeft
