
const itemSidebarVariants = {
    hidden: {
        x: -100,
        opacity: 0
    },
    visible: i => ({
        x: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 30,
            delay: .2
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
    visible: h => ({
        opacity: 1,
        height: h,
        transition: {
            duration: .2,
            type: 'tween'
        }
    }),
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
    down: i => ({
        rotate: 0,
        transition: {
            delay: i,
            type: 'tween'
        }
    }),
    up: i => ({
        rotate: 180,
        transition: {
            delay: i,
            type: 'tween'
        }
    })
}

const openSidebarVariants = {
    open: {
        width: 240,
        zIndex: 100,
        transition: {
            type: 'tween',
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