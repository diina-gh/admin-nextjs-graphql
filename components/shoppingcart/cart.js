import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import Item from './item'

const products = [
    {
      id: 1,
      name: 'Macbook Pro',
      href: '#',
      color: 'Gris',
      price: '780 000 CFA',
      quantity: 1,
      imageSrc: 'images/product/product1.png',
      imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
    },
    {
      id: 2,
      name: 'Ipad Air',
      href: '#',
      color: 'Rose',
      price: '880 000 CFA',
      quantity: 1,
      imageSrc: 'images/product/product4.png',
      imageAlt:
        'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
    },
    {
        id: 3,
        name: 'Iphone 13 Pro',
        href: '#',
        color: 'Gris',
        price: '575 000 CFA',
        quantity: 1,
        imageSrc: 'images/product/product3.png',
        imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
    },
    {
        id: 4,
        name: 'Airpod Pro',
        href: '#',
        color: 'Blanc',
        price: '140 000 CFA',
        quantity: 1,
        imageSrc: 'images/product/product7.png',
        imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
    },
    // More products...
  ]

export default function Cart({onOpenChange, open}) {  

  return (
    <Transition.Root show={open} as={Fragment}>

        <Dialog as="div" className="fixed inset-0 overflow-hidden z-30" onClose={() => onOpenChange(false)}>

            <div className="absolute inset-0 overflow-hidden">

                <Transition.Child as={Fragment} enter="ease-in-out duration-500" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in-out duration-500" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">

                    <Transition.Child as={Fragment} enter="transform transition ease-in-out duration-500 sm:duration-700" enterFrom="translate-x-full" enterTo="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leaveFrom="translate-x-0" leaveTo="translate-x-full">

                        <div className="w-screen max-w-md">

                            <div className="h-full flex flex-col justify-between bg-gray-900 shadow-xl">

                                <div className="flex items-start justify-between h-16 px-4 sm:px-6">
                                    <Dialog.Title className="text-lg font-medium text-gray-100 self-center">Mon panier (3)</Dialog.Title>
                                    <div className="ml-3 h-7 flex items-center self-center">
                                        <button type="button" className="-m-2 p-2 text-gray-400 hover:text-gray-300" onClick={() => onOpenChange(false)}>
                                            <span className="sr-only">Close panel</span>
                                            <XIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>

                                <div className="my-0 py-2 cart-items-height overflow-y-auto overflow-y-scroll px-4 sm:px-6">
                                    <div className="flow-root">
                                        <ul role="list" className="-my-6 divide-y divide-gray-600">
                                        {products.map((product) => (
                                            <Item key={product.id} product={product} />
                                        ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="h-48 border-t border-gray-600 py-4 px-4 sm:px-6">

                                    <div className="flex justify-between text-base font-medium text-gray-100">
                                        <p>Sous total</p>
                                        <p>2 456 000 CFA</p>
                                    </div>

                                    <p className="mt-0.5 text-xs text-gray-400">Les frais de livraison et les taxes seront calculés lors de la commande.</p>

                                    <div className="mt-4">
                                        <a href="#" className="flex justify-center items-center px-6 py-3 rounded-lg shadow text-base font-medium text-white gt-bg-gradient">
                                            Commander
                                        </a>
                                    </div>

                                    <div className="mt-4 flex justify-center text-sm text-center text-gray-500">
                                        <p>
                                            ou{' '}
                                            <button
                                            type="button"
                                            className="text-indigo-300 font-medium hover:text-indigo-500"
                                            onClick={() => onOpenChange(false)}
                                            >
                                            Poursuivre vos achats<span aria-hidden="true"> &rarr;</span>
                                            </button>
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </Transition.Child>

                </div>

            </div>

        </Dialog>

    </Transition.Root>
  )
}
