import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion } from "framer-motion";
import Header from '../../components/common/header'
import Sidebar from '../../components/common/sidebar'
import HeadInfo from '../../components/common/headinfo'
import ArrowLeftBoldIcon from '../../components/ui/icons/arrowLeftBoldIcon';
import TrashIcon from '../../components/ui/icons/trashIcon';
import { useInput } from '../../hooks/input-hook';
import ImageHolder from '../../components/ui/icons/imageHolder';
import storage from "../../config/firebase"

import { uid } from 'uid';



export default function Index() {

    const { value:name, bind:bindName, reset:resetName } = useInput('');
    const { value:desc, bind:bindDesc, reset:resetDesc } = useInput('');
    const { value:order, bind:bindOrder, reset:resetOrder } = useInput(null);
    const [image, setImage] = useState(null)
    const [chosenImage, setChosenImage] = useState(null)
    const [imageref, setImageref] = useState('')
    const [url, setUrl] = useState('')
    let imageInput ;

    function handleImage (event){
        if(event.target.files[0]){
            setImage(event.target.files[0])
            setChosenImage( URL.createObjectURL(event.target.files[0]))
        }
    }

    function resetImage(e) {
        e.preventDefault();
        setImage('')
        setChosenImage(null)
    }

    const uploadImage=(e) => {
        e.preventDefault()
        console.info(storage)
        var imageref = image.name + uid(32)
        const uploadTask = storage().ref(`images/${imageref}`).put(image);
        uploadTask.on("state_changed",snapshot => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            console.log("progress ..", progress);
          },error => {console.log(error);},
          () => {
              storage().ref("images").child(imageref).getDownloadURL().then(url => {
                console.log(url)
                return {url, imageref}
              });
          }
        );
      };


  return (
    <div className="app-container h-screen">

        <HeadInfo title= 'Dashboard' description='description here'/>
        <Header/>

        <div className='w-full overflow-x-auto px-6 py-5 flex flex-row justify-between'>

            <Sidebar />

            <motion.div initial={{ opacity: 0.45, x: 150 }}  whileInView={{ opacity: 1, x: 0, transition: { duration: 0.60 }, }}>
                <div className='app-body bg-white rounded-xl relative pb-16'>

                    <form className='w-full h-full' onSubmit={(e) => uploadImage(e)}>

                        <div className='w-full h-full pt-4'>

                            <div className='flex flex-row justify-between px-5'>

                                <Link href="./">
                                    <div className='text-purple-600 hover:text-opacity-80 cursor-pointer self-center'>
                                            <ArrowLeftBoldIcon customClass="w-4" /> 
                                    </div>
                                </Link>

                                <div className='text-lg font-semibold text-purple-600'>Nouvelle Marque</div>

                                <div></div>

                            </div>

                            <div className='app-form overflow-y-auto mt-3 px-5'>

                                <div className='w-full grid grid-cols-5 grid-flow-row gap-6 mt-6'>

                                <div className='col-span-2 bg-gray-200 bg-opacity-60 rounded-xl px-4 py-4 grid grid-cols-2 gap-3 h-max'>

                                    <div className='relative col-span-2 bg-white bg-opacity-90 border border-gray-200 h-56 flex flex-col justify-center cursor-pointer'>
                                        {chosenImage &&
                                          <>
                                            <div onClick={() => imageInput.click()} className="w-full h-full absolute top-0 left-0">
                                                <img className="w-full h-full object-cover" src={chosenImage} />
                                            </div>
                                            <div onClick={(e) => resetImage(e)} className='z-20 bg-gray-400 bg-opacity-40 hover:bg-opacity-30 border border-gray-600 border-opacity-10 text-center w-7 h-7 rounded-full shadow-lg absolute bottom-2 right-2 flex flex-row justify-center btn-effect1'>
                                                <div className='self-center'><TrashIcon customClass="w-4 h-4 text-black" /></div>
                                            </div>
                                          </>
                                        }
                                        <div onClick={() => imageInput.click()} className="space-y-1 text-center">
                                            <ImageHolder customClass="mx-auto h-14 w-12 text-gray-400" />
                                            <div className="flex text-sm text-gray-600">
                                                <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-mediu hover:text-opacity-90">
                                                    <input type="file" ref={refParam => imageInput = refParam} onChange={handleImage} name="image" id="image" className="sr-only"/>
                                                </label>
                                                <p className="w-full text-center"> <span className="text-iired" >Uploader une image</span> ou le déposer ici</p>
                                            </div>
                                            <p className="text-xs text-gray-500 mb-2">PNG, JPG, GIF jusqu&apos;à 10MB</p>
                                        </div>
                                    </div>

                                </div>

                                <div className='col-span-3 bg-gray-200 bg-opacity-60 rounded-xl px-4 py-4'>

                                    <div className="w-full mb-4">
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-900">Désignation <span className='font-bold text-purple-600'>*</span> </label>
                                        <input type="text" name="name" id="name" {...bindName} autoComplete="title" placeholder="Désignation" className="mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 shadow-inner bg-white bg-opacity-90 rounded-md px-2" required/>
                                    </div>

                                    <div className="w-full mb-3">
                                        <label htmlFor="desc" className="block text-sm font-medium text-gray-900">Description <span className='font-bold text-purple-600'>*</span></label>
                                        <div className="mt-1">
                                            <textarea name="desc" id="desc" {...bindDesc} rows={8}  className="mt-1 w-full shadow-sm text-sm border border-gray-400 shadow-inner bg-white bg-opacity-90 rounded-md px-2 py-2" placeholder="Donner une description" required/>
                                        </div>
                                    </div>

                                    <div className="flex flex-row w-full">

                                        <div className="w-1/2 mr-8 self-center">
                                            <label htmlFor="order" className="block text-sm font-medium text-gray-900">Ordre <span className='font-bold text-purple-600'>*</span></label>
                                            <input type="number" name="order" id="order" {...bindOrder} autoComplete="ordre" placeholder="Ordre" className="mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 shadow-inner bg-white bg-opacity-90 rounded-md px-2" required/>
                                        </div>

                                    </div>



                                </div>

                                </div>

                            </div>


                        </div>

                        <div className='h-16 w-full bg-gray-100 bg-opacity-50 border-t border-gray-200 border-opacity-80 absolute bottom-0 left-0 z-4 rounded-b-xl flex flex-row justify-end px-5'>

                            <div className='ml-2 bg-gray-500 bg-opacity-90 shadow-lg h-10 px-4 rounded-md flex flex-col justify-center btn-effect1 self-center mr-2'>
                                <button type="reset" className='text-sm font-medium text-gray-100 hover:text-white self-center tracking-wide'>Annuler</button>
                            </div>

                            <div className='ml-2 bg-purple-500 bg-opacity-90 shadow-lg h-10 px-5 rounded-md flex flex-col justify-center btn-effect1 self-center'>
                                <button type="submit" className='text-sm font-medium text-gray-100 hover:text-white self-center tracking-wide'>Valider</button>
                            </div>

                        </div>

                    </form>

                </div>
            </motion.div>
            

        </div>

    </div>
  )
}




