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
import { xof } from '../../libs/util';


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
                                <div className='bg-gray-100 bg-opacity-50 rounded-xl px-2 py-1 h-max'>
                                    <DotsHorizontalIcon className='text-black w-[1.15rem]' />
                                </div>
                            </div>

                            <div className='w-full grid grid-cols-11 grid-flow-row gap-3 px-4 mt-4'>

                                <div className='col-span-8 pr-2 app-details overflow-y-scroll flex flex-col'>

                                    <div className='w-full bg-gray-100 bg-opacity-80 rounded-xl pt-4 pb-6'>

                                        <div className='mb-3 px-4 flex flex-row'>
                                            <div className='text-[16.5px] font-semibold text-purple-600 mr-1.5 self-center'>Panier</div>
                                            <div className='px-2 py-[0.45px] text-[10.5px] font-medium bg-gradient-to-r from-purple-700 to-purple-300 text-white rounded-xl self-center'>3</div>
                                        </div>

                                        <div className='w-full flex flex-col px-4 pt-2 mt-2'>

                                            <div className='w-full flex flex-row justify-between h-max px-1'>

                                                <div className='flex flex-row'>

                                                    <div className='w-16 h-16 rounded-full border-2 border-purple-600 bg-gray-300 self-center mr-5'>
                                                    </div>

                                                    <div className='self-center'>
                                                        <div className='w-full truncate text-[14px] font-semibold text-gray-900'>Apple MacBook Pro</div>
                                                        <div className='w-full truncate text-[12.5px] font-normal text-gray-700'>Ordinateur - Apple</div>
                                                        <div className='w-full flex flex-row mt-0.5'>
                                                            <div className='text-[12px] font-semibold mr-2'>Couleur: <span className='font-normal'>noir</span></div>
                                                            <div className='text-[12px] font-semibold'>Qte: <span className='font-normal'>2</span></div>
                                                        </div>
                                                    </div>

                                                </div>

                                                <div className='text-[12.5px] font-semibold self-center'>90.000 CFA</div>

                                                <div className='text-[12.5px] font-semibold self-center'>Qte: 2</div>

                                                <div className='text-[12.5px] font-semibold self-center'>180.000 CFA</div>

                                            </div>

                                            <div className='divider w-full h-[1px] bg-gray-400 bg-opacity-30 my-3'></div>

                                            <div className='w-full flex flex-row justify-between h-max px-1'>

                                                <div className='flex flex-row'>

                                                    <div className='w-16 h-16 rounded-full border-2 border-purple-600 bg-gray-300 self-center mr-5'>
                                                    </div>

                                                    <div className='self-center'>
                                                        <div className='w-full truncate text-[14px] font-semibold text-gray-900'>Apple MacBook Pro</div>
                                                        <div className='w-full truncate text-[12.5px] font-normal text-gray-700'>Ordinateur - Apple</div>
                                                        <div className='w-full flex flex-row mt-0.5'>
                                                            <div className='text-[12px] font-semibold mr-2'>Couleur: <span className='font-normal'>noir</span></div>
                                                            <div className='text-[12px] font-semibold'>Qte: <span className='font-normal'>2</span></div>
                                                        </div>
                                                    </div>

                                                </div>

                                                <div className='text-[12.5px] font-semibold self-center'>90.000 CFA</div>

                                                <div className='text-[12.5px] font-semibold self-center'>Qte: 2</div>

                                                <div className='text-[12.5px] font-semibold self-center'>180.000 CFA</div>

                                            </div>

                                            <div className='divider w-full h-[1px] bg-gray-400 bg-opacity-30 my-3'></div>

                                            <div className='w-full flex flex-row justify-between h-max px-1'>

                                                <div className='flex flex-row'>

                                                    <div className='w-16 h-16 rounded-full border-2 border-purple-600 bg-gray-300 self-center mr-5'>
                                                    </div>

                                                    <div className='self-center'>
                                                        <div className='w-full truncate text-[14px] font-semibold text-gray-900'>Apple MacBook Pro</div>
                                                        <div className='w-full truncate text-[12.5px] font-normal text-gray-700'>Ordinateur - Apple</div>
                                                        <div className='w-full flex flex-row mt-0.5'>
                                                            <div className='text-[12px] font-semibold mr-2'>Couleur: <span className='font-normal'>noir</span></div>
                                                            <div className='text-[12px] font-semibold'>Qte: <span className='font-normal'>2</span></div>
                                                        </div>
                                                    </div>

                                                </div>

                                                <div className='text-[12.5px] font-semibold self-center'>90.000 CFA</div>

                                                <div className='text-[12.5px] font-semibold self-center'>Qte: 2</div>

                                                <div className='text-[12.5px] font-semibold self-center'>180.000 CFA</div>

                                                </div>

                                        </div>

                                    </div>

                                    <div className='w-full grid grid-cols-2 gap-5 mt-5'>

                                        <div className='bg-gray-100 bg-opacity-80 rounded-xl px-4 pt-4 pb-6'>

                                            <div className='flex flex-col'>

                                                <div className='mb-4 flex flex-row'>
                                                    <div className='text-[16px] font-semibold text-purple-600 mr-1 self-center'>Récapitulatif</div>
                                                </div>

                                                <div className='text-[14px] font-medium flex flex-row justify-between mb-2'>
                                                    <div className='text-gray-800'>Sous total</div>
                                                    <div className='text-gray-900 self-center'>{xof(10000)}</div>
                                                </div>

                                                <div className='text-[14px] font-medium flex flex-row justify-between mb-2'>
                                                    <div className='text-gray-800'>Livraison</div>
                                                    <div className='text-gray-900 self-center'>{xof(650)}</div>
                                                </div>

                                                <div className='text-[14px] font-medium flex flex-row justify-between mb-2'>
                                                    <div className='text-gray-800'>Remise</div>
                                                    <div className='text-gray-900 self-center'>{xof(25)}</div>
                                                </div>

                                            </div>

                                            <div className='border-t border-gray-400 border-opacity-80 mt-4 mb-1'>
                                                <div className='w-full text-[14px] font-semibold flex flex-row justify-between pt-2'>
                                                    <div className='text-gray-800'>Total</div>
                                                    <div className='text-gray-900 self-center'>{xof(10675)}</div>
                                                </div>
                                            </div>

                                        </div>

                                        <div className='bg-gray-100 bg-opacity-80 rounded-xl px-4 pt-4 pb-6'>

                                            <div className='mb-5 flex flex-row'>
                                                <div className='text-[16px] font-semibold text-purple-600 mr-1 self-center'>Livraison</div>
                                            </div>

                                            <div className='w-full flex flex-row justify-between'>

                                                <div className='w-8/12 flex flex-row'>
                                                    <div className='w-12 h-12 rounded-md bg-purple-100 mr-2'>

                                                    </div>
                                                    <div className='self-center w-8/12'>
                                                        <div className='w-full text-gray-900 text-[14px] font-semibold truncate'>ABC Livraison</div>
                                                        <div className='w-full text-gray-600 text-[12px] font-medium truncate'>Put some details here</div>
                                                    </div>
                                                </div>

                                                <div className='w-4/12 text-right text-gray-900 text-[12.5px] font-semibold truncate self-center'>{xof(650)}</div>

                                            </div>

                                            <div className='w-full flex flex-row text-gray-900 text-[12.5px] font-medium justify-between mt-4'>
                                                <div className='self-center'>Date de livraison</div>
                                                <div className='self-center'>27/04/2022 11:35 am</div>
                                            </div>

                                            <div className='w-full h-10 flex flex-row justify-center bg-gray-300 hover:bg-gray-400 active:scale-95 text-gray-900 transition duration-700 ease-in-out bg-opacity-95 hover:bg-opacity-60 cursor-pointer rounded-xl shadow mt-5'>
                                                <div className='self-center text-[14px] font-semibold'>En savoir +</div>
                                            </div>

                                        </div>

                                        <div className='col-span-2 h-72 bg-gray-100 bg-opacity-80 rounded-xl pt-4 pb-6'>

                                            <div className='mb-3 px-4 flex flex-row'>
                                                <div className='text-[16px] font-semibold text-purple-600 mr-1 self-center'>Activité</div>
                                            </div>

                                        </div>

                                    </div>


                                </div>

                                <div className='col-span-3 bg-gray-100 bg-opacity-80 rounded-xl h-max pt-4 pb-6'>

                                    <div className='mb-3 px-4 flex flex-row'>
                                        <div className='text-[16px] font-semibold text-purple-600 mr-1 self-center'>Client</div>
                                        {/* <div className='px-2 py-[0.45px] text-[10.325px] font-medium bg-gradient-to-r from-purple-700 to-purple-300 text-white rounded-xl self-center'></div> */}
                                    </div>

                                    <div className='flex flex-row items-center px-4'>
                                        <div className='bg-gradient-to-r from-violet-600 to-purple-600 hover:scale-110 flex-shrink-0 item-image-0 rounded-full border-opacity-80 transition duration-700 ease-in-out cursor-pointer mr-2' >
                                            <div className='image-layer-2 bg-white rounded-full'>
                                                <img className="rounded-full object-cover w-full h-full" src={1 == 1 ? '../images/avatar2.jpg': ''} />
                                            </div>
                                        </div>
                                        <div className='fex flex-col'>
                                            <div className="text-sm font-medium text-gray-900 hover:text-purple-600 hover:underline cursor-pointer">Oumou GUEYE</div>
                                            <div className='text-xs font-medium text-gray-600'>10 commandes</div>
                                        </div>
                                    </div>

                                    <div className='px-4'><div className='divider w-full h-[1px] bg-gray-400 bg-opacity-30 mt-4 mb-4'></div></div>

                                    <div className='flex flex-row px-4'>
                                        <div className='w-4 h-4 text-gray-700 self-center mr-2'>
                                            <EnvelopeIcon costumClass="w-full h-full" />
                                        </div>
                                        <div className="text-[12.75px] font-medium text-gray-900 self-center hover:text-purple-600 hover:underline cursor-pointer">oumougueye025@gmail.com</div>
                                    </div>

                                    <div className='flex flex-row mt-3 px-4'>
                                        <div className='w-4 h-4 text-gray-700 self-center mr-2'>
                                            <PhoneIcon costumClass="w-full h-full" />
                                        </div>
                                        <div className="text-[12.75px] font-medium text-gray-900 self-center">+221 78 123 49 97</div>
                                    </div>

                                    <div className='px-4'><div className='divider w-full h-[1px] bg-gray-400 bg-opacity-30 mt-4 mb-4'></div></div>

                                    <div className='flex flex-col mb-5 px-4'>
                                        <div className='text-[13.75px] font-semibold'>Adresse de livraison</div>
                                        <div className='text-[12px] font-medium text-gray-800 mt-2'>Cité Diamalaye II Villa 221A</div>
                                        <div className='text-[10.5px] font-medium text-gray-600 mt-1'>Dakar, Sénégal</div>
                                    </div>

                                </div>

                            </div>
                            

                        </div>

                    </div>
                </motion.div>
                

            </div>

        </div>
    )
}



