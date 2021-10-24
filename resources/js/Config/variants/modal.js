const modalVariants = {
    hidden: {
        opacity: 0,
        y: -100,
        x: '-50%'
    },
    visible: {
        opacity: 1,
        y: 0,
        x: '-50%',
        transition: {
            type: 'spring',
            damping: 30,
            stiffness: 600
        }
    },
    exit: {
        opacity: 0,
        y: -300,
        transition: {
            type: 'tween'
        }
    }
}

export {
    modalVariants
}