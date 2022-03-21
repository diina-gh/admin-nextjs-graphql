import React, { Component, Fragment } from 'react';
import Link from 'next/link'
import { motion } from "framer-motion";
import Header from '../../components/common/header'
import Sidebar from '../../components/common/sidebar'
import HeadInfo from '../../components/common/headinfo'
import ArrowLeftBoldIcon from '../../components/ui/icons/arrowLeftBoldIcon';
import InfoBoldIcon from '../../components/ui/icons/infoBoldIcon';
import { saveImage, deleteImage } from '../../hooks/image';
import { saveCategory, getCategory} from '../../hooks/category';
import {allCategories } from '../../hooks/category';
import router from 'next/router'
import BlockUI from '../../components/common/blockui';
import toast, { Toaster } from 'react-hot-toast';
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { classNames } from '../../libs/util';
import ImageHolder from '../../components/ui/icons/imageHolder';
import { capitalize } from '../../libs/util';
import TrashIcon from '../../components/ui/icons/trashIcon';
import firebase from "../../config/firebase"
import { Switch } from '@headlessui/react'
import dynamic from 'next/dynamic'
import EditBoldIcon from '../../components/ui/icons/editBoldIcon'
import TrashBoldIcon from '../../components/ui/icons/trashBoldIcon'
import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'


var Editor = dynamic(() => import("../../components/common/editor"), {
  ssr: false
})

var genders = ['UNISEX', 'MASCULIN', 'FEMININ']


export async function getServerSideProps(context) {
    return {
      props: {},
    }
}

var toastOne ;


class Index extends Component {

    constructor(props){

        super(props);

        this.state = { block: false, id:null, name: '', desc: '', activated: false, unit: '', unitWeight: 0.0, unitPrice: 0.0, order : 0, gender: genders[0],
                       category: null, categories: [], brand: null, brands:[], variants: [], chosenVariants: [], options:[], chosenOptions:[], chosenProducts:[],
                       image1:null, chosenImage1:null, imageref1: null, imageId1: null,
                       image2:null, chosenImage2:null, imageref2: null, imageId2: null,
                       image3:null, chosenImage3:null, imageref3: null, imageId3: null,
                       image4:null, chosenImage1:null, imageref4: null, imageId4: null,
                       image5:null, chosenImage5:null, imageref5: null, imageId5: null
                    };

        this.checkInput = this.checkInput.bind(this)
        this.saveItem = this.saveItem.bind(this)
        this.getParents = this.getParents.bind(this)
        this.handleImage = this.handleImage.bind(this)
        this.resetImage = this.resetImage.bind(this)
        this.uploadImage = this.uploadImage.bind(this)
        this.saveImageInfo = this.saveImageInfo.bind(this)
    }

    async componentDidMount(){
        var itemId = router.query.id
        if(itemId !=null){
            this.setState({block: true})
            var {response} = await getCategory(itemId)
            if(response?.__typename == 'Category'){
                this.setState({ id: response.id, name: response.name, desc: response.desc, order: response.order, activated: response.activated, parent: response.parent, image:response.image?.url, chosenImage:response.image?.url, imageref:response.image?.imageref, imageId: response.image?.id, block:false })
            }
            else if(response?.__typename == 'InputError'){
                toast.error(response.message);
                router.push('./');
            }
            else{
                toast.error("Erreur inconnue. Veuillez contacter l'administrateur.");
                router.push('./');
            }
        }
        // this.getParents()
    }

    handleImage = (e, option) => {
        e.preventDefault(); 
        this.setState({[option]:e.target.files[0], ['chosen' + capitalize(option)]: URL.createObjectURL(e.target.files[0])  })
    }

    resetImage = (e, option) =>{
        e.preventDefault();
        this.setState({[option]: null, ['chosen' + capitalize(option)]: null })
    }

    getParents = async() => {
        var {response} = await allCategories()
        if(response){
            console.lo
            this.setState({parents: response.categories})
        }
    }

    checkInput = (e) => {

        e.preventDefault()
        const {name, desc, parentId} = this.state
        var errorMessage

        if(!navigator.onLine){
            errorMessage = "Aucun accès à Internet"
        }

        if(errorMessage){
            toast.error(errorMessage, {id: toastOne,});
            this.setState({block: false})
            return null
        }
        else{
            toast.loading("Veuillez patienter svp...", {id: toastOne,});
            this.setState({block: true})
            this.saveItem()
        }

    }

    saveItem = async () => {

        const { id, name, desc, activated, unit, unitWeight, unitPrice, order, gender,category, brand, chosenVariants, chosenOptions} = this.state

        var {response } = await saveCategory(id, name, desc, order, activated, unit, unitWeight, unitPrice, order, gender, category?.id, brand?.id, chosenVariants, chosenOptions )

        if(response?.__typename == 'Category'){
            this.handleUpload(response?.id)
        }
        else if(response?.__typename == 'InputError'){
            toast.dismiss()
            toast.error(response?.message, {id: toastOne,});
            this.setState({block: false})
        }
        else{
            toast.error("Erreur inconnue. Veuillez vérifier votre connexion internet.", {id: toastOne,});
        }

    };

    handleUpload = (itemId) => {

        const { id, image, chosenImage, imageref, imageId } = this.state

        if(imageref != null){ 
            if(image == chosenImage){
                toast.success("Mise à jour réussie !", {id: toastOne,});
                this.setState({block: false})
                return null
            }
            else{
                firebase.storage().ref(`images/${imageref}`).delete().then(async() => {
                    console.log("File deleted successfuly");
                    this.uploadImage(itemId);
                }).catch((error) => {
                    console.log("Uh-oh, an error occurred: ", error);
                    if(error.code == 'storage/object-not-found') this.uploadImage(itemId);
                });
            }     
        }
        else{
            this.uploadImage(itemId);
        }
    };


    uploadImage = (itemId) =>{
        const {image} = this.state
        var ref = "category_" + itemId
        const uploadTask = firebase.storage().ref(`images/${ref}`).put(image);
        uploadTask.on("state_changed",snapshot => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            console.log("progress ..", progress);
          },error => {console.log(error);},
          () => {
              firebase.storage().ref("images").child(ref).getDownloadURL().then(url => {
                this.saveImageInfo(url, ref, itemId)
              });
          }
        );
    };

    saveImageInfo = async (url, ref, itemId) => {

        const {imageId} = this.state
        var {response } = await saveImage(imageId, url, ref, null, null, null, itemId)

        if(response?.__typename == 'Image'){
            toast.dismiss()
            toast.success("Mise à jour réussie !", {id: toastOne,});
        }
        else if(response?.__typename == 'InputError'){
            console.log("ImageInfo mutation ", response?.message)
            toast.error("Une erreur s'est produite lors de l'ajout de l'image !", {id: toastOne,});
        }
        else{
            toast.error("Erreur inconnue. Veuillez vérifier votre connexion internet.", {id: toastOne,});
        }

        this.setState({block: false})
        setTimeout(() => {
            toast.dismiss()
            router.push('./');
        }, 2250);

    };

    render() {

        const 
            { 
                activated, gender, category, categories, brand, brands,chosenVariants, variants, chosenOptions, 
                options, chosenProducts, chosenImage1, chosenImage2, chosenImage3, chosenImage4, chosenImage5
            } 
        = this.state

        let imageInput1, imageInput2, imageInput3, imageInput4, imageInput5

        return(
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
                                                    <div onClick={(e) => this.resetImage(e, 'image1')} className='z-20 bg-gray-400 bg-opacity-40 hover:bg-opacity-30 border border-gray-600 border-opacity-10 text-center w-7 h-7 rounded-full shadow-lg absolute bottom-2 right-2 flex flex-row justify-center btn-effect1'>
                                                        <div className='self-center'><TrashIcon customClass="w-4 h-4 text-black" /></div>
                                                    </div>
                                                </>
                                                }
                                                <div onClick={() => imageInput1.click()} className="space-y-1 text-center cursor-pointer">
                                                    <ImageHolder customClass="mx-auto h-14 w-12 text-gray-400" />
                                                    <div className="flex text-sm text-gray-600">
                                                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-mediu hover:text-opacity-90">
                                                            <input type="file" ref={refParam => imageInput1 = refParam} onChange={(e) => this.handleImage(e, 'image1')} name="image1" id="image1" className="sr-only" />
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
                                                        <div onClick={(e) => this.resetImage(e, 'image2')} className='z-20 bg-gray-400 bg-opacity-40 hover:bg-opacity-30 border border-gray-600 border-opacity-10 text-center w-5 h-5 rounded-full shadow-lg absolute bottom-1 right-1 flex flex-row justify-center btn-effect1'>
                                                            <div className='self-center'><TrashIcon customClass="w-3 h-3 text-black" /></div>
                                                        </div>
                                                    </>
                                                    }
                                                    <div onClick={() => imageInput2.click()} className="space-y-1 text-center cursor-pointer">
                                                        <ImageHolder customClass="mx-auto h-11 w-9 text-gray-400" />
                                                        <div className="flex text-sm text-gray-600">
                                                            <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-mediu hover:text-opacity-90">
                                                                <input type="file" ref={refParam => imageInput2 = refParam} onChange={(e) => this.handleImage(e, 'image2')} name="image2" id="image2" className="sr-only" />
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
                                                        <div onClick={(e) => this.resetImage(e, 'image3')} className='z-20 bg-gray-400 bg-opacity-40 hover:bg-opacity-30 border border-gray-600 border-opacity-10 text-center w-5 h-5 rounded-full shadow-lg absolute bottom-1 right-1 flex flex-row justify-center btn-effect1'>
                                                            <div className='self-center'><TrashIcon customClass="w-3 h-3 text-black" /></div>
                                                        </div>
                                                    </>
                                                    }
                                                    <div onClick={() => imageInput3.click()} className="space-y-1 text-center cursor-pointer">
                                                        <ImageHolder customClass="mx-auto h-11 w-9 text-gray-400" />
                                                        <div className="flex text-sm text-gray-600">
                                                            <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-mediu hover:text-opacity-90">
                                                                <input type="file" ref={refParam => imageInput3 = refParam} onChange={(e) => this.handleImage(e, 'image3')} name="image3" id="image3" className="sr-only" />
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
                                                        <div onClick={(e) => this.resetImage(e, 'image4')} className='z-20 bg-gray-400 bg-opacity-40 hover:bg-opacity-30 border border-gray-600 border-opacity-10 text-center w-5 h-5 rounded-full shadow-lg absolute bottom-1 right-1 flex flex-row justify-center btn-effect1'>
                                                            <div className='self-center'><TrashIcon customClass="w-3 h-3 text-black" /></div>
                                                        </div>
                                                    </>
                                                    }
                                                    <div onClick={() => imageInput4.click()} className="space-y-1 text-center cursor-pointer">
                                                        <ImageHolder customClass="mx-auto h-11 w-9 text-gray-400" />
                                                        <div className="flex text-sm text-gray-600">
                                                            <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-mediu hover:text-opacity-90">
                                                                <input type="file" ref={refParam => imageInput4 = refParam} onChange={(e) => this.handleImage(e, 'image4')} name="image4" id="image4" className="sr-only" />
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
                                                        <div onClick={(e) => this.resetImage(e, 'image5')} className='z-20 bg-gray-400 bg-opacity-40 hover:bg-opacity-30 border border-gray-600 border-opacity-10 text-center w-5 h-5 rounded-full shadow-lg absolute bottom-1 right-1 flex flex-row justify-center btn-effect1'>
                                                            <div className='self-center'><TrashIcon customClass="w-3 h-3 text-black" /></div>
                                                        </div>
                                                    </>
                                                    }
                                                    <div onClick={() => imageInput5.click()} className="space-y-1 text-center cursor-pointer">
                                                        <ImageHolder customClass="mx-auto h-11 w-9 text-gray-400" />
                                                        <div className="flex text-sm text-gray-600">
                                                            <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-mediu hover:text-opacity-90">
                                                                <input type="file" ref={refParam => imageInput5 = refParam} onChange={(e) => this.handleImage(e, 'image5')} name="image5" id="image5" className="sr-only" />
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
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-900">Désignation <span className='font-bold text-purple-600'>*</span></label>
                                                <input type="text" value={this.state.name} onChange={(e) => this.setState({name:e.target.value }) } name="name" id="name" autoComplete="name" placeholder="Désignation" className="mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 shadow-inner bg-white bg-opacity-90 rounded-md px-2"/>
                                            </div>
        
                                            <div className="w-full mb-4">
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-900">Unité <span className='font-bold text-purple-600'>*</span></label>
                                                <input type="text" value={this.state.unit} onChange={(e) => this.setState({unit:e.target.value }) } name="unit" id="unit" autoComplete="unit" placeholder="unité" className="mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 shadow-inner bg-white bg-opacity-90 rounded-md px-2"/>
                                            </div>
        
                                            <div className="w-full mb-4">
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-900">Prix par unité <span className='font-bold text-purple-600'>*</span></label>
                                                <input type="nomber" value={this.state.unitPrice} onChange={(e) => this.setState({unitPrice:e.target.value }) }  name="unitPrice" id="unitPrice" autoComplete="unitPrice" placeholder="prix par unité" className="mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 shadow-inner bg-white bg-opacity-90 rounded-md px-2"/>
                                            </div>
        
                                            <div className="w-full mb-4">
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-900">Poids par unité</label>
                                                <input type="number" value={this.state.unitWeight} onChange={(e) => this.setState({unitWeight:e.target.value }) }  name="unitWeight" id="unitWeight" autoComplete="weight" placeholder="poids par unité" className="mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 shadow-inner bg-white bg-opacity-90 rounded-md px-2"/>
                                            </div>
        
                                            <div className="w-full mb-4">
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-900">Ordre</label>
                                                <input type="text" value={this.state.order} onChange={(e) => this.setState({order:e.target.value }) }  name="order" id="order" autoComplete="order" placeholder="Ordre" className="mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 shadow-inner bg-white bg-opacity-90 rounded-md px-2"/>
                                            </div>
        
                                            <div className="flex flex-row -mt-4">
                                                <div className="self-center ml-1">
                                                    <label htmlFor="desc" className="block text-sm font-medium text-gray-900 mb-1">Visiblité</label>
                                                    <Switch checked={activated} onChange={(e) => this.setState({activated: e})} className={`${activated ? 'bg-purple-600 bg-opacity-80 shadow-sm' : 'bg-white bg-opacity-80 shadow-sm'} relative inline-flex flex-shrink-0 h-[34px] w-[70px] border border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}>                                                    
                                                        <span className="sr-only">Use setting</span>
                                                        <span
                                                        aria-hidden="true"
                                                        className={`${activated ? 'translate-x-9' : 'translate-x-0'}
                                                            pointer-events-none inline-block h-[29.5px] w-[29.5px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200 border border-gray-200 border-opacity-80 self-center`}
                                                        />
                                                    </Switch>
                                                </div>
                                            </div>
        
        
                                            <div className='col-span-3 grid grid-cols-3 grid-flow-row gap-5'>
        
                                                <div className="col-span-2 mb-4">
                                                    <label htmlFor="desc" className="block text-sm font-medium text-gray-900">Description <span className='font-bold text-purple-600'>*</span></label>
                                                    <div className="editor-container border border-gray-400 border-opacity-30 text-gray-900 text-sm font-medium details-editor mt-1"><Editor /></div>
        
                                                </div>
        
                                                <div className=''>
        
        
                                                    <div className='mb-6'>
                                                        <Listbox value={gender} onChange={(e) => this.setState({gender:e})}>
                                                            {({ open }) => (
                                                                <>
                                                                <Listbox.Label className="block text-sm font-medium text-gray-900">Sexe <span className='font-bold text-purple-600'>*</span></Listbox.Label>
                                                                <div className="mt-1 relative">
                                                                    <Listbox.Button className="relative w-full bg-white border border-gray-400 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm">
                                                                        <span className="flex items-center">
                                                                            <span className="ml-3 block truncate">{gender ? gender : 'Choisir un sexe'}</span>
                                                                        </span>
                                                                        <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                                            <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                        </span>
                                                                    </Listbox.Button>
        
                                                                    <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                                                        <Listbox.Options className="absolute sticky mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                                                            {genders.map((item) => (
                                                                            <Listbox.Option key={item.id} className={({ active }) => classNames(active ? 'text-white bg-purple-600' : 'text-gray-900','cursor-pointer select-none relative py-2 pl-3 pr-9')} value={item}>
                                                                                {({ gender, active }) => (
                                                                                <>
                                                                                    <div className="flex items-center">
                                                                                        <span className={classNames(gender == item ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>
                                                                                            {item}
                                                                                        </span>
                                                                                    </div>
        
                                                                                    {gender || active &&
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
                                                            <Listbox value={category} onChange={(e) => this.setState({category: e})}>
                                                                {({ open }) => (
                                                                    <>
                                                                    <Listbox.Label className="block text-sm font-medium text-gray-900">Catégorie <span className='font-bold text-purple-600'>*</span></Listbox.Label>
                                                                    <div className="mt-1 relative">
                                                                        <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm">
                                                                            <span className="flex items-center">
                                                                                <span className="ml-3 block truncate">{category ? category.name : 'Choisir une catégorie'}</span>
                                                                            </span>
                                                                            <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                                                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                            </span>
                                                                        </Listbox.Button>
        
                                                                        <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                                                            <Listbox.Options className="absolute sticky mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                                                                {categories.map((item) => (
                                                                                <Listbox.Option key={item.id} className={({ active }) => classNames(active ? 'text-white bg-purple-600' : 'text-gray-900','cursor-pointer select-none relative py-2 pl-3 pr-9')} value={item}>
                                                                                    {({ category, active }) => (
                                                                                    <>
                                                                                        <div className="flex items-center">
                                                                                            <span className={classNames(category ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>
                                                                                                {item.name}
                                                                                            </span>
                                                                                        </div>
        
                                                                                        {category || active &&
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
                                                        <Listbox value={brand} onChange={(e) => this.setState({brand: e})}>
                                                            {({ open }) => (
                                                                <>
                                                                <Listbox.Label className="block text-sm font-medium text-gray-900">Marque <span className='font-bold text-purple-600'>*</span></Listbox.Label>
                                                                <div className="mt-1 relative">
                                                                    <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm">
                                                                        <span className="flex items-center">
                                                                            <span className="ml-3 block truncate">{brand ? brand.name : 'Choisir une marque'}</span>
                                                                        </span>
                                                                        <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                                            <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                        </span>
                                                                    </Listbox.Button>
        
                                                                    <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                                                        <Listbox.Options className="absolute sticky mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                                                            {brands.map((item) => (
                                                                            <Listbox.Option key={item.id} className={({ active }) => classNames(active ? 'text-white bg-purple-600' : 'text-gray-900','cursor-pointer select-none relative py-2 pl-3 pr-9')} value={item}>
                                                                                {({ brand, active }) => (
                                                                                <>
                                                                                    <div className="flex items-center">
                                                                                        <span className={classNames(brand ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>
                                                                                            {item.name}
                                                                                        </span>
                                                                                    </div>
        
                                                                                    {brand || active &&
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
                                                    <div className='px-2 py-[0.45px] text-[10.325px] font-medium bg-purple-500 bg-opacity-80 text-white rounded-xl self-center'>{chosenVariants?.length}</div>
                                                </div>
        
                                                <div className='w-full h-52 overflow-y-auto px-5'>
        
                                                    {chosenVariants?.length != 0 ?
        
                                                        <div className='w-full h-full flex flex-row justify-center '>
                                                            <div className='h-24 self-center'>
                                                                <img src="../empty_svg.svg" className='h-full opacity-90' />
                                                            </div>
                                                        </div>
                                                        :

                                                        <div className="w-full">
                                                            <div className="w-full">
                                                                <Disclosure as="div" className="mb-3">
                                                                    {({ open }) => (
                                                                        <>
                                                                            <Disclosure.Button className="flex justify-between w-full px-4 py-3 text-sm font-medium text-left text-purple-900 bg-white bg-opacity-90 rounded-lg hover:bg-purple-50 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                                                                <span>Couleurs</span>
                                                                                <ChevronDownIcon className={`${ open ? 'transform rotate-180' : ''} w-5 h-5 text-purple-500`}/>
                                                                            </Disclosure.Button>
                                                                            <Disclosure.Panel className="mt-2 px-4 pt-4 pb-2 text-sm text-gray-500 bg-white bg-opacity-80">
                                                                                If you're unhappy with your purchase for any reason, email us
                                                                                within 90 days and we'll refund you in full, no questions asked.
                                                                            </Disclosure.Panel>
                                                                        </>
                                                                    )}
                                                                </Disclosure>
                                                                <Disclosure as="div" className="">
                                                                    {({ open }) => (
                                                                        <>
                                                                           <Disclosure.Button className="flex justify-between w-full px-4 py-3 text-sm font-medium text-left text-purple-900 bg-white bg-opacity-90 rounded-lg hover:bg-purple-50 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                                                                <span>Tailles</span>
                                                                                <ChevronDownIcon className={`${ open ? 'transform rotate-180' : ''} w-5 h-5 text-purple-500`}/>
                                                                            </Disclosure.Button>
                                                                            <Disclosure.Panel className="mt-2 px-4 pt-4 pb-2 text-sm text-gray-500 bg-white bg-opacity-80">
                                                                                If you're unhappy with your purchase for any reason, email us
                                                                                within 90 days and we'll refund you in full, no questions asked.
                                                                            </Disclosure.Panel>
                                                                        </>
                                                                    )}
                                                                </Disclosure>
                                                            </div>
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
                                                    <div className='px-2 py-[0.45px] text-[10.325px] font-medium bg-purple-500 bg-opacity-80 text-white rounded-xl self-center'>{chosenProducts?.length}</div>
                                                </div>
        
                                                <div className='w-full h-52 overflow-y-auto px-5'>
        
                                                    {chosenProducts?.length != 0 ?
        
                                                        <div className='w-full h-full flex flex-row justify-center '>
                                                            <div className='h-24 self-center'>
                                                                <img src="../empty_svg.svg" className='h-full opacity-90' />
                                                            </div>
                                                        </div>

                                                        :

                                                        <div className='flex flex-col'>

                                                            <div className='flex flex-row justify-between bg-white bg-opacity-80 py-2 px-2 rounded-md mb-2'>

                                                                <div className='flex flex-row'>

                                                                    <div className='h-[3rem] w-[3rem] bg-red-300 rounded-full mr-2'>

                                                                    </div>

                                                                    <div className='flex flex-col justify-center'>
                                                                        <div className='text-sm font-medium text-gray-800'>Nom du produit</div>
                                                                        <div className='text-xs font-normal text-gray-600 mt-1'>18 000 CFA</div>
                                                                    </div>

                                                                </div>

                                                                <div className="w-6 h-6 rounded-full border border-iiblack gt-shadow5 flex flex-row justify-center cursor-pointer btn-effect1 bg-gray-100 hover:bg-gray-200 active:bg-gray-30 self-center">
                                                                    <TrashBoldIcon customClass="w-[0.575rem] text-red-600 text-opacity-90 self-center"/>
                                                                </div>

                                                            </div>

                                                            <div className='flex flex-row justify-between bg-white bg-opacity-80 py-2 px-2 rounded-md mb-2'>

                                                                <div className='flex flex-row'>

                                                                    <div className='h-[3rem] w-[3rem] bg-red-300 rounded-full mr-2'>

                                                                    </div>

                                                                    <div className='flex flex-col justify-center'>
                                                                        <div className='text-sm font-medium text-gray-800'>Nom du produit</div>
                                                                        <div className='text-xs font-normal text-gray-600 mt-1'>18 000 CFA</div>
                                                                    </div>

                                                                </div>

                                                                <div className="w-6 h-6 rounded-full border border-iiblack gt-shadow5 flex flex-row justify-center cursor-pointer btn-effect1 bg-gray-100 hover:bg-gray-200 active:bg-gray-30 self-center">
                                                                    <TrashBoldIcon customClass="w-[0.575rem] text-red-600 text-opacity-90 self-center"/>
                                                                </div>

                                                            </div>

                                                            <div className='flex flex-row justify-between bg-white bg-opacity-80 py-2 px-2 rounded-md mb-2'>

                                                                <div className='flex flex-row'>

                                                                    <div className='h-[3rem] w-[3rem] bg-red-300 rounded-full mr-2'>

                                                                    </div>

                                                                    <div className='flex flex-col justify-center'>
                                                                        <div className='text-sm font-medium text-gray-800'>Nom du produit</div>
                                                                        <div className='text-xs font-normal text-gray-600 mt-1'>18 000 CFA</div>
                                                                    </div>

                                                                </div>

                                                                <div className="w-6 h-6 rounded-full border border-iiblack gt-shadow5 flex flex-row justify-center cursor-pointer btn-effect1 bg-gray-100 hover:bg-gray-200 active:bg-gray-30 self-center">
                                                                    <TrashBoldIcon customClass="w-[0.575rem] text-red-600 text-opacity-90 self-center"/>
                                                                </div>

                                                            </div>

                                                            <div className='flex flex-row justify-between bg-white bg-opacity-80 py-2 px-2 rounded-md mb-2'>

                                                                <div className='flex flex-row'>

                                                                    <div className='h-[3rem] w-[3rem] bg-red-300 rounded-full mr-2'>

                                                                    </div>

                                                                    <div className='flex flex-col justify-center'>
                                                                        <div className='text-sm font-medium text-gray-800'>Nom du produit</div>
                                                                        <div className='text-xs font-normal text-gray-600 mt-1'>18 000 CFA</div>
                                                                    </div>

                                                                </div>

                                                                <div className="w-6 h-6 rounded-full border border-iiblack gt-shadow5 flex flex-row justify-center cursor-pointer btn-effect1 bg-gray-100 hover:bg-gray-200 active:bg-gray-30 self-center">
                                                                    <TrashBoldIcon customClass="w-[0.575rem] text-red-600 text-opacity-90 self-center"/>
                                                                </div>

                                                            </div>
                                                            
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

}

export default Index;

