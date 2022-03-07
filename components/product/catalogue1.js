import React, { useRef, useState } from "react";
import { Tab } from '@headlessui/react'
import Product from "./product";
import { motion } from "framer-motion";

const products = [

    {
        id: 1,
        name: 'Macbook Pro',
        category: 'Oridnateurs',
        price: '780 000 CFA',
        image: "images/product/product1.png",
    },
    {
        id: 2,
        name: 'Ipad Air',
        category: 'Tablette',
        price: '575 000 CFA',
        image: "images/product/product4.png",
    },
    {
        id: 3,
        name: 'Iphone 13 Pro',
        category: 'Phone',
        price: '880 000 CFA',
        image: "images/product/product3.png",
    },
    {
        id: 4,
        name: 'Smart Watch',
        category: 'Smart Watch',
        price: '450 000 CFA',
        image: "images/product/product5.png",
    },
    {
        id: 5,
        name: 'Homepod mini',
        category: 'Acessories',
        price: '265 000 CFA',
        image: "images/product/product6.png",
    },
    {
        id: 6,
        name: 'Airpod Pro',
        category: 'Acessories',
        price: '140 000 CFA',
        image: "images/product/product7.png",
    }

]


  
export default function Catalogue1(props) {

    let [categories] = useState({

        Téléphone: [
          {
            id: 1,
            title: 'Does drinking coffee make you smarter?',
            date: '5h ago',
            commentCount: 5,
            shareCount: 2,
          },
          {
            id: 2,
            title: "So you've bought coffee... now what?",
            date: '2h ago',
            commentCount: 3,
            shareCount: 2,
          },
        ],
    
        Tablette: [
          {
            id: 1,
            title: 'Is tech making coffee better or worse?',
            date: 'Jan 7',
            commentCount: 29,
            shareCount: 16,
          },
          {
            id: 2,
            title: 'The most innovative things happening in coffee',
            date: 'Mar 19',
            commentCount: 24,
            shareCount: 12,
          },
        ],
    
        Ordinateur: [
          {
            id: 1,
            title: 'Ask Me Anything: 10 answers to your questions about coffee',
            date: '2d ago',
            commentCount: 9,
            shareCount: 5,
          },
          {
            id: 2,
            title: "The worst advice we've ever heard about coffee",
            date: '4d ago',
            commentCount: 1,
            shareCount: 2,
          },
        ],
    
        Montre: [
          {
            id: 1,
            title: 'Ask Me Anything: 10 answers to your questions about coffee',
            date: '2d ago',
            commentCount: 9,
            shareCount: 5,
          },
          {
            id: 2,
            title: "The worst advice we've ever heard about coffee",
            date: '4d ago',
            commentCount: 1,
            shareCount: 2,
          },
        ],
    
    })

  return (
    <section className="w-full gt-bg3 py-16 px-4 sm:px-16 md:px-20 lg:px-24 xl:px-28 2xl:px-48">

        <div className='w-full text-center text-gtpurple2 text-2xl md:text-3xl lg:text-4xl font-semibold leading-loose tracking-normal'>NOS PRODUITS</div>

        <div className="w-full px-2 py-10 md:py-12 sm:px-0">

            <Tab.Group>

                <Tab.List className="flex space-x-1 border-b border-gray-500 border-opacity-50">
                    {Object.keys(categories).map((category) => (
                        <Tab
                        key={category}
                        className={({ selected }) =>
                            classNames(
                            'w-full py-2 md:py-4 text-sm md:text-lg leading-5 font-medium rounded-t-lg mb-minus1 tracking-normal',
                            'focus:outline-none focus:ring-0 ring-opacity-0',
                            selected
                                ? 'text-gtpurple2 bg-gray-400 bg-opacity-30 shadow-sm border-b gt-border1'
                                : 'text-gray-300 hover:bg-gray-400 hover:bg-opacity-10 hover:text-gray-200'
                            )
                        }
                        >
                        {category}
                        </Tab>
                    ))}
                </Tab.List>

                <Tab.Panels className="mt-10">
                    {Object.values(categories).map((posts, idx) => (
                        <Tab.Panel key={idx} className={classNames('bg-opacity-0','focus:outline-none focus:ring-0 ring-opacity-0')}>

                            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 sm:gap-10 md:grid-cols-4 md:gap-6">

                                {products.map((item, i) => (
                                    <div key={i}>
                                      
                                        <Product product={item} />
                                    </div>
                                ))}

                            </div>

                        </Tab.Panel>
                    ))}
                </Tab.Panels>

            </Tab.Group>

        </div>

    </section>
  );
}


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}