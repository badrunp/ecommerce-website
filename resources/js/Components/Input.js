import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Input({
    type = 'text',
    name,
    value,
    className,
    autoComplete,
    required,
    isFocused,
    handleChange,
    isError = '',
    layout = '',
    ...props
}) {
    const input = useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    let classRingNone = '';
    if(layout === 'guest'){
        classRingNone = isError ? 'bg-gray-300 md:bg-white focus:ring-red-600 md:focus:ring-red-100' : 'bg-gray-300 md:bg-white focus:ring-blue-600 md:focus:ring-blue-100';
    }else{
        classRingNone = isError ? 'focus:ring-red-200 focus:border-red-400' : 'focus:ring-blue-200 focus:border-blue-400';
    }


    const classError = isError ? `border-red-300 focus:border-red-400 ${classRingNone}` : `border-gray-300 focus:border-blue-400 ${classRingNone}`;

    return (
        <div className="flex flex-col items-start">
            <motion.input
                type={type}
                name={name}
                value={value}
                {...props}
                className={
                    `focus:ring ${classError} focus:ring-opacity-50 rounded-md md:rounded-lg shadow-sm transition duration-150 ease-in-out ` +
                    className
                }
                ref={input}
                autoComplete={autoComplete}
                required={required}
                onChange={(e) => handleChange(e)}
            />
        </div>
    );
}
