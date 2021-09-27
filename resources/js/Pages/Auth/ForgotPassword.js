import React from 'react';
import Button from '@/Components/Button';
import Guest from '@/Layouts/Guest';
import Input from '@/Components/Input';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, useForm } from '@inertiajs/inertia-react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <Guest>
            <Head title="Forgot Password" />

            <h1 className="md:font-semibold text-gray-600 md:text-gray-800 mb-6 text-lg md:text-2xl">Reset your password</h1>

            <div className="mb-6 text-sm text-gray-600 leading-normal">
            Enter the email address associated with your account and we'll send you a link to reset your password.
            </div>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <ValidationErrors   errors={errors} />

            <form onSubmit={submit}>

                <Input
                    type="text"
                    name="email"
                    value={data.email}
                    className="mt-2 block w-full"
                    isFocused={true}
                    handleChange={onHandleChange}
                />

                <div className="flex items-center justify-end mt-6">
                    <Button className="ml-4 bg-gradient-to-br from-blue-500 to-blue-600 focus:ring-2 focus:ring-blue-300" processing={processing}>
                        Email Password Reset Link
                    </Button>
                </div>
            </form>
        </Guest>
    );
}
