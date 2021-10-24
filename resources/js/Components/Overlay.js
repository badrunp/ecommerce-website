import { overlayVariants } from '@/Config/variants/overlay'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'


function Overlay({ width = window.outerWidth, min = window.outerWidth, open, setOpen, zIndex = 50 }) {
    return (
        <AnimatePresence exitBeforeEnter>
            {
                width <= min && open && (
                    <motion.div variants={overlayVariants} custom={zIndex} initial="hidden" animate="visible" exit="hidden" onClick={() => setOpen(!open)} className={`fixed w-full h-screen bg-gray-800 bg-opacity-50 top-0 left-0 bottom-0 right-0`}></motion.div>
                )
            }
        </AnimatePresence>
    )
}

export default Overlay
