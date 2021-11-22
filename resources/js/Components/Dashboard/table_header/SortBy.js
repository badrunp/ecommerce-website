import ButtonDropdown from '@/Components/ButtonDropdown'
import NormalDropdown from '@/Components/Dropdown/NormalDropdown'
import { arrowVariants } from '@/Config/variants/sidebar'
import { motion } from 'framer-motion'
import React from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { IoListOutline } from 'react-icons/io5'
import lodash from 'lodash';

function SortBy({ queries, setIsDropdownSorting, isDropdownSorting, listDropdownSorting }) {
    return (
        <>
            <div className="relative">
                <ButtonDropdown handleClick={() => setIsDropdownSorting(!isDropdownSorting)}>
                    <span className="hidden lg:block text-xs lg:text-sm">Sort By : {queries && queries.sorting ? lodash.capitalize(queries.sorting) : 'Latest'}</span>
                    <span className="block lg:hidden"><IoListOutline className="h-4 w-4 lg:w-6 lg:h-6" /></span>
                    <motion.span variants={arrowVariants} custom={0} initial={false} animate={isDropdownSorting ? 'up' : 'down'} className="block"><IoIosArrowDown /></motion.span>
                </ButtonDropdown>
                <NormalDropdown type={{ name: 'link', is: 'sort' }} query="sorting" value={queries && queries.sorting ? queries.sorting : 'latest'} listItem={listDropdownSorting} isOpen={isDropdownSorting} handleClose={() => setIsDropdownSorting(false)} />
            </div>
        </>
    )
}

export default SortBy
