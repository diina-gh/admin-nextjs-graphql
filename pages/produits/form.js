import React, { Component, Fragment } from 'react';
import Link from 'next/link'
import { motion } from "framer-motion";
import Header from '../../components/common/header'
import Sidebar from '../../components/common/sidebar'
import HeadInfo from '../../components/common/headinfo'
import Product from '../../components/product/product';
import ArrowLeftBoldIcon from '../../components/ui/icons/arrowLeftBoldIcon';
import InfoBoldIcon from '../../components/ui/icons/infoBoldIcon';
import { saveImage, deleteImage } from '../../hooks/image';
import { saveCategory, getCategory} from '../../hooks/category';
import {allCategories } from '../../hooks/category';
import router from 'next/router'
import BlockUI from '../../components/common/blockui';
import toast, { Toaster } from 'react-hot-toast';
import { Listbox, Dialog, Transition } from '@headlessui/react'
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
import CrossIcon from '../../components/ui/icons/crossIcon';
import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { allVariants } from '../../hooks/variant';
import { allBrands } from '../../hooks/brand';
import { allProducts } from '../../hooks/product';
import { Pagination } from "react-pagination-bar"
import 'react-pagination-bar/dist/index.css'
import ChevronLeftIcon from '../../components/ui/icons/chevronLeftIcon';
import ChevronRightIcon from '../../components/ui/icons/chevronRightIcon';
import DoubleChevronLeftIcon from '../../components/ui/icons/doubleChevronLeftIcon';
import DoubleChevronRightIcon from '../../components/ui/icons/doubleChevronRightIcon';

var Editor = dynamic(() => import("../../components/common/editor"), {
  ssr: false
})

var genders = ['UNISEX', 'MASCULIN', 'FEMININ']

const products = [

    {
        id: 1,
        name: 'Macbook Pro',
        category: 'Oridnateurs',
        price: '780 000 CFA',
        image: "../images/product/product1.png",
    },
    {
        id: 2,
        name: 'Ipad Air',
        category: 'Tablette',
        price: '575 000 CFA',
        image: "../images/product/product4.png",
    },
    {
        id: 3,
        name: 'Iphone 13 Pro',
        category: 'Phone',
        price: '880 000 CFA',
        image: "../images/product/product3.png",
    },
    {
        id: 4,
        name: 'Smart Watch',
        category: 'Smart Watch',
        price: '450 000 CFA',
        image: "../images/product/product5.png",
    },
    {
        id: 5,
        name: 'Homepod mini',
        category: 'Acessories',
        price: '265 000 CFA',
        image: "../images/product/product6.png",
    },
    // {
    //     id: 6,
    //     name: 'Airpod Pro',
    //     category: 'Acessories',
    //     price: '140 000 CFA',
    //     image: "../images/product/product7.png",
    // }

]


export async function getServerSideProps(context) {
    return {
      props: {},
    }
}

var toastOne ;


class Index extends Component {

    constructor(props){

        super(props);

        this.state = { block: false, id:null, name: '', desc: '', activated: false, unit: '', unitWeight: 0.0, unitPrice: 0.0, order : 0, gender: genders[0], modal1: false, modal2:false, checkedAll: false,
                       category: null, categories: [], brand: null, brands:[], variant_res: null, variants: [], chosenVariants: [], options:[], chosenOptions:[], products: [], chosenProducts:[],
                       image1:null, chosenImage1:null, imageref1: null, imageId1: null,
                       image2:null, chosenImage2:null, imageref2: null, imageId2: null,
                       image3:null, chosenImage3:null, imageref3: null, imageId3: null,
                       image4:null, chosenImage1:null, imageref4: null, imageId4: null,
                       image5:null, chosenImage5:null, imageref5: null, imageId5: null
                    };

        this.checkInput = this.checkInput.bind(this)
        this.saveItem = this.saveItem.bind(this)
        this.getBrands = this.getBrands.bind(this)
        this.getCategories = this.getCategories.bind(this)
        this.getVariants = this.getVariants.bind(this)
        this.getProducts = this.getProducts.bind(this)
        this.saveImageInfo = this.saveImageInfo.bind(this)
        this.uploadImage = this.uploadImage.bind(this)
        this.handleImage = this.handleImage.bind(this)
        this.resetImage = this.resetImage.bind(this)
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.handleOption = this.handleOption.bind(this)
        this.saveVariant = this.saveVariant.bind(this)
        this.deleteVariant = this.deleteVariant.bind(this)
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
        this.getCategories()
        this.getBrands()
        this.getVariants()
        this.getProducts()
    }

    getCategories = async() => {
        var {response} = await allCategories()
        if(response){
            this.setState({categories: response.categories})
        }
    }

    getBrands = async() => {
        var {response} = await allBrands()
        if(response){
            this.setState({brands: response.brands})
        }
    }

    getVariants = async() => {
        var {response} = await allVariants()
        if(response){
            this.setState({variants: response.variants})
        }
    }

    getProducts = async() => {
        var {response} = await allProducts()
        if(response){
            this.setState({products: response.products})
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

    closeModal = (e, option) => {
        e.preventDefault();
        this.setState({ [option]: false });
    }

    openModal = (e, option) => {
        e.preventDefault();
        this.setState({ [option]: true});
    }

    handleOption = (e, i, checkAll = false, j = null) => {

        e.preventDefault();

        const {variant_res, chosenVariants} = this.state
        var new_variant = j != null ? chosenVariants[j] : variant_res

        if(checkAll){
            var results = new_variant.options.filter(opt => opt?.selected == true);
            for(var k=0; k< new_variant.options.length; k++){
                new_variant.options[k].selected = (results.length != new_variant.options.length) 
            }
        }
        else{
            new_variant.options[i].selected = !new_variant.options[i].selected
        }

        var results = new_variant.options.filter(opt => opt?.selected == true);
        this.setState({variant_res: new_variant, checkedAll: (results.length == new_variant.options.length)})
    }

    saveVariant = (e, i = null) => {

        e.preventDefault();
        const {variant_res, chosenVariants} = this.state

        if(variant_res == null){
            toast.error('Veuillez choisir un variant')
            return null
        }

        const results = variant_res.options.filter(opt => opt.selected == true);
        if(results.length == 0){
            toast.error('Veuillez sélectionner des options')
            return null
        } 

        var new_variants = chosenVariants

        if(i == null){
            new_variants.push(variant_res)
            this.setState({chosenVariants: new_variants, modal1: false, variant_res: null})
            toast.success('Variant ajouté !')
        }
  
    }

    deleteVariant = (e, index) => {
        e.preventDefault()
        const {chosenVariants} = this.state
        var new_variants = chosenVariants
        new_variants.splice(index, 1)
        this.setState({chosenVariants: new_variants});
        toast.success("Variant supprimé !");
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
                activated, gender, category, categories, brand, brands,chosenVariants, variant_res, variants, chosenOptions, 
                options, chosenProducts, chosenImage1, chosenImage2, chosenImage3, chosenImage4, chosenImage5, checkedAll
            } 
        = this.state

        let imageInput1, imageInput2, imageInput3, imageInput4, imageInput5

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
                                                <input type="text" value={this.state.name} onChange={(e) => this.setState({name:e.target.value }) } name="name" id="name" autoComplete="name" placeholder="Désignation" className="mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 focus:border-0 focus:ring-2 focus:ring-purple-500 shadow-inner bg-white bg-opacity-90 rounded-md px-2"/>
                                            </div>
        
                                            <div className="w-full mb-4">
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-900">Unité <span className='font-bold text-purple-600'>*</span></label>
                                                <input type="text" value={this.state.unit} onChange={(e) => this.setState({unit:e.target.value }) } name="unit" id="unit" autoComplete="unit" placeholder="unité" className="mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 focus:border-0 focus:ring-2 focus:ring-purple-500 shadow-inner bg-white bg-opacity-90 rounded-md px-2"/>
                                            </div>
        
                                            <div className="w-full mb-4">
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-900">Prix par unité <span className='font-bold text-purple-600'>*</span></label>
                                                <input type="nomber" value={this.state.unitPrice} onChange={(e) => this.setState({unitPrice:e.target.value }) }  name="unitPrice" id="unitPrice" autoComplete="unitPrice" placeholder="prix par unité" className="mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 focus:border-0 focus:ring-2 focus:ring-purple-500 shadow-inner bg-white bg-opacity-90 rounded-md px-2"/>
                                            </div>
        
                                            <div className="w-full mb-4">
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-900">Poids par unité</label>
                                                <input type="number" value={this.state.unitWeight} onChange={(e) => this.setState({unitWeight:e.target.value }) }  name="unitWeight" id="unitWeight" autoComplete="weight" placeholder="poids par unité" className="mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 focus:border-0 focus:ring-2 focus:ring-purple-500 shadow-inner bg-white bg-opacity-90 rounded-md px-2"/>
                                            </div>
        
                                            <div className="w-full mb-4">
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-900">Ordre</label>
                                                <input type="text" value={this.state.order} onChange={(e) => this.setState({order:e.target.value }) }  name="order" id="order" autoComplete="order" placeholder="Ordre" className="mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 focus:border-0 focus:ring-2 focus:ring-purple-500 shadow-inner bg-white bg-opacity-90 rounded-md px-2"/>
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
        
                                                <div className='w-full h-[14.5rem] overflow-y-auto px-5'>
        
                                                    {chosenVariants.length == 0 ?
        
                                                        <div className='w-full h-full flex flex-row justify-center '>
                                                            <div className='h-24 self-center'>
                                                                <img src="../empty_svg.svg" className='h-full opacity-90' />
                                                            </div>
                                                        </div>
                                                        :
                                                        <div className="w-full">
                                                            <div className="w-full mt-2">
                                                                {chosenVariants.map((item, i) => (
                                                                    <Disclosure as="div" key={item.id} className="mb-3">
                                                                        {({ open }) => (
                                                                            <>
                                                                                <Disclosure.Button className="relative flex justify-between w-full px-4 py-3 text-sm font-medium text-left text-purple-900 bg-white bg-opacity-90 rounded-lg hover:bg-purple-50 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                                                                    <div onClick={(e) => this.deleteVariant(e, i)} className='absolute -top-1.5 -left-1.5 w-4 h-4 bg-red-400 hover:bg-red-500 rounded-full flex flex-row justify-center border-[0.025rem] border-gray-100 border-opacity-60'>
                                                                                        <CrossIcon customClass="w-1.5 h-1.5 text-white self-center" />
                                                                                    </div>
                                                                                    <span>{capitalize(item.name)}</span>
                                                                                    <ChevronDownIcon className={`${ open ? 'transform rotate-180' : ''} w-5 h-5 text-purple-500`}/>
                                                                                </Disclosure.Button>

                                                                                <Disclosure.Panel className="mt-2 px-4 pt-4 pb-2 text-sm text-gray-500 bg-white bg-opacity-80">
                                                                                    <div className=''>
                                                                                        <table className="min-w-full divide-y divide-gray-200 ">
                                                                                            <thead className="bg-gray-100 sticky top-0 ">
                                                                                                <tr>
                                                                                                    <th scope="col" className="px-6 py-2 text-left text-[0.72rem] font-medium text-gray-600 uppercase tracking-wider">
                                                                                                        N#
                                                                                                    </th>
                                                                                                    
                                                                                                    <th scope="col" className="px-6 py-2 text-left text-[0.72rem] font-medium text-gray-600 uppercase tracking-wider" >
                                                                                                        Valeur
                                                                                                    </th>

                                                                                                    <th scope="col" className="relative px-2 py-3 flex flex-row justify-end">
                                                                                                        <div className="form-check">
                                                                                                            <input type="checkbox" checked={checkedAll} onFocus={(e) =>  this.handleOption(e, null, true, i)} value="" className="form-check-input rounded-md appearance-none h-4 w-4 border border-purple-300 rounded-sm bg-white checked:bg-purple-600 checked:border-purple-600 text-purple-500 focus:outline-none focus:border-0 focus:ring-2 focus:ring-purple-500 transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"  />
                                                                                                        </div>
                                                                                                    </th>
                                                                                                </tr>
                                                                                            </thead>
                                                                                            <tbody className="bg-white divide-y divide-gray-200">
                                                                                                {item.options.map((item2, i2) => (
                                                                                                    <tr key={item2.id} className={(i2%2==0) ? "" : "bg-gray-100 bg-opacity-50"}>
                                                                                                        <td className="px-6 py-3 whitespace-nowrap">
                                                                                                            <div className="text-[0.8rem] text-gray-900">{i2+1}</div>
                                                                                                        </td>
                                                                                                        <td className="px-6 py-3 whitespace-nowrap">
                                                                                                            <div className='flex flex-row'>
                                                                                                                {item2.colorCode != null && item2.colorCode != '' &&
                                                                                                                    <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-200 border-opacity-40 self-center mr-2" style={{backgroundColor: item2.colorCode}}></div>
                                                                                                                }
                                                                                                                <div className="text-[0.8rem] text-gray-900 self-center">{item2.value}</div>
                                                                                                            </div>
                                                                                                        </td>
                                                                                                        
                                                                                                        <td className="px-2 py-3 whitespace-nowrap text-right flex flex-row justify-end">

                                                                                                            <div className="form-check">
                                                                                                                <input type="checkbox" onFocus={(e) =>  this.handleOption(e, i2, false, i)} checked={item2.selected} value="" className="form-check-input rounded-md appearance-none h-4 w-4 border border-purple-300 rounded-sm bg-white checked:bg-purple-600 checked:border-purple-600 text-purple-500 focus:outline-none focus:border-0 focus:ring-2 focus:ring-purple-500 transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"  />
                                                                                                            </div>

                                                                                                        </td>
                                                                                                    </tr>
                                                                                                ))}
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </div>
                                                                                </Disclosure.Panel>
                                                                            </>
                                                                        )}
                                                                    </Disclosure>
                                                                ))}
                                                                
                                                                
                                                            </div>
                                                        </div>

                                                    }
        
                                                </div>
        
                                                <div onClick={(e) => this.openModal(e, 'modal1')} className='mt-3 bg-black bg-opacity-80 shadow-lg h-10 px-5 rounded-md flex flex-col justify-center btn-effect1 self-center mx-5'>
                                                    <div className='text-sm font-medium text-gray-100 hover:text-white self-center tracking-wide'>Ajouter un variant</div>
                                                </div>
                                                
                                            </div>
        
        
                                            <div className='col-span-2 bg-gray-200 bg-opacity-60 rounded-xl py-6'>
        
                                                <div className='mb-3 ml-0.5 flex flex-row px-5'>
                                                    <div className='text-base font-medium text-purple-600 mr-1 self-center'>Produits associés</div>
                                                    <div className='px-2 py-[0.45px] text-[10.325px] font-medium bg-purple-500 bg-opacity-80 text-white rounded-xl self-center'>{chosenProducts?.length}</div>
                                                </div>
        
                                                <div className='w-full h-[14.5rem] overflow-y-auto px-5'>
        
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
        
                                                <div onClick={(e) => this.openModal(e,'modal2')} className='mt-3 bg-black bg-opacity-80 shadow-lg h-10 px-5 rounded-md flex flex-col justify-center btn-effect1 self-center mx-5'>
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

                <Transition appear show={this.state.modal1} as={Fragment}>
                    <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={(e) => this.setState({modal1: false})}>
                        <div className="">
                            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                                <Dialog.Overlay className="fixed inset-0" />
                            </Transition.Child>

                            {/* <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span> */}
                            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                                <div className="modal-width-2 overflow-y-auto flex flex-row justify-center">
                                    <div className='modal-content bg-white transition-all transform rounded-lg gt-shadow6 self-center my-8 mx-2'>
                                        <div className="w-full flex flex-row justify-center mt-2">
                                            <div className="w-full">
                                                <form role="form" method="post" onSubmit={(e) => this.saveVariant(e)}>

                                                <div className="" >

                                                    <div className="px-3 py-2 w-full text-center text-lg font-medium text-purple-500">Variants et options</div>

                                                    <div className="bg-white space-y-6 sm:p-6 h-[26.025rem] overflow-y-auto z-10">


                                                        <div className="w-full mt-3">

                                                            <div className=''>
                                                                <Listbox value={variant_res} onChange={(e) => this.setState({variant_res: e})}>
                                                                    {({ open }) => (
                                                                        <>
                                                                        <Listbox.Label className="block text-[0.915rem] font-medium text-gray-900">Choisir un variant </Listbox.Label>
                                                                            <div className="mt-1 relative">
                                                                                <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm">
                                                                                    <span className="flex items-center">
                                                                                        <span className="ml-3 block truncate">{variant_res ? variant_res.name : 'Choisir un variant'}</span>
                                                                                    </span>
                                                                                    <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                                                        <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                                    </span>
                                                                                </Listbox.Button>
                    
                                                                                <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                                                                    <Listbox.Options className="absolute sticky mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                                                                        {variants.map((item) => (
                                                                                        <Listbox.Option key={item.id} className={({ active }) => classNames(active ? 'text-white bg-purple-600' : 'text-gray-900','cursor-pointer select-none relative py-2 pl-3 pr-9')} value={item}>
                                                                                            {({ variant_res, active }) => (
                                                                                            <>
                                                                                                <div className="flex items-center">
                                                                                                    <span className={classNames(variant_res ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>
                                                                                                        {item.name}
                                                                                                    </span>
                                                                                                </div>
                    
                                                                                                {variant_res || active &&
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

                                                            <div className='mt-5'>

                                                                <div className='mb-3 text-[0.915rem] font-medium text-gray-900'>Sélectionner des options</div>

                                                                <div className='w-full h-52 overflow-y-auto'>

                                                                    {variant_res == null ?

                                                                        <div className='w-full h-full flex flex-row justify-center '>
                                                                            <div className='h-24 self-center'>
                                                                                <img src="../empty_svg.svg" className='h-full opacity-90' />
                                                                            </div>
                                                                        </div>
                                                                        :
                                                                        <div>
                                                                            <table className="min-w-full divide-y divide-gray-200 ">
                                                                                <thead className="bg-gray-100 sticky top-0 ">
                                                                                    <tr>
                                                                                        <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                                                            N#
                                                                                        </th>
                                                                                        
                                                                                        <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider" >
                                                                                            Valeur
                                                                                        </th>

                                                                                        <th scope="col" className="relative px-2 py-3 flex flex-row justify-end">
                                                                                            <div className="form-check mr-1">
                                                                                                <input type="checkbox" checked={checkedAll} onFocus={(e) =>  this.handleOption(e, null, true)} value="" className="form-check-input rounded-md appearance-none h-4 w-4 border border-purple-300 rounded-sm bg-white checked:bg-purple-600 checked:border-purple-600 text-purple-500 focus:outline-none focus:border-0 focus:ring-2 focus:ring-purple-500 transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"  />
                                                                                            </div>
                                                                                        </th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody className="bg-white divide-y divide-gray-200">
                                                                                    {variant_res.options.map((item, i) => (
                                                                                        <tr key={item.id} className={(i%2==0) ? "" : "bg-gray-100 bg-opacity-50"}>
                                                                                            <td className="px-6 py-3 whitespace-nowrap">
                                                                                                <div className="text-sm text-gray-900">{i+1}</div>
                                                                                            </td>
                                                                                            <td className="px-6 py-3 whitespace-nowrap">
                                                                                                <div className='flex flex-row'>
                                                                                                    {item.colorCode != null && item.colorCode != '' &&
                                                                                                        <div className="w-4 h-4 rounded-full border-2 border-gray-200 border-opacity-40 self-center mr-2" style={{backgroundColor: item.colorCode}}></div>
                                                                                                    }
                                                                                                    <div className="text-sm text-gray-900 self-center">{item.value}</div>
                                                                                                </div>
                                                                                            </td>
                                                                                            
                                                                                            <td className="px-2 py-3 whitespace-nowrap text-right flex flex-row justify-end">

                                                                                                <div className="form-check mr-1">
                                                                                                    <input type="checkbox" checked={item.selected} onFocus={(e) =>  this.handleOption(e, i)} value="" className="form-check-input rounded-md appearance-none h-4 w-4 border border-purple-300 rounded-sm bg-white checked:bg-purple-600 checked:border-purple-600 text-purple-500 focus:outline-none focus:border-0 focus:ring-2 focus:ring-purple-500 transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"  />
                                                                                                </div>

                                                                                            </td>
                                                                                        </tr>
                                                                                    ))}
                                                                                </tbody>
                                                                            </table>
                                                                        </div>

                                                                    }

                                                                </div>
                                                            </div>

                                                        </div>

                                                    </div>

                                                    <div className="px-3 py-2.5 bg-gray-50 sm:px-6 flex flex-row justify-end rounded-b-lg border-t border-gray-200 ">

                                                        <div onClick={(e) => this.closeModal(e, 'modal1')} className='bg-gray-500 bg-opacity-90 shadow-lg h-9 px-3 rounded-md flex flex-col justify-center btn-effect1 self-center mr-2'>
                                                            <button type="reset" className='text-[0.8rem] font-medium text-gray-100 hover:text-white self-center tracking-wide'>Annuler</button>
                                                        </div>
                            
                                                        <div className='ml-1.5 bg-purple-500 bg-opacity-90 shadow-lg h-9 px-4 rounded-md flex flex-col justify-center btn-effect1 self-center'>
                                                            <button type="submit" className='text-[0.8rem] font-medium text-gray-100 hover:text-white self-center tracking-wide'>Valider</button>
                                                        </div>

                                                    </div>

                                                </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition>


                <Transition appear show={this.state.modal2} as={Fragment}>
                    <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={(e) => this.setState({modal2: false})}>
                        <div className="">

                            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                                <Dialog.Overlay className="fixed inset-0" />
                            </Transition.Child>

                            {/* <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span> */}
                            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                                <div className="modal-width-3 overflow-y-auto flex flex-row justify-center">
                                    <div className='modal-content bg-white transition-all transform rounded-lg gt-shadow6 self-center my-8 mx-2'>
                                        <div className="w-full flex flex-row justify-center mt-2">
                                            <div className="w-full">
                                                <form role="form" method="post" onSubmit={(e) => this.saveVariant(e)}>

                                                <div className="" >

                                                    <div className="px-3 mt-1 mb-1 w-full text-center text-lg font-medium text-purple-500">Produits associés</div>

                                                    <div className="bg-white px-6 py-3">


                                                        <div className="w-full">

                                                            <div className='w-full h-10'>
                                                                <input type="search" className='w-full h-full px-4 focus:ring-0 text-sm border-0 bg-gray-200 bg-opacity-80 rounded-full' placeholder='Rechercher un nom, une description ou une catégorie ...' />
                                                            </div>

                                                            <div className='mt-5 w-full '>

                                                                <div className='mb-3 text-[0.915rem] font-medium text-gray-900'>Sélectionner des produits</div>

                                                                <div className='w-full h-[12.5rem] overflow-y-auto'>

                                                                    <div className="grid grid-cols-5 gap-5">

                                                                        {products.map((item, i) => (
                                                                            <div key={i}>
                                                                                <Product product={item} />
                                                                            </div>
                                                                        ))}

                                                                    </div>

                                                                </div>

                                                                <div className='w-full flex flex-row justify-end mt-5'>
                                                                    <Pagination
                                                                        initialPage={1} 
                                                                        itemsPerPage={5} 
                                                                        onPageСhange={(pageNumber) => console.log(pageNumber)} 
                                                                        totalItems={50}  
                                                                        pageNeighbours={2} 
                                                                        startLabel= {<DoubleChevronLeftIcon customClass="w-3 h-3"/>}
                                                                        endLabel={<DoubleChevronRightIcon customClass="w-3 h-3"/>}
                                                                        nextLabel={<ChevronRightIcon customClass="w-3 h-3"/>}
                                                                        prevLabel={<ChevronLeftIcon customClass="w-3 h-3"/>}
                                                                        customClassNames={{rpbItemClassName:'pg-btn', rpbItemClassNameActive:'pg-active-btn',}}
                                                                    />
                                                                </div>

                                                            </div>

                                                            <div className='mt-6 w-full h-[5.5rem] border-2 border-purple-500 rounded-xl shadow-inner'>

                                                                <div className='w-full h-full px-3 py-3 flex flex-row'>
                                                                    {products.map((item, i) => (
                                                                        <motion.div key={i} initial={{ opacity: 0, x: 300 + Math.random() * 15 }} whileInView={{ opacity: 1, x: 0, transition: { type: 'spring', stiffness: 195, damping: 20 }, }}>
                                                                            <div className='relative h-full'>
                                                                                <div className="product-image-2 h-full bg-gray-200 bg-opacity-90 rounded-xl mr-4 flex flex-row justify-center">
                                                                                    <div className='image-layer-2 max-h-[2.5rem] self-center'>
                                                                                        <img src={item.image} />
                                                                                    </div>
                                                                                </div>
                                                                                <div className='absolute -top-1.5 -left-1.5 w-4 h-4 bg-red-500 hover:bg-red-600 rounded-full flex flex-row justify-center shadow-sm'>
                                                                                    <CrossIcon customClass="w-1.5 h-1.5 text-white self-center" />
                                                                                </div>
                                                                            </div>
                                                                        </motion.div>
                                                                    ))}
                                                                </div>

                                                            </div>

                                                        </div>

                                                    </div>

                                                    <div className="px-3 py-2.5 bg-gray-50 sm:px-6 flex flex-row justify-end rounded-b-lg border-t border-gray-200 ">

                                                        <div onClick={(e) => this.closeModal(e, 'modal1')} className='bg-gray-500 bg-opacity-90 shadow-lg h-9 px-3 rounded-md flex flex-col justify-center btn-effect1 self-center mr-2'>
                                                            <button type="reset" className='text-[0.8rem] font-medium text-gray-100 hover:text-white self-center tracking-wide'>Annuler</button>
                                                        </div>
                            
                                                        <div className='ml-1.5 bg-purple-500 bg-opacity-90 shadow-lg h-9 px-4 rounded-md flex flex-col justify-center btn-effect1 self-center'>
                                                            <button type="submit" className='text-[0.8rem] font-medium text-gray-100 hover:text-white self-center tracking-wide'>Valider</button>
                                                        </div>

                                                    </div>

                                                </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition>
        
        
            </div>
        )
    }

}

export default Index;

