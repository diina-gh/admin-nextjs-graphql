import { useState } from 'react'
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
import EditBoldIcon from '../../components/ui/icons/editBoldIcon'
import TrashBoldIcon from '../../components/ui/icons/trashBoldIcon'
import { Pagination } from "react-pagination-bar"
import 'react-pagination-bar/dist/index.css'
import ChevronLeftIcon from '../../components/ui/icons/chevronLeftIcon';
import ChevronRightIcon from '../../components/ui/icons/chevronRightIcon';
import DoubleChevronLeftIcon from '../../components/ui/icons/doubleChevronLeftIcon';
import DoubleChevronRightIcon from '../../components/ui/icons/doubleChevronRightIcon';
import {getCountries, deleteCountry } from '../../hooks/country';
import { deleteRegion, getRegions } from '../../hooks/region';
import { deleteDistrict, getDistricts } from '../../hooks/district';
import BlockUI from '../../components/common/blockui';
import toast, { Toaster } from 'react-hot-toast';


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function Index() {

    const take = 6;

    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState('')
    const [direction, setDirection] = useState('asc')
    const [orderBy, setOrderBy] = useState({"id": direction})
    const [block, setBlock] = useState(false);
  
    const { items, isLoading, isError, mutate } = getDistricts(page,take,filter, orderBy )

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
        setBlock(true)

        if(!navigator.onLine){
            toast.error('Aucun accès à Internet 😪');
            setBlock(false)
            return null
        }

        var {response } = await deleteDistrict(id)
        
        if(response?.__typename == 'District'){
            console.log("Item deleted ", response.name)
            refetch(page);
            toast.success('Suppression réussie');
        } 
        else if(response?.__typename == 'InputError'){
            toast.error(response?.message);
        }
        else{
            toast.error("Erreur inconnue. Veuillez contacter l'administrateur");
        }

        setBlock(false)
    }

  return (
    <div className="app-container h-screen">

        <Toaster position='top-right' />

        <HeadInfo title= 'Dashboard' description='description here'/>
        <Header/>

        <div className='w-full px-6 py-5 flex flex-row justify-between'>

            <Sidebar />

            <motion.div initial={{ opacity: 0.45, x: -150 }}  whileInView={{ opacity: 1, x: 0, transition: { duration: 0.60 }, }}>
                <div className='app-body relative'>

                    <BlockUI blocking={block} />

                    <div className='w-full'>

                        <Tab.Group >

                            <Tab.List className="flex space-x-1 border-b border-gray-200 border-opacity-50 w-full">

                                    <Tab className={({ selected }) =>classNames('w-full flex flex-row justify-center py-3 text-[1.075rem] font-bold leading-5 rounded-t-xl mb-minus1 tracking-normal','focus:outline-none focus:ring-0 ring-opacity-0', selected ? 'text-purple-800 bg-white shadow-sm badge-active' : 'text-gray-400 text-opacity-80 hover:text-purple-600 badge-disabled')}>
                                            <div className='mr-2 self-center'>Zones</div>
                                            <div className='px-2 py-[0.25px] rounded-xl tab-badge text-[10.35px] font-medium self-center'>{items?.districts?.count ? items?.districts?.count : 0 }</div>
                                    </Tab>

                                    <Tab className={({ selected }) =>classNames('w-full flex flex-row justify-center py-3 text-[1.075rem] font-bold leading-5 rounded-t-xl mb-minus1 tracking-normal','focus:outline-none focus:ring-0 ring-opacity-0', selected ? 'text-purple-800 bg-white shadow-sm badge-active' : 'text-gray-400 text-opacity-80 hover:text-purple-600 badge-disabled')}>
                                            <div className='mr-2 self-center'>Régions</div>
                                            <div className='px-2 py-[0.25px] rounded-xl tab-badge text-[10.35px] font-medium self-center'>{items?.districts?.countRegions ? items?.districts?.countRegions : 0 }</div>
                                    </Tab>

                                    <Tab className={({ selected }) =>classNames('w-full flex flex-row justify-center py-3 text-[1.075rem] font-bold leading-5 rounded-t-xl mb-minus1 tracking-normal','focus:outline-none focus:ring-0 ring-opacity-0', selected ? 'text-purple-800 bg-white shadow-sm badge-active' : 'text-gray-400 text-opacity-80 hover:text-purple-600 badge-disabled')}>
                                            <div className='mr-2 self-center'>Pays</div>
                                            <div className='px-2 py-[0.25px] rounded-xl tab-badge text-[10.35px] font-medium self-center'>{items?.districts?.countCountries ? items?.districts?.countCountries : 0 }</div>
                                    </Tab>

                                
                            </Tab.List>

                            <Tab.Panels className='app-subbody2'>
                                    <Tab.Panel key={1} className={classNames('','bg-white h-full focus:outline-none focus:ring-0 ring-opacity-0 rounded-b-xl ')}>

                                        <div className='w-full h-full rounded-b-xl overflow-y-scroll p-4'>

                                            <div className='w-full flex flex-row justify-between mt-3'>

                                                <div className='flex flex-row'>
                                                    
                                                    <Sort />
                                                    <Filter />

                                                    <div className='ml-2 h-8 px-2 self-center bg-gray-100 bg-opacity-95 shadow-inner rounded-full flex flex-row'>

                                                        <div className='w-4 h-4 self-center'>
                                                            <SearchIcon className='w-full h-full text-gray-800' />
                                                        </div>

                                                        <div className='w-72 h-full'>
                                                            <input type="search" onChange={(e) =>  refetch(null, e.target.value)}  className='w-full h-full focus:ring-0 text-sm border-0 bg-gray-200 bg-opacity-0' placeholder='Rechercher un nom ou une description ...' />
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

                                                    <Link href='zones_de_livraison/zone_form' > 
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
                                                        <div className="shadow overflow-hidden app-table sm:rounded-lg">

                                                        {(isLoading || items?.page != null ) &&
                                                            <div className='app-table w-full flex flex-row justify-center'>
                                                                <div className='h-10 self-center'><img className='h-full' src="spinner.gif" /></div>
                                                            </div>                                                  
                                                        }

                                                        {(items && items.districts && items?.page == null) &&
                                                            <table className="min-w-full divide-y divide-gray-200 ">
                                                                <thead className="bg-gray-100 sticky top-0 ">
                                                                    <tr>
                                                                        <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                                            N#
                                                                        </th>
                                                                        <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider" >
                                                                            Désignation
                                                                        </th>
                                                                        <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider" >
                                                                            Livraison
                                                                        </th>
                                                                        <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider" >
                                                                            Région
                                                                        </th>

                                                                        <th scope="col" className="relative px-6 py-3">
                                                                            <span className="sr-only">Edit</span>
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody className="bg-white divide-y divide-gray-200">
                                                                    {items.districts.districts.map((item, i) => (
                                                                        <tr key={item.id} className={(i%2==0) ? "" : "bg-gray-100 bg-opacity-50"}>
                                                                            <td className="px-6 py-3 whitespace-nowrap">
                                                                                <div className="text-sm text-gray-900">{item.id}</div>
                                                                            </td>
                                                                            <td className="px-6 py-3 whitespace-nowrap">
                                                                                <div className="text-sm text-gray-900">{item.name}</div>
                                                                            </td>
                                                                            <td className="px-6 py-3 whitespace-nowrap">
                                                                                <div className="text-sm text-gray-900">{item.shipping} CFA</div>
                                                                            </td>

                                                                            <td className="px-6 py-3 whitespace-nowrap">
                                                                                <div className="text-sm text-gray-900">{item.region.name}</div>
                                                                            </td>
                                                                            
                                                                            <td className="px-2 py-3 whitespace-nowrap text-right flex flex-row justify-end">
                                                                                <div className="flex flex-row">
                                                                                    <Link  href={{pathname: 'zones_de_livraison/zone_form', query: { id: item.id },}} >
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

                                            <div className='w-full flex flex-row justify-end mt-5'>
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
                                            </div>


                                        </div>

                                    </Tab.Panel>

                                    <Tab.Panel key={2} className={classNames('','bg-white h-full focus:outline-none focus:ring-0 ring-opacity-0 rounded-b-xl ')}>
                                        <Regions />
                                    </Tab.Panel>

                                    <Tab.Panel key={3} className={classNames('','bg-white h-full focus:outline-none focus:ring-0 ring-opacity-0 rounded-b-xl ')}>
                                        <Countries />
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


function Regions () {

    const take = 6;

    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState('')
    const [direction, setDirection] = useState('asc')
    const [orderBy, setOrderBy] = useState({"id": direction})
    const [block, setBlock] = useState(false);

  
    var { items, isLoading, isError, mutate } = getRegions(page,take,filter, orderBy )
  
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

    async function deleteItem (e, id){
            
        e.preventDefault()
        setBlock(true)

        if(!navigator.onLine){
            toast.error('Aucun accès à Internet 😪');
            setBlock(false)
            return null
        }

        var {response } = await deleteRegion(id)
        
        if(response?.__typename == 'Region'){
            console.log("Item deleted ", response.name)
            refetch(page);
            toast.success('Suppression réussie');
        } 
        else if(response?.__typename == 'InputError'){
            toast.error(response?.message);
        }
        else{
            toast.error("Erreur inconnue. Veuillez contacter l'administrateur");
        }

        setBlock(false)

    }


    return (
        <div className='w-full h-full rounded-b-xl overflow-y-scroll p-4'>

            <BlockUI blocking={block} />

            <div className='w-full flex flex-row justify-between mt-3'>

                <div className='flex flex-row'>
                    
                    <Sort />
                    <Filter />

                    <div className='ml-2 h-8 px-2 self-center bg-gray-100 bg-opacity-95 shadow-inner rounded-full flex flex-row'>

                        <div className='w-4 h-4 self-center'>
                            <SearchIcon className='w-full h-full text-gray-800' />
                        </div>

                        <div className='w-72 h-full'>
                            <input type="search"  className='w-full h-full focus:ring-0 text-sm border-0 bg-gray-200 bg-opacity-0' placeholder='Rechercher un nom ou une description ...' />
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

                    <Link href='zones_de_livraison/region_form' > 
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
                        <div className="shadow overflow-hidden app-table sm:rounded-lg">

                        {(isLoading || items?.page != null ) &&
                            <div className='app-table w-full flex flex-row justify-center'>
                                <div className='h-10 self-center'><img className='h-full' src="spinner.gif" /></div>
                            </div>                                                  
                        }

                        {(items && items.regions && items?.page == null) &&
                            <table className="min-w-full divide-y divide-gray-200 ">
                                <thead className="bg-gray-100 sticky top-0 ">
                                    <tr>
                                        <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                            N#
                                        </th>
                                        
                                        <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider" >
                                            Désignation
                                        </th>

                                        <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider" >
                                            Code
                                        </th>

                                        <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider" >
                                            Pays
                                        </th>

                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {items.regions.regions.map((item, i) => (
                                        <tr key={item.id} className={(i%2==0) ? "" : "bg-gray-100 bg-opacity-50"}>
                                            <td className="px-6 py-3 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{item.id}</div>
                                            </td>
                                            <td className="px-6 py-3 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{item.name}</div>
                                            </td>
                                            <td className="px-6 py-3 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{item.code}</div>
                                            </td>
                                            <td className="px-6 py-3 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{item.country.name}</div>
                                            </td>
                                            
                                            <td className="px-2 py-3 whitespace-nowrap text-right flex flex-row justify-end">
                                                <div className="flex flex-row">
                                                    <Link  href={{pathname: 'zones_de_livraison/region_form', query: { id: item.id },}} >
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

            <div className='w-full flex flex-row justify-end mt-5'>
                <Pagination 
                    initialPage={page} 
                    itemsPerPage={take} 
                    onPageСhange={(pageNumber) => refetch(pageNumber)} 
                    totalItems={items?.regions?.count}  
                    pageNeighbours={2} 
                    startLabel= {<DoubleChevronLeftIcon customClass="w-3 h-3"/>}
                    endLabel={<DoubleChevronRightIcon customClass="w-3 h-3"/>}
                    nextLabel={<ChevronRightIcon customClass="w-3 h-3"/>}
                    prevLabel={<ChevronLeftIcon customClass="w-3 h-3"/>}
                    customClassNames={{rpbItemClassName:'pg-btn', rpbItemClassNameActive:'pg-active-btn',}}
                />
            </div>


        </div>
    )
}


function Countries () {

    const take = 6;

    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState('')
    const [direction, setDirection] = useState('asc')
    const [orderBy, setOrderBy] = useState({"id": direction})
    const [block, setBlock] = useState(false);

    var { items, isLoading, isError, mutate } = getCountries(page,take,filter, orderBy )

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

    async function deleteItem (e, id){
            
        e.preventDefault()
        setBlock(true)

        if(!navigator.onLine){
            toast.error('Aucun accès à Internet 😪');
            setBlock(false)
            return null
        }

        var {response } = await deleteCountry(id)
        
        if(response?.__typename == 'Country'){
            console.log("Item deleted ", response.name)
            refetch(page);
            toast.success('Suppression réussie 😊');
        } 
        else if(response?.__typename == 'InputError'){
            toast.error(response?.message + ' 😕');
        }
        else{
            toast.error("Erreur inconnue. Veuillez contacter l'administrateur 😮");
        }

        setBlock(false)

    }


  return (
      <div className='w-full h-full rounded-b-xl overflow-y-scroll p-4'>

        <BlockUI blocking={block} />

          <div className='w-full flex flex-row justify-between mt-3'>

              <div className='flex flex-row'>
                  
                  <Sort />
                  <Filter />

                  <div className='ml-2 h-8 px-2 self-center bg-gray-100 bg-opacity-95 shadow-inner rounded-full flex flex-row'>

                      <div className='w-4 h-4 self-center'>
                          <SearchIcon className='w-full h-full text-gray-800' />
                      </div>

                      <div className='w-72 h-full'>
                          <input type="search"  className='w-full h-full focus:ring-0 text-sm border-0 bg-gray-200 bg-opacity-0' placeholder='Rechercher un nom ou une description ...' />
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

                  <Link href='zones_de_livraison/pays_form' > 
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
                      <div className="shadow overflow-hidden app-table sm:rounded-lg">

                      {(isLoading || items?.page != null ) &&
                          <div className='app-table w-full flex flex-row justify-center'>
                              <div className='h-10 self-center'><img className='h-full' src="spinner.gif" /></div>
                          </div>                                                  
                      }

                      {(items && items.countries && items?.page == null) &&
                          <table className="min-w-full divide-y divide-gray-200 ">
                              <thead className="bg-gray-100 sticky top-0 ">
                                  <tr>
                                      <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                          N#
                                      </th>
                                      
                                      <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider" >
                                        Désignation
                                      </th>

                                      <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider" >
                                          iso3
                                      </th>

                                      <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider" >
                                          isoNum
                                      </th>

                                      <th scope="col" className="relative px-6 py-3">
                                          <span className="sr-only">Edit</span>
                                      </th>
                                  </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                  {items.countries.countries.map((item, i) => (
                                      <tr key={item.id} className={(i%2==0) ? "" : "bg-gray-100 bg-opacity-50"}>
                                          <td className="px-6 py-3 whitespace-nowrap">
                                              <div className="text-sm text-gray-900">{item.id}</div>
                                          </td>
                                          <td className="px-6 py-3 whitespace-nowrap">
                                              <div className="text-sm text-gray-900">{item.name}</div>
                                          </td>
                                          <td className="px-6 py-3 whitespace-nowrap">
                                              <div className="text-sm text-gray-900">{item.iso3}</div>
                                          </td>
                                          <td className="px-6 py-3 whitespace-nowrap">
                                              <div className="text-sm text-gray-900">{item.isoNum}</div>
                                          </td>
                                          
                                          <td className="px-2 py-3 whitespace-nowrap text-right flex flex-row justify-end">

                                            <div className="flex flex-row">
                                                <Link  href={{pathname: 'zones_de_livraison/pays_form', query: { id: item.id },}} >
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

          <div className='w-full flex flex-row justify-end mt-5'>
              {items?.countries?.count &&
                <Pagination 
                initialPage={page} 
                itemsPerPage={take} 
                onPageСhange={(pageNumber) => refetch(pageNumber)} 
                totalItems={items?.countries?.count}  
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

