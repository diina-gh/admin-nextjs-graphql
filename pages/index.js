import { useState } from 'react'
import Link from 'next/link'
import Header from '../components/common/header'
import Sidebar from '../components/common/sidebar'
import { motion } from "framer-motion";
import HeadInfo from '../components/common/headinfo'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

export default function Home() {

  return (
    <div className="app-container h-screen bg-gray-200 bg-opacity-40">

        <HeadInfo title= 'Dashboard' description='description here'/>
        <Header />

        <div className='w-full px-6 py-6 flex flex-row justify-between'>

            <Sidebar />
            
            <div className='app-body'>

                <div class="w-full h-full grid grid-cols-4 grid-flow-row gap-2">

                    <div className='col-span-3 h-full overflow-y-auto pr-2'>

                        <div className='h-36 grid grid-cols-3 grid-flow-row gap-4'>

                            <div className='h-full bg-blue-200 bg-opacity-60 rounded-xl gt-shadow2'>
                            </div>

                            <div className='h-full bg-red-200 bg-opacity-60 rounded-xl gt-shadow2'>
                            </div>

                            <div className='h-full bg-amber-200 bg-opacity-60 rounded-xl gt-shadow2'>
                            </div>

                        </div>

                        <div className='w-full h-56 bg-white rounded-xl gt-shadow2 mt-4'>
                        </div>

                        <div className='w-full h-56 bg-white rounded-xl gt-shadow2 mt-4'>
                        </div>

                    </div>

                    <div className='app-leftbar bg-white rounded-xl'>

                    </div>
    
                </div>

            </div>

        </div>

    </div>
  )
}