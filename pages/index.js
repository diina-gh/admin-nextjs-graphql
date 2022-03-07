import { useState } from 'react'
import Link from 'next/link'
import Header from '../components/common/header'
import Sidebar from '../components/common/sidebar'
import { motion } from "framer-motion";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

export default function Home() {

  return (
    <div className="app-container h-screen bg-gray-200 bg-opacity-40">
        <Header/>

        <div className='w-full px-4 py-4 flex flex-row'>

        <motion.div initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0, transition: { duration: 0.60 }, }}>
            <Sidebar />
        </motion.div>


        </div>

    </div>
  )
}
