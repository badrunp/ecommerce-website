import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

const overlayVariants = {
    hidden: {
        opacity: 0,
        zIndex: 50
    },
    visible: {
        opacity: 1
    }
}

function Overlay({ width , min = 600, open, setOpen }) {
    return (
        <AnimatePresence exitBeforeEnter>
            {
                width < min && open && (
                    <motion.div variants={overlayVariants} initial="hidden" animate="visible" exit="hidden" onClick={() => setOpen(!open)} className="fixed w-full h-screen bg-gray-800 bg-opacity-50 top-0 left-0 bottom-0 right-0"></motion.div>
                )
            }
        </AnimatePresence>
    )
}

export default Overlay
