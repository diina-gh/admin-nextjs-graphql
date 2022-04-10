import { useState, PureComponent } from 'react'
import Link from 'next/link'
import Header from '../components/common/header'
import Sidebar from '../components/common/sidebar'
import { motion, AnimatePresence } from "framer-motion";
import HeadInfo from '../components/common/headinfo'
import Cookies from 'js-cookie'
import { useDebouncedCallback } from 'use-debounce';
import GroupBoldIcon from '../components/ui/icons/groupBoldIcon';
import CarnetBoldIcon from '../components/ui/icons/carnetBoldIcon';
import LaptopBoldIcon from '../components/ui/icons/laptopBoldIcon';
import CartBoldIcon from '../components/ui/icons/cartBoldIcon';
import { EyeIcon } from '@heroicons/react/solid';
import { CurrencyDollarIcon } from '@heroicons/react/solid';
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
                                    <motion.div initial={{ opacity: 0.95, x: ( Math.random() * 2 * 1) }} whileInView={{ opacity: 1, x: 0, transition: { duration: 1.05 }, }}>
                                        <div className='h-[8.25rem] bg-amber-200 bg-opacity-95 rounded-xl shadow shadow-purple-200/50 flex flex-col justify-between px-3 py-4 cursor-pointer'>

                                            <div className='flex flex-row'>
                                                <div className='w-7 h-7 rounded-lg bg-black flex flex-row justify-center self-center mr-2'>
                                                    <div className='self-center'><GroupBoldIcon customClass="w-3 h-3 text-gray-100"/></div>
                                                </div>
                                                <div className='text-[1.05rem] font-semibold text-gray-900 self-center leading-5'>Clients</div>
                                            </div>

                                            <div className='w-full flex flex-col'>
                                                <div className='w-full text-right text-sm font-medium text-gray-900'> <span className='font-bold'>45 394</span> Utilisateurs</div>
                                                <div className='w-full text-right text-[11px] font-medium text-gray-900 tracking-wide'> <span className='font-bold text-green-600'>▲ 3%</span> cette semaine</div>
                                            </div>

                                        </div>
                                    </motion.div>
                                </SwiperSlide>
                                <SwiperSlide className="slide-type3">
                                    <motion.div initial={{ opacity: 0.95, x: ( Math.random() * 3 * 1) }} whileInView={{ opacity: 1, x: 0, transition: { duration: 1.05 }, }}>
                                        <div className='h-[8.25rem] bg-red-200 rounded-xl shadow shadow-red-200/50 flex flex-col justify-between px-3 py-4 cursor-pointer'>

                                            <div className='flex flex-row'>
                                                <div className='w-7 h-7 rounded-lg bg-black flex flex-row justify-center self-center mr-2'>
                                                    <div className='self-center'><LaptopBoldIcon customClass="w-3 h-3 text-gray-100"/></div>
                                                </div>
                                                <div className='text-[1.05rem] font-semibold text-gray-900 self-center leading-5'>Produits</div>
                                            </div>

                                            <div className='w-full flex flex-col'>
                                                <div className='w-full text-right text-sm font-medium text-gray-900'> <span className='font-bold'>261</span> Produits</div>
                                                <div className='w-full text-right text-[11px] font-medium text-gray-900 tracking-wide'> <span className='font-bold text-green-600'>+56</span> options disponibles</div>
                                            </div>

                                        </div>
                                    </motion.div>
                                </SwiperSlide>
                                <SwiperSlide className="slide-type3">
                                    <motion.div initial={{ opacity: 0.95, x: ( Math.random() * 3 * 1) }} whileInView={{ opacity: 1, x: 0, transition: { duration: 1.05 }, }}>
                                        <div className='h-[8.25rem] bg-purple-200 rounded-xl shadow shadow-amber-200/50 flex flex-col justify-between px-3 py-4 cursor-pointer'>

                                            <div className='flex flex-row'>
                                                <div className='w-7 h-7 rounded-lg bg-black flex flex-row justify-center self-center mr-2'>
                                                    <div className='self-center'><CartBoldIcon customClass="w-3 h-3 text-gray-100"/></div>
                                                </div>
                                                <div className='text-[1.05rem] font-semibold text-gray-900 self-center leading-5'>Commandes sur place</div>
                                            </div>

                                            <div className='w-full flex flex-col'>
                                                <div className='w-full text-right text-sm font-medium text-gray-900'> <span className='font-bold'>645 005</span> Commandes</div>
                                                <div className='w-full text-right text-[11px] font-medium text-gray-900 tracking-wide'> <span className='font-bold text-green-600'>▲ 6%</span> cette semaine</div>
                                            </div>

                                        </div>
                                    </motion.div>
                                </SwiperSlide>
                                <SwiperSlide className="slide-type3">
                                    <motion.div initial={{ opacity: 0.95, x: ( Math.random() * 2 * 1) }} whileInView={{ opacity: 1, x: 0, transition: { duration: 1.05 }, }}>
                                        <div className='h-[8.25rem] bg-green-300 rounded-xl shadow shadow-blue-200/50 flex flex-col justify-between px-3 py-4 cursor-pointer'>

                                            <div className='flex flex-row'>
                                                <div className='w-7 h-7 rounded-lg bg-black flex flex-row justify-center self-center mr-2'>
                                                    <div className='self-center'><CartBoldIcon customClass="w-3 h-3 text-gray-100"/></div>
                                                </div>
                                                <div className='text-[1.05rem] font-semibold text-gray-900 self-center leading-5'>Commandes en ligne</div>
                                            </div>

                                            <div className='w-full flex flex-col'>
                                                <div className='w-full text-right text-sm font-medium text-gray-900'> <span className='font-bold'>845 734</span> Commandes</div>
                                                <div className='w-full text-right text-[11px] font-medium text-gray-900 tracking-wide'> <span className='font-bold text-green-600'>▲ 14%</span> cette semaine</div>
                                            </div>

                                        </div>
                                    </motion.div>
                                </SwiperSlide>
                                <SwiperSlide className="slide-type3">
                                    <motion.div initial={{ opacity: 0.95, x: ( Math.random() * 3 * 1) }} whileInView={{ opacity: 1, x: 0, transition: { duration: 1.05 }, }}>
                                        <div className='h-[8.25rem] bg-blue-200 rounded-xl shadow shadow-blue-200/50 flex flex-col justify-between px-3 py-4 cursor-pointer'>

                                            <div className='flex flex-row'>
                                                <div className='w-7 h-7 rounded-lg bg-black flex flex-row justify-center self-center mr-2'>
                                                    <div className='self-center'><CarnetBoldIcon customClass="w-3 h-3 text-gray-100"/></div>
                                                </div>
                                                <div className='text-[1.05rem] font-semibold text-gray-900 self-center leading-5'>Newsletters</div>
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
                            <div className='w-full bg-white rounded-xl shadow flex flex-col py-5 mt-4'>
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
                                                    <stop offset="5%" stopColor="#388e3c" stopOpacity={0.8}/>
                                                    <stop offset="95%" stopColor="#388e3c" stopOpacity={0}/>
                                                </linearGradient>
                                            </defs>
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <CartesianGrid strokeDasharray="1 1" />
                                            <Tooltip />
                                            <Area type="monotone" dataKey="uv" stroke="#8e24aa" fillOpacity={1} fill="url(#colorUv)" />
                                            <Area type="monotone" dataKey="pv" stroke="#388e3c" fillOpacity={1} fill="url(#colorPv)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                    
                                </div>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0.5, y: ( Math.random() * 2 * 5) }} whileInView={{ opacity: 1, y: 0, transition: { duration: 1.05 }, }}>
                            <div className='w-full bg-white rounded-xl shadow flex flex-col py-5 mt-4'>
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

                    <div className='app-rightbar bg-white overflow-y-scroll rounded-xl py-4'>

                        <div className='px-4 flex flex-col'>
                            <div className='flex flex-row justify-between'>
                                <div className='text-[14px] font-semibold'>Chiffre d&#39;affaire</div>
                            </div>

                            <div className='flex flex-row justify-between rounded-lg bg-gray-200 bg-opacity-80 shadow-sm py-2 px-2 mt-3'>
                                <div className='flex flex-row '>
                                    <div className='w-6 h-6 rounded-lg bg-purple-600 bg-opacity-50 shadow-sm shadow-purple-600 flex flex-row justify-center self-center mr-2'>
                                        <div className='self-center'><CurrencyDollarIcon className="w-4 h-4 text-gray-900"/></div>
                                    </div>
                                    <div className='text-[13.5px] font-semibold text-gray-900 self-center leading-5'>Sur place</div>
                                </div>
                                <div className='text-[13.5px] font-semibold text-gray-900 self-center leading-5'>975 683 CFA</div>
                            </div>

                            <div className='flex flex-row justify-between rounded-lg bg-gray-200 bg-opacity-80 shadow-sm py-2 px-2 mt-2'>
                                <div className='flex flex-row '>
                                    <div className='w-6 h-6 rounded-lg bg-green-600 bg-opacity-50 shadow-sm shadow-green-600 flex flex-row justify-center self-center mr-2'>
                                        <div className='self-center'><CurrencyDollarIcon className="w-4 h-4 text-gray-900"/></div>
                                    </div>
                                    <div className='text-[13.5px] font-semibold text-gray-900 self-center leading-5'>En ligne</div>
                                </div>
                                <div className='text-[13.5px] font-semibold text-gray-900 self-center leading-5'>975 683 CFA</div>
                            </div>

                            <div className='flex flex-row justify-between rounded-lg bg-gray-200 bg-opacity-80 shadow-sm py-2 px-2 mt-2'>
                                <div className='flex flex-row '>
                                    <div className='w-6 h-6 rounded-lg bg-orange-600 bg-opacity-50 shadow-sm shadow-orange-600 flex flex-row justify-center self-center mr-2'>
                                        <div className='self-center'><CurrencyDollarIcon className="w-4 h-4 text-gray-900"/></div>
                                    </div>
                                    <div className='text-[13.5px] font-semibold text-gray-900 self-center leading-5'>Total</div>
                                </div>
                                <div className='text-[13.5px] font-semibold text-gray-900 self-center leading-5'>975 683 CFA</div>
                            </div>
                        </div>

                        <div className='px-4'><div className='divider w-full h-[1px] bg-gray-400 bg-opacity-40 mt-3 mb-3'></div></div>

                        <div className='flex flex-col px-4'>
                            <div className='flex flex-row justify-between'>
                                <div className='text-[14px] font-semibold'>Précieux clients</div>
                                <div className='text-[12px] font-medium underline cursor-pointer self-center text-purple-600 hover:text-purple-400 transition duration-700'>Tout voir</div>
                            </div>
                            <div className='w-full flex flex-row justify-between mt-3'>
                                <div className='w-full flex flex-row'>
                                    <div className='w-10 h-10 rounded-full shadow-sm bg-gray-200 border-[2px] border-yellow-800 relative cursor-pointer mr-2'>
                                        <img className='w-full h-full rounded-full object-cover' src="https://firebasestorage.googleapis.com/v0/b/trade-d57de.appspot.com/o/images%2Floader%2Fpexels-godisable-jacob-718978%20(1).jpg?alt=media&token=f82c3070-8d29-48d5-aa46-feeb6690f921" />
                                        <div className='w-3.5 h-3.5 hover:animate-pulse rounded-full bg-yellow-800 absolute -bottom-0.5 right-0 flex flex-row justify-center cursor-pointer'>
                                            <div className='self-center text-white text-[10px] -mt-[1px] animate-none z-10'>★</div>
                                        </div>
                                    </div>
                                    <div className='w-24 flex flex-col justify-between py-1'>
                                        <div className='text-[12px] font-semibold w-full truncate hover:text-purple-600 cursor-pointer'>Oumou GUEYE</div>
                                        <div className='text-[10px] font-medium text-green-600  w-full truncate'>10 commandes</div>
                                    </div>
                                </div>
                                <div className='w-32 flex flex-col justify-between self-center py-1'>
                                    <div className='text-[12px] font-medium text-gray-600 text-right'>Total</div>
                                    <div className='text-[11px] font-semibold text-black-900 text-right w-full truncate'>8 456 000 CFA</div>
                                </div>
                            </div>
                            <div className='w-full flex flex-row justify-between mt-3'>
                                <div className='w-full flex flex-row'>
                                    <div className='w-10 h-10 shadow-sm rounded-full bg-gray-200 mr-2'>
                                        <img className='w-full h-full rounded-full object-cover' src="https://firebasestorage.googleapis.com/v0/b/trade-d57de.appspot.com/o/images%2Floader%2Fpexels-alexander-jay-11650772%20(1).jpg?alt=media&token=f9af52ce-6010-415d-9d2c-3ec4e2f856a1" />
                                    </div>
                                    <div className='w-24 flex flex-col justify-between py-1'>
                                        <div className='text-[12px] font-semibold w-full truncate'>Moussa Sarr</div>
                                        <div className='text-[10px] font-medium text-green-600  w-full truncate'>8 commandes</div>
                                    </div>
                                </div>
                                <div className='w-32 flex flex-col justify-between self-center py-1'>
                                    <div className='text-[12px] font-medium text-gray-600 text-right'>Total</div>
                                    <div className='text-[11px] font-semibold text-black-900 text-right w-full truncate'>4 456 300 CFA</div>
                                </div>
                            </div>
                            <div className='w-full flex flex-row justify-between mt-3'>
                                <div className='w-full flex flex-row'>
                                    <div className='w-10 h-10 shadow-sm rounded-full bg-gray-200 mr-2'>
                                        <img className='w-full h-full rounded-full object-cover' src="https://firebasestorage.googleapis.com/v0/b/trade-d57de.appspot.com/o/images%2Floader%2Fpexels-andrea-piacquadio-3872328%20(1).jpg?alt=media&token=d2a7298b-1db6-4c60-8988-63aab0db39ff" />
                                    </div>
                                    <div className='w-24 flex flex-col justify-between py-1'>
                                        <div className='text-[12px] font-semibold w-full truncate'>Fatima Diop</div>
                                        <div className='text-[10px] font-medium text-green-600  w-full truncate'>5 commandes</div>
                                    </div>
                                </div>
                                <div className='w-32 flex flex-col justify-between self-center py-1'>
                                    <div className='text-[12px] font-medium text-gray-600 text-right'>Total</div>
                                    <div className='text-[11px] font-semibold text-black-900 text-right w-full truncate'>1 965 500 CFA</div>
                                </div>
                            </div>
                            <div className='w-full flex flex-row justify-between mt-3'>
                                <div className='w-full flex flex-row'>
                                    <div className='w-10 h-10 shadow-sm rounded-full bg-gray-200 mr-2'>
                                        <img className='w-full h-full object-cover rounded-full ' src="https://firebasestorage.googleapis.com/v0/b/trade-d57de.appspot.com/o/images%2Floader%2Fpexels-antoni-shkraba-6827105%20(1).jpg?alt=media&token=92fbff49-aaf1-4d6f-ad35-3529a28be17b" />
                                    </div>
                                    <div className='w-24 flex flex-col justify-between py-1'>
                                        <div className='text-[12px] font-semibold w-full truncate'>Antoni Sankaré</div>
                                        <div className='text-[10px] font-medium text-green-600  w-full truncate'>3 commandes</div>
                                    </div>
                                </div>
                                <div className='w-32 flex flex-col justify-between self-center py-1'>
                                    <div className='text-[12px] font-medium text-gray-600 text-right'>Total</div>
                                    <div className='text-[11px] font-semibold text-black-900 text-right w-full truncate'>345 000 CFA</div>
                                </div>
                            </div>
                        </div>

                        <div className='px-4'><div className='divider w-full h-[1px] bg-gray-400 bg-opacity-40 mt-3 mb-3'></div></div>

                        <div className='flex flex-col px-4'>
                            <div className='flex flex-row justify-between'>
                                <div className='text-[14px] font-semibold'>Top des produits</div>
                                <div className='text-[12px] font-medium underline cursor-pointer self-center text-purple-600 hover:text-purple-400 transition duration-700'></div>
                            </div>
                            <div className='mt-2'>
                                <Swiper className='w-full h-full swiper-type3' spaceBetween={18} slidesPerView={4} loop={true} speed={1000} freeMode={true} autoplay={true}  modules={[FreeMode, Navigation]} >
                                    <SwiperSlide className="slide-type3 py-0.5">
                                        <div className='relative h-full'>
                                            <div className='item-image-1 bg-gradient-to-r from-violet-600 to-purple-600 hover:scale-110 rounded-full border-opacity-80 self-center' >
                                                <div className='image-layer-2 rounded-full'>
                                                    <div className='image-layer-3'>
                                                        <img src="https://firebasestorage.googleapis.com/v0/b/trade-d57de.appspot.com/o/images%2Fproduct_152?alt=media&token=102fe3bd-c0d0-430e-b7da-d6bf523555d7"  />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='absolute -top-0 -left-0.5 w-4 h-4 bg-amber-700 hover:bg-amber-800 rounded-full flex flex-row justify-center shadow-sm'>
                                                <div className='text-[10px] text-white'>1</div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide className="slide-type3 py-0.5">
                                        <div className='relative h-full'>
                                            <div className='item-image-1 bg-gradient-to-r from-violet-600 to-purple-600 hover:scale-110 rounded-full border-opacity-80 self-center' >
                                                <div className='image-layer-2 rounded-full'>
                                                    <div className='image-layer-3'>
                                                        <img src="https://firebasestorage.googleapis.com/v0/b/trade-d57de.appspot.com/o/images%2Fproduct_175?alt=media&token=d2dbab00-d7fe-4dfa-a8a3-4c603031555f"  />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='absolute -top-0 -left-0.5 w-4 h-4 bg-amber-700 hover:bg-amber-800 rounded-full flex flex-row justify-center shadow-sm'>
                                                <div className='text-[10px] text-white'>2</div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide className="slide-type3 py-0.5">
                                        <div className='relative h-full'>
                                            <div className='item-image-1 bg-gradient-to-r from-violet-600 to-purple-600 hover:scale-110 rounded-full border-opacity-80 self-center' >
                                                <div className='image-layer-2 rounded-full'>
                                                    <div className='image-layer-3'>
                                                        <img src="https://firebasestorage.googleapis.com/v0/b/trade-d57de.appspot.com/o/images%2Fproduct_143?alt=media&token=856134bb-7679-409a-8bfe-b7eab3f2a433"  />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='absolute -top-0 -left-0.5 w-4 h-4 bg-amber-700 hover:bg-amber-800 rounded-full flex flex-row justify-center shadow-sm'>
                                                <div className='text-[10px] text-white'>3</div>
                                            </div>
                                        </div>
                                    </SwiperSlide>

                                    <SwiperSlide className="slide-type3 py-0.5">
                                        <div className='relative h-full'>
                                            <div className='item-image-1 bg-gradient-to-r from-violet-600 to-purple-600 hover:scale-110 rounded-full border-opacity-80 self-center' >
                                                <div className='image-layer-2 rounded-full'>
                                                    <div className='image-layer-3'>
                                                        <img src="https://firebasestorage.googleapis.com/v0/b/trade-d57de.appspot.com/o/images%2Fproduct_214?alt=media&token=2f2452f8-1d6a-4d0f-9cad-2d2e25c48f52"  />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='absolute -top-0 -left-0.5 w-4 h-4 bg-amber-700 hover:bg-amber-800 rounded-full flex flex-row justify-center shadow-sm'>
                                                <div className='text-[10px] text-white'>4</div>
                                            </div>
                                        </div>
                                    </SwiperSlide>

                                    <SwiperSlide className="slide-type3 py-0.5">
                                        <div className='relative h-full'>
                                            <div className='item-image-1 bg-gradient-to-r from-violet-600 to-purple-600 hover:scale-110 rounded-full border-opacity-80 self-center' >
                                                <div className='image-layer-2 rounded-full'>
                                                    <div className='image-layer-3'>
                                                        <img src="https://firebasestorage.googleapis.com/v0/b/trade-d57de.appspot.com/o/images%2Fproduct_165?alt=media&token=e5d682ba-57cd-43e4-9a10-3a918c912ef2"  />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='absolute -top-0 -left-0.5 w-4 h-4 bg-amber-700 hover:bg-amber-800 rounded-full flex flex-row justify-center shadow-sm'>
                                                <div className='text-[10px] text-white'>5</div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    
                                </Swiper>
                            </div>
                        </div>

                    </div>
    
                </div>

            </div>

        </div>

    </div>
  )
}
