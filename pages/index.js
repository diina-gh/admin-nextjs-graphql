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
    <div className="app-container h-screen">

        <HeadInfo title= 'Dashboard' description='description here'/>
        <Header />

        <div className='w-full px-6 py-6 flex flex-row justify-between'>

            <Sidebar />
            
            <div className='app-body0 bg-opacity-0'>

                <div className="w-full h-full grid grid-cols-4 grid-flow-row gap-2">

                    <div className='col-span-3 h-full overflow-y-auto pr-2'>

                        <div className='h-36 grid grid-cols-3 grid-flow-row gap-4'>

                            <div className='h-full bg-purple-200 bg-opacity-70 rounded-xl shadow shadow-purple-200/50'>
                            </div>

                            <div className='h-full bg-red-200 bg-opacity-70 rounded-xl shadow shadow-red-200/50'>
                            </div>

                            <div className='h-full bg-amber-200 bg-opacity-70 rounded-xl shadow shadow-amber-200/50'>
                            </div>

                        </div>

                        <div className='w-full h-56 bg-white rounded-xl shadow mt-4'>
                        </div>

                        <div className='w-full h-56 bg-white rounded-xl shadow mt-4'>
                        </div>

                    </div>

                    <div className='app-rightbar bg-white rounded-xl'>

                    </div>
    
                </div>

            </div>

        </div>

    </div>
  )
}
