import ButtonRoundedHover from '@/Components/ButtonRoundedHover'
import SeacrhComponent from '@/Components/SearchComponent'
import Table from '@/Components/Table'
import Authenticated from '@/Layouts/Authenticated'
import React from 'react'

function Category({ categories }) {
    return (
        <Authenticated>
            <div className="bg-white relative w-full shadow rounded px-4 md:px-8 py-3 md:py-6 mb-3">
                <div className="flex flex-row items-center justify-between space-x-5 md:space-x-8">
                    <div className="flex flex-row items-center space-x-3">
                        <div className="relative">
                            <button type="button" className="px-4 md:px-7 py-2 text-sm md:text-base text-gray-600 rounded md:rounded-md border border-gray-300 focus:outline-none">
                                Sorting BY
                            </button>
                        </div>
                    </div>

                    <SeacrhComponent placeholder="Search for categories..." />
                </div>
            </div>
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
