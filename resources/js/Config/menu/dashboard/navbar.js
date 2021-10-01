import { BiUser } from "react-icons/bi"
import { IoIosLogOut } from "react-icons/io"

const menuUserNavbarDropdown = [
    {
        id: 1,
        title: "Profil",
        link: route('login'),
        icon: BiUser,
        method: 'GET'
    },
    {
        id: 2,
        title: "Logout",
        link: route('logout'),
        icon: IoIosLogOut,
        method: 'POST'
    },
]

export {
    menuUserNavbarDropdown
}