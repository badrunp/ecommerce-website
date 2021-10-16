import { dropdownVariants } from '@/Config/variants/dropdown';
import { Link, usePage } from '@inertiajs/inertia-react';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef } from 'react'

function NormalDropdown({ listItem, isOpen = true, handleClose, to = 'left-0', width = "max-content", className = '', type = {name: 'button', is: 'button'}, value = 5, query = '' }) {
    const ref = useRef();
    const {url} = usePage()
    const path = url.indexOf(`?${query}=${value}`) != -1 ? url.replace(`?${query}=${value}`, '?') : url.indexOf(`&${query}=${value}`) !== -1 ? url.replace(`&${query}=${value}`, '') : url

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
                    <motion.div variants={dropdownVariants} initial="hidden" animate="visible" exit="hidden" className={`absolute top-0 mt-11 md:mt-14 z-10 ${to}`} ref={ref}>
                        <div className={`bg-white shadow rounded py-1 overflow-hidden border border-gray-200 border-opacity-50 divide-y-2 divide-opacity-40 divide-gray-200 ${width}`}>
                            {
                                listItem.map((item, index) => {
                                    let href;
                                    if(type.name === 'link'){
                                        if(type.is === 'sort'){
                                            href = path.indexOf('?') !== -1 ? `${path}&${query}=${item.sort}` : `${path}?${query}=${item.sort}`
                                        }else if(type.is === 'url'){
                                            href = '/';
                                        }
                                    }
                                    return (
                                        type.name === 'button' ? (
                                            <button key={index} className={`block py-2 w-full px-5 truncate text-gray-600 text-sm md:text-base hover:bg-gray-100 cursor-pointer transition duration-150 ease-in-out ${className}`}>{item.title}</button>
                                        ) : (
                                            <Link key={index} href={href} className={`block py-2 px-5 truncate text-sm md:text-base cursor-pointer transition duration-150 ease-in-out ${type.is === 'sort' ? value == item.sort ? 'bg-blue-500 text-white hover:bg-blue-600' : 'hover:bg-gray-100 text-gray-600' : 'hover:bg-gray-100 text-gray-600'} ${className}`}>{item.title}</Link>
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
