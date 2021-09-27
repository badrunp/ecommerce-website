import React from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { RiProductHuntLine } from 'react-icons/ri';

const menuSidebars = [
    {
        id: 1,
        title: 'Ecommerce',
        link: route('login'),
        mt: null
    },
    {
        id: 2,
        title: 'Products',
        link: route('login'),
        icon: RiProductHuntLine,
        mt: 'mt-8'
    },
    {
        id: 3,
        title: 'Categories',
        link: route('login'),
        icon: RiProductHuntLine,
        mt: 'mt-6'
    },
    {
        id: 4,
        title: 'Orders',
        link: route('login'),
        icon: RiProductHuntLine,
        mt: 'mt-6'
    },
    {
        id: 5,
        title: 'Carts',
        link: route('login'),
        icon: RiProductHuntLine,
        mt: 'mt-6'
    },
    {
        id: 6,
        title: 'Banners',
        link: route('login'),
        icon: RiProductHuntLine,
        mt: 'mt-6'
    },
]


export default function Welcome(props) {
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
                    <div className="w-56 fixed top-0 left-0 bg-white flex-shrink-0 h-screen shadow py-2">
                        <ul className="flex flex-col items-start py-6 pl-6">
                            {
                                menuSidebars && menuSidebars.map((menu) => (
                                    <li key={menu.id} className={`${menu.mt}`}>
                                        <Link href={route('login')} className="flex flex-row items-center space-x-4">
                                            {menu.mt ? (
                                                <menu.icon className="w-6 h-6 text-gray-500"  />
                                            ) : (
                                                <ApplicationLogo className="text-gray-500" />
                                            )}
                                            <h1 className={`block ${menu.mt ? 'text-gray-600 font-semibold text-sm' : 'text-gray-800 font-extrabold text-lg'}`}>{menu.title}</h1>
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="w-full h-screen bg-gray-100 pl-56 overflow-y-scroll">
                        <div className="p-8">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias velit repellat, cupiditate dolor voluptatibus nesciunt? Quas similique cumque ipsa qui? Magni minus eum corrupti doloremque voluptas facere soluta deleniti placeat sapiente repellendus non eveniet, excepturi eligendi officiis dolorem laborum aliquam asperiores exercitationem maiores recusandae. Dolor incidunt consequatur molestiae, quaerat ipsam et rerum deleniti error. Ipsum expedita corporis sapiente numquam sint nulla fugiat culpa ipsam veritatis vitae quam sed iste, rerum quasi. Quo, excepturi omnis tenetur repudiandae consequatur labore necessitatibus aspernatur culpa eaque rem. Quae atque deserunt fugiat dolore, ipsum quos eaque neque sint eveniet tenetur pariatur officia modi delectus suscipit velit blanditiis, magnam hic sit aliquam placeat non cum assumenda ut. Nostrum iure vel perspiciatis ex, quaerat aspernatur rerum aperiam? Sint esse id harum numquam itaque porro, quisquam sapiente beatae fuga illo possimus laborum dolore consequuntur? Recusandae veritatis omnis consectetur nemo perferendis nihil aspernatur, animi impedit suscipit ipsum fuga dolorem at labore, eius obcaecati placeat et aliquid distinctio incidunt, doloribus laudantium praesentium voluptas? Deleniti cum eligendi temporibus dolores quod neque, corporis totam doloremque. Repellat quia possimus velit maiores dolor distinctio consectetur cumque nulla! Culpa, nisi ipsum architecto quod repellat qui similique, incidunt dignissimos quidem labore fugiat veritatis. Quam aut ullam aliquam. Suscipit beatae illum eum fugit consequatur vero animi maxime excepturi, nemo facere odit consectetur corporis provident optio in, placeat autem aspernatur rem ea. Totam, vitae ex eum dicta minus optio tenetur ut veniam natus soluta, pariatur exercitationem corrupti modi perspiciatis facere doloremque hic distinctio ducimus repudiandae? Vitae mollitia esse cum asperiores eveniet quo voluptatum! Ab est deleniti vel aut rerum? Debitis incidunt, qui tempora aperiam fugiat velit hic inventore harum laborum asperiores alias. Id sed cupiditate, blanditiis vel, et quidem modi fugit accusantium repudiandae, ullam molestiae dolorem in quibusdam sunt rerum veniam consequuntur autem debitis dolor reiciendis mollitia cumque aliquam. Maiores repellendus veniam doloribus sed odio? Dolorem aperiam, totam maxime hic dolor voluptates nostrum soluta, corporis nihil voluptas atque modi suscipit veritatis officiis eos voluptate est. Hic incidunt pariatur provident nulla quae veritatis. Atque ex voluptas repellendus laborum labore earum. Optio molestiae debitis nesciunt error fugit, eligendi earum at eum ipsam laudantium. Laudantium, perferendis error sed placeat blanditiis vel qui dicta obcaecati doloribus numquam quasi hic unde nemo sint nobis molestiae ullam dolorum rem odit aliquam facilis alias officia. Rerum cum, accusantium consectetur eius, illo autem eligendi fugiat obcaecati id enim recusandae quam natus quia temporibus facere numquam. Placeat praesentium reiciendis architecto laboriosam quod hic iste molestias repudiandae veritatis blanditiis at, quibusdam reprehenderit eveniet culpa dignissimos similique officiis doloribus dolorum, maxime doloremque earum neque dolorem ut ad. Qui molestias blanditiis in ab quidem odit officia atque delectus earum alias aspernatur eaque enim ea ad quisquam minus eius a, id exercitationem sint voluptate. Hic, minima ipsa quia vero consectetur eius ea! Velit eum qui obcaecati ex. Magni obcaecati deleniti tenetur nemo delectus accusantium laboriosam error officiis fugiat provident quaerat vitae sint, non illum minima distinctio veritatis molestias, eos debitis velit. Sunt debitis, nihil deserunt aliquid officia labore inventore quas at accusantium suscipit dolorem doloribus nisi dolore natus eligendi iusto recusandae fugit tempora laboriosam! Impedit dolorem modi ducimus, rem corporis eaque sint quasi. Minus dolorem maxime aliquam minima necessitatibus ipsam itaque, perferendis molestiae odio assumenda unde autem animi cupiditate quo architecto reiciendis quae impedit asperiores, error perspiciatis quos culpa! Ducimus, dicta quis. Perspiciatis laboriosam, praesentium similique vero dignissimos impedit doloribus nam sed officiis consectetur eveniet iure natus aspernatur quod dolore a commodi dolorem exercitationem doloremque modi? Natus delectus quidem voluptatem ducimus possimus nemo officia quam architecto alias, cupiditate, quae accusantium cum tempore? Molestiae velit nobis, illum numquam quis neque esse, quae unde minima possimus maiores eligendi voluptates in deserunt nisi ea! Deleniti dolores fugiat commodi minus dicta fugit, ad, deserunt quo nesciunt repellendus qui nisi aliquam est cumque illo tempora porro molestias minima aut! Consequatur debitis vitae voluptatum magni voluptatem nihil pariatur modi est quae voluptatibus ut odit aliquid error deserunt eligendi corrupti commodi, voluptas aut. Temporibus sunt sequi, itaque ab aspernatur ullam aliquam aut voluptate consequuntur sit iste atque culpa, perspiciatis esse amet praesentium enim eum deserunt delectus, minima ut numquam? Tenetur amet dolorem vel sed nemo nesciunt voluptatibus optio, sit expedita est repellat rerum. Iste ipsum quas quis esse in mollitia eveniet dolor, illum tempore odit aliquam voluptatum aut cupiditate consequatur dicta consectetur totam eius minus aspernatur. Odit ducimus eveniet vitae dolor voluptatum nulla qui quod, commodi iure quisquam eos neque minima sapiente. Consequatur obcaecati est porro natus aut nemo! Voluptas animi facere aut a quas eos deleniti? Iure, magnam expedita. Modi reiciendis repellendus architecto aliquid labore debitis voluptates ad, corporis vero omnis sint, iure sunt id totam ipsa. Id dignissimos tempore aliquam, nobis sapiente, magni alias praesentium facere enim fuga totam voluptatibus laboriosam quae maiores tenetur in maxime itaque? Laboriosam odit perferendis blanditiis ut ex iure! Minus quaerat ratione, molestias quae cumque nesciunt illum accusantium dicta harum quo sed consequuntur quod doloremque magnam debitis expedita numquam iusto perferendis rem distinctio dolorem pariatur placeat veniam quia. Commodi qui omnis numquam nulla? Laboriosam itaque ducimus minima sapiente et culpa, aliquid incidunt. Aperiam itaque sunt unde incidunt cum impedit totam doloribus amet eum? Saepe rerum repellat voluptatem ea asperiores, expedita corporis enim tempora dolorum dolor amet iste, facere quae laborum deserunt est recusandae perspiciatis earum aspernatur harum, necessitatibus eos inventore. Maiores quam atque impedit, tempore obcaecati at. Illum fuga eum possimus, eius quas fugiat maiores unde modi a, ullam pariatur repellendus aperiam, libero voluptas doloremque eos soluta eligendi alias cupiditate fugit. Suscipit autem natus voluptas repellat, qui ut repudiandae consequatur recusandae dicta et commodi aliquid cupiditate quam consequuntur veritatis quasi. Saepe, temporibus earum esse corporis nesciunt sed expedita debitis id, dolorum sequi ex hic mollitia neque accusantium, odit unde? Id, officia laboriosam? Illo iure mollitia incidunt deserunt eaque ad optio aliquid. Tempore earum beatae vitae necessitatibus reprehenderit nobis voluptate excepturi expedita similique. Similique amet qui doloribus magni iure saepe, aspernatur numquam corrupti exercitationem! Error mollitia minus quia temporibus? Soluta, aperiam facilis eligendi quaerat dolorum omnis atque corrupti nulla vel totam aliquid.
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
