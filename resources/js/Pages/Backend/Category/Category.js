import ButtonDropdown from '@/Components/ButtonDropdown'
import ButtonOutline from '@/Components/ButtonOutline'
import ContainerComponent from '@/Components/ContainerComponent'
import LinkOutline from '@/Components/LinkOutline'
import SeacrhComponent from '@/Components/SearchComponent'
import Table from '@/Components/Table'
import Authenticated from '@/Layouts/Authenticated'
import React from 'react'
import { IoIosArrowDown } from 'react-icons/io';


function Category({ categories }) {
    return (
        <Authenticated>
            <ContainerComponent className="mb-3">
                <div className="flex flex-row items-center justify-between space-x-5 md:space-x-8">
                    <div className="flex flex-row items-center space-x-3">
                        <div className="relative">
                            <ButtonDropdown>
                                <span className="block">Category Shorting</span>
                                <IoIosArrowDown />
                            </ButtonDropdown>
                        </div>
                    </div>

                    <SeacrhComponent placeholder="Search for categories..." />

                    <LinkOutline link={route('backend.categories.create')}>
                        Create Category
                    </LinkOutline>
                </div>
            </ContainerComponent>
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
                                    <Table.Td>{'Action'}</Table.Td>
                                </Table.Tr>
                            )
                        })
                    }
                </Table>
            </div>
        </Authenticated>
    )
}

export default Category
