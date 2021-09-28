import React, { useEffect, useState } from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { IoIosArrowDown } from 'react-icons/io';
import { AnimatePresence, motion } from 'framer-motion';
import { menuSidebars } from '@/Config/menu';
import { HiMenuAlt2 } from 'react-icons/hi';

let minLeftWidth = 600;

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
        transition: {
            type: 'tween'
        }
    }
}

const containerVariants = {
    open: width => ({
        paddingLeft: width < minLeftWidth ? 0 : 240,
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

const overlayVariants = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1
    }
}

export default function Welcome(props) {
    const [openItemSidebar, setOpenItemSidebar] = useState(Array(menuSidebars.length).fill(false));
    const [width, setWidth] = useState(window.innerWidth);
    const [sidebarOpen, setSidebarOpen] = useState(width > minLeftWidth ? true : false);

    const handleClickOpenItems = (index) => {
        const newOpen = openItemSidebar.map((open, key) => index === key ? !open : false);
        setOpenItemSidebar(newOpen);
    }

    useEffect(() => {
        window.addEventListener('resize', handleResizeWindow);
        return () => {
            window.removeEventListener('resize', handleResizeWindow);
        }
    })

    useEffect(() => {
        if(width < minLeftWidth){
            setSidebarOpen(false)
        }else{
            setSidebarOpen(true)
        }
    }, [width])

    const handleResizeWindow = (e) => {
        setWidth(e.currentTarget.innerWidth)
    }

    return (
        <>
            <Head title="Welcome" />
            {/* <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
                <div className="fixed top-0 right-0 px-6 py-4 sm:block">
                    {props.auth.user ? (
                        <Link href="/dashboard" className="text-sm text-gray-700 underline">
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link href={route('login')} className="text-sm text-gray-700 underline">
                                Log in
                            </Link>

                            <Link href={route('register')} className="ml-4 text-sm text-gray-700 underline">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div> */}


            <div className="relative w-full h-screen overflow-hidden bg-gray-100">
                <div className="flex flex-row">
                    <motion.div variants={openSidebarVariants} initial={false} animate={sidebarOpen ? 'open' : 'close'} className="w-60 fixed top-0 left-0 bg-white shadow flex-shrink-0 h-screen">
                        <div className="flex flex-col items-start py-4 pl-8">
                            {
                                menuSidebars && menuSidebars.map((menu, index) => (
                                    <div key={menu.id} className={`${index == 1 && 'mt-3'} w-full relative overflow-hidden`}>
                                        {
                                            menu.children && menu.children.length > 0 ? (
                                                <button onClick={() => handleClickOpenItems(index)} className={`flex flex-row items-center justify-between space-x-4 py-1 my-3 w-full pr-6 ${menu.id === 2 ? 'border-r-2 border-blue-600' : ''}`}>
                                                    <menu.icon className={`w-6 h-6 flex-shrink-0 ${menu.id === 2 ? 'text-blue-600' : 'text-gray-500'} fill-current`} />

                                                    <h1 className={`block flex-grow text-left ${menu.mt ? `${menu.id === 2 ? 'text-blue-600 font-semibold' : 'text-gray-700'} text-base tracking-wide` : 'text-gray-800 font-extrabold text-base'}`}>{menu.title}</h1>
                                                    {
                                                        menu.children && (
                                                            <motion.span variants={arrowVariants} initial={false} animate={openItemSidebar[index] ? 'up' : 'down'} className="flex-shrink">
                                                                <IoIosArrowDown className="w-4 h-4 text-gray-500" />
                                                            </motion.span>
                                                        )
                                                    }
                                                </button>
                                            ) : (
                                                <Link href={route('login')} className={`flex flex-row items-center justify-between space-x-4 py-1 my-3 w-full pr-6 ${menu.id === 2 ? 'border-r-2 border-blue-600' : ''}`}>
                                                    {menu.mt ? (
                                                        <menu.icon className={`w-6 h-6 flex-shrink-0 ${menu.id === 2 ? 'text-blue-600' : 'text-gray-500'} fill-current`} />
                                                    ) : (
                                                        <ApplicationLogo className="text-gray-800 w-6 h-6 flex-shrink-0" />
                                                    )}
                                                    <h1 className={`block flex-grow ${menu.mt ? `${menu.id === 2 ? 'text-blue-600 font-semibold' : 'text-gray-700'} text-base tracking-wide` : 'text-gray-800 font-extrabold text-base'}`}>{menu.title}</h1>
                                                </Link>
                                            )
                                        }
                                        <AnimatePresence key={index} exitBeforeEnter>
                                            {
                                                menu.children && menu.children.length > 0 && openItemSidebar[index] && (
                                                    <motion.div variants={menuSidebarVariants} initial="hidden" animate="visible" exit="exit" className="w-full bg-gray-50 flex flex-col items-start justify-center overflow-hidden rounded-md space-y-6">
                                                        {
                                                            menu.children.map((chil, i) => (
                                                                <motion.div variants={itemSidebarVariants} custom={i} key={chil.id} className="w-full">
                                                                    <Link href={route('login')} className={`flex flex-row items-center justify-between space-x-4 py-1 w-full pl-6`}>
                                                                        <chil.icon className={`w-5 h-5 text-gray-500 fill-current`} />
                                                                        <h1 className={`block flex-grow text-gray-700 text-sm tracking-wide`}>{chil.title}</h1>
                                                                    </Link>
                                                                </motion.div>
                                                            ))
                                                        }
                                                    </motion.div>
                                                )
                                            }
                                        </AnimatePresence>
                                    </div>
                                ))
                            }
                        </div>
                    </motion.div>
                    <AnimatePresence exitBeforeEnter>
                        {
                            width < minLeftWidth && sidebarOpen && (
                                <motion.div variants={overlayVariants} initial="hidden" animate="visible" exit="hidden" onClick={() => setSidebarOpen(!sidebarOpen)} className="fixed w-full h-screen bg-gray-800 bg-opacity-50 top-0 left-0 bottom-0 right-0"></motion.div>
                            )
                        }
                    </AnimatePresence>
                    <motion.div variants={containerVariants} initial={false} animate={sidebarOpen ? 'open' : 'close'} custom={width} className="w-full h-screen bg-gray-100 pl-60">
                        <div className="fixed w-full h-14 lg:h-16 bg-transparent">
                            <div className="flex flex-row items-center px-4 h-full bg-gray-400">
                                <button className="block p-2" onClick={() => setSidebarOpen(!sidebarOpen)}>
                                    <HiMenuAlt2 className="text-gray-600 h-6 w-6" />
                                </button>
                            </div>
                        </div>
                        <div className="w-full h-screen p-6 pt-14 md:pt-16 overflow-y-scroll">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias velit repellat, cupiditate dolor voluptatibus nesciunt? Quas similique cumque ipsa qui? Magni minus eum corrupti doloremque voluptas facere soluta deleniti placeat sapiente repellendus non eveniet, excepturi eligendi officiis dolorem laborum aliquam asperiores exercitationem maiores recusandae. Dolor incidunt consequatur molestiae, quaerat ipsam et rerum deleniti error. Ipsum expedita corporis sapiente numquam sint nulla fugiat culpa ipsam veritatis vitae quam sed iste, rerum quasi. Quo, excepturi omnis tenetur repudiandae consequatur labore necessitatibus aspernatur culpa eaque rem. Quae atque deserunt fugiat dolore, ipsum quos eaque neque sint eveniet tenetur pariatur officia modi delectus suscipit velit blanditiis, magnam hic sit aliquam placeat non cum assumenda ut. Nostrum iure vel perspiciatis ex, quaerat aspernatur rerum aperiam? Sint esse id harum numquam itaque porro, quisquam sapiente beatae fuga illo possimus laborum dolore consequuntur? Recusandae veritatis omnis consectetur nemo perferendis nihil aspernatur, animi impedit suscipit ipsum fuga dolorem at labore, eius obcaecati placeat et aliquid distinctio incidunt, doloribus laudantium praesentium voluptas? Deleniti cum eligendi temporibus dolores quod neque, corporis totam doloremque. Repellat quia possimus velit maiores dolor distinctio consectetur cumque nulla! Culpa, nisi ipsum architecto quod repellat qui similique, incidunt dignissimos quidem labore fugiat veritatis. Quam aut ullam aliquam. Suscipit beatae illum eum fugit consequatur vero animi maxime excepturi, nemo facere odit consectetur corporis provident optio in, placeat autem aspernatur rem ea. Totam, vitae ex eum dicta minus optio tenetur ut veniam natus soluta, pariatur exercitationem corrupti modi perspiciatis facere doloremque hic distinctio ducimus repudiandae? Vitae mollitia esse cum asperiores eveniet quo voluptatum! Ab est deleniti vel aut rerum? Debitis incidunt, qui tempora aperiam fugiat velit hic inventore harum laborum asperiores alias. Id sed cupiditate, blanditiis vel, et quidem modi fugit accusantium repudiandae, ullam molestiae dolorem in quibusdam sunt rerum veniam consequuntur autem debitis dolor reiciendis mollitia cumque aliquam. Maiores repellendus veniam doloribus sed odio? Dolorem aperiam, totam maxime hic dolor voluptates nostrum soluta, corporis nihil voluptas atque modi suscipit veritatis officiis eos voluptate est. Hic incidunt pariatur provident nulla quae veritatis. Atque ex voluptas repellendus laborum labore earum. Optio molestiae debitis nesciunt error fugit, eligendi earum at eum ipsam laudantium. Laudantium, perferendis error sed placeat blanditiis vel qui dicta obcaecati doloribus numquam quasi hic unde nemo sint nobis molestiae ullam dolorum rem odit aliquam facilis alias officia. Rerum cum, accusantium consectetur eius, illo autem eligendi fugiat obcaecati id enim recusandae quam natus quia temporibus facere numquam. Placeat praesentium reiciendis architecto laboriosam quod hic iste molestias repudiandae veritatis blanditiis at, quibusdam reprehenderit eveniet culpa dignissimos similique officiis doloribus dolorum, maxime doloremque earum neque dolorem ut ad. Qui molestias blanditiis in ab quidem odit officia atque delectus earum alias aspernatur eaque enim ea ad quisquam minus eius a, id exercitationem sint voluptate. Hic, minima ipsa quia vero consectetur eius ea! Velit eum qui obcaecati ex. Magni obcaecati deleniti tenetur nemo delectus accusantium laboriosam error officiis fugiat provident quaerat vitae sint, non illum minima distinctio veritatis molestias, eos debitis velit. Sunt debitis, nihil deserunt aliquid officia labore inventore quas at accusantium suscipit dolorem doloribus nisi dolore natus eligendi iusto recusandae fugit tempora laboriosam! Impedit dolorem modi ducimus, rem corporis eaque sint quasi. Minus dolorem maxime aliquam minima necessitatibus ipsam itaque, perferendis molestiae odio assumenda unde autem animi cupiditate quo architecto reiciendis quae impedit asperiores, error perspiciatis quos culpa! Ducimus, dicta quis. Perspiciatis laboriosam, praesentium similique vero dignissimos impedit doloribus nam sed officiis consectetur eveniet iure natus aspernatur quod dolore a commodi dolorem exercitationem doloremque modi? Natus delectus quidem voluptatem ducimus possimus nemo officia quam architecto alias, cupiditate, quae accusantium cum tempore? Molestiae velit nobis, illum numquam quis neque esse, quae unde minima possimus maiores eligendi voluptates in deserunt nisi ea! Deleniti dolores fugiat commodi minus dicta fugit, ad, deserunt quo nesciunt repellendus qui nisi aliquam est cumque illo tempora porro molestias minima aut! Consequatur debitis vitae voluptatum magni voluptatem nihil pariatur modi est quae voluptatibus ut odit aliquid error deserunt eligendi corrupti commodi, voluptas aut. Temporibus sunt sequi, itaque ab aspernatur ullam aliquam aut voluptate consequuntur sit iste atque culpa, perspiciatis esse amet praesentium enim eum deserunt delectus, minima ut numquam? Tenetur amet dolorem vel sed nemo nesciunt voluptatibus optio, sit expedita est repellat rerum. Iste ipsum quas quis esse in mollitia eveniet dolor, illum tempore odit aliquam voluptatum aut cupiditate consequatur dicta consectetur totam eius minus aspernatur. Odit ducimus eveniet vitae dolor voluptatum nulla qui quod, commodi iure quisquam eos neque minima sapiente. Consequatur obcaecati est porro natus aut nemo! Voluptas animi facere aut a quas eos deleniti? Iure, magnam expedita. Modi reiciendis repellendus architecto aliquid labore debitis voluptates ad, corporis vero omnis sint, iure sunt id totam ipsa. Id dignissimos tempore aliquam, nobis sapiente, magni alias praesentium facere enim fuga totam voluptatibus laboriosam quae maiores tenetur in maxime itaque? Laboriosam odit perferendis blanditiis ut ex iure! Minus quaerat ratione, molestias quae cumque nesciunt illum accusantium dicta harum quo sed consequuntur quod doloremque magnam debitis expedita numquam iusto perferendis rem distinctio dolorem pariatur placeat veniam quia. Commodi qui omnis numquam nulla? Laboriosam itaque ducimus minima sapiente et culpa, aliquid incidunt. Aperiam itaque sunt unde incidunt cum impedit totam doloribus amet eum? Saepe rerum repellat voluptatem ea asperiores, expedita corporis enim tempora dolorum dolor amet iste, facere quae laborum deserunt est recusandae perspiciatis earum aspernatur harum, necessitatibus eos inventore. Maiores quam atque impedit, tempore obcaecati at. Illum fuga eum possimus, eius quas fugiat maiores unde modi a, ullam pariatur repellendus aperiam, libero voluptas doloremque eos soluta eligendi alias cupiditate fugit. Suscipit autem natus voluptas repellat, qui ut repudiandae consequatur recusandae dicta et commodi aliquid cupiditate quam consequuntur veritatis quasi. Saepe, temporibus earum esse corporis nesciunt sed expedita debitis id, dolorum sequi ex hic mollitia neque accusantium, odit unde? Id, officia laboriosam? Illo iure mollitia incidunt deserunt eaque ad optio aliquid. Tempore earum beatae vitae necessitatibus reprehenderit nobis voluptate excepturi expedita similique. Similique amet qui doloribus magni iure saepe, aspernatur numquam corrupti exercitationem! Error mollitia minus quia temporibus? Soluta, aperiam facilis eligendi quaerat dolorum omnis atque corrupti nulla vel totam aliquid.
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
}
