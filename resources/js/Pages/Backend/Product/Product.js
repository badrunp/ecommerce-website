import ContainerComponent from '@/Components/ContainerComponent'
import LinkOutline from '@/Components/LinkOutline'
import Table from '@/Components/Table'
import Authenticated from '@/Layouts/Authenticated'
import React, { useState } from 'react'
import { IoCreateOutline } from 'react-icons/io5';
import TableAction from '@/Components/TableAction'
import Pagination from '@/Components/Pagination'
import { listDropdownSorting, perPage } from '@/Config/menu/dashboard/app'
import SortBy from '@/Components/Dashboard/table_header/SortBy'
import LimitPage from '@/Components/Dashboard/table_header/LimitPage'
import SearchLg from '@/Components/Dashboard/table_header/SearchLg'
import SearchSm from '@/Components/Dashboard/table_header/SearchSm'
import { usePage } from '@inertiajs/inertia-react'

const fieldTable = ['Id', 'Name', 'Category', 'Stock', 'Status', 'Action'];

function Product({ products, queries = {} }) {

    const [isDropdownSorting, setIsDropdownSorting] = useState(false);
    const [isOpenSearch, setIsOpenSearch] = useState(false);
    const [isPerPage, setIsPerPage] = useState(false);
    const [search, setSearch] = useState(queries && queries.search ? queries.search : '');

    const { session: { message } } = usePage().props;

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    return (
        <Authenticated headers={['Dashboard', 'Products']} title="Dashboard | Products">
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

                        <LinkOutline link={route('backend.products.create')}>
                            <IoCreateOutline className="h-4 w-4 md:w-6 md:h-6" />
                        </LinkOutline>
                    </div>

                    <SearchLg
                        queries={queries}
                        isOpenSearch={isOpenSearch}
                        setIsOpenSearch={setIsOpenSearch}
                        search={search}
                        handleSearch={handleSearch}
                        redirect="products"
                    />
                </div>
            </ContainerComponent>

            <SearchSm
                queries={queries}
                isOpenSearch={isOpenSearch}
                search={search}
                handleSearch={handleSearch}
                redirect="products"
            />

            <div className="bg-white relative w-full overflow-x-auto overflow-y-hidden shadow rounded px-4 md:px-8 py-6 md:py-8">
                <Table columns={fieldTable} >
                    {
                        products && products.data.length > 0 ? products.data.map((data, index) => {
                            const evenHoverClass = index % 2 == 1 ? 'bg-gray-50 bg-opacity-50' : 'bg-white'
                            return (
                                <Table.Tr key={data.id} evenHoverClass={evenHoverClass}>
                                    <Table.Td>{index + products.from}</Table.Td>
                                    <Table.Td>{data.name}</Table.Td>
                                    <Table.Td>{data.category.name}</Table.Td>
                                    <Table.Td>{data.quantity}</Table.Td>
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
                                        <TableAction data={data} model="products" />
                                    </Table.Td>
                                </Table.Tr>
                            )
                        }) : (
                            <>
                                <Table.Tr>
                                    <Table.Td colSpan={fieldTable.length} className="text-center">{queries && queries.search ? (<span className="inline-block">Products <span className="inline-block font-semibold">{` ${queries.search} `}</span> not found!</span>) : 'Products is empty!'}</Table.Td>
                                </Table.Tr>
                            </>
                        )
                    }
                </Table>

                {
                    products && products.data.length > 0 && (
                        <Pagination items={products} />
                    )
                }
            </div>
        </Authenticated>
    )
}

export default Product
