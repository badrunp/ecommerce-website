import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/inertia-react';
import Resize from '@/Hooks/Resize';
import { motion } from 'framer-motion';
import Navbar from '@/Components/Dashboard/Navbar/Navbar';
import { containerVariants } from '@/Config/variants/navbar';
import { minSidebarHide } from '@/Config/app';
import Sidebar from '@/Components/Dashboard/Sidebar/Sidebar';

export default function Authenticated({ children, headers, title = 'Dashboard' }) {
    const { width } = Resize();
    const [sidebarOpen, setSidebarOpen] = useState(width > minSidebarHide ? true : false);
    const { url } = usePage();

    return (
        <>
            <Head title={title} />

            <div className="relative w-full h-screen overflow-hidden bg-gray-100">
                <div className="flex flex-row">

                    {/* Sidebar */}
                    <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} width={width} />

                    <motion.div variants={containerVariants} initial={false} animate={sidebarOpen ? 'open' : 'close'} custom={width} className="w-full h-screen bg-gray-100 pl-60">
                        {/* Navbar */}
                        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} width={width} />

                        {/* Main */}
                        <div className="w-full relative h-screen pt-14 md:pt-16 overflow-y-auto">
                            <div className={`px-4 md:px-6 py-4 ${headers && headers.length > 0 ? 'md:py-4' : 'md:py-5'}`}>
                                {
                                    headers && (
                                        <nav className="mb-3 md:mb-6 md:mt-2" aria-label="Breadcrumb">
                                            <ol className="inline-flex items-center space-x-1 md:space-x-2">
                                                {
                                                    headers.map((item, index) => {
                                                        return (
                                                            <React.Fragment key={index}>
                                                                <li className="inline-flex items-center">
                                                                    <Link href={item.url} className="text-gray-700 hover:text-gray-900 inline-flex items-center text-sm md:text-base">
                                                                        {index != 0 ? (
                                                                            <svg className="w-6 h-6 text-gray-400 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                                                        ) : (
                                                                            <svg className="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg> 
                                                                        )}
                                                                        {item.title}
                                                                    </Link>
                                                                </li>
                                                            </React.Fragment>
                                                        )
                                                    })
                                                }
                                            </ol>
                                        </nav>
                                    )
                                }

                                {children}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
}
