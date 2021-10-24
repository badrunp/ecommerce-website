const overlayVariants = {
    hidden: i => ({
        opacity: 0,
        zIndex: i
    }),
    visible: i => ({
        opacity: 1,
        zIndex: i
    })
}

export {
    overlayVariants
}