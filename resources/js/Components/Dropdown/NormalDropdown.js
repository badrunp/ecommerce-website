import { Link, usePage } from '@inertiajs/inertia-react';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react'

const variants = {
    hidden: {
        opacity: 0,
        y: 100,
        transition: {
            duration: .2
        }
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            damping: 30,
            stiffness: 300
        }
    }
}

function NormalDropdown({ listItem, isOpen = true, handleClose, to = 'left-0', width = "max-content", className = '', type = 'button', value = 5, query }) {
    const ref = useRef();
    const {url} = usePage()
    const urlLimit = url.indexOf(`?${query}=${value}`) != -1 ? url.replace(`?${query}=${value}`, '?') : url.indexOf(`&${query}=${value}`) !== -1 ? url.replace(`&${query}=${value}`, '') : url

    useEffect(() => {
        window.addEventListener('click', handleClick)

        return () => {
            window.removeEventListener('click', handleClick)
        }
    })

    const handleClick = (e) => {
        if (isOpen && !ref.current.contains(e.target)) {
            handleClose();
        }
    }

    return (
        <React.Fragment>
            <AnimatePresence>
                {isOpen && (
                    <motion.div variants={variants} initial="hidden" animate="visible" exit="hidden" className={`absolute top-0 mt-14 z-10 ${to}`} ref={ref}>
                        <div className={`bg-white shadow rounded py-1 overflow-hidden border border-gray-200 border-opacity-50 divide-y-2 divide-opacity-40 divide-gray-200 ${width}`}>
                            {
                                listItem.map((item, index) => {
                                    return (
                                        type === 'button' ? (
                                            <div key={index} className={`py-2 px-5 truncate text-gray-600 text-sm md:text-base hover:bg-gray-100 cursor-pointer transition duration-150 ease-in-out ${className}`}>{item.title}</div>
                                        ) : (
                                            <Link key={index} href={urlLimit.indexOf('?') !== -1 ? `${urlLimit}&${query}=${item.sort}` : `${urlLimit}?${query}=${item.sort}`} className={`block py-2 px-5 truncate text-gray-600 text-sm md:text-base hover:bg-gray-100 cursor-pointer transition duration-150 ease-in-out ${value == item.sort && 'bg-gray-100'} ${className}`}>{item.title}</Link>
                                        )
                                    )
                                })
                            }
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </React.Fragment>
    )
}

export default NormalDropdown