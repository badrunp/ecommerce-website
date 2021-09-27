import React from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/inertia-react';
import { motion } from 'framer-motion';

const logoVariants = {
    hidden: {
        opacity: 0,
        y: -100
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            delay: .2
        }
    }
}

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gradient-to-br from-gray-700 via-gray-900 to-gray-600 py-8">
            <motion.div variants={logoVariants} initial="hidden" animate="visible" className="w-full sm:max-w-xl">
                <Link href="/" className="w-full mt-6 md:mt-8 flex items-center px-6 md:px-0">
                    <ApplicationLogo className="w-12 h-12 md:w-16 md:h-16 text-gray-100" />
                <h1 className="block text-2xl md:text-3xl text-gray-100 font-semibold ml-1 tracking-tight">Ecommerce - Website</h1>
                </Link>
            </motion.div>

            <div className="w-full sm:max-w-xl mt-6 px-6 py-4 md:px-12 md:py-12 bg-transparent md:bg-white md:shadow-md overflow-hidden sm:rounded-lg lg:rounded-xl">
                {children}
            </div>
        </div>
    );
}
