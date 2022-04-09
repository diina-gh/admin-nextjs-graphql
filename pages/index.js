import { useState } from 'react'
import Link from 'next/link'
import Header from '../components/common/header'
import Sidebar from '../components/common/sidebar'
import { motion } from "framer-motion";
import HeadInfo from '../components/common/headinfo'
import Cookies from 'js-cookie'
import { useDebouncedCallback } from 'use-debounce';
import GroupBoldIcon from '../components/ui/icons/groupBoldIcon';
import CarnetBoldIcon from '../components/ui/icons/carnetBoldIcon';
import LaptopBoldIcon from '../components/ui/icons/laptopBoldIcon';
import CartBoldIcon from '../components/ui/icons/cartBoldIcon';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import 'swiper/css/pagination';
import "swiper/css/thumbs";
// import required modules
import SwiperCore, { Autoplay, FreeMode, Navigation, Pagination } from "swiper";

SwiperCore.use([Autoplay, Navigation, Pagination]);


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

        <div className='w-full px-6 py-3 flex flex-row justify-between'>

            <Sidebar />
            
            <div className='app-body0 bg-opacity-0'>

                <div className="w-full h-full grid grid-cols-4 grid-flow-row gap-2">

                    <div className='col-span-3 h-full overflow-y-auto pr-2'>

                        <div className='h-[8.25rem] w-full'>

                            <Swiper className='w-full h-full swiper-type3' spaceBetween={10} slidesPerView={3} loop={true} speed={5000} freeMode={true} autoplay={true}  modules={[FreeMode, Navigation]} >
                                <SwiperSlide className="slide-type3">
                                    <motion.div initial={{ opacity: 0.65, x: ( Math.random() * 2 * 5) }} whileInView={{ opacity: 1, x: 0, transition: { duration: 1.05 }, }}>
                                        <div className='h-[8.25rem]  bg-purple-200 bg-opacity-95 rounded-xl shadow shadow-purple-200/50 flex flex-col justify-between px-3 py-4 cursor-pointer'>

                                            <div className='flex flex-row'>
                                                <div className='w-8 h-8 rounded-xl bg-black flex flex-row justify-center self-center mr-2'>
                                                    <div className='self-center'><GroupBoldIcon customClass="w-4 h-4 text-gray-100"/></div>
                                                </div>
                                                <div className='text-[1.1rem] font-semibold text-gray-900 self-center leading-5'>Clients</div>
                                            </div>

                                            <div className='w-full flex flex-col'>
                                                <div className='w-full text-right text-sm font-medium text-gray-900'> <span className='font-bold'>45 394</span> Utilisateurs</div>
                                                <div className='w-full text-right text-[11px] font-medium text-gray-900 tracking-wide'> <span className='font-bold text-green-600'>▲ 3%</span> cette semaine</div>
                                            </div>

                                        </div>
                                    </motion.div>
                                </SwiperSlide>
                                <SwiperSlide className="slide-type3">
                                    <motion.div initial={{ opacity: 0.55, x: ( Math.random() * 3 * 5) }} whileInView={{ opacity: 1, x: 0, transition: { duration: 1.05 }, }}>
                                        <div className='h-[8.25rem] bg-red-200 rounded-xl shadow shadow-red-200/50 flex flex-col justify-between px-3 py-4 cursor-pointer'>

                                            <div className='flex flex-row'>
                                                <div className='w-8 h-8 rounded-xl bg-black flex flex-row justify-center self-center mr-2'>
                                                    <div className='self-center'><LaptopBoldIcon customClass="w-4 h-4 text-gray-100"/></div>
                                                </div>
                                                <div className='text-[1.1rem] font-semibold text-gray-900 self-center leading-5'>Produits</div>
                                            </div>

                                            <div className='w-full flex flex-col'>
                                                <div className='w-full text-right text-sm font-medium text-gray-900'> <span className='font-bold'>261</span> Produits</div>
                                                <div className='w-full text-right text-[11px] font-medium text-gray-900 tracking-wide'> <span className='font-bold text-green-600'>+56</span> options disponibles</div>
                                            </div>

                                        </div>
                                    </motion.div>
                                </SwiperSlide>
                                <SwiperSlide className="slide-type3">
                                    <motion.div initial={{ opacity: 0.45, x: ( Math.random() * 4 * 5) }} whileInView={{ opacity: 1, x: 0, transition: { duration: 1.05 }, }}>
                                        <div className='h-[8.25rem] bg-amber-200 rounded-xl shadow shadow-amber-200/50 flex flex-col justify-between px-3 py-4 cursor-pointer'>

                                            <div className='flex flex-row'>
                                                <div className='w-8 h-8 rounded-xl bg-black flex flex-row justify-center self-center mr-2'>
                                                    <div className='self-center'><CartBoldIcon customClass="w-4 h-4 text-gray-100"/></div>
                                                </div>
                                                <div className='text-[1.1rem] font-semibold text-gray-900 self-center leading-5'>Commandes sur place</div>
                                            </div>

                                            <div className='w-full flex flex-col'>
                                                <div className='w-full text-right text-sm font-medium text-gray-900'> <span className='font-bold'>645 005</span> Commandes</div>
                                                <div className='w-full text-right text-[11px] font-medium text-gray-900 tracking-wide'> <span className='font-bold text-green-600'>▲ 6%</span> cette semaine</div>
                                            </div>

                                        </div>
                                    </motion.div>
                                </SwiperSlide>
                                <SwiperSlide className="slide-type3">
                                    <motion.div initial={{ opacity: 0.45, x: ( Math.random() * 4 * 5) }} whileInView={{ opacity: 1, x: 0, transition: { duration: 1.05 }, }}>
                                        <div className='h-[8.25rem] bg-blue-200 rounded-xl shadow shadow-blue-200/50 flex flex-col justify-between px-3 py-4 cursor-pointer'>

                                            <div className='flex flex-row'>
                                                <div className='w-8 h-8 rounded-xl bg-black flex flex-row justify-center self-center mr-2'>
                                                    <div className='self-center'><CartBoldIcon customClass="w-4 h-4 text-gray-100"/></div>
                                                </div>
                                                <div className='text-[1.1rem] font-semibold text-gray-900 self-center leading-5'>Commandes en ligne</div>
                                            </div>

                                            <div className='w-full flex flex-col'>
                                                <div className='w-full text-right text-sm font-medium text-gray-900'> <span className='font-bold'>845 734</span> Commandes</div>
                                                <div className='w-full text-right text-[11px] font-medium text-gray-900 tracking-wide'> <span className='font-bold text-green-600'>▲ 14%</span> cette semaine</div>
                                            </div>

                                        </div>
                                    </motion.div>
                                </SwiperSlide>
                                <SwiperSlide className="slide-type3">
                                    <motion.div initial={{ opacity: 0.45, x: ( Math.random() * 4 * 5) }} whileInView={{ opacity: 1, x: 0, transition: { duration: 1.05 }, }}>
                                        <div className='h-[8.25rem] bg-orange-200 rounded-xl shadow shadow-blue-200/50 flex flex-col justify-between px-3 py-4 cursor-pointer'>

                                            <div className='flex flex-row'>
                                                <div className='w-8 h-8 rounded-xl bg-black flex flex-row justify-center self-center mr-2'>
                                                    <div className='self-center'><CarnetBoldIcon customClass="w-4 h-4 text-gray-100"/></div>
                                                </div>
                                                <div className='text-[1.1rem] font-semibold text-gray-900 self-center leading-5'>Newsletters</div>
                                            </div>

                                            <div className='w-full flex flex-col'>
                                                <div className='w-full text-right text-sm font-medium text-gray-900'> <span className='font-bold'>2 394</span> Utilisateurs</div>
                                                <div className='w-full text-right text-[11px] font-medium text-gray-900 tracking-wide'> <span className='font-bold text-green-600'>▲ 1%</span> cette semaine</div>
                                            </div>

                                        </div>
                                    </motion.div>
                                </SwiperSlide>
                            </Swiper>
                    
                        </div>

                        <motion.div initial={{ opacity: 0.5, y: ( Math.random() * 2 * 5) }} whileInView={{ opacity: 1, y: 0, transition: { duration: 1.05 }, }}>
                            <div className='w-full h-56 bg-white rounded-xl shadow mt-4'>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0.5, y: ( Math.random() * 3 * 5) }} whileInView={{ opacity: 1, y: 0, transition: { duration: 1.05 }, }}>
                            <div className='w-full h-56 bg-white rounded-xl shadow mt-4'>
                            </div>
                        </motion.div>

                        
                        <motion.div initial={{ opacity: 0.5, y: ( Math.random() * 3 * 5) }} whileInView={{ opacity: 1, y: 0, transition: { duration: 1.05 }, }}>
                            <div className='w-full h-56 bg-white rounded-xl shadow mt-4 mb-4'>
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
