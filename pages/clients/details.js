import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from "framer-motion";
import Header from '../../components/common/header'
import Sidebar from '../../components/common/sidebar'
import HeadInfo from '../../components/common/headinfo'
import { DotsHorizontalIcon } from '@heroicons/react/solid';
import EnvelopeBoldIcon from '../../components/ui/icons/envelopeBoldIcon';
import PhoneIcon from '../../components/ui/icons/phoneIcon';
import EnvelopeIcon from '../../components/ui/icons/envelopeIcon';
import MarkerIcon from '../../components/ui/icons/markerIcon';
import { xof } from '../../libs/util';
import { Pagination } from "react-pagination-bar"
import 'react-pagination-bar/dist/index.css'
import ChevronLeftIcon from '../../components/ui/icons/chevronLeftIcon';
import ChevronRightIcon from '../../components/ui/icons/chevronRightIcon';
import DoubleChevronLeftIcon from '../../components/ui/icons/doubleChevronLeftIcon';
import DoubleChevronRightIcon from '../../components/ui/icons/doubleChevronRightIcon';
import GroupBoldIcon from '../../components/ui/icons/groupBoldIcon';




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


export default function Index() {

    return (
        <div className="app-container h-screen">

            <HeadInfo title= 'Dashboard' description='description here'/>
            <Header/>

            <div className='w-full pt-3 px-3 md:px-6 flex flex-row justify-between'>

                <Sidebar />

                <motion.div initial={{ opacity: 0.45, x: -150 }}  whileInView={{ opacity: 1, x: 0, transition: { duration: 0.60 }, }}>
                    <div className='app-body rounded-xl'>

                        <div className='w-full h-full bg-white rounded-xl overflow-y-hidden overflow-x-hidden pt-4 pb-3'>

                            <div className='w-full flex flex-row justify-between mt-2 px-6'>
                                <div className='flex flex-col'>
                                    <div className='flex flex-row'>
                                        <div className='text-lg font-bold text-purple-600 mr-2 self-center'>Madame Oumou GUEYE</div>
                                        <div className="text-[14px] self-center">
                                        </div> 
                                    </div>
                                    <div className='text-[12.5px] font-semibold text-gray-500 ml-0.5'>crée le 23/04/2022 à 13:45</div>
                                </div>
                                <div className='bg-gray-100 bg-opacity-50 rounded-xl px-2 py-1 h-max'>
                                    <DotsHorizontalIcon className='text-black w-[1.15rem]' />
                                </div>
                            </div>

                            <div className='w-full app-details overflow-y-scroll mt-4'>

                                <div className='w-full overflow-hidden grid grid-cols-4 grid-flow-row gap-4 px-6'>

                                    <motion.div initial={{ opacity: 0.35, x:-100 }} whileInView={{ opacity: 1, x: 0, transition: { duration: 1.05 }, }}>
                                        <div className='h-72 bg-gray-200 bg-opacity-50 shadow-sm rounded-xl pt-8 px-3'>

                                            <div className='w-full flex flex-row justify-center'>
                                                <div className='w-[4rem] h-[4rem] bg-gradient-to-r from-violet-600 to-purple-600 hover:scale-105 flex-shrink-0 item-image-2 rounded-full border-opacity-80 transition duration-700 ease-in-out cursor-pointer mr-2' >
                                                    <div className='image-layer-2 bg-white rounded-full'>
                                                        <img className="rounded-full object-cover w-full h-full" src={1 == 1 ? '../images/avatar2.jpg': ''} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='w-full px-3 text-center mt-4 text-[16px] font-semibold text-purple-600'>Oumou GUEYE</div>

                                            <div className='flex flex-row justify-center mt-1 px-3'>
                                                <div className="text-[12.75px] font-semibold text-gray-800 self-center">oumougueye025@gmail.com</div>
                                            </div>

                                            <div className='w-full flex flex-row justify-center mt-1 px-3'>
                                                <div className='w-4 h-4 text-gray-800 self-center -mb-1 mr-1'>
                                                    <PhoneIcon costumClass="w-full h-full" />
                                                </div>
                                                <div className="text-[12.75px] font-semibold text-gray-800 self-center">+221 78 123 49 97</div>
                                            </div>

                                            <div className='w-full px-3'>
                                                <div className='divider w-full h-[1px] bg-gray-400 bg-opacity-30 my-4'></div>
                                            </div>

                                            <div className='w-full flex flex-row justify-center px-3'>
                                                <div className='w-full bg-red-600 text-white py-2 rounded-md text-center text-[12.5px] font-semibold btn-effect1'>Désactiver</div>
                                            </div>


                                        </div>
                                    </motion.div>

                                    <motion.div initial={{ opacity: 0.35, y:-125 }} whileInView={{ opacity: 1, y: 0, transition: { duration: 1.05 }, }}>
                                        <div className='h-72 bg-gray-200 bg-opacity-50 shadow-sm rounded-xl pt-5 px-3'>

                                            <div className='w-full ptext-[16.5px] font-semibold text-purple-600'>Autres informations</div>
                                            <div className='divider w-full h-[1px] bg-gray-400 bg-opacity-30 mt-2 mb-4'></div>

                                            <div className='w-full flex flex-row bg-white bg-opacity-90 rounded-md shadow-sm py-3 px-3 mb-3'>
                                                <div className='w-9 h-9 rounded-full flex flex-row justify-center bg-orange-600 self-center -mb-1 mr-2'>
                                                    <div className='w-4 h-4 text-white self-center'><PhoneIcon costumClass="w-full h-full" /></div>
                                                </div>
                                                <div className='w-9/12 flex flex-col self-center'>
                                                    <div className="w-full truncate text-[12.5px] font-semibold text-gray-900">Téléphone</div>
                                                    <div className="w-full truncate text-[11px] font-medium text-gray-600">+221 78 123 49 97</div>
                                                </div>
                                            </div>

                                            <div className='w-full flex flex-row bg-white bg-opacity-90 rounded-md shadow-sm py-3 px-3 mb-3'>
                                                <div className='w-9 h-9 rounded-full flex flex-row justify-center bg-pink-600 self-center -mb-1 mr-2'>
                                                    <div className='w-4 h-4 text-white self-center'><MarkerIcon costumClass="w-full h-full" /></div>
                                                </div>
                                                <div className='w-9/12 flex flex-col self-center'>
                                                    <div className="w-full truncate text-[12.5px] font-semibold text-gray-900">Adresse</div>
                                                    <div className="w-full truncate text-[11px] font-medium text-gray-600">Cité Diamalaye II, Villa 60E</div>
                                                </div>
                                            </div>

                                            <div className='w-full flex flex-row bg-white bg-opacity-90 rounded-md shadow-sm py-3 px-3 mb-3'>
                                                <div className='w-9 h-9 rounded-full flex flex-row justify-center bg-cyan-600 self-center -mb-1 mr-2'>
                                                    <div className='w-4 h-4 text-white self-center'><MarkerIcon costumClass="w-full h-full" /></div>
                                                </div>
                                                <div className='w-9/12 flex flex-col self-center'>
                                                    <div className="w-full truncate text-[12.5px] font-semibold text-gray-900">Ville</div>
                                                    <div className="w-full truncate text-[11px] font-medium text-gray-600">Dakar, Sénégal</div>
                                                </div>
                                            </div>

                                        </div>
                                    </motion.div>

                                    <div className='flex flex-col'>
                                        <motion.div initial={{ opacity: 0.35, y: -50 }} whileInView={{ opacity: 1, y: 0, transition: { duration: 1.05 }, }}>
                                            <div className='w-full h-[8.485rem] bg-gray-200 bg-opacity-50 shadow-sm rounded-xl mb-4'>
                                                <div className='h-full rounded-xl flex flex-col justify-between px-3 py-4 cursor-pointer'>

                                                    <div className='flex flex-row'>
                                                        <div className='w-7 h-7 rounded-lg bg-purple-600 flex flex-row justify-center self-center mr-2'>
                                                            <div className='self-center'><GroupBoldIcon customClass="w-3 h-3 text-gray-100"/></div>
                                                        </div>
                                                        <div className='text-[1.05rem] font-semibold text-gray-900 self-center leading-5'>Commandes</div>
                                                    </div>

                                                    <div className='w-full flex flex-col'>
                                                        <div className='w-full text-right text-sm font-medium text-gray-900'> <span className='font-bold'>45 394</span> Utilisateurs</div>
                                                        <div className='w-full text-right text-[11px] font-medium text-gray-900 tracking-wide'> <span className='font-bold text-green-600'>▲ 3%</span> cette semaine</div>
                                                    </div>

                                                </div>
                                            </div>
                                        </motion.div>
                                        <motion.div initial={{ opacity: 0.35, y: 75 }} whileInView={{ opacity: 1, y: 0, transition: { duration: 1.05 }, }}>
                                            <div className='w-full h-[8.485rem] bg-gray-200 bg-opacity-50 shadow-sm rounded-xl'>
                                                <div className='h-full rounded-xl flex flex-col justify-between px-3 py-4 cursor-pointer'>

                                                    <div className='flex flex-row'>
                                                        <div className='w-7 h-7 rounded-lg  bg-amber-600 flex flex-row justify-center self-center mr-2'>
                                                            <div className='self-center'><GroupBoldIcon customClass="w-3 h-3 text-gray-100"/></div>
                                                        </div>
                                                        <div className='text-[1.05rem] font-semibold text-gray-900 self-center leading-5'>Total revenu</div>
                                                    </div>

                                                    <div className='w-full flex flex-col'>
                                                        <div className='w-full text-right text-sm font-medium text-gray-900'> <span className='font-bold'>45 394</span> Utilisateurs</div>
                                                        <div className='w-full text-right text-[11px] font-medium text-gray-900 tracking-wide'> <span className='font-bold text-green-600'>▲ 3%</span> cette semaine</div>
                                                    </div>

                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>

                                    <div className='flex flex-col'>
                                        <motion.div initial={{ opacity: 0.35, x:40 }} whileInView={{ opacity: 1, x: 0, transition: { duration: 1.05 }, }}>
                                            <div className='w-full h-[8.485rem] bg-gray-200 bg-opacity-50 shadow-sm rounded-xl mb-4'>
                                                <div className='h-full rounded-xl flex flex-col justify-between px-3 py-4 cursor-pointer'>

                                                    <div className='flex flex-row'>
                                                        <div className='w-7 h-7 rounded-lg bg-red-600 flex flex-row justify-center self-center mr-2'>
                                                            <div className='self-center'><GroupBoldIcon customClass="w-3 h-3 text-gray-100"/></div>
                                                        </div>
                                                        <div className='text-[1.05rem] font-semibold text-gray-900 self-center leading-5'>Vues</div>
                                                    </div>

                                                    <div className='w-full flex flex-col'>
                                                        <div className='w-full text-right text-sm font-medium text-gray-900'> <span className='font-bold'>45 394</span> Utilisateurs</div>
                                                        <div className='w-full text-right text-[11px] font-medium text-gray-900 tracking-wide'> <span className='font-bold text-green-600'>▲ 3%</span> cette semaine</div>
                                                    </div>

                                                </div>
                                            </div>
                                        </motion.div>
                                        <motion.div initial={{ opacity: 0.35, x:100 }} whileInView={{ opacity: 1, x: 0, transition: { duration: 1.05 }, }}>
                                            <div className='w-full h-[8.485rem] bg-gray-200 bg-opacity-50 shadow-sm rounded-xl'>
                                                <div className='h-full rounded-xl flex flex-col justify-between px-3 py-4 cursor-pointer'>

                                                    <div className='flex flex-row'>
                                                        <div className='w-7 h-7 rounded-lg bg-green-600 flex flex-row justify-center self-center mr-2'>
                                                            <div className='self-center'><GroupBoldIcon customClass="w-3 h-3 text-gray-100"/></div>
                                                        </div>
                                                        <div className='text-[1.05rem] font-semibold text-gray-900 self-center leading-5'>Likes</div>
                                                    </div>

                                                    <div className='w-full flex flex-col'>
                                                        <div className='w-full text-right text-sm font-medium text-gray-900'> <span className='font-bold'>45 394</span> Utilisateurs</div>
                                                        <div className='w-full text-right text-[11px] font-medium text-gray-900 tracking-wide'> <span className='font-bold text-green-600'>▲ 3%</span> cette semaine</div>
                                                    </div>

                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>

                                </div>

                                <motion.div initial={{ opacity: 0.5, y: ( Math.random() * 2 * 5) }} whileInView={{ opacity: 1, y: 0, transition: { duration: 1.05 }, }}>
                                    <div className='w-full flex flex-col mt-8 mb-1'>
                                        <div className='w-full px-6 text-base font-semibold'>Dernières commandes</div>
                                        <div className='w-full px-6 mt-3 text-xs font-medium text-gray-800'>
                                            <table className="min-w-full divide-y divide-gray-200 border-b border-gray-200">
                                                <thead className="th-bg-1 sticky top-0">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-2 text-left text-[11.5px] font-medium text-gray-800 uppercase tracking-wider">
                                                            N#
                                                        </th>
                                                        <th scope="col" className="px-6 py-2 text-left text-[11.5px] font-medium text-gray-800 uppercase tracking-wider" >
                                                            Date
                                                        </th>

                                                        <th scope="col" className="px-6 py-2 text-left text-[11.5px] font-medium text-gray-800 uppercase tracking-wider" >
                                                            Montant
                                                        </th>

                                                        <th scope="col" className="px-6 py-2 text-left text-[11.5px] font-medium text-gray-800 uppercase tracking-wider" >
                                                            Client
                                                        </th>

                                                        <th scope="col" className="px-6 py-2 text-left text-[11.5px] font-medium text-gray-800 uppercase tracking-wider" >
                                                            Status
                                                        </th>

                                                    </tr>
                                                </thead>

                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {commandes.map((item, i) => (
                                                        <tr key={item.id} className={(i%2==0) ? "cursor-pointer hover:bg-purple-50 transition duration-700 ease-in-out" : "bg-gray-100 bg-opacity-50 cursor-pointer hover:bg-purple-50 transition duration-700 ease-in-out"}>
                                                            
                                                            <td className="px-6 py-3 whitespace-nowrap">
                                                                <div className="text-[11.5px] text-gray-900">{item.id}</div>
                                                            </td>

                                                            <td className="px-6 py-3 whitespace-nowrap">
                                                                <div className="text-[11.5px] text-gray-900">{item.date}</div>
                                                            </td>

                                                            <td className="px-6 py-3 whitespace-nowrap">
                                                                <div className="text-[11.5px] text-gray-900">{item.total}</div>
                                                            </td>

                                                            <td className="px-6 py-3 whitespace-nowrap">
                                                                <div className="text-[11.5px] text-gray-900">{item.client}</div>
                                                            </td>

                                                            <td className="px-6 py-3 whitespace-nowrap">
                                                                <div className="text-sm text-gray-900">
                                                                    {item.status == 'Livrée' &&
                                                                        <span className="px-3 inline-flex text-[11px] leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                                            ● Livrée
                                                                        </span>
                                                                    }
                                                                    {item.status == 'En cours' &&
                                                                        <span className="px-2 inline-flex text-[11px] leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">
                                                                            ● En cours
                                                                        </span>
                                                                    }
                                                                    {item.status == 'Restituée' &&
                                                                        <span className="px-1.5 inline-flex text-[11px] leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                                            ● Restituée
                                                                        </span>
                                                                    }
                                                                </div>                                   
                                                            </td>

                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className='w-full flex flex-row justify-end px-6 mt-6'>
                                            <Pagination 
                                                initialPage={1} 
                                                itemsPerPage={10} 
                                                onPageСhange={(pageNumber) => console.log(pageNumber)} 
                                                totalItems={30}  
                                                pageNeighbours={2} 
                                                startLabel= {<DoubleChevronLeftIcon customClass="w-3 h-3"/>}
                                                endLabel={<DoubleChevronRightIcon customClass="w-3 h-3"/>}
                                                nextLabel={<ChevronRightIcon customClass="w-3 h-3"/>}
                                                prevLabel={<ChevronLeftIcon customClass="w-3 h-3"/>}
                                                customClassNames={{rpbItemClassName:'pg-btn', rpbItemClassNameActive:'pg-active-btn',}}
                                            />
                                        </div>
                                    </div>
                                </motion.div>

                            </div>

                        </div>

                    </div>
                </motion.div>
                

            </div>

        </div>
    )
}



