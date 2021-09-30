import { useEffect, useState } from 'react'

function Resize() {

    const [[width, height], setWidth] = useState([window.innerWidth,window.innerHeight]);

    useEffect(() => {
        window.addEventListener('resize', handleResizeWindow);

        return () => {
            window.removeEventListener('resize', handleResizeWindow);
        }
    })

    const handleResizeWindow = (e) => {
        setWidth([e.currentTarget.innerWidth, e.currentTarget.innerHeight])
    }

    return {
        width,
        height
    }
}

export default Resize
