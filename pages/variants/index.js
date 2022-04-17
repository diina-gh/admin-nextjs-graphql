import { useState } from 'react'
import Link from 'next/link'
import { motion } from "framer-motion";
import { Tab } from '@headlessui/react'
import Header from '../../components/common/header'
import Sidebar from '../../components/common/sidebar'
import HeadInfo from '../../components/common/headinfo'
import Sort from '../../components/common/sort';
import Filter from '../../components/common/filter';
import SearchIcon from '../../components/ui/icons/searchIcon';
import AddBoldIcon from '../../components/ui/icons/addBoldIcon';
import DocBoldIcon from '../../components/ui/icons/docBoldIcon';
import EditBoldIcon from '../../components/ui/icons/editBoldIcon'
import TrashBoldIcon from '../../components/ui/icons/trashBoldIcon'
import { Pagination } from "react-pagination-bar"
import 'react-pagination-bar/dist/index.css'
import ChevronLeftIcon from '../../components/ui/icons/chevronLeftIcon';
import ChevronRightIcon from '../../components/ui/icons/chevronRightIcon';
import DoubleChevronLeftIcon from '../../components/ui/icons/doubleChevronLeftIcon';
import DoubleChevronRightIcon from '../../components/ui/icons/doubleChevronRightIcon';
import {getVariants } from '../../hooks/variant';
import { getOptions } from '../../hooks/option';
import { useDebouncedCallback } from 'use-debounce';


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}



export default function Index() {

    const take = 7;

    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState('')
    const [direction, setDirection] = useState('asc')
    const [orderBy, setOrderBy] = useState({"id": direction})
  
    const fields = {"variantName": true, "variantDesc": true, "variantCreatedat": true,}
    const { items, isLoading, isError, mutate } = getVariants(page,take,filter, orderBy, fields )

    if(mutate) console.log("The mutate ", mutate)
  
    const refetch = (newPage, newFilter = null, newOrder = null ) =>{
        if(newPage){
            setPage(newPage)
            mutate({...items, page:newPage})
        } 
        if(newFilter){
            setFilter(newFilter)
            mutate({ ...items, filter:newFilter })
        }
        if(newOrder){
            setOrderBy(newOrder)
            mutate({...items, orderBy:newOrder})
        }
    }
  
    if (isError) console.log("The error here ", isError)
    if (isLoading) console.log("loading...")
    if(items) console.log("Informations => ", items)

    async function deleteItem (e, id){
            
        e.preventDefault()
        // setBlock(true)

        // if(!navigator.onLine){
        //     toast.error('Aucun accès à Internet 😪');
        //     setBlock(false)
        //     return null
        // }

        // var {response } = await deleteCountry(id)
        
        // if(response?.__typename == 'Country'){
        //     console.log("Item deleted ", response.name)
        //     refetch(page);
        //     toast.success('Suppression réussie 😊');
        // } 
        // else if(response?.__typename == 'InputError'){
        //     toast.error(response?.message + ' 😕');
        // }
        // else{
        //     toast.error("Erreur inconnue. Veuillez contacter l'administrateur 😮");
        // }

        // setBlock(false)

    }


  return (
    <div className="app-container h-screen">

        <HeadInfo title= 'Dashboard' description='description here'/>
        <Header/>

        <div className='w-full pt-3 px-3 md:px-6 flex flex-row justify-between'>

            <Sidebar />

            <motion.div initial={{ opacity: 0.45, x: -150 }}  whileInView={{ opacity: 1, x: 0, transition: { duration: 0.60 }, }}>
                <div className='app-body rounded-xl'>

                    <div className='w-full rounded-xl'>

                        <Tab.Group >

                            <Tab.List className="flex space-x-1 border-b border-gray-200 border-opacity-50 w-full">

                                    <Tab className={({ selected }) =>classNames('w-full flex flex-row justify-center py-3 text-[1.075rem] font-bold leading-5 rounded-t-xl mb-minus1 tracking-normal','focus:outline-none focus:ring-0 ring-opacity-0', selected ? 'text-purple-800 bg-white shadow-sm badge-active' : 'text-gray-400 text-opacity-80 hover:text-purple-600 badge-disabled')}>
                                            <div className='mr-2 self-center'>Variants</div>
                                            <div className='px-2 py-[0.25px] rounded-xl tab-badge text-[10.35px] font-medium self-center'>{items?.variants?.count ? items?.variants?.count : 0 }</div>
                                    </Tab>

                                    <Tab className={({ selected }) =>classNames('w-full flex flex-row justify-center py-3 text-[1.075rem] font-bold leading-5 rounded-t-xl mb-minus1 tracking-normal','focus:outline-none focus:ring-0 ring-opacity-0', selected ? 'text-purple-800 bg-white shadow-sm badge-active' : 'text-gray-400 text-opacity-80 hover:text-purple-600 badge-disabled')}>
                                            <div className='mr-2 self-center'>Options</div>
                                            <div className='px-2 py-[0.25px] rounded-xl tab-badge text-[10.35px] font-medium self-center'>{items?.variants?.countOpt ? items?.variants?.countOpt : 0 }</div>
                                    </Tab>

                                
                            </Tab.List>

                            <Tab.Panels className='app-subbody2'>
                                    <Tab.Panel key={1} className={classNames('','bg-white h-full focus:outline-none focus:ring-0 ring-opacity-0 rounded-b-xl ')}>

                                        <div className='w-full h-full rounded-b-xl overflow-y-scroll pt-4'>

                                            <div className='w-full flex flex-row justify-between px-4'>

                                                <div className='flex flex-row'>
                                                    
                                                    <Sort />
                                                    <Filter />

                                                    <div className='ml-2 h-8 px-2 self-center bg-gray-100 bg-opacity-95 shadow-inner rounded-full flex flex-row'>

                                                        <div className='w-4 h-4 self-center'>
                                                            <SearchIcon className='w-full h-full text-gray-800' />
                                                        </div>

                                                        <div className='w-72 h-full'>
                                                            <input type="text" onChange={(e) =>  refetch(null, e.target.value)}  className='w-full h-full focus:ring-0 text-sm border-0 bg-gray-200 bg-opacity-0' placeholder='Rechercher un nom ou une description ...' />
                                                        </div>

                                                    </div>
                                                    
                                                </div>

                                                <div className='flex flex-row'>

                                                    <div className='ml-2 bg-green-500 bg-opacity-90 shadow px-2 py-2 rounded-md flex flex-col justify-center btn-effect1'>
                                                        <div className='flex flex-row text-sm font-medium text-gray-100 hover:text-white'>
                                                            <DocBoldIcon customClass="self-center w-4 h-4" />
                                                            <div className='ml-2 self-center'>Exporter</div>
                                                        </div>
                                                    </div>

                                                    <Link href='variants/form' > 
                                                        <div className='ml-2 bg-purple-500 bg-opacity-90 shadow px-3 py-2 rounded-md flex flex-col justify-center btn-effect1'>
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
                                                        <div className="shadow overflow-hidden app-table sm:rounded-lg pl-4 pr-3">

                                                        {(isLoading || items?.page != null ) &&
                                                            <div className='app-table w-full flex flex-row justify-center'>
                                                                <div className='h-10 self-center'><img className='h-full' src="spinner.gif" /></div>
                                                            </div>                                                  
                                                        }

                                                        {(items && items.variants && items?.page == null) &&
                                                            <table className="min-w-full divide-y divide-gray-200 ">
                                                                <thead className="th-bg-1 sticky top-0 ">
                                                                    <tr>
                                                                        <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                                                                            N#
                                                                        </th>
                                                                        <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider" >
                                                                            Désignation
                                                                        </th>
                                                                        <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider" >
                                                                            Description
                                                                        </th>

                                                                        <th scope="col" className="relative px-6 py-3">
                                                                            <span className="sr-only">Edit</span>
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody className="bg-white divide-y divide-gray-200">
                                                                    {items.variants.variants.map((item, i) => (
                                                                        <tr key={item.id} className={(i%2==0) ? "" : "bg-gray-100 bg-opacity-50"}>
                                                                            <td className="px-6 py-3 whitespace-nowrap">
                                                                                <div className="text-sm text-gray-900">{page == 1 ? i+1 : (i+1) + (page*10)}</div>
                                                                            </td>
                                                                            <td className="px-6 py-3 whitespace-nowrap">
                                                                                <div className="text-sm text-gray-900">{item.name}</div>
                                                                            </td>
                                                                            <td className="px-6 py-3 whitespace-nowrap">
                                                                                <div className="text-sm text-gray-900">{item.desc}</div>
                                                                            </td>
                                                                            
                                                                            <td className="px-2 py-3 whitespace-nowrap text-right flex flex-row justify-end">

                                                                                <div className="flex flex-row">
                                                                                    <Link  href={{pathname: 'variants/form', query: { id: item.id },}} >
                                                                                        <button className="w-7 h-7 rounded-full border border-iiblack gt-shadow5 flex flex-row justify-center cursor-pointer btn-effect1 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 mr-2">
                                                                                            <EditBoldIcon customClass="w-3 text-gray-600 text-opacity-90 self-center"/>
                                                                                        </button>
                                                                                    </Link>

                                                                                    <button  onClick={(e) => deleteItem(e, item.id)} className="w-7 h-7 rounded-full border border-iiblack gt-shadow5 flex flex-row justify-center cursor-pointer btn-effect1 bg-gray-100 hover:bg-gray-200 active:bg-gray-30">
                                                                                        <TrashBoldIcon customClass="w-3 text-red-600 text-opacity-90 self-center"/>
                                                                                    </button>
                                                                                </div>

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

                                            <div className='w-full flex flex-row justify-end mt-5 px-4'>
                                                {items?.variants != null &&
                                                    <Pagination 
                                                        initialPage={page} 
                                                        itemsPerPage={take} 
                                                        onPageСhange={(pageNumber) => refetch(pageNumber)} 
                                                        totalItems={items?.categories?.count}  
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

                                    </Tab.Panel>

                                    <Tab.Panel key={2} className={classNames('','bg-white h-full focus:outline-none focus:ring-0 ring-opacity-0 rounded-b-xl ')}>

                                        <Options />

                                    </Tab.Panel>
                            </Tab.Panels>

                        </Tab.Group>

                    </div>

                </div>
            </motion.div>


        </div>

    </div>
  )
}


function Options () {

    const take = 7;

    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState('')
    const [direction, setDirection] = useState('asc')
    const [orderBy, setOrderBy] = useState({"id": direction})
  
    const fields = {"optionValue": true, "optionColorCode": true, "optionVariant": true, "optionVariantName": true}

    var { items, isLoading, isError, mutate } = getOptions(page,take,filter, orderBy, fields)
  
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

    async function deleteItem (e, id){
            
        e.preventDefault()
        // setBlock(true)

        // if(!navigator.onLine){
        //     toast.error('Aucun accès à Internet 😪');
        //     setBlock(false)
        //     return null
        // }

        // var {response } = await deleteCountry(id)
        
        // if(response?.__typename == 'Country'){
        //     console.log("Item deleted ", response.name)
        //     refetch(page);
        //     toast.success('Suppression réussie 😊');
        // } 
        // else if(response?.__typename == 'InputError'){
        //     toast.error(response?.message + ' 😕');
        // }
        // else{
        //     toast.error("Erreur inconnue. Veuillez contacter l'administrateur 😮");
        // }

        // setBlock(false)

    }

    return (
        <div className='w-full h-full rounded-b-xl overflow-y-scroll pt-4'>

            <div className='w-full flex flex-row justify-between px-4'>

                <div className='flex flex-row'>
                    
                    <Sort />
                    <Filter />

                    <div className='ml-2 h-8 px-2 self-center bg-gray-100 bg-opacity-95 shadow-inner rounded-full flex flex-row'>

                        <div className='w-4 h-4 self-center'>
                            <SearchIcon className='w-full h-full text-gray-800' />
                        </div>

                        <div className='w-72 h-full'>
                            <input type="text"  className='w-full h-full focus:ring-0 text-sm border-0 bg-gray-200 bg-opacity-0' placeholder='Rechercher un nom ou une description ...' />
                        </div>

                    </div>
                    
                </div>

                <div className='flex flex-row'>

                    <div className='bg-green-500 bg-opacity-90 shadow px-2 py-2 rounded-md flex flex-col justify-center btn-effect1'>
                        <div className='flex flex-row text-sm font-medium text-gray-100 hover:text-white'>
                            <DocBoldIcon customClass="self-center w-4 h-4" />
                            <div className='ml-2 self-center'>Exporter</div>
                        </div>
                    </div>

                    {/* <Link href='categories/form' > 
                        <div className='ml-2 bg-purple-500 bg-opacity-90 shadow px-3 py-2 rounded-md flex flex-col justify-center btn-effect1'>
                            <div className='flex flex-row text-sm font-medium text-gray-100 hover:text-white'>
                                <AddBoldIcon customClass="self-center w-4 h-4" />
                                <div className='ml-2 self-center'>Ajouter</div>
                            </div>
                        </div>
                    </Link> */}

                </div>

            </div>

            <div className="w-full flex flex-col overflow-x-auto mt-4">
                <div className="w-full overflow-x-auto">
                    <div className="align-middle inline-block min-w-full">
                        <div className="shadow overflow-hidden app-table sm:rounded-lg pl-4 pr-3">

                        {(isLoading || items?.page != null ) &&
                            <div className='app-table w-full flex flex-row justify-center'>
                                <div className='h-10 self-center'><img className='h-full' src="spinner.gif" /></div>
                            </div>                                                  
                        }

                        {(items && items.options && items?.page == null) &&
                            <table className="min-w-full divide-y divide-gray-200 ">
                                <thead className="th-bg-1 sticky top-0 ">
                                    <tr>
                                        <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                                            N#
                                        </th>
                                        
                                        <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider" >
                                            Value
                                        </th>

                                        <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider" >
                                            Variants
                                        </th>

                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {items.options.options.map((item, i) => (
                                        <tr key={item.id} className={(i%2==0) ? "" : "bg-gray-100 bg-opacity-50"}>
                                            <td className="px-6 py-3 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{page == 1 ? i+1 : (i+1) + (page*10)}</div>
                                            </td>
                                            <td className="px-6 py-3 whitespace-nowrap">
                                                {!item.colorCode 
                                                  ?<div className='flex flex-row'>
                                                        <div className="flex flex-row justify-center w-6 h-6 mr-3 rounded-md border border-gray-400 bg-gray-200 bg-opacity-50 self-center">
                                                            <div className="self-center text-[10px] font-semibold text-gray-800">{item.value}</div>
                                                        </div>
                                                        <div className="text-sm text-gray-900 self-center">{item.value}</div>
                                                    </div>
                                                  :<div className='flex flex-row'>
                                                        <div className="flex flex-row justify-center w-6 h-6 mr-3 rounded-full border-2 border-gray-200 border-opacity-40 self-center" style={{backgroundColor: item.colorCode}}></div>
                                                        <div className="text-sm text-gray-900 self-center">{item.value}</div>
                                                    </div>
                                                }
                                            </td>
                                            <td className="px-6 py-3 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{item.variant?.name}</div>
                                            </td>
                                            
                                            <td className="px-2 py-3 whitespace-nowrap text-right flex flex-row justify-end">

                                                <div className="flex flex-row">
                                                    <Link  href={{pathname: 'variants/form', query: { id: item.variantId },}} >
                                                        <button className="w-7 h-7 rounded-full border border-iiblack gt-shadow5 flex flex-row justify-center cursor-pointer btn-effect1 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 mr-2">
                                                            <EditBoldIcon customClass="w-3 text-gray-600 text-opacity-90 self-center"/>
                                                        </button>
                                                    </Link>

                                                    <button  onClick={(e) => deleteItem(e, item.id)} className="w-7 h-7 rounded-full border border-iiblack gt-shadow5 flex flex-row justify-center cursor-pointer btn-effect1 bg-gray-100 hover:bg-gray-200 active:bg-gray-30">
                                                        <TrashBoldIcon customClass="w-3 text-red-600 text-opacity-90 self-center"/>
                                                    </button>
                                                </div>

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

            <div className='w-full flex flex-row justify-end mt-5 mb-1 px-4'>
                {items?.options != null &&
                    <Pagination 
                        initialPage={page} 
                        itemsPerPage={take} 
                        onPageСhange={(pageNumber) => refetch(pageNumber)} 
                        totalItems={items?.options?.count}  
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
    )
}

