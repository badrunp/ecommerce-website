import ButtonRoundedHover from '@/Components/ButtonRoundedHover'
import SeacrhComponent from '@/Components/SearchComponent'
import React from 'react'
import { BiSearch } from 'react-icons/bi'
import { IoCloseCircle } from 'react-icons/io5'

function SearchLg({ queries, search, setIsOpenSearch, isOpenSearch, handleSearch, redirect = '' }) {
    return (
        <>
            <ButtonRoundedHover handleClick={() => setIsOpenSearch(!isOpenSearch)} className="block lg:hidden border border-gray-200" bgColor="bg-white hover:bg-gray-100">
                {
                    isOpenSearch ? (
                        <IoCloseCircle className="h-4 w-4 md:w-6 md:h-6 text-gray-600" />
                    ) : (
                        <BiSearch className="h-4 w-4 md:w-6 md:h-6 text-gray-600" />
                    )
                }
            </ButtonRoundedHover>

            <SeacrhComponent redirect={redirect} query={queries.length === 0 ? {} : queries} value={search} handleChange={handleSearch} placeholder="Search..." className="hidden lg:flex lg:justify-end lg:items-center" width="auto" />
        </>
    )
}

export default SearchLg
