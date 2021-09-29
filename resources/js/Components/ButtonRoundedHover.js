import React from 'react'

function ButtonRoundedHover({ children }) {
    return (
        <button className="block relative rounded-full bg-gray-50 hover:bg-gray-100 p-2 transition ease-in-out duration-150">
            {children}
        </button>
    )
}

export default ButtonRoundedHover