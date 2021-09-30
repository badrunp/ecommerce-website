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

export {
    containerVariants
}