import { useState } from 'react'
import Link from 'next/link'
import { motion } from "framer-motion";
import Header from '../../components/common/header'
import Sidebar from '../../components/common/sidebar'
import HeadInfo from '../../components/common/headinfo'
import ArrowLeftBoldIcon from '../../components/ui/icons/arrowLeftBoldIcon';
import { Switch } from '@headlessui/react'
import ImageHolder from '../../components/ui/icons/imageHolder';
import VariantType1 from '../../components/product/variantType1';
import VariantType2 from '../../components/product/variantType2';
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

                        <div className='w-full h-full pt-4'>

                            <div className='flex flex-row justify-between px-5'>

                                <Link href="./">
                                    <div className='text-purple-600 hover:text-opacity-80 cursor-pointer self-center'>
                                            <ArrowLeftBoldIcon customClass="w-4" /> 
                                    </div>
                                </Link>


                                    <div className='text-lg font-semibold text-purple-600'>Nouveau produit</div>

                                    <div></div>

                            </div>

                            <div className='app-form overflow-y-auto mt-5 px-5'>

                                <div className='text-base font-semibold text-purple-600 mb-3'>Informations générales</div>

                                <div className='w-full grid grid-cols-5 grid-flow-row gap-5'>

                                    <div className='col-span-2 bg-gray-200 bg-opacity-60 rounded-xl px-4 py-4 grid grid-cols-3 gap-3'>

                                        <div className='col-span-3 bg-white bg-opacity-90 border border-gray-200 rounded-xl h-[14.5rem] flex flex-col justify-center'>
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

                                        <div className='bg-white bg-opacity-90 border border-gray-200 rounded-xl h-28 flex flex-col justify-center'>
                                                <div className="space-y-1 text-center">
                                                    <ImageHolder customClass="mx-auto h-11 w-9 text-gray-400" />
                                                    <div className="flex text-sm text-gray-600">
                                                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-mediu hover:text-opacity-90">
                                                            <input type="file" id="image" name="image" className="sr-only" />
                                                        </label>
                                                    </div>
                                                    <p className="text-[8px] text-gray-500 mb-2">PNG, JPG, GIF jusqu&apos;à 10MB</p>
                                                </div>
                                        </div>

                                        <div className='bg-white bg-opacity-90 border border-gray-200 rounded-xl h-28 flex flex-col justify-center'>
                                            <div className="space-y-1 text-center">
                                                <ImageHolder customClass="mx-auto h-11 w-9 text-gray-400" />
                                                <div className="flex text-sm text-gray-600">
                                                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-mediu hover:text-opacity-90">
                                                        <input type="file" id="image" name="image" className="sr-only" />
                                                    </label>
                                                </div>
                                                <p className="text-[8px] text-gray-500 mb-2">PNG, JPG, GIF jusqu&apos;à 10MB</p>
                                            </div>
                                        </div>

                                        <div className='bg-white bg-opacity-90 border border-gray-200 rounded-xl h-28 flex flex-col justify-center'>
                                            <div className="space-y-1 text-center">
                                                <ImageHolder customClass="mx-auto h-11 w-9 text-gray-400" />
                                                <div className="flex text-sm text-gray-600">
                                                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-mediu hover:text-opacity-90">
                                                        <input type="file" id="image" name="image" className="sr-only" />
                                                    </label>
                                                </div>
                                                <p className="text-[8px] text-gray-500 mb-2">PNG, JPG, GIF jusqu&apos;à 10MB</p>
                                            </div>
                                        </div>


                                    </div>

                                    <div className='col-span-3 bg-gray-200 bg-opacity-60 rounded-xl px-4 py-4'>

                                        <div className="w-full mb-4">
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-900">Désignation</label>
                                            <input type="text" name="name" id="name" autoComplete="title" placeholder="Désignation" className="mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 shadow-inner bg-white bg-opacity-90 rounded-md px-2"/>
                                        </div>

                                        <div className="w-full mb-4">
                                            <label htmlFor="desc" className="block text-sm font-medium text-gray-900">Description</label>
                                            <div className="mt-1">
                                                <textarea id="desc" name="desc" rows={8}  className="mt-1 w-full shadow-sm text-sm border border-gray-400 shadow-inner bg-white bg-opacity-90 rounded-md px-2 py-2" placeholder="Donner une description" />
                                            </div>
                                         </div>

                                        <div className="flex flex-row w-full">

                                            <div className="self-center ml-[0.75]">
                                                <label htmlFor="desc" className="block text-sm font-medium text-gray-900 mb-1">Visiblité</label>

                                                <Switch
                                                    checked={enabled}
                                                    onChange={setEnabled}
                                                    className={`${enabled ? 'bg-purple-600 bg-opacity-80 shadow-sm' : 'bg-white bg-opacity-80 shadow-sm'}
                                                    relative inline-flex flex-shrink-0 h-[34px] w-[70px] border border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                                                >
                                                    <span className="sr-only">Use setting</span>
                                                    <span
                                                    aria-hidden="true"
                                                    className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
                                                        pointer-events-none inline-block h-[29.5px] w-[29.5px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200 border border-gray-200 border-opacity-80 self-center`}
                                                    />
                                                </Switch>
                                            </div>

                                        </div>

                                    </div>

                                </div>

                                <div className='divider w-full h-[1px] bg-gray-400 bg-opacity-30 my-8'></div>

                                <div className='text-base font-semibold text-purple-600 mb-3'>Produits associés et variants</div>

                                <div className='w-full grid grid-cols-7 grid-flow-row gap-4 mb-4'>

                                    <div className='col-span-3 bg-gray-200 bg-opacity-60 rounded-xl px-5 py-5 h-[27.5rem]'>
                                        <div className="">
                                            <label htmlFor="desc" className="text-base font-medium text-purple-600 ">Détails</label>
                                            <div className="editor-container border border-gray-400 border-opacity-30 text-gray-900 text-sm font-medium details-editor mt-3"><Editor /></div>
                                        </div>
                                    </div>


                                    <div className='col-span-2 bg-gray-200 bg-opacity-60 rounded-xl px-5 py-5 h-fit'>

                                        <div className='mb-3 ml-0.5 flex flex-row'>
                                             <div className='text-base font-medium text-purple-600 mr-2 self-center'>Variants</div>
                                             <div className='px-2 py-[0.45px] text-[10.325px] font-medium bg-purple-500 bg-opacity-80 text-white rounded-xl self-center'>2</div>
                                        </div>

                                        <div className='w-full bg-white border border-gray-200 rounded-xl px-4 py-4 mb-4'>
                                            <div className='text-sm font-medium text-gray-900 mb-2'>Couleurs</div>
                                            <VariantType2 variant_types={colors} />
                                        </div>

                                        <div className='w-full bg-white border border-gray-200 rounded-xl px-4 py-4 mb-4'>
                                            <div className='text-sm font-medium text-gray-900 mb-2'>Capacité de stockage</div>
                                            <VariantType1 variant_types={memoires} />
                                        </div>

                                        <div className='mt-1 bg-black bg-opacity-80 shadow-lg h-10 px-5 rounded-md flex flex-col justify-center btn-effect1 self-center'>
                                            <div className='text-sm font-medium text-gray-100 hover:text-white self-center tracking-wide'>Ajouter un variant</div>
                                        </div>

                                    </div>


                                    <div className='col-span-2 bg-gray-200 bg-opacity-60 rounded-xl px-5 py-5 h-72'>

                                        <div className='mb-3 ml-0.5 flex flex-row'>
                                            <div className='text-base font-medium text-purple-600 mr-2 self-center'>Produits associés</div>
                                            <div className='px-2 py-[0.45px] text-[10.325px] font-medium bg-purple-500 bg-opacity-80 text-white rounded-xl self-center'>5</div>
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



const colors = [
    {
      id: 1,
      value: '#a52732'
    },
    {
      id: 2,
      value: 'gray'
    },
    {
      id: 3,
      value: '#6c27d7'
    },
    {
      id: 4,
      value: '#222222'
    }
  ]

  const tailles = [
    {
      id: 1,
      value:"XS"
    },
    {
      id: 2,
      value:"S"
    },
    {
      id: 3,
      value:"M"
    },
    {
      id: 4,
      value:"L"
    },
    {
      id: 5,
      value: 'XL'
    },
    {
      id: 6,
      value: 'XXL'
    }
  ]
  
  const memoires = [
    {
      id: 1,
      value: 32
    },
    {
      id: 2,
      value: 64
    },
    {
      id: 3,
      value: 128
    },
    {
      id: 4,
      value: 256
    }
  ]
