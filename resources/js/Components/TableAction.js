import React, { useState } from 'react'
import { Link } from '@inertiajs/inertia-react';
import { HiDotsHorizontal } from 'react-icons/hi'
import { IoCreateOutline } from 'react-icons/io5';
import ButtonRoundedHover from './ButtonRoundedHover'
import { RiDeleteBin6Line } from 'react-icons/ri'
import NormalDropdown from './Dropdown/NormalDropdown';
import Overlay from './Overlay';
import Button from './Button';
import ModalComponent from './Modal';
import { Inertia } from '@inertiajs/inertia';


function TableAction({ data }) {
    const [isOpen, setIsOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = (e) => {
        e.preventDefault();
        setOpenModal(true)
    }
    
    const handleDelete = (e) => {
        e.preventDefault();
        Inertia.delete(route('backend.categories.destroy', data));
    }

    const lists = [
        {
            title: (<Link href={route('backend.categories.edit', data)} className="flex items-center space-x-2"><IoCreateOutline className="w-5 h-5" /><span className="block">Edit</span></Link>),
            button: false
        },
        {
            title: (<span className="w-full flex items-center space-x-2"><RiDeleteBin6Line className="w-5 h-5" /><span className="block">Delete</span></span>),
            button: true
        }
    ];
    return (
        <React.Fragment>
            <ButtonRoundedHover handleClick={() => setIsOpen(!isOpen)} bgColor="bg-transparent hover:bg-gray-100">
                <HiDotsHorizontal className="w-6 h-6 text-gray-600" />
            </ButtonRoundedHover>

            <NormalDropdown width="w-36" isOpen={isOpen} clickButton={handleOpenModal} listItem={lists} to="right-0" handleClose={() => setIsOpen(false)} />

            <ModalComponent open={openModal}>
                <div className="py-6 w-full text-center flex flex-col items-center space-y-4">
                    <div className="text-gray-600 text-base lg:text-lg font-semibold">
                        <h4 className="block">Are you sure?</h4>
                    </div>
                    <div className="flex flex-row items-center justify-center space-x-4">
                        <Button handleClick={() => setOpenModal(false)} className="bg-yellow-500 focus:ring-2 ring-yellow-300 focus:ring-offset-1">Cancel</Button>
                        <Button handleClick={handleDelete} className="bg-red-500 focus:ring-2 ring-red-300 focus:ring-offset-1">Delete</Button>
                    </div>
                </div>
            </ModalComponent>

            <Overlay open={openModal} setOpen={setOpenModal} zIndex={100} />
        </React.Fragment>
    )
}

export default TableAction
