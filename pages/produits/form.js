import React, { Component, Fragment, useState } from 'react';
import Link from 'next/link'
import { motion } from "framer-motion";
import Header from '../../components/common/header'
import Sidebar from '../../components/common/sidebar'
import HeadInfo from '../../components/common/headinfo'
import ArrowLeftBoldIcon from '../../components/ui/icons/arrowLeftBoldIcon';
import { Switch } from '@headlessui/react'
import ImageHolder from '../../components/ui/icons/imageHolder';
import TrashIcon from '../../components/ui/icons/trashIcon';
import { useInput } from '../../hooks/input-hook';
import VariantType1 from '../../components/product/variantType1';
import VariantType2 from '../../components/product/variantType2';
import InfoBoldIcon from '../../components/ui/icons/infoBoldIcon';
import dynamic from 'next/dynamic'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { classNames } from '../../libs/util';


var Editor = dynamic(() => import("../../components/common/editor"), {
  ssr: false
})


const people = [
    { id: 1, name: 'Wade Cooper' },
    { id: 2, name: 'Arlene Mccoy' },
    { id: 3, name: 'Devon Webb' },
    { id: 4, name: 'Tom Cook' },
    { id: 5, name: 'Tanya Fox' },
    { id: 6, name: 'Hellen Schmidt' },
  ]
  


export default function Index() {

  const [enabled, setEnabled] = useState(false)
  const [image1, setImage1] = useState(null)
  const [chosenImage1, setChosenImage1] = useState(null)
  const [image2, setImage2] = useState(null)
  const [chosenImage2, setChosenImage2] = useState(null)
  const [image3, setImage3] = useState(null)
  const [chosenImage3, setChosenImage3] = useState(null)
  const [image4, setImage4] = useState(null)
  const [image5, setImage5] = useState(null)
  const [chosenImage4, setChosenImage4] = useState(null)
  const [chosenImage5, setChosenImage5] = useState(null)
  const [imageref, setImageref] = useState('')
  const [url, setUrl] = useState('')
  const [country, setCountry] = useState(people[0])
  const [relatedItems, setRelatedItems] = useState([])
  const [variants, setVariants] = useState([])




  let imageInput1, imageInput2, imageInput3, imageInput4, imageInput5 ; 

  function handleImage (event, option){
      if(event.target.files[0]){
          if(option ==1){
            setImage1(event.target.files[0])
            setChosenImage1( URL.createObjectURL(event.target.files[0]))
          }
          else if(option == 2){
            setImage2(event.target.files[0])
            setChosenImage2( URL.createObjectURL(event.target.files[0]))
          }
          else if(option == 3){
            setImage3(event.target.files[0])
            setChosenImage3( URL.createObjectURL(event.target.files[0]))
          }
          else if(option == 4){
            setImage4(event.target.files[0])
            setChosenImage4( URL.createObjectURL(event.target.files[0]))
          }
          else if(option == 5){
            setImage5(event.target.files[0])
            setChosenImage5( URL.createObjectURL(event.target.files[0]))
          }
      }
  }

  function resetImage(e, option) {
      e.preventDefault();
      if(option ==1){
        setImage1('')
        setChosenImage1(null)
      }
      else if(option == 2){
        setImage2('')
        setChosenImage2(null)
      }
      else if(option == 3){
        setImage3('')
        setChosenImage3(null)
      }
      else if(option == 4){
        setImage4('')
        setChosenImage4(null)
      }
      else if(option == 5){
        setImage5('')
        setChosenImage5(null)
      }
  }


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

                            <div className='app-form overflow-y-auto mt-4 px-5'>

                                <div className='w-full grid grid-cols-8 grid-flow-row gap-5 bg-gray-200 bg-opacity-60 rounded-xl px-4 py-4'>

                                    <div className='relative col-span-3 bg-white bg-opacity-90 border border-gray-300 border-opacity-80 rounded-xl h-[17.1rem] flex flex-col justify-center'>
                                        {chosenImage1 &&
                                        <>
                                            <div onClick={() => imageInput1.click()} className="w-full h-full rounded-xl absolute top-0 left-0   item-image-2 bg-gray-100">
                                                <div className='image-layer-2'><img className="object-cover rounded-xl" src={chosenImage1} /></div>
                                            </div>
                                            <div onClick={(e) => resetImage(e, 1)} className='z-20 bg-gray-400 bg-opacity-40 hover:bg-opacity-30 border border-gray-600 border-opacity-10 text-center w-7 h-7 rounded-full shadow-lg absolute bottom-2 right-2 flex flex-row justify-center btn-effect1'>
                                                <div className='self-center'><TrashIcon customClass="w-4 h-4 text-black" /></div>
                                            </div>
                                        </>
                                        }
                                        <div onClick={() => imageInput1.click()} className="space-y-1 text-center cursor-pointer">
                                            <ImageHolder customClass="mx-auto h-14 w-12 text-gray-400" />
                                            <div className="flex text-sm text-gray-600">
                                                <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-mediu hover:text-opacity-90">
                                                    <input type="file" ref={refParam => imageInput1 = refParam} onChange={(e) => handleImage(e,1)} name="image1" id="image1" className="sr-only" />
                                                </label>
                                                <p className="w-full text-center"> <span className="text-iired" >Uploader une image</span> ou le déposer ici</p>
                                            </div>
                                            <p className="text-xs text-gray-500 mb-2">PNG, JPG, GIF jusqu&apos;à 10MB</p>
                                        </div>
                                    </div>

                                    <div className='col-span-3 grid grid-cols-2 grid-flow-row gap-5'>

                                        <div className='relative bg-white bg-opacity-90 border border-gray-300 border-opacity-80 rounded-xl h-32 flex flex-col justify-center'>
                                            {chosenImage2 &&
                                            <>
                                                <div onClick={() => imageInput2.click()} className="w-full h-full rounded-xl absolute top-0 left-0   item-image-2 bg-gray-100">
                                                    <div className='image-layer-2'><img className="object-cover rounded-xl" src={chosenImage2} /></div>
                                                </div>
                                                <div onClick={(e) => resetImage(e, 2)} className='z-20 bg-gray-400 bg-opacity-40 hover:bg-opacity-30 border border-gray-600 border-opacity-10 text-center w-5 h-5 rounded-full shadow-lg absolute bottom-1 right-1 flex flex-row justify-center btn-effect1'>
                                                    <div className='self-center'><TrashIcon customClass="w-3 h-3 text-black" /></div>
                                                </div>
                                            </>
                                            }
                                            <div onClick={() => imageInput2.click()} className="space-y-1 text-center cursor-pointer">
                                                <ImageHolder customClass="mx-auto h-11 w-9 text-gray-400" />
                                                <div className="flex text-sm text-gray-600">
                                                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-mediu hover:text-opacity-90">
                                                        <input type="file" ref={refParam => imageInput2 = refParam} onChange={(e) => handleImage(e,2)} name="image2" id="image2" className="sr-only" />
                                                    </label>
                                                </div>
                                                <p className="text-[8px] text-gray-500 mb-2">PNG, JPG, GIF jusqu&apos;à 10MB</p>
                                            </div>
                                        </div>

                                        <div className='relative bg-white bg-opacity-90 border border-gray-300 border-opacity-80 rounded-xl h-32 flex flex-col justify-center'>
                                            {chosenImage3 &&
                                            <>
                                                <div onClick={() => imageInput3.click()} className="w-full h-full rounded-xl absolute top-0 left-0   item-image-2 bg-gray-100">
                                                    <div className='image-layer-2'><img className="object-cover rounded-xl" src={chosenImage3} /></div>
                                                </div>
                                                <div onClick={(e) => resetImage(e, 3)} className='z-20 bg-gray-400 bg-opacity-40 hover:bg-opacity-30 border border-gray-600 border-opacity-10 text-center w-5 h-5 rounded-full shadow-lg absolute bottom-1 right-1 flex flex-row justify-center btn-effect1'>
                                                    <div className='self-center'><TrashIcon customClass="w-3 h-3 text-black" /></div>
                                                </div>
                                            </>
                                            }
                                            <div onClick={() => imageInput3.click()} className="space-y-1 text-center cursor-pointer">
                                                <ImageHolder customClass="mx-auto h-11 w-9 text-gray-400" />
                                                <div className="flex text-sm text-gray-600">
                                                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-mediu hover:text-opacity-90">
                                                        <input type="file" ref={refParam => imageInput3 = refParam} onChange={(e) => handleImage(e,3)} name="image3" id="image3" className="sr-only" />
                                                    </label>
                                                </div>
                                                <p className="text-[8px] text-gray-500 mb-2">PNG, JPG, GIF jusqu&apos;à 10MB</p>
                                            </div>
                                        </div>

                                        <div className='relative bg-white bg-opacity-90 border border-gray-300 border-opacity-80 rounded-xl h-32 flex flex-col justify-center'>
                                            {chosenImage4 &&
                                            <>
                                                <div onClick={() => imageInput4.click()} className="w-full h-full rounded-xl absolute top-0 left-0   item-image-2 bg-gray-100">
                                                    <div className='image-layer-2'><img className="object-cover rounded-xl" src={chosenImage4} /></div>
                                                </div>
                                                <div onClick={(e) => resetImage(e, 4)} className='z-20 bg-gray-400 bg-opacity-40 hover:bg-opacity-30 border border-gray-600 border-opacity-10 text-center w-5 h-5 rounded-full shadow-lg absolute bottom-1 right-1 flex flex-row justify-center btn-effect1'>
                                                    <div className='self-center'><TrashIcon customClass="w-3 h-3 text-black" /></div>
                                                </div>
                                            </>
                                            }
                                            <div onClick={() => imageInput4.click()} className="space-y-1 text-center cursor-pointer">
                                                <ImageHolder customClass="mx-auto h-11 w-9 text-gray-400" />
                                                <div className="flex text-sm text-gray-600">
                                                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-mediu hover:text-opacity-90">
                                                        <input type="file" ref={refParam => imageInput4 = refParam} onChange={(e) => handleImage(e,4)} name="image4" id="image4" className="sr-only" />
                                                    </label>
                                                </div>
                                                <p className="text-[8px] text-gray-500 mb-2">PNG, JPG, GIF jusqu&apos;à 10MB</p>
                                            </div>
                                        </div>

                                        <div className='relative bg-white bg-opacity-90 border border-gray-300 border-opacity-80 rounded-xl h-32 flex flex-col justify-center'>
                                            {chosenImage5 &&
                                            <>
                                                <div onClick={() => imageInput5.click()} className="w-full h-full rounded-xl absolute top-0 left-0 item-image-2 bg-gray-100">
                                                    <div className='image-layer-2'><img className="object-cover rounded-xl" src={chosenImage5} /></div>
                                                </div>
                                                <div onClick={(e) => resetImage(e, 5)} className='z-20 bg-gray-400 bg-opacity-40 hover:bg-opacity-30 border border-gray-600 border-opacity-10 text-center w-5 h-5 rounded-full shadow-lg absolute bottom-1 right-1 flex flex-row justify-center btn-effect1'>
                                                    <div className='self-center'><TrashIcon customClass="w-3 h-3 text-black" /></div>
                                                </div>
                                            </>
                                            }
                                            <div onClick={() => imageInput5.click()} className="space-y-1 text-center cursor-pointer">
                                                <ImageHolder customClass="mx-auto h-11 w-9 text-gray-400" />
                                                <div className="flex text-sm text-gray-600">
                                                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-mediu hover:text-opacity-90">
                                                        <input type="file" ref={refParam => imageInput5 = refParam} onChange={(e) => handleImage(e,5)} name="image5" id="image5" className="sr-only" />
                                                    </label>
                                                </div>
                                                <p className="text-[8px] text-gray-500 mb-2">PNG, JPG, GIF jusqu&apos;à 10MB</p>
                                            </div>
                                        </div>

                                    </div>

                                    <div className='col-span-2 ml-4'>
                                        <div className='flex flex-row'>
                                            <div className='self-center -mb-1 mr-2'><InfoBoldIcon customClass="w-4 h-4 text-gray-700"/></div>
                                            <div className='self-center text-lg font-semibold text-gray-800 '>Conseils</div>
                                        </div>
                                        <div className='text-[13px] font-normal text-gray-800 mt-3'>
                                            <ul className="list-disc">
                                                <li className='mb-2'>lorem ipsum dolor sit amet consectetur adipiscing elit</li>
                                                <li className='mb-2'>Sed aliquet ac sem sed porttitor</li>
                                                <li className=''>Curabitur at mauris imperdiet, feugiat risus vitae, pellentesque augue</li>
                                            </ul>  
                                        </div>
                                    </div>

                                </div>

                                <div className='divider w-full h-[1px] bg-gray-400 bg-opacity-30 mt-8 mb-4'></div>
                                <div className='text-base font-semibold text-purple-600 mb-3 ml-1'>Informations générales</div>

                                <div className='w-full grid grid-cols-3 grid-flow-row gap-5 bg-gray-200 bg-opacity-60 rounded-xl px-4 py-5'>

                                    <div className="w-full mb-4">
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-900">Désignation</label>
                                        <input type="text" name="name" id="name" autoComplete="title" placeholder="Désignation" className="mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 shadow-inner bg-white bg-opacity-90 rounded-md px-2"/>
                                    </div>

                                    <div className="w-full mb-4">
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-900">Unité</label>
                                        <input type="text" name="name" id="name" autoComplete="title" placeholder="Désignation" className="mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 shadow-inner bg-white bg-opacity-90 rounded-md px-2"/>
                                    </div>

                                    <div className="w-full mb-4">
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-900">Prix par unité</label>
                                        <input type="text" name="name" id="name" autoComplete="title" placeholder="Désignation" className="mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 shadow-inner bg-white bg-opacity-90 rounded-md px-2"/>
                                    </div>

                                    <div className="w-full mb-4">
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-900">Poids par unité</label>
                                        <input type="text" name="name" id="name" autoComplete="title" placeholder="Désignation" className="mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 shadow-inner bg-white bg-opacity-90 rounded-md px-2"/>
                                    </div>

                                    <div className="w-full mb-4">
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-900">Ordre</label>
                                        <input type="text" name="name" id="name" autoComplete="title" placeholder="Désignation" className="mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 shadow-inner bg-white bg-opacity-90 rounded-md px-2"/>
                                    </div>

                                    <div className="flex flex-row -mt-4">
                                        <div className="self-center ml-1">
                                            <label htmlFor="desc" className="block text-sm font-medium text-gray-900 mb-1">Visiblité</label>
                                            <Switch checked={enabled} onChange={setEnabled} className={`${enabled ? 'bg-purple-600 bg-opacity-80 shadow-sm' : 'bg-white bg-opacity-80 shadow-sm'} relative inline-flex flex-shrink-0 h-[34px] w-[70px] border border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}>                                                    
                                                <span className="sr-only">Use setting</span>
                                                <span
                                                aria-hidden="true"
                                                className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
                                                    pointer-events-none inline-block h-[29.5px] w-[29.5px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200 border border-gray-200 border-opacity-80 self-center`}
                                                />
                                            </Switch>
                                        </div>
                                    </div>


                                    <div className='col-span-3 grid grid-cols-3 grid-flow-row gap-5'>

                                        <div className="col-span-2 mb-4">
                                            <label htmlFor="desc" className="block text-sm font-medium text-gray-900">Description</label>
                                            <div className="editor-container border border-gray-400 border-opacity-30 text-gray-900 text-sm font-medium details-editor mt-1"><Editor /></div>

                                        </div>

                                        <div className=''>


                                            <div className='mb-6'>
                                                <Listbox value={country} onChange={(e) => setCountry(e)}>
                                                    {({ open }) => (
                                                        <>
                                                        <Listbox.Label className="block text-sm font-medium text-gray-900">Sexe <span className='font-bold text-purple-600'>*</span></Listbox.Label>
                                                        <div className="mt-1 relative">
                                                            <Listbox.Button className="relative w-full bg-white border border-gray-400 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm">
                                                                <span className="flex items-center">
                                                                    <span className="ml-3 block truncate">{country ? country.name : 'Choisir un pays'}</span>
                                                                </span>
                                                                <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                                    <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                </span>
                                                            </Listbox.Button>

                                                            <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                                                <Listbox.Options className="absolute sticky mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                                                    {people.map((item) => (
                                                                    <Listbox.Option key={item.id} className={({ active }) => classNames(active ? 'text-white bg-purple-600' : 'text-gray-900','cursor-pointer select-none relative py-2 pl-3 pr-9')} value={item}>
                                                                        {({ country, active }) => (
                                                                        <>
                                                                            <div className="flex items-center">
                                                                                <span className={classNames(country ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>
                                                                                    {item.name}
                                                                                </span>
                                                                            </div>

                                                                            {country || active &&
                                                                                <span className={classNames(active ? 'text-white' : 'text-indigo-600','absolute inset-y-0 right-0 flex items-center pr-4')}>
                                                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                                </span>
                                                                            }

                                                                        </>
                                                                        )}
                                                                    </Listbox.Option>
                                                                    ))}
                                                                </Listbox.Options>
                                                            </Transition>
                                                        </div>
                                                        </>
                                                    )}
                                                </Listbox>
                                            </div>

                                            <div className='mb-6'>
                                                    <Listbox value={country} onChange={(e) => setCountry(e)}>
                                                        {({ open }) => (
                                                            <>
                                                            <Listbox.Label className="block text-sm font-medium text-gray-900">Catégorie <span className='font-bold text-purple-600'>*</span></Listbox.Label>
                                                            <div className="mt-1 relative">
                                                                <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm">
                                                                    <span className="flex items-center">
                                                                        <span className="ml-3 block truncate">{country ? country.name : 'Choisir un pays'}</span>
                                                                    </span>
                                                                    <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                                        <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                    </span>
                                                                </Listbox.Button>

                                                                <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                                                    <Listbox.Options className="absolute sticky mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                                                        {people.map((item) => (
                                                                        <Listbox.Option key={item.id} className={({ active }) => classNames(active ? 'text-white bg-purple-600' : 'text-gray-900','cursor-pointer select-none relative py-2 pl-3 pr-9')} value={item}>
                                                                            {({ country, active }) => (
                                                                            <>
                                                                                <div className="flex items-center">
                                                                                    <span className={classNames(country ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>
                                                                                        {item.name}
                                                                                    </span>
                                                                                </div>

                                                                                {country || active &&
                                                                                    <span className={classNames(active ? 'text-white' : 'text-indigo-600','absolute inset-y-0 right-0 flex items-center pr-4')}>
                                                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                                    </span>
                                                                                }

                                                                            </>
                                                                            )}
                                                                        </Listbox.Option>
                                                                        ))}
                                                                    </Listbox.Options>
                                                                </Transition>
                                                            </div>
                                                            </>
                                                        )}
                                                    </Listbox>
                                            </div>

                                            <div className=''>
                                                <Listbox value={country} onChange={(e) => setCountry(e)}>
                                                    {({ open }) => (
                                                        <>
                                                        <Listbox.Label className="block text-sm font-medium text-gray-900">Marque <span className='font-bold text-purple-600'>*</span></Listbox.Label>
                                                        <div className="mt-1 relative">
                                                            <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm">
                                                                <span className="flex items-center">
                                                                    <span className="ml-3 block truncate">{country ? country.name : 'Choisir un pays'}</span>
                                                                </span>
                                                                <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                                    <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                </span>
                                                            </Listbox.Button>

                                                            <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                                                <Listbox.Options className="absolute sticky mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                                                    {people.map((item) => (
                                                                    <Listbox.Option key={item.id} className={({ active }) => classNames(active ? 'text-white bg-purple-600' : 'text-gray-900','cursor-pointer select-none relative py-2 pl-3 pr-9')} value={item}>
                                                                        {({ country, active }) => (
                                                                        <>
                                                                            <div className="flex items-center">
                                                                                <span className={classNames(country ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>
                                                                                    {item.name}
                                                                                </span>
                                                                            </div>

                                                                            {country || active &&
                                                                                <span className={classNames(active ? 'text-white' : 'text-indigo-600','absolute inset-y-0 right-0 flex items-center pr-4')}>
                                                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                                </span>
                                                                            }

                                                                        </>
                                                                        )}
                                                                    </Listbox.Option>
                                                                    ))}
                                                                </Listbox.Options>
                                                            </Transition>
                                                        </div>
                                                        </>
                                                    )}
                                                </Listbox>
                                            </div>


                                        </div>


                                    </div>

                    

                                </div>

                                <div className='divider w-full h-[1px] bg-gray-400 bg-opacity-30 my-8'></div>
                                <div className='text-base font-semibold text-purple-600 mb-3 ml-1'>Variants et produits associés</div>

                                <div className='w-full grid grid-cols-6 grid-flow-row gap-5 mb-6'>

                                    <div className='col-span-2 px-5 py-5'>

                                        <div className='flex flex-row'>
                                            <div className='self-center -mb-1 mr-2'><InfoBoldIcon customClass="w-4 h-4 text-gray-700"/></div>
                                            <div className='self-center text-lg font-semibold text-gray-800 '>Conseils</div>
                                        </div>
                                        <div className='text-[13px] font-normal text-gray-800 mt-3 ml-5'>
                                            <ul className="list-disc">
                                                <li className='mb-2'>lorem ipsum dolor sit amet consectetur adipiscing elit</li>
                                                <li className='mb-2'>Sed aliquet ac sem sed porttitor</li>
                                                <li className='mb-2'>Curabitur at mauris imperdiet, feugiat risus vitae, pellentesque augue</li>
                                                <li className=''>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</li>
                                            </ul>  
                                        </div>
                                        
                                    </div>

                                    <div className='col-span-2 bg-gray-200 bg-opacity-60 rounded-xl py-6'>

                                        <div className='mb-3 ml-0.5 flex flex-row px-5'>
                                            <div className='text-base font-medium text-purple-600 mr-1 self-center'>Variants</div>
                                            <div className='px-2 py-[0.45px] text-[10.325px] font-medium bg-purple-500 bg-opacity-80 text-white rounded-xl self-center'>{variants?.length}</div>
                                        </div>

                                        <div className='w-full h-52 overflow-y-auto px-5'>

                                            {variants?.length == 0 ?

                                                <div className='w-full h-full flex flex-row justify-center '>
                                                    <div className='h-24 self-center'>
                                                        <img src="../empty_svg.svg" className='h-full opacity-90' />
                                                    </div>
                                                </div>
                                                :
                                                <div>
                                                    
                                                </div>

                                            }

                                        </div>

                                        <div className='mt-3 bg-black bg-opacity-80 shadow-lg h-10 px-5 rounded-md flex flex-col justify-center btn-effect1 self-center mx-5'>
                                            <div className='text-sm font-medium text-gray-100 hover:text-white self-center tracking-wide'>Ajouter un variant</div>
                                        </div>
                                        
                                    </div>


                                    <div className='col-span-2 bg-gray-200 bg-opacity-60 rounded-xl py-6'>

                                        <div className='mb-3 ml-0.5 flex flex-row px-5'>
                                            <div className='text-base font-medium text-purple-600 mr-1 self-center'>Produits associés</div>
                                            <div className='px-2 py-[0.45px] text-[10.325px] font-medium bg-purple-500 bg-opacity-80 text-white rounded-xl self-center'>{relatedItems?.length}</div>
                                        </div>

                                        <div className='w-full h-52 overflow-y-auto px-5'>

                                            {relatedItems?.length == 0 ?

                                                <div className='w-full h-full flex flex-row justify-center '>
                                                    <div className='h-24 self-center'>
                                                        <img src="../empty_svg.svg" className='h-full opacity-90' />
                                                    </div>
                                                </div>
                                                :
                                                <div>
                                                    
                                                </div>

                                            }

                                        </div>

                                        <div className='mt-3 bg-black bg-opacity-80 shadow-lg h-10 px-5 rounded-md flex flex-col justify-center btn-effect1 self-center mx-5'>
                                            <div className='text-sm font-medium text-gray-100 hover:text-white self-center tracking-wide'>Ajouter un produit</div>
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
