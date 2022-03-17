import React, { Component, useRef, useEffect, useState } from 'react';
import Link from 'next/link'
import { motion } from "framer-motion";
import Header from '../../components/common/header'
import Sidebar from '../../components/common/sidebar'
import HeadInfo from '../../components/common/headinfo'
import ArrowLeftBoldIcon from '../../components/ui/icons/arrowLeftBoldIcon';
import TrashIcon from '../../components/ui/icons/trashIcon';
import ImageHolder from '../../components/ui/icons/imageHolder';
import firebase from "../../config/firebase"
import { uid } from 'uid';
import { saveImage, deleteImage } from '../../hooks/image';
import { saveBrand, getBrand} from '../../hooks/brand';
import router from 'next/router'
import { capitalize } from '../../libs/util';
import BlockUI from '../../components/common/blockui';
import toast, { Toaster } from 'react-hot-toast';

export async function getServerSideProps(context) {
    return {
      props: {},
    }
}

var toastOne ;


class Index extends Component {

    constructor(props){
        super(props);
        this.state = { block: false, id:null, name: '', desc: '', order:0, image: null, chosenImage:null, imageref:null, imageId: null};
        this.handleImage = this.handleImage.bind(this)
        this.resetImage = this.resetImage.bind(this)
        this.checkInput = this.checkInput.bind(this)
        this.saveItem = this.saveItem.bind(this)
        this.uploadImage = this.uploadImage.bind(this)
        this.saveImageInfo = this.saveImageInfo.bind(this)
    }

    async componentDidMount(){
        var itemId = router.query.id
        console.log("L'id de l'item est ", itemId)
        if(itemId !=null){
            var {item, isLoading} = await getBrand(itemId)
            console.log("Hhaha ", item)
            if(item != null && item?.brand != null){
                this.setState({ id: item.brand.id, name: item.brand.name, desc: item.brand.desc, order: item.brand.order, image:item.brand.image?.url, chosenImage:item.brand.image?.url, imageref:item.brand.image?.imageref, imageId: item.brand.image?.id })
            }
            else if(item != null && item?.brand == null){
                router.push('/');
            }
        }
    }

    handleImage = (e, option) => {
        e.preventDefault(); 
        this.setState({[option]:e.target.files[0], ['chosen' + capitalize(option)]: URL.createObjectURL(e.target.files[0])  })
    }

    resetImage = (e, option) =>{
        e.preventDefault();
        this.setState({[option]: null, ['chosen' + capitalize(option)]: null })
    }

    checkInput = (e) => {

        e.preventDefault()
        const {name, desc, order, image} = this.state

        if(image == null){
            toast.error("Veuillez ajouter une image.", {id: toastOne,});
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

        const {id, name, desc, order, image} = this.state

        var {response } = await saveBrand(id, name, desc, order)

        if(response?.saveBrand?.__typename == 'Brand'){
            this.handleUpload(response?.saveBrand?.id)
        }
        else if(response?.saveBrand?.__typename == 'InputError'){
            toast.error(response?.saveBrand?.message, {id: toastOne,});
            this.setState({block: false})
        }
        else{
            toast.error("Erreur inconnue. Veuillez vérifier votre connexion internet.", {id: toastOne,});
        }
    };

    handleUpload = (itemId) => {

        const { id, image, chosenImage, imageref, imageId } = this.state

        if(imageref !=null){ 
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
        var ref = "brand_" + itemId
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
        var {response } = await saveImage(imageId, url, ref, null, null, itemId)

        if(response?.saveImage?.__typename == 'Image'){
            toast.success("Mise à jour réussie !", {id: toastOne,});
        }
        else if(response?.saveImage?.__typename == 'InputError'){
            console.log("ImageInfo mutattion ", response?.saveImage?.message)
            toast.success("Une erreur s'est produite lors de l'ajout de l'image !", {id: toastOne,});
        }
        else{
            toast.error("Erreur inconnue. Veuillez vérifier votre connexion internet.", {id: toastOne,});
        }

        this.setState({block: false})
        toast.dismiss()
        setTimeout(() => { router.push('./');}, 2200);

    };


    render() {
        const {chosenImage} = this.state
        var imageInput;

        return(
            <div className="app-container h-screen">
                <Toaster position='top-right' />
                <HeadInfo title= 'Dashboard' description='description here'/>
                <Header/>
        
                <div className='w-full overflow-x-auto px-6 py-5 flex flex-row justify-between'>
        
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
        
                                        <div className='text-lg font-semibold text-purple-600'>Formulaire Marque</div>
        
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
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-900">Désignation <span className='font-bold text-purple-600'>*</span> </label>
                                                <input type="text" value={this.state.name} onChange={(e) => this.setState({name:e.target.value }) } name="name" id="name" autoComplete="title" placeholder="Désignation" className="mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 shadow-inner bg-white bg-opacity-90 rounded-md px-2" required/>
                                            </div>
        
                                            <div className="w-full mb-3">
                                                <label htmlFor="desc" className="block text-sm font-medium text-gray-900">Description <span className='font-bold text-purple-600'>*</span></label>
                                                <div className="mt-1">
                                                    <textarea value={this.state.desc} onChange={(e) => this.setState({desc:e.target.value })} name="desc" id="desc" rows={8}  className="mt-1 w-full shadow-sm text-sm border border-gray-400 shadow-inner bg-white bg-opacity-90 rounded-md px-2 py-2" placeholder="Donner une description" required/>
                                                </div>
                                            </div>
        
                                            <div className="flex flex-row w-full">
        
                                                <div className="w-1/2 mr-8 self-center">
                                                    <label htmlFor="order" className="block text-sm font-medium text-gray-900">Ordre <span className='font-bold text-purple-600'>*</span></label>
                                                    <input type="number" value={this.state.order} onChange={(e) => this.setState({order: e.target.value })} name="order" id="order" autoComplete="ordre" placeholder="Ordre" className="mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 shadow-inner bg-white bg-opacity-90 rounded-md px-2" required/>
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

}

export default Index;
