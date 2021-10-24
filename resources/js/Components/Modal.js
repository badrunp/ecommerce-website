import { modalVariants } from '@/Config/variants/modal'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

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
