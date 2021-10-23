
import { RiProductHuntLine } from 'react-icons/ri';
import { AiOutlineDashboard, AiOutlineShopping } from 'react-icons/ai';
import { IoListOutline } from 'react-icons/io5';
import { BiShowAlt, BiColorFill, BiFontSize } from 'react-icons/bi';

const menuSidebars = [
    {
        id: 1,
        title: 'Ecommerce',
        link: route('backend.dashboard'),
        mt: false
    },
    {
        id: 2,
        title: 'Home',
        link: route('backend.dashboard'),
        icon: AiOutlineDashboard,
        mt: true
    },
    {
        id: 3,
        title: 'Products',
        link: route('login'),
        icon: RiProductHuntLine,
        mt: true,
        children: [
            {
                id: 1,
                title: 'Show',
                link: route('login'),
                icon: BiShowAlt,
                mt: true,
            },
            {
                id: 2,
                title: 'Colors',
                link: route('backend.colors.index'),
                icon: BiColorFill,
                mt: true,
            },
            {
                id: 3,
                title: 'Sizes',
                link: route('backend.sizes.index'),
                icon: BiFontSize,
                mt: true,
            }
        ]
    },
    {
        id: 4,
        title: 'Categories',
        link: route('backend.categories.index'),
        icon: IoListOutline,
        mt: true,
    },
    {
        id: 5,
        title: 'Orders',
        link: route('login'),
        icon: AiOutlineShopping,
        mt: true
    },
    {
        id: 6,
        title: 'Banners',
        link: route('index'),
        icon: RiProductHuntLine,
        mt: true
    },
]



export {
    menuSidebars
}