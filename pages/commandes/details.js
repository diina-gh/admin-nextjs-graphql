import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from "framer-motion";
import Header from '../../components/common/header'
import Sidebar from '../../components/common/sidebar'
import HeadInfo from '../../components/common/headinfo'
import { DotsHorizontalIcon } from '@heroicons/react/solid';


export default function Index() {

    return (
        <div className="app-container h-screen">

            <HeadInfo title= 'Dashboard' description='description here'/>
            <Header/>

            <div className='w-full pt-3 px-3 md:px-6 flex flex-row justify-between'>

                <Sidebar />

                <motion.div initial={{ opacity: 0.45, x: -150 }}  whileInView={{ opacity: 1, x: 0, transition: { duration: 0.60 }, }}>
                    <div className='app-body rounded-xl'>

                        <div className='w-full h-full bg-white rounded-xl overflow-y-scroll pt-4 pb-3'>

                            <div className='w-full flex flex-row justify-between mt-2 px-4'>
                                <div className='flex flex-col'>
                                    <div className='flex flex-row'>
                                        <div className='text-lg font-bold text-purple-600 mr-2 self-center'>#C89084</div>
                                        <div className="text-[14px] self-center">
                                            {1 == 1 &&
                                                <span className="px-2.5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    ● Livrée
                                                </span>
                                            }
                                            {1 == 2 &&
                                                <span className="px-2 font-semibold rounded-full bg-orange-100 text-orange-800">
                                                    ● En cours
                                                </span>
                                            }
                                            {1 == 2 &&
                                                    <span className="px-1.5 font-semibold rounded-full bg-red-100 text-red-800">
                                                    ● Restituée
                                                </span>
                                            }
                                        </div> 
                                    </div>
                                    <div className='text-[12.5px] font-semibold text-gray-500 ml-0.5'>23 Avril 2022 à 13:45</div>
                                </div>
                                <div className='bg-gray-100 bg-opacity-80 rounded-xl px-2 py-1 h-max'>
                                    <DotsHorizontalIcon className='text-black w-[1.15rem]' />
                                </div>
                            </div>

                            <div className='w-full grid grid-cols-11 grid-flow-row gap-5 px-4 mt-4'>

                                <div className='col-span-8 flex flex-col'>

                                    <div className='w-full bg-gray-200 bg-opacity-50 rounded-xl h-[28.5rem]'>

                                    </div>

                                </div>

                                <div className='col-span-3 bg-gray-200 bg-opacity-50 rounded-xl h-[20rem]'>
                                    
                                </div>

                            </div>
                            

                        </div>

                    </div>
                </motion.div>
                

            </div>

        </div>
    )
}



