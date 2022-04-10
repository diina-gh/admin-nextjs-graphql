import { useState } from 'react'
import Link from 'next/link'
import { motion } from "framer-motion";
import { Tab } from '@headlessui/react'
import Header from '../../components/common/header'
import Sidebar from '../../components/common/sidebar'
import HeadInfo from '../../components/common/headinfo'
import Sort from '../../components/common/sort';
import Filter from '../../components/common/filter';
// import SearchIcon from '../../components/ui/icons/searchIcon';
import AddBoldIcon from '../../components/ui/icons/addBoldIcon';
import DocBoldIcon from '../../components/ui/icons/docBoldIcon';
import { Pagination } from "react-pagination-bar"
import 'react-pagination-bar/dist/index.css'
import ChevronLeftIcon from '../../components/ui/icons/chevronLeftIcon';
import ChevronRightIcon from '../../components/ui/icons/chevronRightIcon';
import DoubleChevronLeftIcon from '../../components/ui/icons/doubleChevronLeftIcon';
import DoubleChevronRightIcon from '../../components/ui/icons/doubleChevronRightIcon';
import { getCategories, getSubCategories, deleteCategory } from '../../hooks/category';
import EditBoldIcon from '../../components/ui/icons/editBoldIcon'
import TrashBoldIcon from '../../components/ui/icons/trashBoldIcon'
import { deleteImage } from '../../hooks/image';
import BlockUI from '../../components/common/blockui';
import toast, { Toaster } from 'react-hot-toast';
import firebase from '../../config/firebase'
import { capitalize } from '../../libs/util';
import { useDebouncedCallback } from 'use-debounce';
import SearchIcon from '../../components/ui/icons/searchIcon';
import ListBoldIcon from '../../components/ui/icons/listBoldIcon';
import AppBoldIcon from '../../components/ui/icons/appBoldIcon';
import CrossIcon from '../../components/ui/icons/crossIcon';
import PencilIcon from '../../components/ui/icons/pencilIcon';
import { truncate } from '../../libs/util';

const a_text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function Index() {

    const take = 12;

    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState('')
    const [direction, setDirection] = useState('asc')
    const [orderBy, setOrderBy] = useState({"order": direction})
    const [block, setBlock] = useState(false);
    const [display, setDisplay] = useState(1);

    const changeDisplay = (e, option) => {
        e.preventDefault()
        setDisplay(option)
    }

  
    const { items, isLoading, isError, mutate } = getCategories(page,take,filter,orderBy )

    if(mutate) console.log("The mutate ", mutate)
  
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
        }, 1000
    );
  
    if (isError) console.log("The error here ", isError)
    if (isLoading) console.log("loading...")
    if(items) console.log("Informations => ", items)

    async function deleteItem (e, id, imageId, imageref){

      e.preventDefault()
      setBlock(true)
      var {response } = await deleteCategory(id)
      
      if(response?.__typename == 'Category'){
          console.log("Item deleted ", response.name)
          if(imageId != null && imageref != null){
            deleteImageref(imageId, imageref)
          }
          else{
            refetch(page);
            setBlock(false)
            toast.success('Suppression réussie !');
          } 
      } 
      else if(response?.__typename == 'InputError'){
          toast.error(response?.message);
          setBlock(false)
      }
      else{
          toast.error("Erreur inconnue. Veuillez contacter l'administrateur !");
          setBlock(false)
      }

  }


    async function deleteImageref (imageId, imageref) {
      firebase.storage().ref(`images/${imageref}`).delete().then(() => {
          console.log("File deleted successfuly");
          deleteImageInfo(imageId);
        }).catch((error) => {
          console.log("Uh-oh, an error occurred: ", error);
          if(error.code == 'storage/object-not-found') deleteImageInfo(id, imageId);
      });
  }
  
  async function deleteImageInfo (imageId) {
      var {response } = await deleteImage(imageId)
      if(response?.__typename == 'Image'){
          console.log("Image info deleted ", response.imageref)
          refetch(page);
          setBlock(false)
          toast.success('Suppression réussie !');
      } 
      else if(response?.__typename == 'InputError'){
          toast.error(response?.message);
          setBlock(false)
      }
      else{
          toast.error("Erreur inconnue. Veuillez contacter l'administrateur");
          setBlock(false)
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


                    <div className='w-full'>

                        <Tab.Group >

                            <Tab.List className="flex space-x-1 border-b border-gray-200 border-opacity-50 w-full">

                                    <Tab className={({ selected }) =>classNames('w-full flex flex-row justify-center py-3 text-[1.075rem] font-bold leading-5 rounded-t-xl mb-minus1 tracking-normal','focus:outline-none focus:ring-0 ring-opacity-0', selected ? 'text-purple-800 bg-white shadow-sm badge-active' : 'text-gray-400 text-opacity-80 hover:text-purple-600 badge-disabled')}>
                                            <div className='mr-2 self-center'>Catégories</div>
                                            <div className='px-2 py-[0.25px] rounded-xl tab-badge text-[10.35px] font-medium self-center'>{items?.categories?.count ? items?.categories?.count : 0 }</div>
                                    </Tab>

                                    <Tab className={({ selected }) =>classNames('w-full flex flex-row justify-center py-3 text-[1.075rem] font-bold leading-5 rounded-t-xl mb-minus1 tracking-normal','focus:outline-none focus:ring-0 ring-opacity-0', selected ? 'text-purple-800 bg-white shadow-sm badge-active' : 'text-gray-400 text-opacity-80 hover:text-purple-600 badge-disabled')}>
                                            <div className='mr-2 self-center'>Sous catégories</div>
                                            <div className='px-2 py-[0.25px] rounded-xl tab-badge text-[10.35px] font-medium self-center'>{items?.categories?.countSub ? items?.categories?.countSub : 0 }</div>
                                    </Tab>

                                
                            </Tab.List>

                            <Tab.Panels className='app-subbody2'>
                                    <Tab.Panel key={1} className={classNames('','bg-white h-full focus:outline-none focus:ring-0 ring-opacity-0 rounded-b-xl ')}>

                                        <div className='w-full h-full rounded-b-xl overflow-y-scroll pt-4 pb-3'>

                                            <div className='w-full flex flex-row justify-between px-4 mt-1'>

                                                <div className='flex flex-row'>
                                                    
                                                    <Sort />
                                                    <Filter />

                                                    <div onClick={(e) => changeDisplay(e,0)} className={` ${display == 0 ? 'text-purple-600' : 'text-gray-700'} hover:text-purple-600 duration-700 ease-in-out self-center cursor-pointer mr-4`}>
                                                        <ListBoldIcon customClass="w-4 h-7" />
                                                    </div>

                                                    <div onClick={(e) => changeDisplay(e,1)} className={` ${display == 1 ? 'text-purple-600' : 'text-gray-700'} hover:text-purple-600 duration-700 ease-in-out self-center cursor-pointer mr-4`}>
                                                        <AppBoldIcon customClass="w-4 h-4" />
                                                    </div>

                                                    <div className='ml-2 h-8 px-2 self-center bg-gray-100 bg-opacity-95 shadow-inner rounded-full flex flex-row'>

                                                        <div className='w-4 h-4 self-center'>
                                                            <SearchIcon className='w-full h-full text-gray-700 -mb-0.5' />
                                                        </div>

                                                        <div className='w-72 h-full'>
                                                            <input type="text" onChange={(e) => e.target.value == '' ? mutate({...items, filter:''}) : refetch(null, e.target.value)} className='w-full h-full focus:ring-0 text-sm border-0 bg-gray-200 bg-opacity-0' placeholder='Rechercher un nom ou une description ...' />
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

                                                    <Link href='categories/form' > 
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

                                                        {(items && items.categories && items?.page == null) &&
                                                            <>
                                                            { display == 1 &&

                                                                <div className="w-full grid grid-cols-6 gap-4">
                                                                    {items.categories.categories.map((item, i) => (
                                                                        <div key={i} className="w-full">
                                                                            <motion.div initial={{ opacity: 0, y: ( Math.random() + i * 5) }} whileInView={{ opacity: 1, y: 0, transition: { duration: 1.05 }, }}>
                                                                                <div className="w-full px-2 py-2 rounded-xl bg-gray-200 bg-opacity-80 cursor-pointer relative parent-layer">

                                                                                    <div onClick={(e) => deleteItem(e, item.id)}  className='hided-item absolute top-[0.55rem] right-[0.4rem] w-[1.25rem] h-[1.25rem] bg-red-400 hover:bg-red-500 rounded-full flex flex-row justify-center z-10 shadow-sm transition duration-700 ease-in-out'>
                                                                                        <CrossIcon customClass="w-2 h-2 text-white self-center" />
                                                                                    </div>

                                                                                    <Link  href={{pathname: 'categories/form', query: { id: item.id},}} >
                                                                                        <div className='hided-item absolute top-[2.1rem] right-[0.4rem] w-[1.25rem] h-[1.25rem] bg-gray-500 hover:bg-gray-600 rounded-full flex flex-row justify-center z-10 shadow-sm transition duration-700 ease-in-out'>
                                                                                            <PencilIcon customClass="w-[0.7rem] h-[0.7rem] text-white self-center" />
                                                                                        </div>
                                                                                    </Link>
                                                                                    

                                                                                    <div className='w-full h-[5.5rem] rounded-xl'>
                                                                                        <img className='w-full h-full rounded-xl object-cover' src={item.image.url} />
                                                                                    </div>

                                                                                    <div className='w-full mt-2'>
                                                                                        <div className='w-full main-item text-gray-900 cursor-pointer text-[0.87rem] font-semibold truncate transition duration-700 ease-in-out'>{capitalize(item.name)}</div>
                                                                                        <div className='w-full text-gray-800 text-[0.72rem] font-medium h-[3.55rem] mt-0.5 leading-4'>{truncate(item.desc, 68)}</div>
                                                                                    </div>

                                                                                </div>

                                                                            </motion.div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            }

                                                            {display == 0 &&

                                                                <motion.div initial={{ opacity: 0.55 }} whileInView={{ opacity: 1, transition: { duration: 1.05 }, }}>
                                                                    <table className="min-w-full divide-y divide-gray-200">
                                                                        <thead className="th-bg-1 sticky top-0 ">
                                                                            <tr>
                                                                                <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                                                                                    Designation
                                                                                </th>
                                                                                <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider" >
                                                                                    Description
                                                                                </th>
                                                                                <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider" >
                                                                                    Ordre
                                                                                </th>
                                                                                <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider" >
                                                                                    Status
                                                                                </th>

                                                                                <th scope="col" className="relative px-6 py-3">
                                                                                    <span className="sr-only">Edit</span>
                                                                                </th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody className="bg-white divide-y divide-gray-200">
                                                                            {items.categories.categories.map((item, i) => (
                                                                                <tr key={item.id} className={(i%2==0) ? "" : "bg-gray-100 bg-opacity-50"}>

                                                                                    <td className="px-6 py-3 whitespace-nowrap">
                                                                                        <div className="flex items-center">
                                                                                        <div className={`${item.activated ? 'bg-gradient-to-r from-violet-600 to-purple-600 hover:scale-110' : 'bg-gray-400'} flex-shrink-0 item-image-0 rounded-full border-opacity-80 transition duration-700 ease-in-out cursor-pointer`} >
                                                                                            <div className='image-layer-2 bg-white rounded-full'>
                                                                                                <img className={`${item.activated ? 'opacity-100' : 'opacity-50'} rounded-full object-cover`} src={item?.image?.url} alt="" />
                                                                                            </div>
                                                                                        </div>
                                                                                            <div className={`${item.activated ? 'opacity-100' : 'opacity-50'} ml-4`}>
                                                                                                <div className="text-sm font-medium text-gray-900 w-32 truncate">{capitalize(item.name)}</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td className="px-6 py-3 whitespace-nowrap">
                                                                                        <div className={`${item.activated ? 'opacity-100' : 'opacity-50'} text-sm text-gray-900 w-64 truncate`} >{item.desc}</div>
                                                                                    </td>
                                                                                    <td className="px-6 py-3 whitespace-nowrap">
                                                                                        {item.activated == true ?
                                                                                            <span className="px-2 py-0.5 inline-flex text-[11px] font-semibold rounded-full bg-orange-100 text-orange-800">
                                                                                                {item.order}
                                                                                            </span>
                                                                                        :
                                                                                            <span className="px-1 py-0.5 inline-flex text-[11px] font-semibold rounded-full bg-gray-200 text-gray-500">
                                                                                                {item.order}
                                                                                            </span>
                                                                                        }
                                                                                        
                                                                                    </td>
                                                                                    <td className="px-6 py-3 whitespace-nowrap">
                                                                                        {item.activated == true ?
                                                                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                                                            Active
                                                                                            </span>
                                                                                        :
                                                                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-200 text-gray-500">
                                                                                            Inactive
                                                                                            </span>
                                                                                        }
                                                                                        
                                                                                    </td>

                                                                                    <td className="px-2 whitespace-nowrap">

                                                                                        <div className="flex flex-row justify-end">
                                                                                            <Link  href={{pathname: 'categories/form', query: { id: item.id },}} >
                                                                                                <button className="w-7 h-7 rounded-full border border-iiblack gt-shadow5 flex flex-row justify-center cursor-pointer btn-effect1 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 mr-2">
                                                                                                    <EditBoldIcon customClass="w-3 text-gray-600 text-opacity-90 self-center"/>
                                                                                                </button>
                                                                                            </Link>

                                                                                            <button  onClick={(e) => deleteItem(e, item.id, item.image?.id, item.image?.imageref) } className="w-7 h-7 rounded-full border border-iiblack gt-shadow5 flex flex-row justify-center cursor-pointer btn-effect1 bg-gray-100 hover:bg-gray-200 active:bg-gray-30">
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

                                            <div className='w-full flex flex-row justify-end mt-5'>
                                                {items?.categories != null &&
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

                                        <SubCategories />

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


function SubCategories () {

    const take = 6;

    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState('')
    const [direction, setDirection] = useState('asc')
    const [orderBy, setOrderBy] = useState({"order": direction})
    const [block, setBlock] = useState(false);

    const [display, setDisplay] = useState(1);

    const changeDisplay = (e, option) => {
        e.preventDefault()
        setDisplay(option)
    }
  
    var { items, isLoading, isError, mutate } = getSubCategories(page,take,filter, orderBy )
  
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
        }, 1000
    );
  
    if (isError) console.log("The error here ", isError)
    if (isLoading) console.log("loading...")
    if(items) console.log("Informations => ", items)

    async function deleteItem (e, id, imageId, imageref){

      e.preventDefault()
      setBlock(true)
      var {response } = await deleteCategory(id)
      
      if(response?.__typename == 'Category'){
          console.log("Item deleted ", response.name)
          if(imageId != null && imageref != null){
            deleteImageref(imageId, imageref)
          }
          else{
            refetch(page);
            setBlock(false)
            toast.success('Suppression réussie !');
          } 
      } 
      else if(response?.__typename == 'InputError'){
          toast.error(response?.message);
          setBlock(false)
      }
      else{
          toast.error("Erreur inconnue. Veuillez contacter l'administrateur !");
          setBlock(false)
      }

  }


    async function deleteImageref (imageId, imageref) {
      firebase.storage().ref(`images/${imageref}`).delete().then(() => {
          console.log("File deleted successfuly");
          deleteImageInfo(imageId);
        }).catch((error) => {
          console.log("Uh-oh, an error occurred: ", error);
          if(error.code == 'storage/object-not-found') deleteImageInfo(id, imageId);
      });
    }
  
    async function deleteImageInfo (imageId) {
        var {response } = await deleteImage(imageId)
        if(response?.__typename == 'Image'){
            console.log("Image info deleted ", response.imageref)
            refetch(page);
            setBlock(false)
            toast.success('Suppression réussie !');
        } 
        else if(response?.__typename == 'InputError'){
            toast.error(response?.message);
            setBlock(false)
        }
        else{
            toast.error("Erreur inconnue. Veuillez contacter l'administrateur");
            setBlock(false)
        }
    }


    return (
        <div className='w-full h-full rounded-b-xl overflow-y-scroll pt-4 pb-3'>

            <BlockUI blocking={block} />

            <div className='w-full flex flex-row justify-between px-4 mt-1'>

                <div className='flex flex-row'>
                    
                    <Sort />
                    <Filter />

                    <div onClick={(e) => changeDisplay(e,0)} className={` ${display == 0 ? 'text-purple-600' : 'text-gray-700'} hover:text-purple-600 duration-700 ease-in-out self-center cursor-pointer mr-4`}>
                        <ListBoldIcon customClass="w-4 h-7" />
                    </div>

                    <div onClick={(e) => changeDisplay(e,1)} className={` ${display == 1 ? 'text-purple-600' : 'text-gray-700'} hover:text-purple-600 duration-700 ease-in-out self-center cursor-pointer mr-4`}>
                        <AppBoldIcon customClass="w-4 h-4" />
                    </div>

                    <div className='ml-2 h-8 px-2 self-center bg-gray-100 bg-opacity-95 shadow-inner rounded-full flex flex-row'>

                        <div className='w-4 h-4 self-center'>
                            <SearchIcon className='w-full h-full text-gray-700 -mb-0.5' />
                        </div>

                        <div className='w-72 h-full'>
                            <input type="search" onChange={(e) => e.target.value == '' ? mutate({...items, filter:''}) : refetch(null, e.target.value)}   className='w-full h-full focus:ring-0 text-sm border-0 bg-gray-200 bg-opacity-0' placeholder='Rechercher un nom ou une description ...' />
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

                    <Link href={{pathname: 'categories/form', query: { type: 2 },}} > 
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

                        {(items && items.subCategories && items?.page == null) &&
                            <>
                            { display == 1 &&

                                <div className="w-full grid grid-cols-6 gap-4">
                                    {items.subCategories.categories.map((item, i) => (
                                        <div key={i} className="w-full">
                                            <motion.div initial={{ opacity: 0, y: ( Math.random() + i * 5) }} whileInView={{ opacity: 1, y: 0, transition: { duration: 1.05 }, }}>
                                                <div className="w-full px-2 py-2 rounded-xl bg-gray-200 bg-opacity-80 cursor-pointer relative parent-layer">

                                                    <div onClick={(e) => deleteItem(e, item.id)}  className='hided-item absolute top-[0.55rem] right-[0.4rem] w-[1.25rem] h-[1.25rem] bg-red-400 hover:bg-red-500 rounded-full flex flex-row justify-center z-10 shadow-sm transition duration-700 ease-in-out'>
                                                        <CrossIcon customClass="w-2 h-2 text-white self-center" />
                                                    </div>

                                                    <Link  href={{pathname: 'categories/form', query: { id: item.id, type: 2 },}} >
                                                        <div className='hided-item absolute top-[2.1rem] right-[0.4rem] w-[1.25rem] h-[1.25rem] bg-gray-500 hover:bg-gray-600 rounded-full flex flex-row justify-center z-10 shadow-sm transition duration-700 ease-in-out'>
                                                            <PencilIcon customClass="w-[0.7rem] h-[0.7rem] text-white self-center" />
                                                        </div>
                                                    </Link>
                                                    

                                                    <div className='w-full h-[5.5rem] rounded-xl'>
                                                        <img className='w-full h-full rounded-xl object-cover' src={item.image.url} />
                                                    </div>

                                                    <div className='w-full mt-2'>
                                                        <div className='w-full main-item text-gray-900 cursor-pointer text-[0.87rem] font-semibold truncate transition duration-700 ease-in-out'>{capitalize(item.name)}</div>
                                                        <div className='w-full text-gray-800 text-[0.72rem] font-medium h-[3.55rem] mt-0.5 leading-4'>{truncate(item.desc, 68)}</div>
                                                    </div>

                                                </div>

                                            </motion.div>
                                        </div>
                                    ))}
                                </div>
                            }

                            {display == 0 &&

                                <motion.div initial={{ opacity: 0.55 }} whileInView={{ opacity: 1, transition: { duration: 1.05 }, }}>
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="th-bg-1 sticky top-0 ">
                                            <tr>
                                                <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                                                    Designation
                                                </th>
                                                <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider" >
                                                    Description
                                                </th>
                                                <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider" >
                                                    Ordre
                                                </th>
                                                <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider" >
                                                    Status
                                                </th>

                                                <th scope="col" className="relative px-6 py-3">
                                                    <span className="sr-only">Edit</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {items.categories.categories.map((item, i) => (
                                                <tr key={item.id} className={(i%2==0) ? "" : "bg-gray-100 bg-opacity-50"}>

                                                    <td className="px-6 py-3 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                        <div className={`${item.activated ? 'bg-gradient-to-r from-violet-600 to-purple-600 hover:scale-110' : 'bg-gray-400'} flex-shrink-0 item-image-0 rounded-full border-opacity-80 transition duration-700 ease-in-out cursor-pointer`} >
                                                            <div className='image-layer-2 bg-white rounded-full'>
                                                                <img className={`${item.activated ? 'opacity-100' : 'opacity-50'} rounded-full object-cover`} src={item?.image?.url} alt="" />
                                                            </div>
                                                        </div>
                                                            <div className={`${item.activated ? 'opacity-100' : 'opacity-50'} ml-4`}>
                                                                <div className="text-sm font-medium text-gray-900 w-32 truncate">{capitalize(item.name)}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-3 whitespace-nowrap">
                                                        <div className={`${item.activated ? 'opacity-100' : 'opacity-50'} text-sm text-gray-900 w-64 truncate`} >{item.desc}</div>
                                                    </td>
                                                    <td className="px-6 py-3 whitespace-nowrap">
                                                        {item.activated == true ?
                                                            <span className="px-2 py-0.5 inline-flex text-[11px] font-semibold rounded-full bg-orange-100 text-orange-800">
                                                                {item.order}
                                                            </span>
                                                        :
                                                            <span className="px-1 py-0.5 inline-flex text-[11px] font-semibold rounded-full bg-gray-200 text-gray-500">
                                                                {item.order}
                                                            </span>
                                                        }
                                                        
                                                    </td>
                                                    <td className="px-6 py-3 whitespace-nowrap">
                                                        {item.activated == true ?
                                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                            Active
                                                            </span>
                                                        :
                                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-200 text-gray-500">
                                                            Inactive
                                                            </span>
                                                        }
                                                        
                                                    </td>

                                                    <td className="px-2 whitespace-nowrap">

                                                        <div className="flex flex-row justify-end">
                                                            <Link  href={{pathname: 'categories/form', query: { id: item.id, type: 2 },}} >
                                                                <button className="w-7 h-7 rounded-full border border-iiblack gt-shadow5 flex flex-row justify-center cursor-pointer btn-effect1 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 mr-2">
                                                                    <EditBoldIcon customClass="w-3 text-gray-600 text-opacity-90 self-center"/>
                                                                </button>
                                                            </Link>

                                                            <button  onClick={(e) => deleteItem(e, item.id, item.image?.id, item.image?.imageref) } className="w-7 h-7 rounded-full border border-iiblack gt-shadow5 flex flex-row justify-center cursor-pointer btn-effect1 bg-gray-100 hover:bg-gray-200 active:bg-gray-30">
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

            <div className='w-full flex flex-row justify-end mt-5'>
                {items?.subCategories != null &&
                    <Pagination 
                    initialPage={page} 
                    itemsPerPage={take} 
                    onPageСhange={(pageNumber) => refetch(pageNumber)} 
                    totalItems={items?.subCategories?.countSub}  
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



