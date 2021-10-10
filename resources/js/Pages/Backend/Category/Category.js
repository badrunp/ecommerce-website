import Table from '@/Components/Table'
import Authenticated from '@/Layouts/Authenticated'
import React from 'react'

function Category({ categories }) {
    return (
        <Authenticated>
            <div className="bg-white relative w-full overflow-x-auto shadow rounded px-4 md:px-8 py-6 md:py-8">
                <Table columns={['Id', 'Name', 'Slug', 'Status', 'Action']} >
                    {
                        categories && categories.data.map((data, index) => {
                            const even = index % 2 == 1 ? 'bg-gray-50 bg-opacity-50' : 'bg-white'
                            return (
                                <tr key={data.id} className={`${even} hover:bg-gray-50`}>
                                    <td className="relative py-2 md:py-3 px-6 text-gray-600 text-base">{data.id}</td>
                                    <td className="relative py-2 md:py-3 px-6 text-gray-600 text-base">{data.name}</td>
                                    <td className="relative py-2 md:py-3 px-6 text-gray-600 text-base">{data.slug}</td>
                                    <td className="relative py-2 md:py-3 px-6 text-gray-600 text-base">{data.status}</td>
                                    <td className="relative py-2 md:py-3 px-6 text-gray-600 text-base">action</td>
                                </tr>
                            )
                        })
                    }
                </Table>
            </div>
        </Authenticated>
    )
}

export default Category
