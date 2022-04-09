import { useState, PureComponent } from 'react'
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
import { EyeIcon } from '@heroicons/react/solid';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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

const data = [
    {
      "name": "Janvier",
      "uv": 4000,
      "pv": 2400,
      "amt": 2400
    },
    {
      "name": "Février",
      "uv": 3000,
      "pv": 1398,
      "amt": 2210
    },
    {
      "name": "Mars",
      "uv": 2000,
      "pv": 9800,
      "amt": 2290
    },
    {
      "name": "Avril",
      "uv": 2780,
      "pv": 3908,
      "amt": 2000
    },
    {
      "name": "Mai",
      "uv": 1890,
      "pv": 4800,
      "amt": 2181
    },
    {
      "name": "Juin",
      "uv": 2390,
      "pv": 3800,
      "amt": 2500
    },
    {
      "name": "Juillet",
      "uv": 3490,
      "pv": 4300,
      "amt": 2100
    },
    {
        "name": "Aout",
        "uv": 3690,
        "pv": 4250,
        "amt": 2300
      }
  ]

  const commandes = [
    {
      "id": "C03289",
      "date": "09/04/2022",
      "total": "75 500 CFA",
      "client": "Oumou GUEYE",
      "status": "Livrée"
    },
    {
        "id": "C03290",
        "date": "09/04/2022",
        "total": "25 000 CFA",
        "client": "Moussa Sarr",
        "status": "En cours"
    },
    {
        "id": "C03292",
        "date": "8/04/2022",
        "total": "63 450 CFA",
        "client": "Fatima Diop",
        "status": "Livrée"
    },
    {
        "id": "C03292",
        "date": "8/04/2022",
        "total": "40 500 CFA",
        "client": "Fatima Diop",
        "status": "Livrée"
    },
    {
        "id": "C03293",
        "date": "08/04/2022",
        "total": "15 00 CFA",
        "client": "Karen Ndiaye",
        "status": "Restituée"
    },
    {
        "id": "C03292",
        "date": "07/04/2022",
        "total": "10 000 CFA",
        "client": "Lamine Diop",
        "status": "Livrée"
    },

  ]

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
                            <div className='w-full bg-white rounded-xl shadow flex flex-col py-4 mt-4'>
                                <div className='w-full px-4 text-base font-semibold'>Evolution des commandes</div>
                                <div className='w-full pr-4 h-52 mt-3 text-xs font-medium text-gray-800'>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart  width={730} height={250} data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#8e24aa" stopOpacity={0.8}/>
                                                    <stop offset="95%" stopColor="#8e24aa" stopOpacity={0}/>
                                                </linearGradient>
                                                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#43a047" stopOpacity={0.8}/>
                                                    <stop offset="95%" stopColor="#43a047" stopOpacity={0}/>
                                                </linearGradient>
                                            </defs>
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <CartesianGrid strokeDasharray="1 1" />
                                            <Tooltip />
                                            <Area type="monotone" dataKey="uv" stroke="#8e24aa" fillOpacity={1} fill="url(#colorUv)" />
                                            <Area type="monotone" dataKey="pv" stroke="#43a047" fillOpacity={1} fill="url(#colorPv)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                    
                                </div>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0.5, y: ( Math.random() * 2 * 5) }} whileInView={{ opacity: 1, y: 0, transition: { duration: 1.05 }, }}>
                            <div className='w-full bg-white rounded-xl shadow flex flex-col py-4 mt-4'>
                                <div className='w-full px-4 text-base font-semibold'>Dernières commandes</div>
                                <div className='w-full px-4 mt-3 text-xs font-medium text-gray-800'>
                                    <table className="min-w-full divide-y divide-gray-200 border-b border-gray-200">
                                        <thead className="th-bg-1 sticky top-0 ">
                                            <tr>
                                                <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                                                    N#
                                                </th>
                                                <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider" >
                                                    Date
                                                </th>

                                                <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider" >
                                                    Montant
                                                </th>

                                                <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider" >
                                                    Client
                                                </th>

                                                <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider" >
                                                    Status
                                                </th>

                                            </tr>
                                        </thead>

                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {commandes.map((item, i) => (
                                                <tr key={item.id} className={(i%2==0) ? "" : "bg-gray-100 bg-opacity-50"}>
                                                    
                                                    <td className="px-6 py-3 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{item.id}</div>
                                                    </td>

                                                    <td className="px-6 py-3 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{item.date}</div>
                                                    </td>

                                                    <td className="px-6 py-3 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{item.total}</div>
                                                    </td>

                                                    <td className="px-6 py-3 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{item.client}</div>
                                                    </td>

                                                    <td className="px-6 py-3 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{item.status}</div>
                                                    </td>

                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className='w-full px-4 mt-4 text-right text-sm font-semibold underline text-purple-600 hover:text-purple-800 cursor-pointer transition duration-700 ease-in-out'>Liste des commandes</div>
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
