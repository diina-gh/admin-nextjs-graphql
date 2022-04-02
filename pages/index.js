import { useState } from 'react'
import Link from 'next/link'
import Header from '../components/common/header'
import Sidebar from '../components/common/sidebar'
import { motion } from "framer-motion";
import HeadInfo from '../components/common/headinfo'
import Cookies from 'js-cookie'


export async function getServerSideProps(context) {
    return {
      props: {},
    }
}

export default function Home({userId}) {

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

                            <motion.div initial={{ opacity: 0.65, y: ( Math.random() * 2 * 5) }} whileInView={{ opacity: 1, y: 0, transition: { duration: 1.05 }, }}>
                                <div className='h-full bg-purple-200 bg-opacity-95 rounded-xl shadow shadow-purple-200/50'>
                                </div>
                            </motion.div>

                            <motion.div initial={{ opacity: 0.55, y: ( Math.random() * 3 * 5) }} whileInView={{ opacity: 1, y: 0, transition: { duration: 1.05 }, }}>
                                <div className='h-full bg-red-200 rounded-xl shadow shadow-red-200/50'>
                                </div>
                            </motion.div>

                            <motion.div initial={{ opacity: 0.45, y: ( Math.random() * 4 * 5) }} whileInView={{ opacity: 1, y: 0, transition: { duration: 1.05 }, }}>
                                <div className='h-full bg-amber-200 rounded-xl shadow shadow-amber-200/50'>
                                </div>
                            </motion.div>
                    
                        </div>

                        <motion.div initial={{ opacity: 0.5, y: ( Math.random() * 2 * 5) }} whileInView={{ opacity: 1, y: 0, transition: { duration: 1.05 }, }}>
                            <div className='w-full h-56 bg-white rounded-xl shadow mt-4'>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0.5, y: ( Math.random() * 3 * 5) }} whileInView={{ opacity: 1, y: 0, transition: { duration: 1.05 }, }}>
                            <div className='w-full h-56 bg-white rounded-xl shadow mt-4'>
                            </div>
                        </motion.div>


                    </div>

                    <div className='app-rightbar bg-white rounded-xl px-2 py-2'>
                        {/* <div className='text-sm font-medium'>userId: <span className='text-green-500'>{userId}</span></div> */}

                    </div>
    
                </div>

            </div>

        </div>

    </div>
  )
}
