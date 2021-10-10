import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/inertia-react';
import Resize from '@/Hooks/Resize';
import { motion } from 'framer-motion';
import Navbar from '@/Components/Dashboard/Navbar/Navbar';
import { containerVariants } from '@/Config/variants/navbar';
import { minSidebarHide } from '@/Config/app';
import Sidebar from '@/Components/Dashboard/Sidebar/Sidebar';


export default function Authenticated({ children, header }) {
    const { width } = Resize();
    const [sidebarOpen, setSidebarOpen] = useState(width > minSidebarHide ? true : false);
    const { url } = usePage();

    return (
        <>
            <Head title="Dashboard" />

            <div className="relative w-full h-screen overflow-hidden bg-gray-100">
                <div className="flex flex-row">

                    {/* Sidebar */}
                    <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} width={width} />

                    <motion.div variants={containerVariants} initial={false} animate={sidebarOpen ? 'open' : 'close'} custom={width} className="w-full h-screen bg-gray-100 pl-60">
                        {/* Navbar */}
                        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} width={width} />

                        {/* Main */}
                        <div className="w-full relative h-screen pt-14 md:pt-16 overflow-y-auto">
                            <div className="px-4 md:px-6 py-4">
                                <div className="mb-6 mt-2">
                                    <div className="flex flex-row items-center justify-start space-x-2">
                                        {
                                            url.split('/').map((item, index) => {
                                                if (item != '') {
                                                    const text = item.charAt(0).toUpperCase() + item.slice(1, item.length);
                                                    return (
                                                        <React.Fragment key={index}>
                                                            <h4 className="text-gray-600 text-base tracking-tighter md:tracking-normal md:text-lg">{text}</h4>
                                                            {index != url.split('/').length -1 ? <h4 className="text-gray-600 text-sm font-semibold">{`>`}</h4> : null}
                                                        </React.Fragment>
                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                </div>

                                {children}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
}
