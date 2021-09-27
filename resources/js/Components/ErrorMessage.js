import React from 'react'

function ErrorMessage({ error }) {
    return (
        <span className="block text-sm text-red-500 mt-2">
            {error}
        </span>
    )
}

export default ErrorMessage
