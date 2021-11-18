import React, { useEffect } from 'react';
import Button from '@/Components/Button';
import Checkbox from '@/Components/Checkbox';
import Guest from '@/Layouts/Guest';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import ErrorMessage from '@/Components/ErrorMessage';
import { useAnimation } from 'framer-motion';
import Resize from '@/Hooks/Resize';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: '',
    });

    const { width } = Resize();

    const inputEmail = useAnimation();
    const inputPassword = useAnimation();

    useEffect(() => {
        return () => {
            reset('password');
        };

    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('login',), {
            preserveScroll: true,
            onError: (error) => {
                if (width > 599) {
                    if (error.email) {
                        inputEmail.start({ x: [50, -50, 50, -50, 50, 0] })
                    }

                    if (error.password) {
                        inputPassword.start({ x: [50, -50, 50, -50, 50, 0] })
                    }
                }
            }
        });


    };

    return (
        <Guest>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <h1 className="md:font-semibold text-gray-100 md:text-gray-800 mb-6 text-lg md:text-2xl">Sign in to your account</h1>

            <form onSubmit={submit}>
                <div>
                    <Label forInput="email" value="Email" layout="guest" />

                    <Input
                        type="text"
                        name="email"
                        value={data.email}
                        className="mt-2 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        isError={errors.email}
                        handleChange={onHandleChange}
                        layout="guest"
                        animate={inputEmail}
                        transition={{ type: 'spring', duration: .5 }}
                    />

                    {errors.email && (
                        <ErrorMessage error={errors.email} />
                    )}
                </div>

                <div className="mt-6">
                    <Label forInput="password" value="Password" layout="guest" />

                    <Input
                        type="password"
                        name="password"
                        value={data.password}
                        className={`mt-2 block w-full`}
                        isError={errors.password}
                        autoComplete="current-password"
                        handleChange={onHandleChange}
                        layout="guest"
                        animate={inputPassword}
                        transition={{ type: 'spring', duration: .5 }}
                    />

                    {errors.password && (
                        <ErrorMessage error={errors.password} />
                    )}

                </div>

                <div className="mt-6 flex items-center justify-between">
                    <label className="flex items-center">
                        <Checkbox name="remember" value={data.remember} handleChange={onHandleChange} />

                        <span className="ml-2 text-sm text-white md:text-gray-600 font-semibold">Remember me</span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-sm md:text-base text-blue-600 font-semibold"
                        >
                            Forgot your password?
                        </Link>
                    )}
                </div>

                <div className="mt-6">
                    <Button className="bg-gradient-to-br from-blue-500 to-blue-600 focus:ring-2 focus:ring-blue-300" processing={processing}>
                        Log in
                    </Button>
                </div>

                <div className="mt-6">
                    <span className="text-base text-gray-100 md:text-gray-800 md:font-semibold">
                        Don't have an account?
                        <Link href={route('register')} className="text-blue-600 ml-2 font-semibold underline">
                            Register
                        </Link>
                    </span>
                </div>
            </form>
        </Guest>
    );
}
