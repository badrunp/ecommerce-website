import React, { useEffect } from 'react';
import Button from '@/Components/Button';
import Guest from '@/Layouts/Guest';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import Checkbox from '@/Components/Checkbox';
import ErrorMessage from '@/Components/ErrorMessage';
import { useAnimation } from 'framer-motion';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const inputName = useAnimation();
    const inputEmail = useAnimation();
    const inputPassword = useAnimation();

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            preserveScroll: true,
            onError: (error) => {

                if (error.name) {
                    inputName.start({ x: [50,-50,50,-50, 50, 0] })
                }

                if (error.email) {
                    inputEmail.start({ x: [50,-50,50,-50, 50, 0] })
                }
                
                if(error.password){
                    inputPassword.start({ x: [50,-50,50,-50, 50, 0] })
                }
            }
        });
    };

    return (
        <Guest>
            <Head title="Register" />

            <h1 className="md:font-semibold text-gray-100 md:text-gray-800 mb-6 text-lg md:text-2xl">Create your account</h1>


            <form onSubmit={submit}>
                <div>
                    <Label forInput="name" value="Name" layout="guest" />

                    <Input
                        type="text"
                        name="name"
                        value={data.name}
                        className="mt-2 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        handleChange={onHandleChange}
                        isError={errors.name}
                        layout="guest"
                        animate={inputName}
                        transition={{type: 'spring', duration: .5}}
                    />

                    {errors.name && (
                        <ErrorMessage error={errors.name} />
                    )}
                </div>

                <div className="mt-6">
                    <Label forInput="email" value="Email" layout="guest" />

                    <Input
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-2 block w-full"
                        autoComplete="username"
                        handleChange={onHandleChange}
                        isError={errors.email}
                        layout="guest"
                        animate={inputEmail}
                        transition={{type: 'spring', duration: .5}}
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
                        className="mt-2 block w-full"
                        autoComplete="new-password"
                        handleChange={onHandleChange}
                        isError={errors.password}
                        layout="guest"
                        animate={inputPassword}
                        transition={{type: 'spring', duration: .5}}
                    />

                    {errors.password && (
                        <ErrorMessage error={errors.password} />
                    )}
                </div>

                <div className="mt-6">
                    <Label forInput="password_confirmation" value="Confirm Password" layout="guest" />

                    <Input
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-2 block w-full"
                        handleChange={onHandleChange}
                        layout="guest"
                    />
                </div>

                <label className="mt-6 flex items-start md:items-center">
                    <Checkbox name="remember" />

                    <span className="ml-2 text-sm text-gray-100 md:text-gray-600 font-semibold">Saya setuju dengan <Link href={route('login')} className="text-blue-600 font-semibold underline">Ketentuan Layanan</Link> dan <Link href={route('login')} className="text-blue-600 font-semibold underline">Kebijakan Privasi</Link></span>
                </label>

                <div className="flex items-center justify-between mt-6">
                    <Button className="bg-gradient-to-br from-blue-500 to-blue-600 focus:ring-2 focus:ring-blue-300" processing={processing}>
                        Register
                    </Button>

                    <span className="text-base text-gray-100 md:text-gray-800 md:font-semibold">
                        Already registered?
                        <Link href={route('login')} className="text-blue-600 ml-2 font-semibold underline">
                            Login
                        </Link>
                    </span>
                </div>
            </form>
        </Guest>
    );
}
