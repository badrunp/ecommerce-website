import Button from '@/Components/Button'
import ContainerComponent from '@/Components/ContainerComponent'
import ErrorMessage from '@/Components/ErrorMessage'
import Input from '@/Components/Input'
import Label from '@/Components/Label'
import SelectInput from '@/Components/SelectInput'
import Textarea from '@/Components/Textarea'
import { colourStyles } from '@/Config/react_select/config'
import Authenticated from '@/Layouts/Authenticated'
import { useForm } from '@inertiajs/inertia-react'
import React from 'react'
import { IoCreateOutline } from 'react-icons/io5'
import Select from 'react-select';

function Create({ categories, sizes, colors }) {

    const { data, setData, post, errors } = useForm({
        name: '',
        regular_price: '',
        sale_price: '',
        quantity: '',
        description: '',
        sumary: '',
        category_id: '',
        sizes: [],
        colors: []
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('backend.show.store'));
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
            title: <IoCreateOutline className="h-4 w-4 md:w-5 md:h-5" />,
            url: route('backend.brands.create')
        }
    ]

    return (
        <Authenticated headers={headers} title="Dashboard | Create Products">
            <ContainerComponent className="w-full">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
                        <div className="py-4">
                            <div>
                                <Label forInput="name" value="Name" />

                                <Input type="text" value={data.name} className="mt-2 block w-full" handleChange={(e) => setData('name', e.target.value)} />

                                {errors.name && (
                                    <ErrorMessage error={errors.name} />
                                )}
                            </div>

                            <div className="mt-6">
                                <Label forInput="slug" value="Slug" />

                                <Input type="text" value={data.name} className="mt-2 block w-full" readOnly disabled />

                                {errors.slug && (
                                    <ErrorMessage error={errors.slug} />
                                )}
                            </div>

                            <div className="mt-6">
                                <Label forInput="price" value="Price" />

                                <Input type="text" value={data.regular_price} className="mt-2 block w-full" id="price" handleChange={(e) => setData('regular_price', e.target.value)} />

                                {errors.regular_price && (
                                    <ErrorMessage error={errors.regular_price} />
                                )}
                            </div>

                            <div className="mt-6">
                                <Label forInput="sale_price" value="Sale Price" />

                                <Input type="text" value={data.sale_price} className="mt-2 block w-full" id="sale_price" handleChange={(e) => setData('sale_price', e.target.value)} />

                                {errors.sale_price && (
                                    <ErrorMessage error={errors.sale_price} />
                                )}
                            </div>

                            <div className="mt-6">
                                <Label forInput="stock" value="Stock" />

                                <Input type="text" value={data.quantity} className="mt-2 block w-full" id="stock" handleChange={(e) => setData('quantity', e.target.value)} />

                                {errors.quantity && (
                                    <ErrorMessage error={errors.quantity} />
                                )}
                            </div>

                        </div>
                        <div className="py-4">

                            <div>
                                <Label forInput="category_id" value="Category" />

                                <SelectInput value={data.category_id} items={categories} className="mt-2 block w-full" id="category_id" handleChange={(e) => setData('category_id', e.target.value)} />

                                {errors.category_id && (
                                    <ErrorMessage error={errors.category_id} />
                                )}
                            </div>

                            <div className="mt-6">
                                <Label forInput="sizes" value="Sizes" className="mb-2" />

                                <Select
                                    defaultValue={data.sizes}
                                    onChange={(data) => setData('sizes', data.map(d => d.value))}
                                    isMulti
                                    name="sizes"
                                    options={sizes && sizes}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                />
                                {errors.sizes && (
                                    <ErrorMessage error={errors.sizes} />
                                )}
                            </div>

                            <div className="mt-6">
                                <Label forInput="colors" value="Colors" className="mb-2" />

                                <Select
                                    defaultValue={data.colors}
                                    onChange={(data) => setData('colors', data.map(d => d.value))}
                                    isMulti
                                    name="colors"
                                    options={colors && colors}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    styles={colourStyles}
                                />
                                {errors.colors && (
                                    <ErrorMessage error={errors.colors} />
                                )}
                            </div>

                            <div className="mt-6">
                                <Label forInput="description" value="Description" />

                                <Textarea type="text" value={data.description} className="mt-2 block w-full" id="description" handleChange={(e) => setData('description', e.target.value)} />

                                {errors.description && (
                                    <ErrorMessage error={errors.description} />
                                )}
                            </div>

                            <div className="mt-6">
                                <Label forInput="sumary" value="Sumary" />

                                <Textarea type="text" value={data.sumary} className="mt-2 block w-full" id="sumary" handleChange={(e) => setData('sumary', e.target.value)} />

                                {errors.sumary && (
                                    <ErrorMessage error={errors.sumary} />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="mt-6">
                        <Button className="bg-gradient-to-br from-blue-500 to-blue-600 focus:ring-2 focus:ring-blue-300">Create</Button>
                    </div>
                </form>
            </ContainerComponent>
        </Authenticated>
    )
}

export default Create
