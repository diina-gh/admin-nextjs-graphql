import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from "framer-motion";
import { Tab } from '@headlessui/react'
import Header from '../../components/common/header'
import Sidebar from '../../components/common/sidebar'
import HeadInfo from '../../components/common/headinfo'
import Sort from '../../components/common/sort';
import Filter from '../../components/common/filter';
import { SearchIcon } from '@heroicons/react/solid';
import AddBoldIcon from '../../components/ui/icons/addBoldIcon';
import DocBoldIcon from '../../components/ui/icons/docBoldIcon';
import { Pagination } from "react-pagination-bar"
import 'react-pagination-bar/dist/index.css'
import ChevronLeftIcon from '../../components/ui/icons/chevronLeftIcon';
import ChevronRightIcon from '../../components/ui/icons/chevronRightIcon';
import DoubleChevronLeftIcon from '../../components/ui/icons/doubleChevronLeftIcon';
import DoubleChevronRightIcon from '../../components/ui/icons/doubleChevronRightIcon';
import { getProducts } from '../../hooks/product';


export default function Index() {

    const take = 6;
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState('')
    const [direction, setDirection] = useState('asc')
    const [orderBy, setOrderBy] = useState({"id": direction})

    var { items, isLoading, isError, mutate } = getProducts(page,take,filter, orderBy )

    const refetch = (newPage, newFilter = null, newOrder = null ) =>{
        if(newPage){
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
    }

    if (isError) console.log("The error here ", isError)
    if (isLoading) console.log("loading...")
    if(items) console.log("Informations => ", items)

    return (
        <div className="app-container h-screen">

            <HeadInfo title= 'Dashboard' description='description here'/>
            <Header/>

            <div className='w-full px-3 md:px-6 py-3 md:py-5 flex flex-row justify-between'>

                <Sidebar />

                <motion.div initial={{ opacity: 0.45, x: -150 }}  whileInView={{ opacity: 1, x: 0, transition: { duration: 0.60 }, }}>
                    <div className='app-body rounded-xl'>

                        <div className='w-full h-full bg-white rounded-xl overflow-y-scroll p-4'>

                            <div className='w-full flex flex-row mt-2'>

                                <div className='text-lg font-bold text-purple-600 mr-2 self-center'>Produits</div>
                                <div className='px-2 py-1 rounded-xl bg-purple-600 bg-opacity-90 text-white text-xs font-medium self-center'>{items?.products?.count ? items?.products?.count: 0 }</div>

                            </div>

                            <div className='w-full flex flex-row justify-between mt-4'>

                                <div className='flex flex-row'>
                                    
                                    <Sort />
                                    <Filter />

                                    <div className='ml-2 h-8 px-2 self-center bg-gray-100 bg-opacity-95 shadow-inner rounded-full flex flex-row'>

                                        <div className='w-4 h-4 self-center'>
                                            <SearchIcon className='w-full h-full text-gray-800' />
                                        </div>

                                        <div className='w-72 h-full'>
                                            <input type="search" onChange={(e) => e.target.value == '' ? mutate({...items, orderBy:''}) : refetch(null, e.target.value)}  className='w-full h-full focus:ring-0 text-sm border-0 bg-gray-200 bg-opacity-0' placeholder='Rechercher un nom ou une description ...' />
                                        </div>

                                    </div>
                                    
                                </div>

                                <div className='flex flex-row'>

                                    <div className='ml-2 bg-green-500 bg-opacity-90 shadow shadow-green-500/50 px-2 py-2 rounded-md flex flex-col justify-center btn-effect1'>
                                        <div className='flex flex-row text-sm font-medium text-gray-100 hover:text-white'>
                                            <DocBoldIcon customClass="self-center w-4 h-4" />
                                            <div className='ml-2 self-center'>Exporter</div>
                                        </div>
                                    </div>

                                    <Link href='produits/form' > 
                                        <div className='ml-2 bg-purple-500 bg-opacity-90 shadow shadow-purple-500/50 px-3 py-2 rounded-md flex flex-col justify-center btn-effect1'>
                                            <div className='flex flex-row text-sm font-medium text-gray-100 hover:text-white'>
                                                <AddBoldIcon customClass="self-center w-4 h-4" />
                                                <div className='ml-2 self-center'>Ajouter</div>
                                            </div>
                                        </div>
                                    </Link>

                                </div>

                            </div>

                            <div className="w-full flex flex-col overflow-x-auto mt-4">
                                <div className="w-full overflow-x-auto">
                                    <div className="align-middle inline-block min-w-full">
                                        <div className="overflow-hidden app-table sm:rounded-lg">

                                        {(isLoading || items?.page != null || items?.filter != null || items?.orderBy != null ) &&
                                            <div className='app-table w-full flex flex-row justify-center'>
                                                <div className='h-10 self-center'><img className='h-full' src="spinner.gif" /></div>
                                            </div>                                                  
                                        }

                                        {(items && items.products && items?.page == null && items?.filter == null && items?.orderBy == null ) &&
                                            <table className="min-w-full divide-y divide-gray-200 border-b border-gray-200">
                                                <thead className="th-bg-1 sticky top-0 ">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                                                            Nom
                                                        </th>
                                                        <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider" >
                                                            Description
                                                        </th>
                                                        <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider" >
                                                            Unité
                                                        </th>
                                                        <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider" >
                                                            Poids/Unité
                                                        </th>
                                                        <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider" >
                                                            Prix/Unité
                                                        </th>
                                                        <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider" >
                                                            Catégorie
                                                        </th>
                                                        <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider" >
                                                            Marques
                                                        </th>
                                                        <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider" >
                                                            Stock
                                                        </th>
                                                        <th scope="col" className="relative px-6 py-3">
                                                            <span className="sr-only">Edit</span>
                                                        </th>
                                                    </tr>
                                                </thead>
    
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {items.products.products.map((item, i) => (
                                                        <tr key={item.id} className={(i%2==0) ? "" : "bg-gray-100 bg-opacity-50"}>
                                                            
                                                            <td className="px-6 py-3 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div className="flex-shrink-0 h-10 w-10">
                                                                        <img className="h-10 w-10 rounded-full" src="https://raw.githubusercontent.com/diina-gh/owid-covid/main/background/bg3.webp" alt="" />
                                                                    </div>
                                                                    <div className="ml-4">
                                                                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-3 whitespace-nowrap">
                                                                <div className="text-sm text-gray-900">
                                                                    <div dangerouslySetInnerHTML={{__html: item.desc}}></div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-3 whitespace-nowrap">
                                                                <span className="px-2 inline-flex text-[10px] leading-5 font-semibold rounded-full bg-fuchsia-200 shadow shadow-fuchsia-200 text-fuchsia-900">
                                                                    {item.unit}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-3 whitespace-nowrap">
                                                                <div className="text-sm text-gray-900">{item.unitweight}</div>
                                                            </td>
                                                            <td className="px-6 py-3 whitespace-nowrap">
                                                                <div className="text-sm text-gray-900">{item.unitprice}</div>
                                                            </td>
                                                            <td className="px-6 py-3 whitespace-nowrap">
                                                                <div className="text-sm text-gray-900">{item.category?.name}</div>
                                                            </td>
                                                            <td className="px-6 py-3 whitespace-nowrap">
                                                                <div className="text-sm text-gray-900">{item.brand?.name}</div>
                                                            </td>
                                                            <td className="px-6 py-3 whitespace-nowrap">
                                                                <div className="text-sm text-gray-900">{item.inventory?.quantity}</div>
                                                            </td>
                                                            <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium">
                                                                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                                    Edit
                                                                </a>
                                                            </td>

                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        }
                    
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='w-full flex flex-row justify-end mt-6'>
                                <Pagination 
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
                            </div>

                        </div>

                    </div>
                </motion.div>
                

            </div>

        </div>
    )
}



