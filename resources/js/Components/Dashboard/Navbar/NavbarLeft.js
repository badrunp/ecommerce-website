import React from 'react'
import HamburgerList from './HamburgerList'

function NavbarLeft({ setSidebarOpen, sidebarOpen }) {
    return (
        <div>
            <button className="flex flex-col space-y-2 justify-center w-7 h-7 flex-shrink-0" onClick={() => setSidebarOpen(!sidebarOpen)}>
                {
                    ['w-8/12', 'w-full', 'w-10/12'].map((item, index) => (
                        <HamburgerList width={item} key={index} />
                    ))
                }
            </button>
        </div>
    )
}

export default NavbarLeft
