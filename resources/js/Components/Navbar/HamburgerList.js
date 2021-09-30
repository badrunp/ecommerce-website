import React from 'react'

function HamburgerList({ width }) {
    return <span className={"block bg-gray-700 rounded " + width} style={{ height: 2 }}></span>
}

export default HamburgerList
