import ContainerComponent from '@/Components/ContainerComponent'
import SeacrhComponent from '@/Components/SearchComponent'
import { searchTableVariants } from '@/Config/variants/search'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

function SearchSm({queries,isOpenSearch,search, handleSearch, redirect = ''}) {
    return (
        <>
            <AnimatePresence>
                {
                    isOpenSearch && (
                        <motion.div variants={searchTableVariants} initial="hidden" animate="visible" exit="hidden">
                            <ContainerComponent className="block lg:hidden" rounded="rounded">
                                <SeacrhComponent redirect={redirect} query={queries.length === 0 ? {} : queries} value={search} handleChange={handleSearch} placeholder="Search for brands..." />
                            </ContainerComponent>
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </>
    )
}

export default SearchSm
