import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from "framer-motion";
import Header from '../../components/common/header'
import Sidebar from '../../components/common/sidebar'
import HeadInfo from '../../components/common/headinfo'
import { DotsHorizontalIcon } from '@heroicons/react/solid';
import { xof } from '../../libs/util';
import GroupBoldIcon from '../../components/ui/icons/groupBoldIcon';
import { getProducts } from '../../hooks/product';
import { useDebouncedCallback } from 'use-debounce';
import {Pagination as Paginate}  from "react-pagination-bar"
import 'react-pagination-bar/dist/index.css'
import ChevronLeftIcon from '../../components/ui/icons/chevronLeftIcon';
import ChevronRightIcon from '../../components/ui/icons/chevronRightIcon';
import DoubleChevronLeftIcon from '../../components/ui/icons/doubleChevronLeftIcon';
import DoubleChevronRightIcon from '../../components/ui/icons/doubleChevronRightIcon';
import { capitalize } from '../../libs/util';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import SwiperCore, { Autoplay, FreeMode, Navigation, Pagination } from "swiper";
SwiperCore.use([Autoplay, Navigation, Pagination]);
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


export default function Index() {

    const [take, setTake] = useState(6);
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState('')
    const [direction, setDirection] = useState('asc')
    const [orderBy, setOrderBy] = useState({"id": direction})

    const fields = {"productName": true, "productDesc": true, "productUnit": true, "productUnitprice": true, "productUnitweight": true, "productActivated": true, "productBrand": true, "productBrandName": true, "productCategory": true, "productCategoryName": true, "productImage": true, "imageUrl": true, "imageImageref": true, "productInventory": true, "productInventoryQuantity": true}
    var { items, isLoading, isError, mutate } = getProducts(page,take,filter, orderBy, fields )

    const refetch = useDebouncedCallback(
        (newPage, newFilter = null, newOrder = null ) => {
            if(newPage && newPage != page){
                setPage(newPage)
                mutate({...items, page:newPage})
            } 
            if(newFilter){
                setFilter(newFilter)
                mutate({...items, filter:newFilter})
            }
            if(newOrder){
                setOrderBy(newOrder)
                mutate({...items, orderBy:newOrder})
            }
        }, 680
    );

    if (isError) console.log("The error here ", isError)
    if (isLoading) console.log("loading...")
    if(items) console.log("Informations => ", items)

    return (
        <div className="app-container h-screen">

            <HeadInfo title= 'Dashboard' description='description here'/>
            <Header/>

            <div className='w-full pt-3 px-3 md:px-6 flex flex-row justify-between'>

                <Sidebar />

                <motion.div initial={{ opacity: 0.45, x: 150 }}  whileInView={{ opacity: 1, x: 0, transition: { duration: 0.60 }, }}>
                    <div className='app-body rounded-xl'>

                        <div className='w-full h-full bg-white rounded-xl overflow-y-hidden pt-4 pb-3'>

                            <div className='w-full flex flex-row justify-between mt-2 px-6'>
                                <div className='flex flex-col'>
                                    <div className='flex flex-row'>
                                        <div className='text-[16.5px] font-bold text-purple-600 mr-2 self-center'>Apple Iphone XS</div>
                                        <div className="text-[12px] self-center">
                                            {1 == 1 &&
                                                <span className="px-2.5 py-1 font-semibold rounded-full bg-green-100 text-green-800">
                                                    ● Activé
                                                </span>
                                            }
                                            {1 == 2 &&
                                                    <span className="px-1.5 py-1 font-semibold rounded-full bg-red-100 text-red-800">
                                                    ● Inactif
                                                </span>
                                            }
                                        </div> 
                                    </div>
                                    <div className='text-[12.5px] font-semibold text-gray-500 ml-0.5'>Apple - Ordinateur</div>
                                </div>
                                <div className='bg-gray-100 bg-opacity-50 rounded-xl px-2 py-1 h-max cursor-pointer'>
                                    <DotsHorizontalIcon className='text-black w-[1.15rem]' />
                                </div>
                            </div>

                            <div className='w-full app-details overflow-y-scroll mt-2'>

                                <div className='w-full px-6'>

                                    <Swiper className="swiper-type4 h-[19rem]" spaceBetween={18} slidesPerView={3} loop={true} speed={5000} freeMode={true} autoplay={true} pagination={true} modules={[Pagination, FreeMode]}>
                                        <SwiperSlide className='bg-gray-200 bg-opacity-70 shadow rounded-lg border-2 border-gray-200'></SwiperSlide>
                                        <SwiperSlide className='bg-gray-200 bg-opacity-70 shadow rounded-lg border-2 border-gray-200'></SwiperSlide>
                                        <SwiperSlide className='bg-gray-200 bg-opacity-70 shadow rounded-lg border-2 border-gray-200'></SwiperSlide>
                                        <SwiperSlide className='bg-gray-200 bg-opacity-70 shadow rounded-lg border-2 border-gray-200'></SwiperSlide>
                                    </Swiper>

                                </div>

                                <div className='text-[15.5px] font-semibold text-purple-700 truncate mt-3 mb-3 ml-0.5 px-6'>Informations générales</div>

                                <div className='w-full grid grid-cols-12 grid-flow-row gap-5 px-6'>
                                    <div className='col-span-5 flex flex-col'>
                                        <div className='text-[14px] font-semibold text-gray-900'>Description</div>
                                        <div className='text-[12.5px] font-medium text-gray-700 bg-gray-100 rounded-lg leading-relaxed tracking-wide py-4 mt-2'>
                                            <div className='w-full h-48 overflow-y-scroll px-4'>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-span-7 grid grid-cols-3 grid-flow-row gap-5 h-max'>
                                        <div className=''>
                                            <div className='text-[14px] font-semibold text-gray-900'>Catégorie</div>
                                            <div className='bg-gray-100 rounded-lg h-10 mt-2'>
                                            </div>
                                        </div>
                                        <div className=''>
                                            <div className='text-[14px] font-semibold text-gray-900'>Marque</div>
                                            <div className='bg-gray-100 rounded-lg h-10 mt-2'>
                                            </div>
                                        </div>
                                        <div className=''>
                                            <div className='text-[14px] font-semibold text-gray-900'>Sexe</div>
                                            <div className='bg-gray-100 rounded-lg h-10 mt-2'>
                                            </div>
                                        </div>
                                        <div className=''>
                                            <div className='text-[14px] font-semibold text-gray-900'>Unité</div>
                                            <div className='bg-gray-100 rounded-lg h-10 mt-2'>
                                            </div>
                                        </div>
                                        <div className=''>
                                            <div className='text-[14px] font-semibold text-gray-900'>Poids par unité</div>
                                            <div className='bg-gray-100 rounded-lg h-10 mt-2'>
                                            </div>
                                        </div>
                                        <div className=''>
                                            <div className='text-[14px] font-semibold text-gray-900'>Prix unitaire</div>
                                            <div className='bg-gray-100 rounded-lg h-10 mt-2'>
                                            </div>
                                        </div>
                                        <div className=''>
                                            <div className='text-[14px] font-semibold text-gray-900'>Quantité en stock</div>
                                            <div className='bg-gray-100 rounded-lg h-10 mt-2'>
                                            </div>
                                        </div>
                                        <div className=''>
                                            <div className='text-[14px] font-semibold text-gray-900'>Couleurs</div>
                                            <div className='bg-gray-100 rounded-lg h-10 mt-2'>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>

                                <div className='text-[15.5px] font-semibold text-purple-700 truncate mt-8 mb-5 ml-0.5 px-6'>Statistiques</div>
                                
                                <div className='w-full grid grid-cols-4 grid-flow-row gap-5 overflow-hidden px-6'>
                                    <motion.div initial={{ opacity: 0.35, x:-50 }} whileInView={{ opacity: 1, x: 0, transition: { duration: 1.05 }, }}>
                                        <div className='w-full h-[8.485rem] bg-gray-200 bg-opacity-50 shadow-sm rounded-xl mb-4'>
                                            <div className='h-full rounded-xl flex flex-col justify-between px-3 py-4 cursor-pointer'>

                                                <div className='flex flex-row'>
                                                    <div className='w-7 h-7 rounded-full bg-red-600 flex flex-row justify-center self-center mr-2'>
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
                                    <motion.div initial={{ opacity: 0.35, y:-60 }} whileInView={{ opacity: 1, y: 0, transition: { duration: 1.05 }, }}>
                                        <div className='w-full h-[8.485rem] bg-gray-200 bg-opacity-50 shadow-sm rounded-xl mb-4'>
                                            <div className='h-full rounded-xl flex flex-col justify-between px-3 py-4 cursor-pointer'>

                                                <div className='flex flex-row'>
                                                    <div className='w-7 h-7 rounded-full bg-green-600 flex flex-row justify-center self-center mr-2'>
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
                                    <motion.div initial={{ opacity: 0.35, y:40 }} whileInView={{ opacity: 1, y: 0, transition: { duration: 1.05 }, }}>
                                        <div className='w-full h-[8.485rem] bg-gray-200 bg-opacity-50 shadow-sm rounded-xl mb-4'>
                                            <div className='h-full rounded-xl flex flex-col justify-between px-3 py-4 cursor-pointer'>

                                                <div className='flex flex-row'>
                                                    <div className='w-7 h-7 rounded-full bg-blue-600 flex flex-row justify-center self-center mr-2'>
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
                                    <motion.div initial={{ opacity: 0.35, x:40 }} whileInView={{ opacity: 1, x: 0, transition: { duration: 1.05 }, }}>
                                        <div className='w-full h-[8.485rem] bg-gray-200 bg-opacity-50 shadow-sm rounded-xl mb-4'>
                                            <div className='h-full rounded-xl flex flex-col justify-between px-3 py-4 cursor-pointer'>

                                                <div className='flex flex-row'>
                                                    <div className='w-7 h-7 rounded-full bg-orange-600 flex flex-row justify-center self-center mr-2'>
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

                                <div className='text-[15.5px] font-semibold text-purple-700 truncate mt-8 mb-3 ml-0.5 px-6'>Produits associés</div>

                                <div className='w-full px-6 mb-6'>
                                    {(isLoading || items?.page != null || items?.filter != null || items?.orderBy != null ) &&
                                        <div className='h-[11.85rem] w-full flex flex-row justify-center'>
                                            <div className='h-10 self-center'><img className='h-full' src="../spinner.gif" /></div>
                                        </div>                                                  
                                    }

                                    {(items && items.products && items?.page == null && items?.filter == null && items?.orderBy == null ) &&
                                        <div className="w-full grid grid-cols-6 gap-4">
                                            {items.products.products.map((item, i) => (
                                                <div key={i} className="w-full">
                                                    <motion.div initial={{ opacity: 0, y: ( Math.random() + i * 5) }} whileInView={{ opacity: 1, y: 0, transition: { duration: 1.05 }, }}>
                                                        <div className="w-full pt-1 pb-5 rounded-xl bg-gray-200 bg-opacity-80 cursor-pointer relative parent-layer">

                                                            <div className='w-full image-layer-00 flex flex-row justify-center'>
                                                                <div className='image-layer-01 self-center'>
                                                                    <img src={item.images[0]?.url} />
                                                                </div>
                                                            </div>

                                                            <div className='w-full mt-2 px-3'>
                                                                <div className='w-full text-gray-500 text-[0.7rem] font-medium truncate'>{capitalize(item.category?.name)}</div>
                                                                <div className='w-full flex mt-1'>
                                                                    <div className='self-center w-full'>
                                                                        <div className='w-full main-item text-gray-900 cursor-pointer text-[0.87rem] font-semibold truncate transition duration-700 ease-in-out'>{capitalize(item.name)}</div>
                                                                        <div className='w-full text-gray-800 text-[0.71rem] font-medium mt-1'> {new Intl.NumberFormat('fr-FR', {style: 'currency', currency:'XOF'}).format(item.unitprice)}</div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    </motion.div>
                                                </div>
                                            ))}
                                        </div>
                                    }
                    
                                    <div className='w-full flex flex-row justify-end mt-5'>
                                        {items?.products != null &&
                                            <Paginate 
                                                initialPage={page} 
                                                itemsPerPage={take} 
                                                onPageСhange={(pageNumber) => refetch(pageNumber)} 
                                                totalItems={items?.products?.count}  
                                                pageNeighbours={2} 
                                                startLabel= {<DoubleChevronLeftIcon customClass="w-3 h-3"/>}
                                                endLabel={<DoubleChevronRightIcon customClass="w-3 h-3"/>}
                                                nextLabel={<ChevronRightIcon customClass="w-3 h-3"/>}
                                                prevLabel={<ChevronLeftIcon customClass="w-3 h-3"/>}
                                                customClassNames={{rpbItemClassName:'pg-btn', rpbItemClassNameActive:'pg-active-btn',}}
                                            />
                                        }
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



