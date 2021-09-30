import React, { useState } from 'react';
import { Head } from '@inertiajs/inertia-react';
import Resize from '@/Hooks/Resize';
import { motion } from 'framer-motion';
import Navbar from '@/Components/Dashboard/Navbar/Navbar';
import { containerVariants } from '@/Config/variants/navbar';
import { minSidebarHide } from '@/Config/app';
import Sidebar from '@/Components/Dashboard/Sidebar/Sidebar';


export default function Authenticated({ children }) {
    const { width } = Resize();
    const [sidebarOpen, setSidebarOpen] = useState(width > minSidebarHide ? true : false);

    return (
        <>
            <Head title="Dashboard" />

            <div className="relative w-full h-screen overflow-hidden bg-gray-100">
                <div className="flex flex-row">

                    {/* Sidebar */}
                    <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> 

                    <motion.div variants={containerVariants} initial={false} animate={sidebarOpen ? 'open' : 'close'} custom={width} className="w-full h-screen bg-gray-100 pl-60">
                        {/* Navbar */}
                        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} width={width} />

                        {/* Main */}
                        <div className="w-full relative h-screen pt-14 md:pt-16 overflow-y-auto">
                            <div className="">
                                {children}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
}
