import { useState } from 'react'
import Link from 'next/link'
import Header from '../../components/common/header'
import Sidebar from '../../components/common/sidebar'
import { motion } from "framer-motion";
import HeadInfo from '../../components/common/headinfo'
import { Tab } from '@headlessui/react'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

export default function Index() {

  return (
    <div className="app-container h-screen bg-gray-200 bg-opacity-40">

        <HeadInfo title= 'Dashboard' description='description here'/>
        <Header/>

        <div className='w-full px-6 py-6 flex flex-row justify-between'>

            <Sidebar />
            
            <div className='app-body'>

            <div className='w-full h-full'>

                <Tab.Group >

                    <Tab.List className="flex space-x-1 border-b border-gray-500 border-opacity-50">

                            <Tab className={({ selected }) =>classNames('w-full py-2 text-base md:text-base leading-5 font-medium rounded-t-lg mb-minus1 tracking-normal','focus:outline-none focus:ring-0 ring-opacity-0', selected ? 'text-purple-800 bg-white shadow-sm' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-600 border-white ring-white')}>
                                Catégories
                            </Tab>

                            <Tab className={({ selected }) =>classNames('w-full py-2 text-base md:text-base leading-5 font-medium rounded-t-lg mb-minus1 tracking-normal','focus:outline-none focus:ring-0 ring-opacity-0', selected ? 'text-purple-800 bg-white shadow-sm' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-600 border-white ring-white')}>
                                Sous-Catégories
                            </Tab>

                        
                    </Tab.List>

                    <Tab.Panels className='h-full'>
                            <Tab.Panel key={1} className={classNames('','bg-white h-full focus:outline-none focus:ring-0 ring-opacity-0')}>

                                <div className='w-full h-full'>

                                </div>

                            </Tab.Panel>

                            <Tab.Panel key={2} className={classNames('','bg-white h-full focus:outline-none focus:ring-0 ring-opacity-0')}>

                                <div className='w-full h-full'>

                                </div>

                            </Tab.Panel>
                    </Tab.Panels>

                </Tab.Group>

            </div>

            </div>

        </div>

    </div>
  )
}
