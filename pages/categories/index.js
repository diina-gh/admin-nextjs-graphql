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

                <div className='w-full'>

                    <Tab.Group >

                        <Tab.List className="flex space-x-1 border-b border-gray-200 border-opacity-50 w-full">

                                <Tab className={({ selected }) =>classNames('w-full py-3 text-base leading-5 font-medium rounded-t-xl mb-minus1 tracking-normal','focus:outline-none focus:ring-0 ring-opacity-0', selected ? 'text-purple-800 bg-white shadow-sm' : 'text-gray-400 hover:bg-gray-100 hover:text-purple-600')}>
                                    Catégories
                                </Tab>

                                <Tab className={({ selected }) =>classNames('w-full py-3 text-base leading-5 font-medium rounded-t-xl mb-minus1 tracking-normal','focus:outline-none focus:ring-0 ring-opacity-0', selected ? 'text-purple-800 bg-white shadow-sm' : 'text-gray-400 hover:bg-gray-100 hover:text-purple-600')}>
                                    Sous-Catégories
                                </Tab>

                            
                        </Tab.List>

                        <Tab.Panels className='app-subbody2'>
                                <Tab.Panel key={1} className={classNames('','bg-white h-full focus:outline-none focus:ring-0 ring-opacity-0 rounded-b-xl ')}>

                                    <div className='w-full h-full rounded-b-xl overflow-y-scroll'>

                                    </div>

                                </Tab.Panel>

                                <Tab.Panel key={2} className={classNames('','bg-white h-full focus:outline-none focus:ring-0 ring-opacity-0 rounded-b-xl ')}>

                                    <div className='w-full h-full rounded-b-xl overflow-y-scroll'>

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
