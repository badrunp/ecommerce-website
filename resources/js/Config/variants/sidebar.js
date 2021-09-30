
const itemSidebarVariants = {
    hidden: {
        x: -100
    },
    visible: i => ({
        x: 0,
        transition: {
            delay: i / 10,
            type: 'spring',
            stiffness: 300,
            damping: 30
        }
    }),
    exit: {
        opacity: 0
    }
}

const menuSidebarVariants = {
    hidden: {
        opacity: 0,
        height: 0,
        zIndex: -1
    },
    visible: {
        opacity: 1,
        height: 160,
        transition: {
            duration: .2,
            type: 'tween'
        }
    },
    exit: {
        opacity: 0,
        height: 0,
        zIndex: -1,
        transition: {
            delay: .2,
            type: 'tween'
        }
    }
}

const arrowVariants = {
    down: {
        rotate: 0,
        transition: {
            delay: .2
        }
    },
    up: {
        rotate: 180
    }
}

const openSidebarVariants = {
    open: {
        width: 240,
        zIndex: 100,
        transition: {
            type: 'tween'
        }
    },
    close: {
        width: 0,
        zIndex: 100,
        transition: {
            type: 'tween'
        }
    }
}

export {
    itemSidebarVariants,
    menuSidebarVariants,
    arrowVariants,
    openSidebarVariants
}