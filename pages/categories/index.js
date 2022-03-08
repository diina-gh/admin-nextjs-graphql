import { useState } from 'react'
import Link from 'next/link'
import { motion } from "framer-motion";
import { Tab } from '@headlessui/react'
import Header from '../../components/common/header'
import Sidebar from '../../components/common/sidebar'
import HeadInfo from '../../components/common/headinfo'
import Sort from '../../components/common/sort';
import FilterBoldIcon from '../../components/ui/icons/filterBoldIcon';
import { SearchIcon } from '@heroicons/react/solid';
import AddBoldIcon from '../../components/ui/icons/addBoldIcon';
import DocBoldIcon from '../../components/ui/icons/docBoldIcon';
import { Pagination } from "react-pagination-bar"
import 'react-pagination-bar/dist/index.css'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function Index() {

const [currentPage, setCurrentPage] = useState(1);
  const pageLimit = 3;

  return (
    <div className="app-container h-screen bg-gray-200 bg-opacity-40">

        <HeadInfo title= 'Dashboard' description='description here'/>
        <Header/>

        <div className='w-full px-6 py-5 flex flex-row justify-between'>

            <Sidebar />
            
            <div className='app-body'>

                <div className='w-full'>

                    <Tab.Group >

                        <Tab.List className="flex space-x-1 border-b border-gray-200 border-opacity-50 w-full">

                                <Tab className={({ selected }) =>classNames('w-full py-3 text-base leading-5 font-medium rounded-t-xl mb-minus1 tracking-normal','focus:outline-none focus:ring-0 ring-opacity-0', selected ? 'text-purple-800 bg-white shadow-sm' : 'text-gray-400 hover:bg-gray-100 hover:text-purple-600')}>
                                    Catégories
                                </Tab>

                                <Tab className={({ selected }) =>classNames('w-full py-3 text-base leading-5 font-medium rounded-t-xl mb-minus1 tracking-normal','focus:outline-none focus:ring-0 ring-opacity-0', selected ? 'text-purple-800 bg-white shadow-sm' : 'text-gray-400 hover:bg-gray-100 hover:text-purple-600')}>
                                    Sous-Catégories
                                </Tab>

                            
                        </Tab.List>

                        <Tab.Panels className='app-subbody2'>
                                <Tab.Panel key={1} className={classNames('','bg-white h-full focus:outline-none focus:ring-0 ring-opacity-0 rounded-b-xl ')}>

                                    <div className='w-full h-full rounded-b-xl overflow-y-scroll p-4'>

                                        <div className='w-full flex flex-row justify-between mt-3'>

                                            <div className='flex flex-row'>
                                                
                                                <Sort />

                                                <div className='ml-2 bg-pink-600 bg-opacity-90 h-8 shadow px-2 rounded-md flex flex-col justify-center'>
                                                    <div className='flex flex-row text-sm font-medium text-gray-100 hover:text-white'>
                                                        <div className='mr-2 self-center'>Filtrer</div>
                                                        <FilterBoldIcon customClass="self-center w-3 h-3" />
                                                    </div>
                                                </div>

                                                <div className='ml-2 h-8 px-2 self-center bg-gray-200 bg-opacity-80 shadow-inner rounded-full flex flex-row'>

                                                    <div className='w-4 h-4 self-center'>
                                                        <SearchIcon className='w-full h-full text-gray-800' />
                                                    </div>

                                                    <div className='w-72 h-full'>
                                                        <input type="search"  className='w-full h-full focus:ring-0 text-sm border-0 bg-gray-200 bg-opacity-0' placeholder='Rechercher un nom ou une description ...' />
                                                    </div>

                                                </div>
                                                
                                            </div>

                                            <div className='flex flex-row'>

                                                <div className='ml-2 bg-green-500 bg-opacity-90 h-8 shadow px-2 rounded-md flex flex-col justify-center'>
                                                    <div className='flex flex-row text-sm font-medium text-gray-100 hover:text-white'>
                                                        <DocBoldIcon customClass="self-center w-3 h-3" />
                                                        <div className='ml-2 self-center'>Exporter</div>
                                                    </div>
                                                </div>

                                                <div className='ml-2 bg-black bg-opacity-90 h-8 shadow px-3 rounded-md flex flex-col justify-center'>
                                                    <div className='flex flex-row text-sm font-medium text-gray-100 hover:text-white'>
                                                        <AddBoldIcon customClass="self-center w-3 h-3" />
                                                        <div className='ml-2 self-center'>Ajouter</div>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>

                                        {/* <div className='bg-gray-200 w-full h-12 mt-4'>
                                        </div> */}

                                        <div className="w-full flex flex-col overflow-x-auto mt-4">
                                            <div className="w-full overflow-x-auto">
                                                <div className="align-middle inline-block min-w-full">
                                                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                                        <table className="min-w-full divide-y divide-gray-200">
                                                            <thead className="bg-gray-100">
                                                                <tr>
                                                                    <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                                        Designation
                                                                    </th>
                                                                    <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider" >
                                                                        Description
                                                                    </th>
                                                                    <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider" >
                                                                        Status
                                                                    </th>
      
                                                                    <th scope="col" className="relative px-6 py-3">
                                                                        <span className="sr-only">Edit</span>
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="bg-white divide-y divide-gray-200">
                                                                {people.map((person) => (
                                                                    <tr key={person.email}>
                                                                        <td className="px-6 py-3 whitespace-nowrap">
                                                                            <div className="flex items-center">
                                                                                <div className="flex-shrink-0 h-10 w-10">
                                                                                    <img className="h-10 w-10 rounded-full" src={person.image} alt="" />
                                                                                </div>
                                                                                <div className="ml-4">
                                                                                    <div className="text-sm font-medium text-gray-900">{person.name}</div>
                                                                                    <div className="text-sm text-gray-500">{person.email}</div>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td className="px-6 py-3 whitespace-nowrap">
                                                                            <div className="text-sm text-gray-900">{person.title}</div>
                                                                            <div className="text-sm text-gray-500">{person.department}</div>
                                                                        </td>
                                                                        <td className="px-6 py-3 whitespace-nowrap">
                                                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                                                Active
                                                                            </span>
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
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='w-full flex flex-row justify-end mt-6'>
                                            <Pagination 
                                                initialPage={currentPage} 
                                                itemsPerPage={pageLimit} 
                                                onPageСhange={(pageNumber) => setCurrentPage(pageNumber)} 
                                                totalItems={people.length}  
                                                pageNeighbours={2} 
                                                startLabel={'<<'}
                                                endLabel={'>>'}
                                                nextLabel={'>'}
                                                prevLabel={'<'}
                                                customClassNames={{
                                                    rpbItemClassName:'pg-btn',
                                                    rpbItemClassNameActive:'pg-active-btn',
                                                    // rpbGoItemClassName: 'custom-go-item',
                                                    // rpbItemClassNameDisable: 'custom-item--disable', 
                                                    // rpbProgressClassName: 'custom-progress-bar',
                                                    // rpbRootClassName: 'custom-root',
                                                }}
                                            />
                                        </div>


                                    </div>

                                </Tab.Panel>

                                <Tab.Panel key={2} className={classNames('','bg-white h-full focus:outline-none focus:ring-0 ring-opacity-0 rounded-b-xl ')}>

                                    <div className='w-full h-full rounded-b-xl overflow-y-scroll'>
                                        
                                    </div>

                                </Tab.Panel>
                        </Tab.Panels>

                    </Tab.Group>

                </div>

            </div>

        </div>

    </div>
  )
}


const people = [
    {
      name: 'Jane Cooper',
      title: 'Regional Paradigm Technician',
      department: 'Optimization',
      role: 'Admin',
      email: 'jane.cooper@example.com',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Regional Paradigm Technician',
        department: 'Optimization',
        role: 'Admin',
        email: 'jane.cooper@example.com',
        image:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Jane Cooper',
        title: 'Regional Paradigm Technician',
        department: 'Optimization',
        role: 'Admin',
        email: 'jane.cooper@example.com',
        image:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },

    {
        name: 'Jane Cooper',
        title: 'Regional Paradigm Technician',
        department: 'Optimization',
        role: 'Admin',
        email: 'jane.cooper@example.com',
        image:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },

    {
        name: 'Jane Cooper',
        title: 'Regional Paradigm Technician',
        department: 'Optimization',
        role: 'Admin',
        email: 'jane.cooper@example.com',
        image:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
  ]


