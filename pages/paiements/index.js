import { useState } from 'react'
import Link from 'next/link'
import { motion } from "framer-motion";
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
import { classNames } from '../../libs/util';


export default function Index() {

const [currentPage, setCurrentPage] = useState(1);
  const pageLimit = 3;

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
                            <div className='px-2 py-1 rounded-xl bg-purple-600 bg-opacity-90 text-white text-xs font-medium self-center'>226</div>

                        </div>

                        <div className='w-full flex flex-row justify-between px-4 mt-4'>

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

                                <Link href='commandes/form' > 
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
                                    <div className="shadow overflow-hidden app-table border-b border-gray-200 sm:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-200 ">
                                            <thead className="th-bg-1 sticky top-0 ">
                                                <tr>
                                                    <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                                                        Designation
                                                    </th>
                                                    <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider" >
                                                        Description
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
                                                {people.map((person, i) => (
                                                    <tr key={person.email} className={(i%2==0) ? "" : "bg-gray-100 bg-opacity-50"}>
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


