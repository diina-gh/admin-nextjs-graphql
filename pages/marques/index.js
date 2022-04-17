import { useState, useEffect } from 'react'
import Link from 'next/link'
import firebase from '../../config/firebase'
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
import { Pagination } from "react-pagination-bar"
import 'react-pagination-bar/dist/index.css'
import ChevronLeftIcon from '../../components/ui/icons/chevronLeftIcon';
import ChevronRightIcon from '../../components/ui/icons/chevronRightIcon';
import DoubleChevronLeftIcon from '../../components/ui/icons/doubleChevronLeftIcon';
import DoubleChevronRightIcon from '../../components/ui/icons/doubleChevronRightIcon';
import EditBoldIcon from '../../components/ui/icons/editBoldIcon'
import TrashBoldIcon from '../../components/ui/icons/trashBoldIcon'
import { getBrands, deleteBrand } from '../../hooks/brand';
import { deleteImage } from '../../hooks/image';
import BlockUI from '../../components/common/blockui';
import toast, { Toaster } from 'react-hot-toast';
import { classNames } from '../../libs/util';
import { useDebouncedCallback } from 'use-debounce';


export default function Index() {

    const take = 12;
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState('')
    const [direction, setDirection] = useState('asc')
    const [orderBy, setOrderBy] = useState({"id": direction})
    const [block, setBlock] = useState(false);

    const fields = {"brandName": true, "brandDesc": true, "brandOrder": true, "brandImage": true, "imageUrl": true, "imageImageref": true}
    var { items, isLoading, isError, mutate } = getBrands(page,take,filter, orderBy, fields)

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

    async function deleteImageref (e, id, imageId, imageref) {
        e.preventDefault()
        setBlock(true)
        firebase.storage().ref(`images/${imageref}`).delete().then(() => {
            console.log("File deleted successfuly");
            deleteImageInfo(id, imageId);
          }).catch((error) => {
            console.log("Uh-oh, an error occurred: ", error);
            if(error.code == 'storage/object-not-found') deleteImageInfo(id, imageId);
        });
    }
    
    async function deleteImageInfo (id, imageId) {
        var {response } = await deleteImage(imageId)
        if(response?.__typename == 'Image'){
            console.log("Image info deleted ", response.imageref)
            deleteItem(id);
        } 
        else if(response?.__typename == 'InputError'){
            toast.error(response?.message);
        }
        else{
            toast.error("Erreur inconnue. Veuillez contacter l'administrateur");
        }
    }
    
    async function deleteItem (id){

        if(!block) setBlock(true)
        var {response } = await deleteBrand(id)
        
        if(response?.__typename == 'Brand'){
            console.log("Item deleted ", response.name)
            refetch(page);
            setBlock(false)
            toast.success('Suppression réussie !');
        } 
        else if(response?.__typename == 'InputError'){
            toast.error(response?.message);
        }
        else{
            toast.error("Erreur inconnue. Veuillez contacter l'administrateur !");
        }

    }

    return (
        <div className="app-container h-screen">

            <Toaster position='top-right' />
            <HeadInfo title= 'Dashboard' description='description here'/>
            <Header/>

            <div className='w-full pt-3 px-3 md:px-6 flex flex-row justify-between'>

                <Sidebar />

                <motion.div initial={{ opacity: 0.45, x: -150 }}  whileInView={{ opacity: 1, x: 0, transition: { duration: 0.60 }, }}>
                    <div className='app-body relative rounded-xl'>

                        <BlockUI blocking={block} />

                        <div className='w-full h-full bg-white rounded-xl overflow-y-scroll pt-4 pb-3'>

                            <div className='w-full flex flex-row mt-2 px-4'>

                                <div className='text-lg font-bold text-purple-600 mr-2 self-center'>Marques</div>
                                <div className='px-2 py-1 rounded-xl bg-purple-600 bg-opacity-90 text-white text-xs font-medium self-center'>{items?.brands?.count ? items?.brands?.count: 0 }</div>

                            </div>

                            <div className='w-full flex flex-row justify-between px-4 mt-4'>

                                <div className='flex flex-row'>
                                    
                                    <Sort />
                                    <Filter />

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

                                    <Link href={{pathname: 'marques/form'}} > 
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
                                        <div className="overflow-hidden app-table sm:rounded-lg pl-4 pr-3">

                                        {(isLoading || items?.page != null || items?.filter != null || items?.orderBy != null ) &&
                                            <div className='app-table w-full flex flex-row justify-center'>
                                                <div className='h-10 self-center'><img className='h-full' src="spinner.gif" /></div>
                                            </div>                                                  
                                        }

                                        {(items && items.brands && items?.page == null && items?.filter == null && items?.orderBy == null ) &&
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
                                                            Ordre
                                                        </th>
                                                        <th scope="col" className="relative px-6 py-3">
                                                            <span className="sr-only">Edit</span>
                                                        </th>
                                                    </tr>
                                                </thead>
    
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {items.brands.brands.map((item, i) => (
                                                        <tr key={item.id} className={(i%2==0) ? "" : "bg-gray-100 bg-opacity-50"}>
                                                            
                                                            <td className="px-6 py-3 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div className='brand-image mr-3'>
                                                                        <img src={item?.image?.url} />
                                                                    </div>
                                                                    <div className="ml-4">
                                                                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-3 whitespace-nowrap">
                                                                <div className="text-sm text-gray-900">{item.desc}</div>
                                                            </td>
                                                            <td className="px-6 py-3 whitespace-nowrap">
                                                                <span className="px-2 inline-flex text-[10px] leading-5 font-semibold rounded-full bg-fuchsia-200 shadow shadow-fuchsia-200 text-fuchsia-900">
                                                                    {item.order}
                                                                </span>
                                                            </td>
                                            
                                                            <td className="px-2 py-3 whitespace-nowrap text-right flex flex-row justify-end">

                                                                <div className="flex flex-row">
                                                                    <Link  href={{pathname: 'marques/form', query: { id: item.id },}} >
                                                                        <button className="w-7 h-7 rounded-full border border-iiblack gt-shadow5 flex flex-row justify-center cursor-pointer btn-effect1 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 mr-2">
                                                                            <EditBoldIcon customClass="w-3 text-gray-600 text-opacity-90 self-center"/>
                                                                        </button>
                                                                    </Link>


                                                                    <button  onClick={(e) => item.image == null ? deleteItem(item.id) : deleteImageref(e, item.id, item.image?.id, item.image?.imageref)} className="w-7 h-7 rounded-full border border-iiblack gt-shadow5 flex flex-row justify-center cursor-pointer btn-effect1 bg-gray-100 hover:bg-gray-200 active:bg-gray-30">
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

                            <div className='w-full flex flex-row justify-end mt-6'>
                                <Pagination 
                                    initialPage={page} 
                                    itemsPerPage={take} 
                                    onPageСhange={(pageNumber) => refetch(pageNumber)} 
                                    totalItems={items?.brands?.count}  
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



