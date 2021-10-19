import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

const modalVariants = {
    hidden: {
        opacity: 0,
        y: -100,
        x: '-50%'
    },
    visible: {
        opacity: 1,
        y: 0,
        x: '-50%',
        transition: {
            type: 'spring',
            damping: 30,
            stiffness: 600
        }
    },
    exit: {
        opacity: 0,
        y: -300,
        transition: {
            type: 'tween'
        }
    }
}

function ModalComponent({ children, open, width = 'w-72 md:w-80' }) {
    return (
        <AnimatePresence>
            {
                open && (
                    <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit" className="modal fixed top-24 left-1/2 transform -translate-x-1/2" style={{ zIndex: 110 }}>
                        <div className={`bg-white ring-2 ring-gray-200 rounded py-1 ${width}`}>
                            {children}
                        </div>
                    </motion.div>
                )
            }
        </AnimatePresence>
    )
}

export default ModalComponent
