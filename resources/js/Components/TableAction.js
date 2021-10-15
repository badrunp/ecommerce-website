import { Link } from '@inertiajs/inertia-react';
import React, { useState } from 'react'
import { HiDotsHorizontal } from 'react-icons/hi'
import { IoCreateOutline } from 'react-icons/io5';
import ButtonRoundedHover from './ButtonRoundedHover'
import {RiDeleteBin6Line} from 'react-icons/ri'
import NormalDropdown from './Dropdown/NormalDropdown';


function TableAction({data}) {
    const [isOpen, setIsOpen] = useState(false);

    const lists = [
        {
            title:  (<Link href={route('backend.categories.edit', data)} className="flex items-center space-x-2"><IoCreateOutline className="w-5 h-5" /><span className="block">Edit</span></Link>)
        },
        {
            title: (<Link href={route('backend.categories.destroy', data)} method="DELETE" className="flex items-center space-x-2"><RiDeleteBin6Line className="w-5 h-5" /><span className="block">Delete</span></Link>)
        }
    ];
    return (
        <React.Fragment>
            <ButtonRoundedHover handleClick={() => setIsOpen(!isOpen)} bgColor="bg-transparent hover:bg-gray-100">
                <HiDotsHorizontal className="w-6 h-6 text-gray-600" />
            </ButtonRoundedHover>

            <NormalDropdown width="w-32" isOpen={isOpen} listItem={lists} to="right-0" handleClose={() => setIsOpen(false)} />
        </React.Fragment>
    )
}

export default TableAction
