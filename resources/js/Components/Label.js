import React from 'react';

export default function Label({ forInput, value, className, children, layout = '' }) {
    let classTextWhite = '';
    if(layout === 'guest'){
        classTextWhite = 'text-gray-100 md:text-gray-600';
    }else{
        classTextWhite = 'text-gray-600'
    }
    return (
        <label htmlFor={forInput} className={`block font-semibold text-sm ${classTextWhite} ` + className}>
            {value ? value : { children }}
        </label>
    );
}
