const dropdownVariants = {
    hidden: {
        opacity: 0,
        y: 100,
        transition: {
            duration: .2
        }
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            damping: 30,
            stiffness: 300
        }
    }
}

export {
    dropdownVariants
}