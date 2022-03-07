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
        <Header/>

        <div className='w-full px-6 py-6 flex flex-row justify-between'>

            <Sidebar />
            
            <div className='app-body overflow-y-auto'>

            </div>

        </div>

    </div>
  )
}
