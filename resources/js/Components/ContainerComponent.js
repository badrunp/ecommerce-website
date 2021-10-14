import React from 'react'

function ContainerComponent({children, className = 'w-full'}) {
    return (
        <div className={`bg-white relative shadow rounded px-4 md:px-8 py-3 md:py-6 ${className}`}>
            {children}
        </div>
    )
}

export default ContainerComponent
