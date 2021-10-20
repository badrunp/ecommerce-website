import React from 'react'

function Table({ columns, children }) {
    return (
        <table className="table-auto w-full h-auto bg-white">
            <thead>
                <tr className="bg-gray-100">
                    {
                        columns && columns.map((column, index) => {
                            const wColumnId = column === 'No' || column === 'Id' || column == 'Action' ? 'w-24' : ''
                            return (
                                <th key={index} className={`relative py-2 md:py-3 px-6 text-gray-600 text-sm md:text-base ${wColumnId}`}>{column}</th>
                            )
                        })
                    }
                </tr>
            </thead>
            <tbody className="divide-y-2 divide-gray-100">
                {children}
            </tbody>
        </table>
    )
}

Table.Td = ({children, className = '', ...props}) => {
    return <td {...props} className={`relative py-2 md:py-3 px-6 text-gray-600 text-sm md:text-base ${className}`}>{children}</td>
}

Table.Tr = ({children, evenHoverClass = ''}) => {
    return <tr className={`${evenHoverClass} hover:bg-gray-50`}>{children}</tr>
}


export default Table
