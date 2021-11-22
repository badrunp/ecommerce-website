import ContainerComponent from '@/Components/ContainerComponent'
import LinkOutline from '@/Components/LinkOutline'
import Table from '@/Components/Table'
import Authenticated from '@/Layouts/Authenticated'
import React, { useState } from 'react'
import { IoCreateOutline } from 'react-icons/io5';
import TableAction from '@/Components/TableAction'
import Pagination from '@/Components/Pagination'
import { listDropdownSorting, perPage } from '@/Config/menu/dashboard/app'
import LimitPage from '@/Components/Dashboard/table_header/LimitPage'
import SortBy from '@/Components/Dashboard/table_header/SortBy'
import SearchSm from '@/Components/Dashboard/table_header/SearchSm'
import SearchLg from '@/Components/Dashboard/table_header/SearchLg'

const fieldTable = ['Id', 'Name', 'Status', 'Action'];


function Category({ categories, queries = {} }) {

    const [isDropdownSorting, setIsDropdownSorting] = useState(false);
    const [isOpenSearch, setIsOpenSearch] = useState(false);
    const [isPerPage, setIsPerPage] = useState(false);
    const [search, setSearch] = useState(queries && queries.search ? queries.search : '');

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    const headers = [
        {
            title: 'Dashboard',
            url: route('backend.dashboard')
        },
        {
            title: 'Products',
            url: route('backend.products.index')
        },
        {
            title: 'Categories',
            url: route('backend.categories.index')
        }
    ]

    return (
        <Authenticated headers={headers} title="Dashboard | Categories">
            <ContainerComponent className="mb-3">
                <div className="flex flex-row items-center justify-between space-x-5 md:space-x-8">
                    <div className="flex flex-row items-center space-x-2 md:space-x-4">
                        <SortBy
                            queries={queries}
                            isDropdownSorting={isDropdownSorting}
                            setIsDropdownSorting={setIsDropdownSorting}
                            listDropdownSorting={listDropdownSorting}
                        />

                        <LimitPage
                            queries={queries}
                            isPerPage={isPerPage}
                            setIsPerPage={setIsPerPage}
                            perPage={perPage}
                        />

                        <LinkOutline link={route('backend.categories.create')}>
                            <IoCreateOutline className="h-4 w-4 md:w-6 md:h-6" />
                        </LinkOutline>
                    </div>

                    <SearchLg
                        queries={queries}
                        isOpenSearch={isOpenSearch}
                        setIsOpenSearch={setIsOpenSearch}
                        search={search}
                        handleSearch={handleSearch}
                        redirect="categories"
                    />
                </div>
            </ContainerComponent>

            <SearchSm
                queries={queries}
                isOpenSearch={isOpenSearch}
                search={search}
                handleSearch={handleSearch}
                redirect="categories"
            />

            <div className="bg-white relative w-full overflow-x-auto shadow rounded px-4 md:px-8 py-6 md:py-8">
                <Table columns={fieldTable} >
                    {
                        categories && categories.data.length > 0 ? categories.data.map((data, index) => {
                            const evenHoverClass = index % 2 == 1 ? 'bg-gray-50 bg-opacity-50' : 'bg-white'
                            return (
                                <Table.Tr key={data.id} evenHoverClass={evenHoverClass}>
                                    <Table.Td>{index + categories.from}</Table.Td>
                                    <Table.Td>{data.name}</Table.Td>
                                    <Table.Td>
                                        {
                                            data.status === 'active' ? (
                                                <span className="block text-sm md:text-base tracking-tighter font-semibold text-green-500">[Active]</span>
                                            ) : (
                                                <span className="block text-sm md:text-base tracking-tighter font-semibold text-red-500">[Un Active]</span>
                                            )
                                        }
                                    </Table.Td>
                                    <Table.Td>
                                        <TableAction data={data} model="categories" />
                                    </Table.Td>
                                </Table.Tr>
                            )
                        }) : (
                            <>
                                <Table.Tr>
                                    <Table.Td colSpan={fieldTable.length} className="text-center">{queries && queries.search ? (<span className="inline-block">Categories <span className="inline-block font-semibold">{` ${queries.search} `}</span> not found!</span>) : 'Categories is empty!'}</Table.Td>
                                </Table.Tr>
                            </>
                        )
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
