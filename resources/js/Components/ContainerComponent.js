import React from 'react'

function ContainerComponent({children, className = 'w-full', rounded = "rounded"}) {
    return (
        <div className={`bg-white relative shadow px-4 md:px-8 py-3 md:py-6 ${rounded} ${className}`}>
            {children}
        </div>
    )
}

export default ContainerComponent
