import Button from '@/Components/Button'
import ContainerComponent from '@/Components/ContainerComponent'
import ErrorMessage from '@/Components/ErrorMessage'
import Input from '@/Components/Input'
import Label from '@/Components/Label'
import Authenticated from '@/Layouts/Authenticated'
import { useForm } from '@inertiajs/inertia-react'
import React from 'react'
import { IoCreateOutline } from 'react-icons/io5'

function Edit({size}) {
    const { data, setData, post, errors } = useForm({
        name: size.name,
    })


    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('backend.sizes.sizeUpdate', size));
    }

    const headers = [
        'Dashboard',
        'Sizes',
        <IoCreateOutline className="h-4 w-4 md:w-5 md:h-5" />
        
    ]

    return (
        <Authenticated headers={headers} title="Dashboard | Edit Size">
            <ContainerComponent className="w-full md:max-w-xl">
                <div className="py-4">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <Label forInput="name" value="Name" />

                            <Input type="text" name="name" value={data.name} className="mt-2 block w-full" handleChange={(e) => setData('name', e.target.value)} />

                            {errors.name && (
                                <ErrorMessage error={errors.name} />
                            )}
                        </div>

                        <div className="mt-6">
                            <Label forInput="slug" value="Slug" />

                            <Input type="text" name="slug" value={data.name} className="mt-2 block w-full" readOnly disabled />

                            {errors.slug && (
                                <ErrorMessage error={errors.slug} /> 
                            )}
                        </div>

                        <div className="mt-6">
                            <Button className="bg-gradient-to-br from-blue-500 to-blue-600 focus:ring-2 focus:ring-blue-300">Edit</Button>
                        </div>
                    </form>
                </div>
            </ContainerComponent>
        </Authenticated>
    )
}

export default Edit
