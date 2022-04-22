import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from "framer-motion";
import { Tab } from '@headlessui/react'
import Header from '../../components/common/header'
import Sidebar from '../../components/common/sidebar'
import HeadInfo from '../../components/common/headinfo'
import Sort from '../../components/common/sort';
import Filter from '../../components/common/filter';
// import SearchIcon from '../../components/ui/icons/searchIcon';
import SearchIcon from '../../components/ui/icons/searchIcon';
import AddBoldIcon from '../../components/ui/icons/addBoldIcon';
import DocBoldIcon from '../../components/ui/icons/docBoldIcon';
import EditBoldIcon from '../../components/ui/icons/editBoldIcon'
import TrashBoldIcon from '../../components/ui/icons/trashBoldIcon'
import PencilIcon from '../../components/ui/icons/pencilIcon';
import { Pagination } from "react-pagination-bar"
import 'react-pagination-bar/dist/index.css'
import ChevronLeftIcon from '../../components/ui/icons/chevronLeftIcon';
import ChevronRightIcon from '../../components/ui/icons/chevronRightIcon';
import DoubleChevronLeftIcon from '../../components/ui/icons/doubleChevronLeftIcon';
import DoubleChevronRightIcon from '../../components/ui/icons/doubleChevronRightIcon';
import ListBoldIcon from '../../components/ui/icons/listBoldIcon';
import AppBoldIcon from '../../components/ui/icons/appBoldIcon';
import CrossIcon from '../../components/ui/icons/crossIcon';
import { getProducts } from '../../hooks/product';
import { capitalize } from '../../libs/util';
import { allCategories, getCategories } from '../../hooks/category';
import { useDebouncedCallback } from 'use-debounce';


export default function Index() {

    const [take, setTake] = useState(12);
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState('')
    const [direction, setDirection] = useState('asc')
    const [orderBy, setOrderBy] = useState({"id": direction})
    const [display, setDisplay] = useState(1);

    const fields = {"productName": true, "productDesc": true, "productUnit": true, "productUnitprice": true, "productUnitweight": true, "productActivated": true, "productBrand": true, "productBrandName": true, "productCategory": true, "productCategoryName": true, "productImage": true, "imageUrl": true, "imageImageref": true, "productInventory": true, "productInventoryQuantity": true}
    var { items, isLoading, isError, mutate } = getProducts(page,take,filter, orderBy, fields )

    const changeDisplay = (e, option) => {
        e.preventDefault()
        setDisplay(option)
        // refetch(1)
    }

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

                <motion.div initial={{ opacity: 0.45, x: -150 }}  whileInView={{ opacity: 1, x: 0, transition: { duration: 0.60 }, }}>
                    <div className='app-body rounded-xl'>

                        <div className='w-full h-full bg-white rounded-xl overflow-y-scroll pt-4 pb-3'>

                            <div className='w-full flex flex-row mt-2 px-4'>

                                <div className='text-lg font-bold text-purple-600 mr-2 self-center'>Paiements</div>
                                <div className='px-2 py-1 rounded-xl bg-gradient-to-r from-purple-700 to-purple-300 text-white text-[11.5px] font-medium self-center'>{items?.products?.count ? items?.products?.count: 0 }</div>

                            </div>

                            <div className='w-full flex flex-row justify-between px-4 mt-4'>

                                <div className='flex flex-row'>
                                    
                                    <Sort />
                                    <Filter gender={true} brand={true} category={true} price={true} option={true} />

                                    <div onClick={(e) => changeDisplay(e,0)} className={` ${display == 0 ? 'text-purple-600' : 'text-gray-700'} hover:text-purple-600 duration-700 ease-in-out self-center cursor-pointer mr-4`}>
                                        <ListBoldIcon customClass="w-4 h-7" />
                                    </div>

                                    <div onClick={(e) => changeDisplay(e,1)} className={` ${display == 1 ? 'text-purple-600' : 'text-gray-700'} hover:text-purple-600 duration-700 ease-in-out self-center cursor-pointer mr-4`}>
                                        <AppBoldIcon customClass="w-4 h-4" />
                                    </div>

                                    <div className='h-8 px-2 self-center bg-gray-100 bg-opacity-95 shadow-inner rounded-full flex flex-row'>

                                        <div className='w-4 h-4 -mb-0.5 self-center'>
                                            <SearchIcon customClass='w-full h-full text-gray-700' />
                                        </div>

                                        <div className='w-72 h-full'>
                                            <input type="text" onChange={(e) => e.target.value == '' ? mutate({...items, filter:''}) : refetch(null, e.target.value)}  className='w-full h-full focus:ring-0 text-sm border-0 bg-gray-200 bg-opacity-0' placeholder='Rechercher un nom ou une description ...' />
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

                            <div className="w-full flex flex-col overflow-x-auto mt-5">
                                <div className="w-full overflow-x-auto">
                                    <div className="align-middle inline-block min-w-full">
                                        <div className="overflow-hidden app-table sm:rounded-lg pl-4 pr-3">

                                        {(isLoading || items?.page != null || items?.filter != null || items?.orderBy != null ) &&
                                            <div className='app-table w-full flex flex-row justify-center'>
                                                <div className='h-10 self-center'><img className='h-full' src="spinner.gif" /></div>
                                            </div>                                                  
                                        }

                                        {(items && items.products && items?.page == null && items?.filter == null && items?.orderBy == null ) &&
                                            <>
                                                { display == 1 &&

                                                    <div className="w-full grid grid-cols-6 gap-4">
                                                        {items.products.products.map((item, i) => (
                                                            <div key={i} className="w-full">
                                                                <motion.div initial={{ opacity: 0, y: ( Math.random() + i * 5) }} whileInView={{ opacity: 1, y: 0, transition: { duration: 1.05 }, }}>
                                                                    <div className="w-full pt-1 pb-5 rounded-xl bg-gray-200 bg-opacity-80 cursor-pointer relative parent-layer">

                                                                        <div onClick={(e) => deleteItem(e, item.id)}  className='hided-item absolute top-[0.55rem] right-[0.4rem] w-[1.25rem] h-[1.25rem] bg-red-400 hover:bg-red-500 rounded-full flex flex-row justify-center z-10 shadow-sm transition duration-700 ease-in-out'>
                                                                            <CrossIcon customClass="w-2 h-2 text-white self-center" />
                                                                        </div>

                                                                        <Link  href={{pathname: 'produits/form', query: { id: item.id},}} >
                                                                            <div className='hided-item absolute top-[2.1rem] right-[0.4rem] w-[1.25rem] h-[1.25rem] bg-gray-500 hover:bg-gray-600 rounded-full flex flex-row justify-center z-10 shadow-sm transition duration-700 ease-in-out'>
                                                                                <PencilIcon customClass="w-[0.7rem] h-[0.7rem] text-white self-center" />
                                                                            </div>
                                                                        </Link>
                                                                        

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
                                                { display == 0 &&

                                                    <motion.div initial={{ opacity: 0.35 }} whileInView={{ opacity: 1, transition: { duration: 1.05 }, }}>
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
                                                                                {item?.images[0] != null &&
                                                                                    <div className={`${item.activated ? 'bg-gradient-to-r from-violet-600 to-purple-600 hover:scale-110' : 'bg-gray-400'} flex-shrink-0 item-image-0 rounded-full border-opacity-80 transition duration-700 ease-in-out cursor-pointer mr-4`} >
                                                                                        <div className='image-layer-2 bg-gray-200 rounded-full'>
                                                                                            <img className={`${item.activated ? 'opacity-100' : 'opacity-50'} rounded-full object-cover`} src={item?.images[0].url} alt="" />
                                                                                        </div>
                                                                                    </div>
                                                                                }
                                                                                <div className={`${item.activated ? 'opacity-100' : 'opacity-50'}`}>
                                                                                    <div className="text-sm font-medium text-gray-900 w-40 truncate">{capitalize(item.name)}</div>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td className="px-6 py-3 whitespace-nowrap">
                                                                            <div className="text-sm text-gray-900">
                                                                                <div dangerouslySetInnerHTML={{__html: item.desc}}></div>
                                                                            </div>
                                                                        </td>
                                                                        <td className="px-6 py-3 whitespace-nowrap">
                                                                            <div className="text-sm text-gray-900">
                                                                                <span className="px-2 py-[0.115] inline-flex text-[0.7rem] leading-5 font-semibold rounded-full bg-orange-100 bg-opacity-80 text-orange-800">
                                                                                    {new Intl.NumberFormat('fr-FR', {style: 'currency', currency:'XOF'}).format(item.unitprice)}
                                                                                </span>
                                                                            </div>
                                                                        </td>
                                                                        <td className="px-6 py-3 whitespace-nowrap">
                                                                            <div className="text-sm text-gray-900">{capitalize(item.category?.name)}</div>
                                                                        </td>
                                                                        <td className="px-6 py-3 whitespace-nowrap">
                                                                            <div className="text-sm text-gray-900">{capitalize(item.brand?.name)}</div>
                                                                        </td>
                                                                        <td className="px-6 py-3 whitespace-nowrap">
                                                                            <div className="text-sm text-gray-900">
                                                                                <span className="px-2 py-[0.115] inline-flex text-[0.7rem] leading-5 font-semibold rounded-full bg-red-100 bg-opacity-80 text-red-800">
                                                                                    {item.inventory?.quantity == null ? 0 : item.inventory?.quantity}
                                                                                </span>
                                                                            </div>
                                                                        </td>

                                                                        <td className="px-2 whitespace-nowrap">
                                                                            <div className="flex flex-row justify-end">
                                                                                <Link  href={{pathname: 'produits/form', query: { id: item.id},}} >
                                                                                    <button className="w-7 h-7 rounded-full border border-iiblack gt-shadow5 flex flex-row justify-center cursor-pointer btn-effect1 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 mr-2">
                                                                                        <EditBoldIcon customClass="w-3 text-gray-600 text-opacity-90 self-center"/>
                                                                                    </button>
                                                                                </Link>

                                                                                <button onClick={(e) => deleteItem(e, item.id)} className="w-7 h-7 rounded-full border border-iiblack gt-shadow5 flex flex-row justify-center cursor-pointer btn-effect1 bg-gray-100 hover:bg-gray-200 active:bg-gray-30">
                                                                                    <TrashBoldIcon customClass="w-3 text-red-600 text-opacity-90 self-center"/>
                                                                                </button>
                                                                            </div>
                                                                        </td>

                                                                    </tr>
                                                                ))}
                                                            </tbody>

                                                        </table>
                                                    </motion.div>
                                                
                                                }
                                            </>
                                                
                                        }
                    
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='w-full flex flex-row justify-end mt-4'>
                                {items?.products != null &&
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
                                }
                            </div>

                        </div>

                    </div>
                </motion.div>
                

            </div>

        </div>
    )
}