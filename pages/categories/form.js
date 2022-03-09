import { useState } from 'react'
import Link from 'next/link'
import { motion } from "framer-motion";
import Header from '../../components/common/header'
import Sidebar from '../../components/common/sidebar'
import HeadInfo from '../../components/common/headinfo'
import ArrowLeftBoldIcon from '../../components/ui/icons/arrowLeftBoldIcon';
import { Switch } from '@headlessui/react'
import ImageHolder from '../../components/ui/icons/imageHolder';
import dynamic from 'next/dynamic'

var Editor = dynamic(() => import("../../components/common/editor"), {
  ssr: false
})

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function Index() {

  const [enabled, setEnabled] = useState(false)


  return (
    <div className="app-container h-screen">

        <HeadInfo title= 'Dashboard' description='description here'/>
        <Header/>

        <div className='w-full overflow-x-auto px-6 py-5 flex flex-row justify-between'>

            <Sidebar />

            <motion.div initial={{ opacity: 0.45, x: 150 }}  whileInView={{ opacity: 1, x: 0, transition: { duration: 0.60 }, }}>
                <div className='app-body bg-white rounded-xl relative pb-16'>

                    <form className='w-full h-full'>

                        <div className='w-full h-full px-5 pt-4'>

                            <div className='flex flex-row justify-between'>

                            <Link href="./">
                                <div className='text-purple-600 hover:text-opacity-80 cursor-pointer self-center'>
                                        <ArrowLeftBoldIcon customClass="w-4" /> 
                                </div>
                            </Link>


                                <div className='text-lg font-semibold text-purple-600'>Nouvelle Catégorie</div>

                                <div>
                                </div>

                            </div>

                            <div className='w-full grid grid-cols-5 grid-flow-row gap-6 mt-6'>

                                <div className='col-span-2 grid grid-cols-2 gap-3'>

                                    <div className='col-span-2 bg-gray-100 border border-gray-200 rounded-xl h-56 flex flex-col justify-center'>
                                        <div className="space-y-1 text-center">
                                            <ImageHolder customClass="mx-auto h-14 w-12 text-gray-400" />
                                            <div className="flex text-sm text-gray-600">
                                                <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-mediu hover:text-opacity-90">
                                                    <input type="file" id="image" name="image" className="sr-only" />
                                                </label>
                                                <p className="w-full text-center"> <span className="text-iired" >Uploader une image</span> ou le déposer ici</p>
                                            </div>
                                            <p className="text-xs text-gray-500 mb-2">PNG, JPG, GIF jusqu&apos;à 10MB</p>
                                        </div>
                                    </div>

                                    <div className='bg-gray-100 border border-gray-200 rounded-xl h-40 flex flex-col justify-center'>
                                        <div className="space-y-1 text-center">
                                            <ImageHolder customClass="mx-auto h-12 w-10 text-gray-400" />
                                            <div className="flex text-sm text-gray-600">
                                                <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-mediu hover:text-opacity-90">
                                                    <input type="file" id="image" name="image" className="sr-only" />
                                                </label>
                                            </div>
                                            <p className="text-[8.5px] text-gray-500 mb-2">PNG, JPG, GIF jusqu&apos;à 10MB</p>
                                        </div>
                                    </div>

                                    <div className='bg-gray-100 border border-gray-200 rounded-xl h-40 flex flex-col justify-center'>
                                        <div className="space-y-1 text-center">
                                            <ImageHolder customClass="mx-auto h-12 w-10 text-gray-400" />
                                            <div className="flex text-sm text-gray-600">
                                                <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-mediu hover:text-opacity-90">
                                                    <input type="file" id="image" name="image" className="sr-only" />
                                                </label>
                                            </div>
                                            <p className="text-[8.5px] text-gray-500 mb-2">PNG, JPG, GIF jusqu&apos;à 10MB</p>
                                        </div>
                                    </div>

                                </div>

                                <div className='col-span-3'>

                                    <div className="w-full">
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-900">Désignation</label>
                                        <input type="text" name="name" id="name" autoComplete="title" placeholder="Désignation" className="mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 shadow-inner bg-gray-100 bg-opacity-10 rounded-md px-2"/>
                                    </div>

                                    <div className="mt-4 mb-4 ">
                                        <label htmlFor="desc" className="block text-sm font-medium text-gray-900 mb-1">Description</label>
                                        <div className="editor-container border border-gray-400 border-opacity-30 text-gray-900 text-sm font-medium"><Editor /></div>
                                    </div>

                                    <div className="flex flex-row w-full">

                                        <div className="w-1/2 mr-8 self-center">
                                            <label htmlFor="order" className="block text-sm font-medium text-gray-900">Ordre</label>
                                            <input type="number" name="order" id="order" autoComplete="order" placeholder="Ordre" className="mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 shadow-inner bg-gray-100 bg-opacity-10 rounded-md px-2"/>
                                        </div>

                                        <div className="self-center">
                                            <label htmlFor="desc" className="block text-sm font-medium text-gray-900 mb-1">Visiblité</label>

                                            <Switch
                                                checked={enabled}
                                                onChange={setEnabled}
                                                className={`${enabled ? 'bg-purple-600 bg-opacity-80 shadow-sm' : 'bg-purple-50 bg-opacity-50 shadow-inner'}
                                                relative inline-flex flex-shrink-0 h-[34px] w-[70px] border border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                                            >
                                                <span className="sr-only">Use setting</span>
                                                <span
                                                aria-hidden="true"
                                                className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
                                                    pointer-events-none inline-block h-[29.5px] w-[29.5px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200 self-center`}
                                                />
                                            </Switch>
                                        </div>

                                    </div>



                                </div>

                            </div>

                        </div>

                        <div className='h-16 w-full bg-gray-100 bg-opacity-50 border-t border-gray-200 border-opacity-80 absolute bottom-0 left-0 z-4 rounded-b-xl flex flex-row justify-end px-5'>

                            <div className='ml-2 bg-gray-500 bg-opacity-90 shadow-lg h-10 px-4 rounded-md flex flex-col justify-center btn-effect1 self-center mr-2'>
                                <button className='text-sm font-medium text-gray-100 hover:text-white self-center tracking-wide'>Annuler</button>
                            </div>

                            <div className='ml-2 bg-purple-500 bg-opacity-90 shadow-lg h-10 px-5 rounded-md flex flex-col justify-center btn-effect1 self-center'>
                                <button className='text-sm font-medium text-gray-100 hover:text-white self-center tracking-wide'>Valider</button>
                            </div>

                        </div>

                    </form>

                </div>
            </motion.div>
            

        </div>

    </div>
  )
}




