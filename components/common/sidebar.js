
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


export default function Sidebar({onOpen2Change, open2}) {

  return (

    <aside className="gt-sidebar w-60 py-5 bg-white rounded-xl shadow" aria-label="Sidebar">

        <div className="overflow-y-auto w-full h-full">

            <ul className="space-y-1">

                <li>
                    <a href="#" className="flex items-center py-2 px-4 text-base font-medium text-gray-900 hover:text-purple-800 border-l-2 border-white hover:border-purple-500 hover:bg-gradient-to-r hover:from-purple-50 hover:to-fuchsia-50 hover:bg-opacity-5">
                        <AppBoldIcon  customClass="w-4 h-4" />
                        <span className="ml-3">Dashboard</span>
                    </a>
                </li>

                <Disclosure as="li" className="mt-2">
                    {({ open }) => (
                        <>
                        <Disclosure.Button className={`${open ? 'text-purple-800 border-purple-500 bg-gradient-to-r from-purple-50 to-fuchsia-50 bg-opacity-5' : 'border-white text-gray-900'} w-full flex justify-between py-2 px-4 text-base font-medium border-l-2 hover:text-purple-800 hover:border-purple-500 hover:bg-gradient-to-r hover:from-purple-50 hover:to-fuchsia-50 hover:bg-opacity-5`} >
                            <a href="#" className="flex items-center ">
                                <InterfaceBoldIcon customClass="w-4 h-4" />
                                <span className="ml-3">Interfaces</span>
                            </a>
                            <ChevronDownIcon className={`${open ? 'transform rotate-180' : ''} w-5 h-5 self-center`}/>
                        </Disclosure.Button>
                        <Disclosure.Panel className="my-2 text-sm font-medium ">
                            <div className='pl-11 pr-2 text-gray-900 hover:text-purple-800 cursor-pointer py-2'>Utilisateurs</div>
                            <div className='pl-11 pr-2 text-gray-900 hover:text-purple-800 cursor-pointer py-2'>Roles</div>
                            <div className='pl-11 pr-2 text-gray-900 hover:text-purple-800 cursor-pointer py-2'>Permissions</div>

                        </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>

                
                <div className="text-xs font-medium text-gray-400 capitalise pl-4 pt-2 ">BOUTIQUE</div>

                <li>
                    <a href="#" className="flex items-center py-2 px-4 text-base font-medium text-gray-900 hover:text-purple-800 border-l-2 border-white hover:border-purple-500 hover:bg-gradient-to-r hover:from-purple-50 hover:to-fuchsia-50 hover:bg-opacity-5">
                        <CartBoldIcon customClass="w-4 h-4" />
                        <span className="ml-3">Commandes</span>
                    </a>
                </li>

                <li>
                    <a href="#" className="flex items-center py-2 px-4 text-base font-medium text-gray-900 hover:text-purple-800 border-l-2 border-white hover:border-purple-500 hover:bg-gradient-to-r hover:from-purple-50 hover:to-fuchsia-50 hover:bg-opacity-5">
                        <LetterBoldIcon customClass="w-4 h-4" />
                        <span className="ml-3">Catégories</span>
                    </a>
                </li>

                <li>
                    <a href="#" className="flex items-center py-2 px-4 text-base font-medium text-gray-900 hover:text-purple-800 border-l-2 border-white hover:border-purple-500 hover:bg-gradient-to-r hover:from-purple-50 hover:to-fuchsia-50 hover:bg-opacity-5">
                        <LaptopBoldIcon customClass="w-4 h-4" />
                        <span className="ml-3">Produits</span>
                    </a>
                </li>

                <Disclosure as="li" className="mt-2">
                    {({ open }) => (
                        <>
                        <Disclosure.Button className={`${open ? 'text-purple-800 border-purple-500 bg-gradient-to-r from-purple-50 to-fuchsia-50 bg-opacity-5' : 'border-white text-gray-900'} w-full flex justify-between py-2 px-4 text-base font-medium border-l-2 hover:text-purple-800 hover:border-purple-500 hover:bg-gradient-to-r hover:from-purple-50 hover:to-fuchsia-50 hover:bg-opacity-5`} >
                            <a href="#" className="flex items-center ">
                                <BoxBoldIcon customClass="w-4 h-4" />
                                <span className="ml-3">Livraisons</span>
                            </a>
                            <ChevronDownIcon className={`${open ? 'transform rotate-180' : ''} w-5 h-5 self-center`}/>
                        </Disclosure.Button>
                        <Disclosure.Panel className="my-2 text-sm font-medium ">
                            <div className='pl-11 pr-2 text-gray-900 hover:text-purple-800 cursor-pointer py-2'>Zones de livraison</div>
                            <div className='pl-11 pr-2 text-gray-900 hover:text-purple-800 cursor-pointer py-2'>Mode de livraison</div>
                            <div className='pl-11 pr-2 text-gray-900 hover:text-purple-800 cursor-pointer py-2'>Livreurs</div>

                        </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>

                <div className="text-xs font-medium text-gray-400 capitalise pl-4 pt-2">GESTION DES CLIENTS</div>

                <li>
                    <a href="#" className="flex items-center py-2 px-4 text-base font-medium text-gray-900 hover:text-purple-800 border-l-2 border-white hover:border-purple-500 hover:bg-gradient-to-r hover:from-purple-50 hover:to-fuchsia-50 hover:bg-opacity-5">
                        <GroupBoldIcon  customClass="w-4 h-4" />
                        <span className="ml-3">Clients</span>
                    </a>
                </li>

                <li>
                    <a href="#" className="flex items-center py-2 px-4 text-base font-medium text-gray-900 hover:text-purple-800 border-l-2 border-white hover:border-purple-500 hover:bg-gradient-to-r hover:from-purple-50 hover:to-fuchsia-50 hover:bg-opacity-5">
                        <EnvelopeBoldIcon  customClass="w-4 h-4" />
                        <span className="ml-3">Messages</span>
                    </a>
                </li>

                <li>
                    <a href="#" className="flex items-center py-2 px-4 text-base font-medium text-gray-900 hover:text-purple-800 border-l-2 border-white hover:border-purple-500 hover:bg-gradient-to-r hover:from-purple-50 hover:to-fuchsia-50 hover:bg-opacity-5">
                        <CarnetBoldIcon  customClass="w-4 h-4" />
                        <span className="ml-3">Carnet d'adresse</span>
                    </a>
                </li>

                <div className="text-xs font-medium text-gray-400 capitalise pl-4 pt-2">ADMINISTRATION</div>


                <Disclosure as="li" className="mt-2">
                    {({ open }) => (
                        <>
                        <Disclosure.Button className={`${open ? 'text-purple-800 border-purple-500 bg-gradient-to-r from-purple-50 to-fuchsia-50 bg-opacity-5' : 'border-white text-gray-900'} w-full flex justify-between py-2 px-4 text-base font-medium border-l-2 hover:text-purple-800 hover:border-purple-500 hover:bg-gradient-to-r hover:from-purple-50 hover:to-fuchsia-50 hover:bg-opacity-5`} >
                            <a href="#" className="flex items-center ">
                                <SettingsBoldIcon customClass="w-4 h-4" />
                                <span className="ml-3">Paramètres</span>
                            </a>
                            <ChevronDownIcon className={`${open ? 'transform rotate-180' : ''} w-5 h-5 self-center`}/>
                        </Disclosure.Button>
                        <Disclosure.Panel className="my-2 text-sm font-medium ">
                            <div className='pl-11 pr-2 text-gray-900 hover:text-purple-800 cursor-pointer py-2'>Utilisateurs</div>
                            <div className='pl-11 pr-2 text-gray-900 hover:text-purple-800 cursor-pointer py-2'>Roles</div>
                            <div className='pl-11 pr-2 text-gray-900 hover:text-purple-800 cursor-pointer py-2'>Permissions</div>

                        </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>



            </ul>

        </div>

    </aside>
        
  );
}
