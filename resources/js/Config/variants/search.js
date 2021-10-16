const searchTableVariants = {
    hidden: {
        opacity: 0,
        height: 0,
        marginBottom: 0
    },
    visible: {
        opacity: 1,
        height: "max-content",
        marginBottom: '10px',
        transition: {
            type: 'tween',
            duration: .2
        }
    }
}

export {
    searchTableVariants
}