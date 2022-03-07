import { useRouter } from 'next/router'
import Link from 'next/link'
import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import AppBoldIcon from "../ui/icons/appBoldIcon";
import CartBoldIcon from "../ui/icons/cartBoldIcon";
import BoxBoldIcon from "../ui/icons/boxBoldIcon";
import LetterBoldIcon from "../ui/icons/letterBoldIcon";
import LaptopBoldIcon from "../ui/icons/laptopBoldIcon";
import GroupBoldIcon from "../ui/icons/groupBoldIcon";
import SettingsBoldIcon from "../ui/icons/settingsBoldIcon";
import InterfaceBoldIcon from "../ui/icons/interfaceBoldIcon";
import EnvelopeBoldIcon from "../ui/icons/envelopeBoldIcon";
import CarnetBoldIcon from "../ui/icons/carnetBoldIcon";


export default function Sidebar() {

    const router = useRouter();
    const style1 = ""
    const style2 = ""

  return (

    <aside className="app-sidebar w-60 py-4 bg-white rounded-xl" aria-label="Sidebar">

        <div className="overflow-y-auto w-full h-full">

            <ul className="space-y-1">

                <Link  href='/' >
                    <li>
                        <a  className={`${(router.asPath === '/') ? 'text-purple-800 border-purple-500 bg-gradient-to-r from-purple-50 to-fuchsia-50 bg-opacity-5' : 'border-white text-gray-900'} flex items-center py-2 px-4 text-base font-medium border-l-2 hover:text-purple-800 hover:border-purple-500 hover:bg-gradient-to-r hover:from-purple-50 hover:to-fuchsia-50 hover:bg-opacity-5 cursor-pointer duration-700 ease-in-out `}>
                            <AppBoldIcon  customClass="w-4 h-4" />
                            <span className="ml-3">Dashboard</span>
                        </a>
                    </li>
                </Link>

                <Disclosure as="li" className="mt-2">
                    {({ open }) => (
                        <>
                        <Disclosure.Button className={`${open ? 'text-purple-800 border-purple-500 bg-gradient-to-r from-purple-50 to-fuchsia-50 bg-opacity-5' : 'border-white text-gray-900'} w-full flex justify-between py-2 px-4 text-base font-medium border-l-2 hover:text-purple-800 hover:border-purple-500 hover:bg-gradient-to-r hover:from-purple-50 hover:to-fuchsia-50 hover:bg-opacity-5`} >
                            <a  className="flex items-center ">
                                <InterfaceBoldIcon customClass="w-4 h-4" />
                                <span className="ml-3">Interfaces</span>
                            </a>
                            <ChevronDownIcon className={`${open ? 'transform rotate-180' : ''} w-5 h-5 self-center`}/>
                        </Disclosure.Button>
                        <Disclosure.Panel className="my-2 text-sm font-medium ">
                            <Link  href='/' >
                                <div className='pl-11 pr-2 text-gray-900 hover:text-purple-800 cursor-pointer py-2 duration-700 ease-in-out '>Exemple 1</div>
                            </Link>
                            <Link  href='/' >
                                <div className='pl-11 pr-2 text-gray-900 hover:text-purple-800 cursor-pointer py-2 duration-700 ease-in-out '>Exemple 2</div>
                            </Link>
                            <Link  href='/' >
                                <div className='pl-11 pr-2 text-gray-900 hover:text-purple-800 cursor-pointer py-2 duration-700 ease-in-out '>Exemple 3</div>
                            </Link>
                        </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>

                <div className="text-xs font-medium text-gray-400 capitalise pl-4 pt-2 ">BOUTIQUE</div>

                <Link  href='/commandes' >
                    <li>
                        <a  className={`${(router.asPath === '/commandes') ? 'text-purple-800 border-purple-500 bg-gradient-to-r from-purple-50 to-fuchsia-50 bg-opacity-5' : 'border-white text-gray-900'} flex items-center py-2 px-4 text-base font-medium border-l-2 hover:text-purple-800 hover:border-purple-500 hover:bg-gradient-to-r hover:from-purple-50 hover:to-fuchsia-50 hover:bg-opacity-5 cursor-pointer duration-700 ease-in-out `}>
                            <CartBoldIcon customClass="w-4 h-4" />
                            <span className="ml-3">Commandes</span>
                        </a>
                    </li>
                </Link>

                <Link  href='/categories' >
                    <li>
                        <a  className={`${(router.asPath === '/categories') ? 'text-purple-800 border-purple-500 bg-gradient-to-r from-purple-50 to-fuchsia-50 bg-opacity-5' : 'border-white text-gray-900'} flex items-center py-2 px-4 text-base font-medium border-l-2 hover:text-purple-800 hover:border-purple-500 hover:bg-gradient-to-r hover:from-purple-50 hover:to-fuchsia-50 hover:bg-opacity-5 cursor-pointer duration-700 ease-in-out `}>
                            <LetterBoldIcon customClass="w-4 h-4" />
                            <span className="ml-3">Catégories</span>
                        </a>
                    </li>
                </Link>

                <Link  href='/produits' >
                    <li>
                        <a  className={`${(router.asPath === '/produits') ? 'text-purple-800 border-purple-500 bg-gradient-to-r from-purple-50 to-fuchsia-50 bg-opacity-5' : 'border-white text-gray-900'} flex items-center py-2 px-4 text-base font-medium border-l-2 hover:text-purple-800 hover:border-purple-500 hover:bg-gradient-to-r hover:from-purple-50 hover:to-fuchsia-50 hover:bg-opacity-5 cursor-pointer duration-700 ease-in-out `}>
                            <LaptopBoldIcon customClass="w-4 h-4" />
                            <span className="ml-3">Produits</span>
                        </a>
                    </li>
                </Link>

                <Disclosure as="li" className="mt-2">
                    {({ open }) => (
                        <>
                        <Disclosure.Button className={`${open || router.asPath === '/zones_de_livraison' || router.asPath === '/modes_de_livraison' || router.asPath === '/livreurs' ? 'text-purple-800 border-purple-500 bg-gradient-to-r from-purple-50 to-fuchsia-50 bg-opacity-5' : 'border-white text-gray-900'} w-full flex justify-between py-2 px-4 text-base font-medium border-l-2 hover:text-purple-800 hover:border-purple-500 hover:bg-gradient-to-r hover:from-purple-50 hover:to-fuchsia-50 hover:bg-opacity-5`} >
                            <a  className="flex items-center ">
                                <BoxBoldIcon customClass="w-4 h-4" />
                                <span className="ml-3">Livraisons</span>
                            </a>
                            <ChevronDownIcon className={`${open  ? 'transform rotate-180' : ''} w-5 h-5 self-center`}/>
                        </Disclosure.Button>
                        <Disclosure.Panel className="my-2 text-sm font-medium ">
                            <Link  href='/zones_de_livraison' >
                                <div className='pl-11 pr-2 text-gray-900 hover:text-purple-800 cursor-pointer py-2 duration-700 ease-in-out '>Zones de livraison</div>
                            </Link>
                            <Link  href='/modes_de_livraison' >
                                <div className='pl-11 pr-2 text-gray-900 hover:text-purple-800 cursor-pointer py-2 duration-700 ease-in-out '>Mode de livraison</div>
                            </Link>
                            <Link  href='/livreurs' >
                                <div className='pl-11 pr-2 text-gray-900 hover:text-purple-800 cursor-pointer py-2 duration-700 ease-in-out '>Livreurs</div>
                            </Link>
                        </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>

                <div className="text-xs font-medium text-gray-400 capitalise pl-4 pt-2">GESTION DES CLIENTS</div>

                <Link  href='/clients' >
                    <li>
                        <a  className={`${(router.asPath === '/clients') ? 'text-purple-800 border-purple-500 bg-gradient-to-r from-purple-50 to-fuchsia-50 bg-opacity-5' : 'border-white text-gray-900'} flex items-center py-2 px-4 text-base font-medium border-l-2 hover:text-purple-800 hover:border-purple-500 hover:bg-gradient-to-r hover:from-purple-50 hover:to-fuchsia-50 hover:bg-opacity-5 cursor-pointer duration-700 ease-in-out `}>
                            <GroupBoldIcon  customClass="w-4 h-4" />
                            <span className="ml-3">Clients</span>
                        </a>
                    </li>
                </Link>

                <Link  href='/messages' >
                    <li>
                        <a  className={`${(router.asPath === '/messages') ? 'text-purple-800 border-purple-500 bg-gradient-to-r from-purple-50 to-fuchsia-50 bg-opacity-5' : 'border-white text-gray-900'} flex items-center py-2 px-4 text-base font-medium border-l-2 hover:text-purple-800 hover:border-purple-500 hover:bg-gradient-to-r hover:from-purple-50 hover:to-fuchsia-50 hover:bg-opacity-5 cursor-pointer duration-700 ease-in-out `}>
                            <EnvelopeBoldIcon  customClass="w-4 h-4" />
                            <span className="ml-3">Messages</span>
                        </a>
                    </li>
                </Link>

                <Link  href='/newsletters' >  
                    <li>
                        <a  className={`${(router.asPath === '/newsletters') ? 'text-purple-800 border-purple-500 bg-gradient-to-r from-purple-50 to-fuchsia-50 bg-opacity-5' : 'border-white text-gray-900'} flex items-center py-2 px-4 text-base font-medium border-l-2 hover:text-purple-800 hover:border-purple-500 hover:bg-gradient-to-r hover:from-purple-50 hover:to-fuchsia-50 hover:bg-opacity-5 cursor-pointer duration-700 ease-in-out `}>
                            <CarnetBoldIcon  customClass="w-4 h-4" />
                            <span className="ml-3">Carnet d'adresse</span>
                        </a>
                    </li>
                </Link>

                <div className="text-xs font-medium text-gray-400 capitalise pl-4 pt-2">ADMINISTRATION</div>

                <Disclosure as="li" className="mt-2">
                    {({ open }) => (
                        <>
                        <Disclosure.Button className={`${open || router.asPath === '/utilisateurs' || router.asPath === '/roles' || router.asPath === '/permissions'  ? 'text-purple-800 border-purple-500 bg-gradient-to-r from-purple-50 to-fuchsia-50 bg-opacity-5' : 'border-white text-gray-900'} w-full flex justify-between py-2 px-4 text-base font-medium border-l-2 hover:text-purple-800 hover:border-purple-500 hover:bg-gradient-to-r hover:from-purple-50 hover:to-fuchsia-50 hover:bg-opacity-5`} >
                            <a  className="flex items-center ">
                                <SettingsBoldIcon customClass="w-4 h-4" />
                                <span className="ml-3">Paramètres</span>
                            </a>
                            <ChevronDownIcon className={`${open ? 'transform rotate-180' : ''} w-5 h-5 self-center`}/>
                        </Disclosure.Button>
                        <Disclosure.Panel className="my-2 text-sm font-medium ">
                            <Link  href='/utilisateurs' >
                                <div className='pl-11 pr-2 text-gray-900 hover:text-purple-800 cursor-pointer py-2 duration-700 ease-in-out '>Utilisateurs</div>
                            </Link>
                            <Link  href='/roles' >
                                <div className='pl-11 pr-2 text-gray-900 hover:text-purple-800 cursor-pointer py-2 duration-700 ease-in-out '>Roles</div>
                            </Link>
                            <Link  href='/permissions' >
                                <div className='pl-11 pr-2 text-gray-900 hover:text-purple-800 cursor-pointer py-2 duration-700 ease-in-out '>Permissions</div>
                            </Link>
                        </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>

            </ul>

        </div>

    </aside>
        
  );
}