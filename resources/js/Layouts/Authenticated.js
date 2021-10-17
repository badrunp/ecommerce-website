import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/inertia-react';
import Resize from '@/Hooks/Resize';
import { motion } from 'framer-motion';
import Navbar from '@/Components/Dashboard/Navbar/Navbar';
import { containerVariants } from '@/Config/variants/navbar';
import { minSidebarHide } from '@/Config/app';
import Sidebar from '@/Components/Dashboard/Sidebar/Sidebar';


export default function Authenticated({ children, headers }) {
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
                            <div className={`px-4 md:px-6 py-4 ${headers && headers.length > 0 ? 'md:py-4' : 'md:py-5'}`}>
                                {
                                    headers && (
                                        <div className="mb-3 md:mb-6 md:mt-2">
                                            <div className="flex flex-row items-center justify-start space-x-2">
                                                {
                                                    headers.map((item, index) => {
                                                        let routeUrl;
                                                        if(index === 0){
                                                            routeUrl = route('backend.dashboard')
                                                        }else if(index === 1){
                                                            routeUrl = route(`backend.${item.toLowerCase()}.index`)
                                                        }else if(index === 2) {
                                                            routeUrl = url;
                                                        }else{
                                                            routeUrl = route('backend.dashboard')
                                                        }
                                                        return (
                                                            <React.Fragment key={index}>
                                                                <Link href={routeUrl} className="text-gray-600 text-sm md:tracking-wide font-semibold md:text-base">{item}</Link>
                                                                {index != headers.length - 1 ? <h4 className="text-gray-600 text-sm font-semibold">{`>`}</h4> : null}
                                                            </React.Fragment>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
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
