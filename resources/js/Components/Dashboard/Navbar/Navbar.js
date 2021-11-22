import React from 'react'
import { motion } from 'framer-motion'
import { containerVariants } from '@/Config/variants/navbar'
import NavbarRight from './NavbarRight'
import NavbarSearch from './NavbarSearch'
import NavbarLeft from './NavbarLeft'

function Navbar({ sidebarOpen, setSidebarOpen, width }) {
    return (
        <motion.div variants={containerVariants} custom={width} className="fixed w-full h-14 md:h-16 left-0 pl-60 shadow-sm bg-gradient-to-br bg-white z-20">
            <div className="flex flex-row items-center justify-between pl-3 md:pl-6 pr-3 md:pr-8 h-full space-x-4 md:space-x-6">

                <NavbarLeft sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                {/* <NavbarSearch /> */}

                <NavbarRight />
            </div>
        </motion.div>
    )
}

export default Navbar
