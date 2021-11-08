import { minSidebarHide } from "../app"

const containerVariants = {
    open: width => ({
        paddingLeft: width < minSidebarHide ? 0 : 240,
        transition: {
            type: 'tween'
        }
    }),
    close: {
        paddingLeft: 0,
        transition: {
            type: 'tween'
        }
    }
}

const userDropdownVariants = {
    hidden: {
        opacity: 0,
        x: 250
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: 'spring',
            damping: 30,
            stiffness: 300
        }
    }
}

const userNotifVariants = {
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
    containerVariants,
    userDropdownVariants,
    userNotifVariants
}