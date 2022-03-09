import { useState } from 'react'
import Link from 'next/link'
import Header from '../../components/common/header'
import Sidebar from '../../components/common/sidebar'
import { motion } from "framer-motion";
import HeadInfo from '../../components/common/headinfo'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

export default function Index() {

  return (
    <div className="app-container h-screen">

        <HeadInfo title= 'Utilsateurs' description='description here'/>

        <Header/>

        <div className='w-full px-4 py-4 flex flex-row'>

        <Sidebar />


        </div>

    </div>
  )
}
