import React, { Component, Fragment } from 'react';
import Link from 'next/link'
import { motion } from "framer-motion";
import Header from '../../components/common/header'
import Sidebar from '../../components/common/sidebar'
import HeadInfo from '../../components/common/headinfo'
import ArrowLeftBoldIcon from '../../components/ui/icons/arrowLeftBoldIcon';
import InfoBoldIcon from '../../components/ui/icons/infoBoldIcon';
import { saveImage } from '../../hooks/image';
import { saveCategory, getCategory} from '../../hooks/category';
import {allCategories } from '../../hooks/category';
import router from 'next/router'
import BlockUI from '../../components/common/blockui';
import toast, { Toaster } from 'react-hot-toast';
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { classNames } from '../../libs/util';
import { Switch } from '@headlessui/react'
import ImageHolder from '../../components/ui/icons/imageHolder';
import { capitalize } from '../../libs/util';
import TrashIcon from '../../components/ui/icons/trashIcon';
import firebase from "../../config/firebase"

export async function getServerSideProps(context) {
    return {
      props: {},
    }
}

var toastOne ;


class Index extends Component {

    constructor(props){
        super(props);
        this.state = { block: false, id:null, itemType: null, name: '', desc: '', order: 0, activated: false, parent: null, parents : [], image: null, chosenImage:null, imageref:null, imageId: null};
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
        var itemType = router.query.type
        if(itemType != null) this,this.setState({itemType: itemType})
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
        this.getParents()
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

        const {id, name, desc, order, activated, parent} = this.state

        var {response } = await saveCategory(id, name, desc, order, activated, parent?.id)

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

        const {parent, parents, activated, chosenImage, itemType} = this.state
        var imageInput;

        return(
            <div className="app-container h-screen">
                <Toaster position='top-right' />
                <HeadInfo title= 'Dashboard' description='description here'/>
                <Header/>
        
                <div className='w-full overflow-x-auto px-3 py-3 md:px-6  flex flex-row justify-between'>
        
                    <Sidebar />
        
                    <motion.div initial={{ opacity: 0.45, x: 150 }}  whileInView={{ opacity: 1, x: 0, transition: { duration: 0.60 }, }}>
                        <div className='app-body bg-white rounded-xl relative pb-16'>

                            <BlockUI blocking={this.state.block} />
        
                            <form className='w-full h-full' onSubmit={(e) => this.checkInput(e)}>
        
                                <div className='w-full h-full pt-4'>
        
                                    <div className='flex flex-row justify-between px-5'>
        
                                        <Link href="./">
                                            <div className='text-purple-600 hover:text-opacity-80 cursor-pointer self-center'>
                                                <ArrowLeftBoldIcon customClass="w-4" /> 
                                            </div>
                                        </Link>
        
                                        <div className='text-lg font-semibold text-purple-600'>Nouvelle Catégorie</div>
        
                                        <div></div>
        
                                    </div>
        
                                    <div className='app-form overflow-y-auto mt-3 px-5'>
        
                                        <div className='w-full grid grid-cols-5 grid-flow-row gap-6 mt-6'>
        
                                        <div className='col-span-2 bg-gray-200 bg-opacity-60 rounded-xl px-4 py-4 grid grid-cols-2 gap-3 h-max'>
                                            <div className='relative col-span-2 bg-white bg-opacity-90 border border-gray-200 h-56 flex flex-col justify-center cursor-pointer'>
                                                    {chosenImage &&
                                                    <>
                                                        <div onClick={() => this.imageInput.click()} className="w-full h-full absolute top-0 left-0">
                                                            <img className="w-full h-full object-cover" src={chosenImage} />
                                                        </div>
                                                        <div onClick={(e) => this.resetImage(e, 'image')} className='z-20 bg-gray-400 bg-opacity-40 hover:bg-opacity-30 border border-gray-600 border-opacity-10 text-center w-7 h-7 rounded-full shadow-lg absolute bottom-2 right-2 flex flex-row justify-center btn-effect1'>
                                                            <div className='self-center'><TrashIcon customClass="w-4 h-4 text-black" /></div>
                                                        </div>
                                                    </>
                                                    }
                                                    <div onClick={() => this.imageInput.click()} className="space-y-1 text-center">
                                                        {!chosenImage && <ImageHolder customClass="mx-auto h-14 w-12 text-gray-400" />}
                                                        <div className="flex text-sm text-gray-600">
                                                            <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-mediu hover:text-opacity-90">
                                                                <input type="file"  ref={refParam => this.imageInput = refParam} onChange={(e) => this.handleImage(e, 'image')} name="image" id="image" className="sr-only"/>
                                                            </label>
                                                            {!chosenImage && <p className="w-full text-center"> <span className="text-iired" >Uploader une image</span> ou le déposer ici</p>}
                                                        </div>
                                                        {!chosenImage &&  <p className="text-xs text-gray-500 mb-2">PNG, JPG, GIF jusqu&apos;à 10MB</p>}
                                                    </div>
                                            </div>
                                        </div>
        
                                        <div className='col-span-3 bg-gray-200 bg-opacity-60 rounded-xl px-4 py-4'>
        
                                            <div className="w-full mb-4">
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-900">Désignation</label>
                                                <input type="text" value={this.state.name} onChange={(e) => this.setState({name:e.target.value }) }  name="name" id="name" autoComplete="title" placeholder="Désignation" className="mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 focus:border-0 focus:ring-2 focus:ring-purple-500 shadow-inner bg-white bg-opacity-90 rounded-md px-2"/>
                                            </div>
        
                                            <div className="w-full mb-3">
                                                <label htmlFor="desc" className="block text-sm font-medium text-gray-900">Description</label>
                                                <div className="mt-1">
                                                    <textarea value={this.state.desc} onChange={(e) => this.setState({desc:e.target.value }) }  id="desc" name="desc" rows={7}  className="mt-1 w-full shadow-sm text-sm border border-gray-400 focus:border-0 focus:ring-2 focus:ring-purple-500 shadow-inner bg-white bg-opacity-90 rounded-md px-2 py-3" placeholder="Donner une description" />
                                                </div>
                                            </div>

                                            {itemType == 2 &&
                                                <div className='w-full mb-3 '>
                                                    <Listbox value={parent} onChange={(e) => this.setState({parent: e})}>
                                                        {({ open }) => (
                                                            <>
                                                            <Listbox.Label className="block text-sm font-medium text-gray-900">Choisir un parent <span className='font-bold text-purple-600'>*</span></Listbox.Label>
                                                            <div className="mt-1 relative">
                                                                <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm">
                                                                    <span className="flex items-center">
                                                                        <span className="ml-3 block truncate capitalize">{parent ? parent.name : 'Choisir un parent'}</span>
                                                                    </span>
                                                                    <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                                        <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                    </span>
                                                                </Listbox.Button>

                                                                {parents?.length > 0 &&

                                                                    <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                                                        <Listbox.Options className="absolute sticky mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                                                            {parents?.map((item) => (
                                                                            <Listbox.Option key={item.id} className={({ active }) => classNames(active ? 'text-white bg-purple-600' : 'text-gray-900','cursor-pointer select-none relative py-2 pl-3 pr-9')} value={item}>
                                                                                {({ parent, active }) => (
                                                                                <>
                                                                                    <div className="flex items-center">
                                                                                        <span className={classNames(parent ? 'font-semibold' : 'font-normal', 'ml-3 block truncate capitalize')}>
                                                                                            {item.name}
                                                                                        </span>
                                                                                    </div>

                                                                                    {parent || active &&
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

                                                                }

                                                            </div>
                                                            </>
                                                        )}
                                                    </Listbox>
                                                </div>
                                            }

                                            <div className="flex flex-row w-full">
        
                                                <div className="w-1/2 mr-8 self-center">
                                                    <label htmlFor="order" className="block text-sm font-medium text-gray-900">Ordre</label>
                                                    <input type="number" value={this.state.order} onChange={(e) => this.setState({order:e.target.value }) }  name="order" id="order" autoComplete="order" placeholder="Ordre" className="mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 focus:border-0 focus:ring-2 focus:ring-purple-500 shadow-inner bg-white bg-opacity-90 rounded-md px-2"/>
                                                </div>
        
                                                <div className="self-center">
                                                    <label htmlFor="desc" className="block text-sm font-medium text-gray-900 mb-1">Visiblité</label>
                                                    <Switch checked={activated} onChange={(e) => this.setState({activated: e})} className={`${activated ? 'bg-purple-600 bg-opacity-80 shadow-sm' : 'bg-white bg-opacity-80 shadow-sm'} relative inline-flex flex-shrink-0 h-[34px] w-[70px] border border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}>
                                                            <span className="sr-only">Use setting</span>
                                                            <span aria-hidden="true" className={`${activated ? 'translate-x-9' : 'translate-x-0'} pointer-events-none inline-block h-[29.5px] w-[29.5px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200 border border-gray-200 border-opacity-80 self-center`}/>
                                                    </Switch>
                                                </div>
        
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

