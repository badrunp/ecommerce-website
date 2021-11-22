import ButtonDropdown from '@/Components/ButtonDropdown'
import NormalDropdown from '@/Components/Dropdown/NormalDropdown'
import { arrowVariants } from '@/Config/variants/sidebar'
import { motion } from 'framer-motion'
import React from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { IoListOutline } from 'react-icons/io5'

function LimitPage({ queries, setIsPerPage, isPerPage, perPage }) {
    return (
        <>
            <div className="relative">
                <ButtonDropdown handleClick={() => setIsPerPage(!isPerPage)}>
                    <span className="hidden lg:block text-xs lg:text-sm">Limit : {queries && queries.limit ? queries.limit : 10}</span>
                    <span className="block lg:hidden"><IoListOutline className="h-4 w-4 lg:w-6 lg:h-6" /></span>
                    <motion.span variants={arrowVariants} custom={0} initial={false} animate={isPerPage ? 'up' : 'down'} className="block"><IoIosArrowDown  /></motion.span>
                </ButtonDropdown>
                <NormalDropdown type={{ name: 'link', is: 'sort' }} query="limit" value={queries && queries.limit ? queries.limit : 10} className="px-8" listItem={perPage} isOpen={isPerPage} handleClose={() => setIsPerPage(false)} />
            </div>
        </>
    )
}

export default LimitPage
