import ButtonDropdown from '@/Components/ButtonDropdown'
import ContainerComponent from '@/Components/ContainerComponent'
import LinkOutline from '@/Components/LinkOutline'
import SeacrhComponent from '@/Components/SearchComponent'
import Table from '@/Components/Table'
import Authenticated from '@/Layouts/Authenticated'
import React, { useEffect, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io';
import { IoCreateOutline } from 'react-icons/io5';
import { BiSearch } from 'react-icons/bi'
import ButtonRoundedHover from '@/Components/ButtonRoundedHover'
import NormalDropdown from '@/Components/Dropdown/NormalDropdown'
import { AnimatePresence, motion } from 'framer-motion'
import TableAction from '@/Components/TableAction'
import Pagination from '@/Components/Pagination'
import { listDropdownSorting, perPage } from '@/Config/menu/dashboard/category'
import { searchTableVariants } from '@/Config/variants/search'


function Category({ categories, queries = {} }) {

    const [isDropdownSorting, setIsDropdownSorting] = useState(false);
    const [isOpenSearch, setIsOpenSearch] = useState(false);
    const [isPerPage, setIsPerPage] = useState(false);
    const [search, setSearch] = useState(queries && queries.search ? queries.search : '');

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }


    return (
        <Authenticated headers={['Dashboard', 'Categories']}>
            <ContainerComponent className="mb-3">
                <div className="flex flex-row items-center justify-between space-x-5 md:space-x-8">
                    <div className="flex flex-row items-center space-x-2 md:space-x-4">
                        <div className="relative">
                            <ButtonDropdown handleClick={() => setIsDropdownSorting(!isDropdownSorting)}>
                                <span className="block text-xs md:text-base">Sorting</span>
                                <IoIosArrowDown />
                            </ButtonDropdown>
                            <NormalDropdown type={{ name: 'link', is: 'sort' }} query="sorting" value={queries && queries.sorting ? queries.sorting : 'latest'} listItem={listDropdownSorting} isOpen={isDropdownSorting} handleClose={() => setIsDropdownSorting(false)} />
                        </div>
                        <div className="relative">
                            <ButtonDropdown handleClick={() => setIsPerPage(!isPerPage)}>
                                <span className="block text-xs md:text-base">{queries && queries.limit ? queries.limit : 5}</span>
                                <IoIosArrowDown />
                            </ButtonDropdown>
                            <NormalDropdown type={{ name: 'link', is: 'sort' }} query="limit" value={queries && queries.limit ? queries.limit : 5} className="px-8" listItem={perPage} isOpen={isPerPage} handleClose={() => setIsPerPage(false)} />
                        </div>
                        <LinkOutline link={route('backend.categories.create')}>
                            <IoCreateOutline className="h-4 w-4 md:w-6 md:h-6" />
                        </LinkOutline>
                    </div>

                    <ButtonRoundedHover handleClick={() => setIsOpenSearch(!isOpenSearch)} className="block lg:hidden border border-gray-200" bgColor="bg-white hover:bg-gray-100">
                        <BiSearch className="h-4 w-4 md:w-6 md:h-6 text-gray-600" />
                    </ButtonRoundedHover>

                    <SeacrhComponent query={queries.length === 0 ? {} : queries} value={search} handleChange={handleSearch} placeholder="Search..." className="hidden lg:flex lg:justify-end lg:items-center" width="auto" />
                </div>
            </ContainerComponent>
            <AnimatePresence>
                {
                    isOpenSearch && (
                        <motion.div variants={searchTableVariants} initial="hidden" animate="visible" exit="hidden">
                            <ContainerComponent className="block lg:hidden" rounded="rounded">
                                <SeacrhComponent query={queries.length === 0 ? {} : queries} value={search} handleChange={handleSearch} placeholder="Search for categories..." />
                            </ContainerComponent>
                        </motion.div>
                    )
                }
            </AnimatePresence>
            <div className="bg-white relative w-full overflow-x-auto shadow rounded px-4 md:px-8 py-6 md:py-8">
                <Table columns={['Id', 'Name', 'Slug', 'Status', 'Action']} >
                    {
                        categories && categories.data.map((data, index) => {
                            const evenHoverClass = index % 2 == 1 ? 'bg-gray-50 bg-opacity-50' : 'bg-white'
                            return (
                                <Table.Tr key={data.id} evenHoverClass={evenHoverClass}>
                                    <Table.Td>{data.id}</Table.Td>
                                    <Table.Td>{data.name}</Table.Td>
                                    <Table.Td>{data.slug}</Table.Td>
                                    <Table.Td>{data.status}</Table.Td>
                                    <Table.Td>
                                        <TableAction data={data} />

                                    </Table.Td>
                                </Table.Tr>
                            )
                        })
                    }
                </Table>

                {
                    categories && categories.data.length > 0 && (
                        <Pagination items={categories} />
                    )
                }
            </div>
        </Authenticated>
    )
}

export default Category
