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
import PaymentBoldIcon from '../ui/icons/paymentBoldIcon';
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'

export function Navigation(){

    const router = useRouter();

    return(
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
                                <div className='pl-11 pr-2 text-gray-900 hover:text-purple-800 cursor-pointer py-2 duration-700 ease-in-out '> Exemple 1</div>
                            </Link>
                            <Link  href='/' >
                                <div className='pl-11 pr-2 text-gray-900 hover:text-purple-800 cursor-pointer py-2 duration-700 ease-in-out '> Exemple 2</div>
                            </Link>
                            <Link  href='/' >
                                <div className='pl-11 pr-2 text-gray-900 hover:text-purple-800 cursor-pointer py-2 duration-700 ease-in-out '> Exemple 3</div>
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

                <Disclosure as="li" className="mt-2">
                    {({ open }) => (
                        <>
                        <Disclosure.Button className={`${open || router.asPath.indexOf('/paiements') != -1 || router.asPath.indexOf('/modes_de_paiement') != -1 ? 'text-purple-800 border-purple-500 bg-gradient-to-r from-purple-50 to-fuchsia-50 bg-opacity-5' : 'border-white text-gray-900'} w-full flex justify-between py-2 px-4 text-base font-medium border-l-2 hover:text-purple-800 hover:border-purple-500 hover:bg-gradient-to-r hover:from-purple-50 hover:to-fuchsia-50 hover:bg-opacity-5`} >
                            <a  className="flex items-center ">
                                <PaymentBoldIcon customClass="w-4 h-4" />
                                <span className="ml-3">Paiements</span>
                            </a>
                            <ChevronDownIcon className={`${open  ? 'transform rotate-180' : ''} w-5 h-5 self-center`}/>
                        </Disclosure.Button>
                        <Disclosure.Panel className="my-2 text-sm font-medium ">
                            <Link  href='/paiements' >
                                <div className='pl-11 pr-2 text-gray-900 hover:text-purple-800 cursor-pointer py-2 duration-700 ease-in-out '>Paiements</div>
                            </Link>
                            <Link  href='/modes_de_paiement' >
                                <div className='pl-11 pr-2 text-gray-900 hover:text-purple-800 cursor-pointer py-2 duration-700 ease-in-out '>Modes de paiement</div>
                            </Link>
                        </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>

                <Link  href='/categories' >
                    <li>
                        <a  className={`${(router.asPath === '/categories' || router.asPath === '/categories/form') ? 'text-purple-800 border-purple-500 bg-gradient-to-r from-purple-50 to-fuchsia-50 bg-opacity-5' : 'border-white text-gray-900'} flex items-center py-2 px-4 text-base font-medium border-l-2 hover:text-purple-800 hover:border-purple-500 hover:bg-gradient-to-r hover:from-purple-50 hover:to-fuchsia-50 hover:bg-opacity-5 cursor-pointer duration-700 ease-in-out `}>
                            <LetterBoldIcon customClass="w-4 h-4" />
                            <span className="ml-3">Catégories</span>
                        </a>
                    </li>
                </Link>

                <Disclosure as="li" className="mt-2">
                    {({ open }) => (
                        <>
                        <Disclosure.Button className={`${open || router.asPath.indexOf('/produits') != -1 || router.asPath.indexOf('/marques') != -1 || router.asPath.indexOf('/variants') != -1 ? 'text-purple-800 border-purple-500 bg-gradient-to-r from-purple-50 to-fuchsia-50 bg-opacity-5' : 'border-white text-gray-900'} w-full flex justify-between py-2 px-4 text-base font-medium border-l-2 hover:text-purple-800 hover:border-purple-500 hover:bg-gradient-to-r hover:from-purple-50 hover:to-fuchsia-50 hover:bg-opacity-5`} >
                            <a  className="flex items-center ">
                                <LaptopBoldIcon customClass="w-4 h-4" />
                                <span className="ml-3">Produits</span>
                            </a>
                            <ChevronDownIcon className={`${open  ? 'transform rotate-180' : ''} w-5 h-5 self-center`}/>
                        </Disclosure.Button>
                        <Disclosure.Panel className="my-2 text-sm font-medium ">
                            <Link  href='/produits' >
                                <div className='pl-11 pr-2 text-gray-900 hover:text-purple-800 cursor-pointer py-2 duration-700 ease-in-out '> Produits</div>
                            </Link>
                            <Link  href='/stock' >
                                <div className='pl-11 pr-2 text-gray-900 hover:text-purple-800 cursor-pointer py-2 duration-700 ease-in-out '> Stockage</div>
                            </Link>
                            <Link  href='/marques' >
                                <div className='pl-11 pr-2 text-gray-900 hover:text-purple-800 cursor-pointer py-2 duration-700 ease-in-out '> Marques</div>
                            </Link>
                            <Link  href='/variants' >
                                <div className='pl-11 pr-2 text-gray-900 hover:text-purple-800 cursor-pointer py-2 duration-700 ease-in-out '> Variants</div>
                            </Link>
                        </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>

                <Disclosure as="li" className="mt-2">
                    {({ open }) => (
                        <>
                        <Disclosure.Button className={`${open || router.asPath === '/zones_de_livraison' || router.asPath === '/modes_de_livraison' || router.asPath === '/livreurs' || router.asPath === '/livreurs/form' || router.asPath === '/modes_de_livraison/form' || router.asPath === '/zones_de_livraison/form' ? 'text-purple-800 border-purple-500 bg-gradient-to-r from-purple-50 to-fuchsia-50 bg-opacity-5' : 'border-white text-gray-900'} w-full flex justify-between py-2 px-4 text-base font-medium border-l-2 hover:text-purple-800 hover:border-purple-500 hover:bg-gradient-to-r hover:from-purple-50 hover:to-fuchsia-50 hover:bg-opacity-5`} >
                            <a  className="flex items-center ">
                                <BoxBoldIcon customClass="w-4 h-4" />
                                <span className="ml-3">Livraisons</span>
                            </a>
                            <ChevronDownIcon className={`${open  ? 'transform rotate-180' : ''} w-5 h-5 self-center`}/>
                        </Disclosure.Button>
                        <Disclosure.Panel className="my-2 text-sm font-medium ">
                            <Link  href='/livraisons' >
                                <div className='pl-11 pr-2 text-gray-900 hover:text-purple-800 cursor-pointer py-2 duration-700 ease-in-out '> Livraisons</div>
                            </Link>
                            <Link  href='/zones_de_livraison' >
                                <div className='pl-11 pr-2 text-gray-900 hover:text-purple-800 cursor-pointer py-2 duration-700 ease-in-out '> Zones de livraison</div>
                            </Link>
                            <Link  href='/modes_de_livraison' >
                                <div className='pl-11 pr-2 text-gray-900 hover:text-purple-800 cursor-pointer py-2 duration-700 ease-in-out '> Modes de livraison</div>
                            </Link>
                            <Link  href='/livreurs' >
                                <div className='pl-11 pr-2 text-gray-900 hover:text-purple-800 cursor-pointer py-2 duration-700 ease-in-out '> Livreurs</div>
                            </Link>
                        </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>

                <div className="text-xs font-medium text-gray-400 capitalise pl-4 pt-2">GESTION DES CLIENTS</div>

                <Link  href='/clients' >
                    <li>
                        <a  className={`${(router.asPath === '/clients' || router.asPath === '/clients/form') ? 'text-purple-800 border-purple-500 bg-gradient-to-r from-purple-50 to-fuchsia-50 bg-opacity-5' : 'border-white text-gray-900'} flex items-center py-2 px-4 text-base font-medium border-l-2 hover:text-purple-800 hover:border-purple-500 hover:bg-gradient-to-r hover:from-purple-50 hover:to-fuchsia-50 hover:bg-opacity-5 cursor-pointer duration-700 ease-in-out `}>
                            <GroupBoldIcon  customClass="w-4 h-4" />
                            <span className="ml-3">Clients</span>
                        </a>
                    </li>
                </Link>

                <Link  href='/messages' >
                    <li>
                        <a  className={`${(router.asPath === '/messages') ? 'text-purple-800 border-purple-500 bg-gradient-to-r from-purple-50 to-fuchsia-50 bg-opacity-5' : 'border-white text-gray-900'} flex justify-between py-2 px-4 text-base font-medium border-l-2 hover:text-purple-800 hover:border-purple-500 hover:bg-gradient-to-r hover:from-purple-50 hover:to-fuchsia-50 hover:bg-opacity-5 cursor-pointer duration-700 ease-in-out `}>
                            <div className='flex items-center'>
                                <EnvelopeBoldIcon  customClass="w-4 h-4" />
                                <span className="ml-3">Messages</span>
                            </div>
                            <div className='flex flex-row justify-center bg-gray-900 bg-opacity-90 h-[1.35rem] w-[1.35rem] rounded-full self-center'>
                                <div className='text-white text-[0.6rem] font-medium self-center'>4</div>
                            </div>
                        </a>
                    </li>
                </Link>

                <Link  href='/newsletters' >  
                    <li>
                        <a  className={`${(router.asPath === '/newsletters') ? 'text-purple-800 border-purple-500 bg-gradient-to-r from-purple-50 to-fuchsia-50 bg-opacity-5' : 'border-white text-gray-900'} flex items-center py-2 px-4 text-base font-medium border-l-2 hover:text-purple-800 hover:border-purple-500 hover:bg-gradient-to-r hover:from-purple-50 hover:to-fuchsia-50 hover:bg-opacity-5 cursor-pointer duration-700 ease-in-out `}>
                            <CarnetBoldIcon  customClass="w-4 h-4" />
                            <span className="ml-3">Carnet d&#039;adresse</span>
                        </a>
                    </li>
                </Link>

                <div className="text-xs font-medium text-gray-400 capitalise pl-4 pt-2">ADMINISTRATION</div>

                <Disclosure as="li" className="mt-2">
                    {({ open }) => (
                        <>
                        <Disclosure.Button className={`${open || router.asPath === '/utilisateurs' || router.asPath === '/roles' || router.asPath === '/permissions' || router.asPath === '/utilisateurs/form' || router.asPath === '/roles/form'  || router.asPath === '/permissions/form'  ? 'text-purple-800 border-purple-500 bg-gradient-to-r from-purple-50 to-fuchsia-50 bg-opacity-5' : 'border-white text-gray-900'} w-full flex justify-between py-2 px-4 text-base font-medium border-l-2 hover:text-purple-800 hover:border-purple-500 hover:bg-gradient-to-r hover:from-purple-50 hover:to-fuchsia-50 hover:bg-opacity-5`} >
                            <a  className="flex items-center ">
                                <SettingsBoldIcon customClass="w-4 h-4" />
                                <span className="ml-3">Paramètres</span>
                            </a>
                            <ChevronDownIcon className={`${open ? 'transform rotate-180' : ''} w-5 h-5 self-center`}/>
                        </Disclosure.Button>
                        <Disclosure.Panel className="my-2 text-sm font-medium ">
                            <Link  href='/utilisateurs' >
                                <div className='pl-11 pr-2 text-gray-900 hover:text-purple-800 cursor-pointer py-2 duration-700 ease-in-out '> Utilisateurs</div>
                            </Link>
                            <Link  href='/roles' >
                                <div className='pl-11 pr-2 text-gray-900 hover:text-purple-800 cursor-pointer py-2 duration-700 ease-in-out '> Roles</div>
                            </Link>
                            <Link  href='/permissions' >
                                <div className='pl-11 pr-2 text-gray-900 hover:text-purple-800 cursor-pointer py-2 duration-700 ease-in-out '> Permissions</div>
                            </Link>
                        </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>

            </ul>

        </div>
    )

}

export default function Sidebar() {
  return (
    <aside className="app-sidebar w-60 py-4 bg-white rounded-xl z-10 hidden md:block" aria-label="Sidebar">
        <Navigation />
    </aside>  
  );
}


export function SideNav({onOpenChange, open}) {

    return (
      <Transition.Root show={open} as={Fragment}>
  
          <Dialog as="div" className="fixed inset-0 overflow-hidden sz-30" onClose={() => onOpenChange(false)}>
  
              <div className="absolute inset-0 overflow-hidden">
  
                  <Transition.Child as={Fragment} enter="ease-in-out duration-500" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in-out duration-500" leaveFrom="opacity-100" leaveTo="opacity-0">
                      <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                  </Transition.Child>
  
                  <div className="fixed inset-y-0 left-0 max-w-full flex pr-10">
  
                      <Transition.Child as={Fragment} enter="transform transition ease-in-out duration-500 sm:duration-700" enterFrom="-translate-x-full" enterTo="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leaveFrom="translate-x-0" leaveTo="-translate-x-full">
  
                          <div className="w-screen max-w-[18rem]">
  
                              <div className="h-full flex flex-col bg-white">
  
                                  <div className="flex items-start justify-between h-16 px-4 sm:px-6">
                                      <Dialog.Title className="text-xl xl:text-2xl font-bold text-gray-800 self-center">Untitled</Dialog.Title>
                                      <div className="ml-3 h-7 flex items-center self-center">
                                          <button type="button" className="-m-2 p-2 text-gray-700 hover:text-gray-300" onClick={() => onOpenChange(false)}>
                                              <span className="sr-only">Close panel</span>
                                              <XIcon className="h-6 w-6" aria-hidden="true" />
                                          </button>
                                      </div>
                                  </div>
  
                                  <div className="border-t border-gray-200 border-opacity-40 py-6 sidebar-items-height overflow-auto overflow-y-scroll">
                                    <Navigation />
                                  </div>
  
                              </div>
  
                          </div>
  
                      </Transition.Child>
                  </div>
              
              </div>
  
          </Dialog>
  
      </Transition.Root>
    );
  }
  
