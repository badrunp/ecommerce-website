import Button from '@/Components/Button'
import ContainerComponent from '@/Components/ContainerComponent'
import ErrorMessage from '@/Components/ErrorMessage'
import Input from '@/Components/Input'
import Label from '@/Components/Label'
import Authenticated from '@/Layouts/Authenticated'
import { useForm } from '@inertiajs/inertia-react'
import React from 'react'

function Create() {

    const { data, setData, post, errors } = useForm({
        name: '',
        slug: '',
        image: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('backend.categories.store'));
    }

    return (
        <Authenticated>
            <ContainerComponent className="w-full md:w-1/2">
                <div className="py-4">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <Label forInput="name" value="Name" />

                            <Input type="text" name="name" className="mt-2 block w-full" handleChange={(e) => setData('name', e.target.value)} />

                            {errors.name && (
                                <ErrorMessage error={errors.name} />
                            )}
                        </div>

                        <div className="mt-6">
                            <Label forInput="slug" value="Slug" />

                            <Input type="text" name="slug" className="mt-2 block w-full" handleChange={(e) => setData('slug', e.target.value)} />

                            {errors.slug && (
                                <ErrorMessage error={errors.slug} /> 
                            )}
                        </div>

                        <div className="mt-6">
                            <Label forInput="image" value="Image" />

                            <Input type="file" name="image" className="mt-2 block w-full" handleChange={(e) => setData('image', e.target.files[0])} />

                            {errors.image && (
                                <ErrorMessage error={errors.image} />
                            )}
                        </div>

                        <div className="mt-6">
                            <Button className="bg-gradient-to-br from-blue-500 to-blue-600 focus:ring-2 focus:ring-blue-300">Create</Button>
                        </div>
                    </form>
                </div>
            </ContainerComponent>
        </Authenticated>
    )
}

export default Create
