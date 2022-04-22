import React, { Component, Fragment } from 'react';
import Link from 'next/link'
import { motion, AnimatePresence  } from "framer-motion";
import Header from '../../components/common/header'
import Sidebar from '../../components/common/sidebar'
import HeadInfo from '../../components/common/headinfo'
import ArrowLeftBoldIcon from '../../components/ui/icons/arrowLeftBoldIcon';
import InfoBoldIcon from '../../components/ui/icons/infoBoldIcon';
import { allProducts } from '../../hooks/product';
import { saveCategory, getCategory} from '../../hooks/category';
import router from 'next/router'
import BlockUI from '../../components/common/blockui';
import toast, { Toaster } from 'react-hot-toast';
import { Listbox, Combobox, Dialog, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import CrossIcon from '../../components/ui/icons/crossIcon';
import { classNames } from '../../libs/util';
import { Switch } from '@headlessui/react'
import { capitalize } from '../../libs/util';
import TrashIcon from '../../components/ui/icons/trashIcon';
import { allShippingMethods, getShippingMethods } from '../../hooks/shippingMethod';
import { allPaymentMethods } from '../../hooks/paymentMethod';
import { Pagination } from "react-pagination-bar"
import 'react-pagination-bar/dist/index.css'
import ChevronLeftIcon from '../../components/ui/icons/chevronLeftIcon';
import ChevronRightIcon from '../../components/ui/icons/chevronRightIcon';
import DoubleChevronLeftIcon from '../../components/ui/icons/doubleChevronLeftIcon';
import DoubleChevronRightIcon from '../../components/ui/icons/doubleChevronRightIcon';
import TrashBoldIcon from '../../components/ui/icons/trashBoldIcon'
import { useDebouncedCallback } from 'use-debounce';
import { debounce } from 'lodash';
import { allClients } from '../../hooks/client';
import CaretUpIcon from '../../components/ui/icons/caretUpIcon';
import CaretDownIcon from '../../components/ui/icons/caretDownIcon';


export async function getServerSideProps(context) {
    return {
      props: {},
    }
}

var toastOne ;


class Index extends Component {

    constructor(props){
        super(props);
        this.state = { block: false, block2: false, id:null, firstname: '', lastname: '', email:'', phonenumber: '', addresses: [], selectedAddress: null, filteredClients: [], selectedClient:null, query: '', discount: 0, shippingMethods: [], shippingMethod: null, paymentMethods: [], paymentMethod: null, clients: [], products: [], chosenProducts: [], chosenProduct: null, chosenRow: null, optionList: [], opened: false, opened2: false, page: 1, take: 5, filter:'', orderBy: {"id": 'asc'}  };
        this.checkInput = this.checkInput.bind(this)
        this.saveItem = this.saveItem.bind(this)
        this.choseClient = this.choseClient.bind(this)
        this.getShippingMethods = this.getShippingMethods.bind(this)
        this.getPaymentMethods = this.getPaymentMethods.bind(this)
        this.getClients = this.getClients.bind(this)
        this.getProducts = this.getProducts.bind(this)
        this.refetch = this.refetch.bind(this)
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.handleBasket = this.handleBasket.bind(this)
        this.handleQuanity = this.handleQuanity.bind(this)
        this.handleOption = this.handleOption.bind(this);
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
        this.getShippingMethods()
        this.getPaymentMethods()
        this.getProducts()
        this.getClients('')
    }

    getShippingMethods = async() =>{
        this.setState({block: true})
        const shippingMethodFields = {"shippingMethodName": true}
        var {response} = await allShippingMethods(shippingMethodFields)
        if(response){
            this.setState({shippingMethods: response.shippingMethods})
        }
    }

    getPaymentMethods = async() =>{
        this.setState({block: true})
        const paymentMethodFields = {"paymentMethodName": true}
        var {response} = await allPaymentMethods(paymentMethodFields)
        if(response){
            this.setState({paymentMethods: response.paymentMethods})
        }
    }

    getClients = debounce(
        async (filter ) => {
            if(filter == '') this.setState({selectedClient: null})
            let orderClient = {"firstname": 'asc'}
            const clientFields = {"userFirstname": true, "userLastname": true, "userEmail": true, "userPhonenumber": true, "userImage": true, "imageUrl": true, "userDistricts": true, "userDistrictLine1": true, "userDistrictLine2": true }
            var {response} = await allClients(0, 12, filter, orderClient, clientFields)
            if(response) this.setState({filteredClients: response.users})
       },695
   );

    getProducts = async() => {
        const{page, take, filter, orderBy} = this.state
        const productFields = {"productName": true, "productUnit": true, "productUnitprice": true, "productActivated": true, "productBrand": true, "productBrandName": true, "productCategory": true, "productCategoryName": true, "productImage": true, "imageUrl": true, "productVariants": true, "productVariantName": true, "productOptions": true, "productOptionValue": true, "productOptionColorCode": true, "productOptionVariantId": true, "productOptionVariant": true, "productOptionVariantName": true}
        var {response} = await allProducts(page, take, filter, orderBy, productFields)
        if(response){
            const {chosenProducts} = this.state
            if(chosenProducts != null && chosenProducts.length >0){
                for(let i=0; i<chosenProducts.length; i++){
                    for(let j=0; j< response?.products?.length; j++){
                        if(chosenProducts[i].id == response.products[j].id ){
                            response.products[j].selected = true
                        }
                    }
                }
            }
            this.setState({products: response, block: false, block2: false})
        }
    }

    refetch = debounce(
         (newPage, newFilter = null, newOrder = null ) => {
            this.setState({block2: true})
            if(newPage != null && newPage != this.state.page) this.setState({page: newPage}) 
            if(newFilter != null) this.setState({filter: newFilter})
            if(newOrder != null) this.setState({filter: newOrder})
            this.getProducts()         
        },695
    );

    handleBasket = (e, product, index = null) => {

        e.preventDefault()

        const {chosenProducts, products} = this.state

        var new_products = products
        var new_chosen_products = chosenProducts

        if(index == null){

            var founded = false

            for(let i = 0; i< new_chosen_products.length; i++){
                if(new_chosen_products[i].id == product.id){
                    new_chosen_products.splice(i, 1)
                    this.getProducts()
                    founded = true
                    break
                }
            }

            if(founded == false){
                product.quantity = 1

                if(product.variants?.length > 0){
                    var rows = {}
                    var chosenOptions = []
                    for(let i = 0; i< product.variants.length; i++){
                        let data = {"variantId": product.variants[i].variant.id , "variantName": product.variants[i].variant.name, "optionId": null, "value": null, "colorCode": null}
                        chosenOptions.push(data)
                    }
                    rows.chosenOptions = chosenOptions
                    product.rows = []
                    product.rows.push(rows)
                }

                new_chosen_products.push(product)
                new_products.products.find(item => item.id == product.id).selected = true
            }

        }
        else{
            new_chosen_products.splice(index, 1)
            this.getProducts()
        }

        this.setState({chosenProducts: new_chosen_products, products: new_products});
    }

    handleQuanity = (e,index, action, index2 = null) =>{

        e.preventDefault()
        const {chosenProducts} = this.state
        var new_chosen_products = chosenProducts

        if(action == 'plus'){  
            
            new_chosen_products[index].quantity += 1
            
            if(new_chosen_products[index].variants?.length > 0){
                var rows = {}
                var chosenOptions = []
                for(let i = 0; i< new_chosen_products[index].variants.length; i++){
                    let data = {"variantId": new_chosen_products[index].variants[i].variant.id , "variantName": new_chosen_products[index].variants[i].variant.name, "optionId": null, "value": null, "colorCode": null}
                    chosenOptions.push(data)
                }
                rows.chosenOptions = chosenOptions
                new_chosen_products[index].rows.push(rows)
            }

        } 

        if(action == 'minus' && new_chosen_products[index].quantity >= 2 ) new_chosen_products[index].quantity -= 1 

        if(action == 'minus_option' && new_chosen_products[index].rows.length >= 2){
            new_chosen_products[index].quantity -= 1
            new_chosen_products[index].rows.splice(index2, 1)
        } 

        this.setState({chosenProducts: new_chosen_products});

    }

    handleOption = (e, index, row, variantId = null, optionId = null, value = null, colorCode=null) =>{
        e.preventDefault();
        const {chosenProducts, chosenProduct} = this.state
        var products = chosenProducts
        var product = chosenProduct

        if(variantId == null){
            let p = chosenProducts[index]
            this.setState({chosenProduct: p, chosenRow: row, opened2: true})
            console.log("The chosen product => ", p, row)
        }
        else{
            console.log("variantId optionId value and colorCode => ", variantId, optionId, value, colorCode)
            product.rows[this.state.chosenRow].chosenOptions.find(item => item.variantId == variantId).optionId = optionId
            product.rows[this.state.chosenRow].chosenOptions.find(item => item.variantId == variantId).value = value
            product.rows[this.state.chosenRow].chosenOptions.find(item => item.variantId == variantId).colorCode = colorCode
            
            products.find(item => item.id == product.id).rows = product.rows

            this.setState({chosenProducts: products, opened2: false})
            toast.success("Option ajoutée !")
        }
    }

    choseClient = (e) =>{
        this.setState({selectedClient:e, firstname: e.firstname, lastname: e.lastname, email: e.email, phonenumber: e.phonenumber, addresses: e.districts})
        console.log("dis ", e.districts)
    }

    closeModal = (e) => {
        e.preventDefault();
        this.setState({ opened: false });
    }

    openModal = (e) => {
        e.preventDefault();
        this.setState({ opened: true});
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

        // const {id, name, desc, order, activated, parent} = this.state

        // var {response } = await saveCategory(id, name, desc, order, activated, parent?.id)

        // if(response?.__typename == 'Category'){
        //     this.handleUpload(response?.id)
        // }
        // else if(response?.__typename == 'InputError'){
        //     toast.dismiss()
        //     toast.error(response?.message, {id: toastOne,});
        //     this.setState({block: false})
        // }
        // else{
        //     toast.error("Erreur inconnue. Veuillez vérifier votre connexion internet.", {id: toastOne,});
        // }

    };

   

    render() {

        const {filteredClients, selectedClient, addresses, selectedAddress,  shippingMethods, shippingMethod, paymentMethods, paymentMethod, products, chosenProducts, chosenProduct} = this.state

        let class_type_1 = "mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 focus:border-0 focus:ring-2 focus:ring-purple-500 shadow-inner bg-white bg-opacity-90 rounded-md px-2"
        let class_type_2 = "mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 focus:border-0 focus:ring-0 focus:border focus:border-gray-400 shadow-inner bg-gray-50 bg-opacity-95 rounded-md px-2"


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
        
                                        <div className='text-lg font-semibold text-purple-600'>Gestion des commandes</div>
        
                                        <div></div>
        
                                    </div>
        
                                    <div className='app-form overflow-y-auto mt-3 px-5'>

                                        <div className='text-base font-semibold text-purple-600 mt-4 mb-3 ml-1'>Informations générales</div>

                                        <div className='w-full grid grid-cols-3 grid-flow-row gap-6 bg-gray-200 bg-opacity-80 rounded-xl px-5 py-7'>
                                            
                                            <div className=''>
                                                <Listbox value={shippingMethod} onChange={(e) => this.setState({shippingMethod: e})}>
                                                    {({ open }) => (
                                                        <>
                                                        <Listbox.Label className="block text-sm font-medium text-gray-900">Mode de livraison <span className='font-bold text-purple-600'>*</span></Listbox.Label>
                                                        <div className="mt-1 relative">
                                                            <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-[0.525rem] text-left cursor-default focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm">
                                                                <span className="flex items-center w-10/12 truncate">
                                                                    <span className="ml-3 block truncate">{shippingMethod ? capitalize(shippingMethod.name) : 'Mode de livraison'}</span>
                                                                </span>
                                                                <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                                    <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                </span>
                                                            </Listbox.Button>

                                                            <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                                                <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                                                    {shippingMethods.map((item) => (
                                                                    <Listbox.Option key={item.id} className={({ active }) => classNames(active ? 'text-white bg-purple-600' : 'text-gray-900','cursor-pointer select-none relative py-2 pl-3 pr-9')} value={item}>
                                                                        {({ shippingMethod, active }) => (
                                                                        <>
                                                                            <div className="flex items-center w-10/12 truncate">
                                                                                <span className={classNames(shippingMethod ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>
                                                                                    {capitalize(item.name)}
                                                                                </span>
                                                                            </div>

                                                                            {shippingMethod || active &&
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
                                                <Listbox value={paymentMethod} onChange={(e) => this.setState({paymentMethod: e})}>
                                                    {({ open }) => (
                                                        <>
                                                        <Listbox.Label className="block text-sm font-medium text-gray-900">Mode de paiement <span className='font-bold text-purple-600'>*</span></Listbox.Label>
                                                        <div className="mt-1 relative">
                                                            <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-[0.525rem] text-left cursor-default focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm">
                                                                <span className="flex items-center w-10/12 truncate">
                                                                    <span className="ml-3 block truncate">{paymentMethod ? capitalize(paymentMethod.name) : 'Mode de paiement'}</span>
                                                                </span>
                                                                <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                                    <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                </span>
                                                            </Listbox.Button>

                                                            <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                                                <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                                                    {paymentMethods.map((item) => (
                                                                    <Listbox.Option key={item.id} className={({ active }) => classNames(active ? 'text-white bg-purple-600' : 'text-gray-900','cursor-pointer select-none relative py-2 pl-3 pr-9')} value={item}>
                                                                        {({ paymentMethod, active }) => (
                                                                        <>
                                                                            <div className="flex items-center w-10/12 truncate">
                                                                                <span className={classNames(paymentMethod ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>
                                                                                    {capitalize(item.name)}
                                                                                </span>
                                                                            </div>

                                                                            {paymentMethod || active &&
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

                                            <div className="">
                                                <label htmlFor="discount" className="block text-sm font-medium text-gray-900">Remise (en %) </label>
                                                <input type="number" value={this.state.discount} onChange={(e) => this.setState({discount:e.target.value }) }  name="discount" id="discount" autoComplete="discount" placeholder="Remise" className="mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 focus:border-0 focus:ring-2 focus:ring-purple-500 shadow-inner bg-white bg-opacity-90 rounded-md px-2"/>
                                            </div>

                                        </div>

                                        <div className='divider w-full h-[1px] bg-gray-400 bg-opacity-30 mt-8 mb-4'></div>
                                        <div className='text-base font-semibold text-purple-600 mt-4 mb-3 ml-1'>Informations du client</div>
        
                                        <div className='w-full grid grid-cols-3 grid-flow-row gap-6 bg-gray-200 bg-opacity-80 rounded-xl px-5 py-5'>

                                            <div className="col-span-3 mb-2">
                                                <label htmlFor="client" className="block text-sm font-medium text-gray-900">Choisir un client</label>
                                                <Combobox value={selectedClient} onChange={(e) => this.choseClient(e)}>
                                                    <div className="relative mt-1">
                                                        <div className="relative w-full text-left bg-white rounded-md shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-purple-300 focus-visible:ring-offset-2 sm:text-sm overflow-hidden">
                                                            <Combobox.Input displayValue={(person) => person != null ? person.firstname + ' ' + person.lastname : ''} onChange={(e) => this.getClients(e.target.value)} className="w-full rounded-md border border-gray-400 focus:border-2 focus:border-purple-500 py-[0.535rem] px-3 text-sm leading-5 text-gray-900" placeholder="Rechercher un prénom, nom ou adresse email"/>
                                                            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                                                <SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                                                            </Combobox.Button>
                                                        </div>
                                                        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0" >
                                                            <Combobox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-64 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                                {filteredClients.length === 0 ? (
                                                                    <div className="cursor-default select-none relative py-2 px-3 text-gray-700">
                                                                        Aucun client ne correspond à votre recherche.
                                                                    </div>
                                                                ) : (
                                                                    filteredClients.map((person) => (
                                                                        <Combobox.Option key={person.id} className={({ active }) => `cursor-default select-none relative py-2 px-4 ${active ? 'text-white bg-purple-600' : 'text-gray-900'}`} value={person}>
                                                                            {({ selectedClient, active }) => (
                                                                                <div className='w-full flex flex-row justify-between'>

                                                                                    <div className='flex flex-row self-center'>

                                                                                        <div className='w-8 h-8 rounded-full bg-gray-500 self-center mr-3'>
                                                                                            <img className='w-full h-full rounded-full' src={person?.image?.url == null ? '../images/avatar2.jpg': item?.image?.url} />
                                                                                        </div>

                                                                                        <div className='self-center'>
                                                                                            <span className={`block truncate ${ selectedClient ? 'font-medium' : 'font-normal'}`}>
                                                                                                {person.firstname + ' ' + person.lastname }
                                                                                            </span>
                                                                                        </div>

                                                                                    </div>
                                                                                    
                                                                                    <div className='self-center'>
                                                                                        {selectedClient || active ? (
                                                                                            <span className={`${active ? 'text-white' : 'text-purple-600'}`}>
                                                                                                <CheckIcon className="w-5 h-5" aria-hidden="true" />
                                                                                            </span>
                                                                                        ) : null}
                                                                                    </div>

                                                                                </div>
                                                                            )}
                                                                        </Combobox.Option>
                                                                    ))
                                                                )}
                                                            </Combobox.Options>
                                                        </Transition>
                                                    </div>
                                                </Combobox>
                                            </div>

                
                                            <div className="mb-3">
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-900">Prénom <span className='font-bold text-purple-600'>*</span></label>
                                                <input type="text" readOnly={selectedClient != null} value={this.state.firstname} onChange={(e) => this.setState({firstname:e.target.value }) }  name="firstname" id="firstname" autoComplete="firstname" placeholder="" className={selectedClient != null ? class_type_2 : class_type_1}/>
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="order" className="block text-sm font-medium text-gray-900">Nom <span className='font-bold text-purple-600'>*</span></label>
                                                <input type="text" readOnly={selectedClient != null} value={this.state.lastname} onChange={(e) => this.setState({lastname:e.target.value }) }  name="lastname" id="lastname" autoComplete="lastname" placeholder="" className={selectedClient != null ? class_type_2 : class_type_1}/>
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="order" className="block text-sm font-medium text-gray-900">Adresse email <span className='font-bold text-purple-600'>*</span></label>
                                                <input type="text" readOnly={selectedClient != null} value={this.state.email} onChange={(e) => this.setState({email:e.target.value }) }  name="email" id="email" autoComplete="email" placeholder="" className={selectedClient != null ? class_type_2 : class_type_1}/>
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="order" className="block text-sm font-medium text-gray-900">Téléphone <span className='font-bold text-purple-600'>*</span></label>
                                                <input type="text" readOnly={selectedClient != null} value={this.state.phonenumber} onChange={(e) => this.setState({phonenumber:e.target.value }) }  name="phonenumber" id="phonenumber" autoComplete="phonenumber" placeholder="" className={selectedClient != null ? class_type_2 : class_type_1}/>
                                            </div>

                                            {!selectedClient &&
                                                <div className="mb-3">
                                                    <label htmlFor="order" className="block text-sm font-medium text-gray-900">Adresse</label>
                                                    <input type="text"  name="phonenumber" id="phonenumber" autoComplete="phonenumber" placeholder="" className="mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 focus:border-0 focus:ring-2 focus:ring-purple-500 shadow-inner bg-white bg-opacity-90 rounded-md px-2"/>
                                                </div>
                                            }

                                            {selectedClient &&
                                                <div className='mb-3'>
                                                    <Listbox value={selectedAddress} onChange={(e) => this.setState({selectedAddress: e})}>
                                                        {({ open }) => (
                                                            <>
                                                            <Listbox.Label className="block text-sm font-medium text-gray-900">Adresse <span className='font-bold text-purple-600'>*</span></Listbox.Label>
                                                            <div className="mt-1 relative">
                                                                <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-[0.525rem] text-left cursor-default focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm">
                                                                    <span className="flex items-center">
                                                                        <span className="ml-3 block truncate">{selectedAddress ? capitalize(selectedAddress?.line1 +' '+selectedAddress?.line2) : 'Adresse du client'}</span>
                                                                    </span>
                                                                    <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                                        <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                    </span>
                                                                </Listbox.Button>

                                                                <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                                                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                                                        {addresses.map((item) => (
                                                                        <Listbox.Option key={item.districtId} className={({ active }) => classNames(active ? 'text-white bg-purple-600' : 'text-gray-900','cursor-pointer select-none relative py-2 pl-3 pr-9')} value={item}>
                                                                            {({ selectedAddress, active }) => (
                                                                            <>
                                                                                <div className="flex items-center w-10/12 truncate">
                                                                                    <span className={classNames(selectedAddress ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>
                                                                                        {capitalize(item?.line1 +' '+item?.line2)}
                                                                                    </span>
                                                                                </div>

                                                                                {selectedAddress || active &&
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
                                            }
                                            
                                        </div>

                                        <div className='divider w-full h-[1px] bg-gray-400 bg-opacity-30 mt-8 mb-4'></div>
                                        <div className='mb-3 ml-0.5 flex flex-row px-3'>
                                            <div className='text-base font-semibold text-purple-600 mr-1 self-center'>Panier et Récapitulatif</div>
                                        </div>

                                        <div className='w-full grid grid-cols-10 grid-flow-row gap-4'>

                                            <div className='col-span-3 pl-2'>
                                                <div className='flex flex-row'>
                                                    <div className='self-center -mb-1 mr-2'><InfoBoldIcon customClass="w-4 h-4 text-gray-700"/></div>
                                                    <div className='self-center text-lg font-semibold text-gray-800 '>Conseils</div>
                                                </div>
                                                <div className='text-[13px] font-normal text-gray-800 mt-3 pl-5'>
                                                    <ul className="list-disc">
                                                        <li className='mb-2'>lorem ipsum dolor sit amet consectetur adipiscing elit</li>
                                                        <li className='mb-2'>Sed aliquet ac sem sed porttitor</li>
                                                        <li className=''>Curabitur at mauris imperdiet, feugiat risus vitae, pellentesque augue</li>
                                                    </ul>  
                                                </div>
                                            </div>
                                            
                                            <div className="col-span-4 bg-gray-200 bg-opacity-80 rounded-xl py-5">

                                                <div className='mb-3 px-4 flex flex-row'>
                                                    <div className='text-base font-medium text-purple-600 mr-1 self-center'>Panier</div>
                                                    {chosenProducts?.length > 0 && <div className='px-2 py-[0.45px] text-[10.325px] font-medium bg-gradient-to-r from-purple-700 to-purple-300 text-white rounded-xl self-center'>{chosenProducts?.length}</div>}
                                                </div>

                                                <div className='w-full h-[18rem] overflow-y-auto px-5'>
                                                    {chosenProducts?.length == 0 ?

                                                        <div className='w-full h-full flex flex-row justify-center '>
                                                            <div className='h-24 self-center'>
                                                                <img src="../empty_svg.svg" className='h-full opacity-90' />
                                                            </div>
                                                        </div>
                                                        :
                                                        <div className='w-full'>

                                                          {chosenProducts.map((item, i) => (
                                                            <AnimatePresence  key={i}>
                                                                <motion.div initial={{ opacity: 0, y: ( Math.random() * 15) }} whileInView={{ opacity: 1, y: 0, transition: { duration: 0.85 }, }}>
                                                                   
                                                                    <div className='w-full bg-white bg-opacity-90 rounded-xl overflow-x-hidden px-4 py-3 mb-4 shadow-sm'>

                                                                        <div className='flex flex-row justify-between'>

                                                                            <div className='flex flex-row w-full'>

                                                                                <div className='item-image-1 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full border-opacity-80 self-center mr-4' >
                                                                                    <div className='image-layer-2 rounded-full'>
                                                                                        <div className='image-layer-3'><img src={item?.images[0].url}  /></div>
                                                                                    </div>
                                                                                </div>

                                                                                <div className='self-center w-8/12'>
                                                                                    <div className='text-sm font-semibold text-gray-900 w-full truncate'>{capitalize(item.name)}</div>
                                                                                    <div className='mt-0.5 text-xs font-normal text-gray-500 w-full truncate'>{capitalize(item.category.name)}</div>
                                                                                </div>

                                                                            </div>

                                                                            <div className="self-center">
                                                                                <button onClick={(e) => this.handleBasket(e, null, i)} className="w-6 h-6 rounded-full border border-iiblack gt-shadow5 flex flex-row justify-center cursor-pointer btn-effect1 bg-gray-100 hover:bg-gray-200 active:bg-gray-30">
                                                                                    <TrashBoldIcon customClass="w-[0.75rem] text-red-600 text-opacity-90 self-center"/>
                                                                                </button>
                                                                            </div>

                                                                        </div>

                                                                        <div className='mt-4 mb-5 flex flex-row justify-between px-1'>

                                                                            <div className='text-[0.8rem] font-semibold self-center text-left w-32 truncate'>{new Intl.NumberFormat('fr-FR', {style: 'currency', currency:'XOF'}).format(item.unitprice)}</div>

                                                                            <div className="h-5 flex flex-row self-center">
                                                                                <div onClick={(e) => this.handleQuanity(e, i, 'minus')} className="h-full w-5 flex flex-row justify-center bg-gray-900 border border-gray-800 rounded-md gt-shadow1 btn-effect1 cursor-pointer mr-1">
                                                                                    <div className="self-center text-base font-semibold text-gray-100 -mt-1">-</div>
                                                                                </div>
                                                                                <div className="h-full w-12 h-5 border border-gray-500 truncate text-xs font-medium text-center self-center">{item.quantity}</div>
                                                                                <div onClick={(e) => this.handleQuanity(e, i, 'plus')} className="h-full w-5 flex flex-row justify-center bg-gray-900 border border-gray-800 rounded-md gt-shadow1 btn-effect1 cursor-pointer ml-1">
                                                                                    <div className="self-center text-base font-semibold text-gray-100 -mt-1">+</div>
                                                                                </div>
                                                                            </div>

                                                                            <div className='text-[0.8rem] font-semibold self-center text-right w-32 truncate'>{new Intl.NumberFormat('fr-FR', {style: 'currency', currency:'XOF'}).format(item.unitprice * item.quantity)}</div>

                                                                        </div>

                                                                        {item.rows?.map((item2, i2) => (
                                                                            <AnimatePresence key={i}>
                                                                                <motion.div initial={{ opacity: 0, x: 300 + Math.random() * i * 15 }} whileInView={{ opacity: 1, x: 0, transition: { type: 'spring', stiffness: 195, damping: 20 }, }} exit={{ opacity: 0}}>
                                                                                    <div key={i2} className='w-full flex flex-row justify-between mb-3'>

                                                                                        <div className='flex flex-row justify-center w-5 h-5 rounded-full bg-gradient-to-r from-gray-300 to-gray-100 self-center mr-1'>
                                                                                            <div className='text-[9.5px] font-medium text-gray-900 self-center'>{i2+1}</div>
                                                                                        </div>

                                                                                        <div className='w-8/12 flex flex-row flex-wrap self-center'>
                                                                                            {item2.chosenOptions?.map((item3, i3) => (
                                                                                                <div key={i3} className='flex flex-row self-center mr-4'>
                                                                                                    <div className='text-[12.5px] font-semibold text-gray-900 self-center mr-2.5'>{capitalize(item3.variantName)} : </div>
                                                                                                    {item3.value == null &&
                                                                                                        <div onClick={(e) => this.handleOption(e, i, i2)}  className='w-5 h-5 rounded-full bg-purple-600 shadow-lg flex flex-row justify-center btn-effect1 cursor-pointer self-center'>
                                                                                                            <div className='text-[10px] font-semibold text-gray-50 self-center -mt-0.5'>+</div>
                                                                                                        </div>
                                                                                                    }
                                                                                                    {item3.value != null &&
                                                                                                        <div onClick={(e) => this.handleOption(e, i, i2)} className='text-[12px] font-semibold text-gray-600 hover:text-purple-600 btn-effect1 underline'>{capitalize(item3.value)}</div>
                                                                                                    }
                                                                                                </div>
                                                                                            ))}
                                                                                            {/* <div className='w-8 h-3'>
                                                                                                <input type="number" className='w-full h-full border border-gray-400' />
                                                                                            </div> */}
                                                                                            <div className='flex flex-row self-center'>
                                                                                                <div className='text-[12.5px] font-semibold text-gray-900 self-center mr-1'>Quantité :  1 </div>
                                                                                                <div className='flex flex-col justify-center self-center'>
                                                                                                    <div className='w-4 h-4 text-black -mb-[0.22rem] btn-effect1 cursor-pointer '><CaretUpIcon  customClass="w-full h-full" /></div>
                                                                                                    <div className='w-4 h-4 text-black -mt-[0.22rem] btn-effect1 cursor-pointer '><CaretDownIcon  customClass="w-full h-full" /></div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className='ml-1 w-5'>
                                                                                            {i2 > 0 &&
                                                                                                <div onClick={(e) => this.handleQuanity(e, i, 'minus_option', i2 )} className='flex flex-row justify-center w-5 h-5 rounded-full bg-gradient-to-r from-red-500 to-red-400 cursor-pointer hover:from-red-700 hover:to-red-600 self-center'>
                                                                                                    <CrossIcon customClass="w-2 h-2 text-white font-medium self-center" />
                                                                                                </div>
                                                                                            }
                                                                                        </div>

                                                                                    </div> 
                                                                                </motion.div>
                                                                            </AnimatePresence>
                                                                            
                                                                        ))}


                                                                

                                                                    </div>
                                                                </motion.div>
                                                            </AnimatePresence>
                                                           
                                                          ))}
                         
                                                        </div>

                                                    }
                                                </div>
                                                <div onClick={(e) => this.openModal(e)} className='mt-3 bg-black bg-opacity-80 shadow-lg h-10 px-5 rounded-md flex flex-col justify-center btn-effect1 self-center mx-5'>
                                                    <div className='text-sm font-medium text-gray-100 hover:text-white self-center tracking-wide'>Ajouter des produits</div>
                                                </div>
                                            </div>

                                            <div className="col-span-3 bg-gray-200 bg-opacity-80 rounded-xl px-5 py-5 flex flex-col justify-between ">

                                                <div>

                                                    <div className='text-base font-medium text-purple-600 ml-0.5 mb-4'>Récapitulatif</div>

                                                    <div className='text-sm font-medium flex flex-row justify-between mb-3 bg-white bg-opacity-90 px-2 py-2'>
                                                        <div className='text-gray-800'>Sous total</div>
                                                        <div className='text-gray-900  text-xs self-center'>7500 CFA</div>
                                                    </div>

                                                    <div className='text-sm font-medium flex flex-row justify-between mb-3 bg-white bg-opacity-90 px-2 py-2'>
                                                        <div className='text-gray-800'>Livraison</div>
                                                        <div className='text-gray-900  text-xs self-center'>500 CFA</div>
                                                    </div>

                                                    <div className='text-sm font-medium flex flex-row justify-between mb-3 bg-white bg-opacity-90 px-2 py-2'>
                                                        <div className='text-gray-800'>Remise</div>
                                                        <div className='text-gray-900  text-xs self-center'>- 250 CFA</div>
                                                    </div>

                                                    <div className='text-sm font-medium flex flex-row justify-between mb-3 bg-white bg-opacity-90 px-2 py-2'>
                                                        <div className='text-gray-800'>Taxe</div>
                                                        <div className='text-gray-900  text-xs self-center'>0 CFA</div>
                                                    </div>

                                                </div>
                                               
                                                <div className='border-t border-gray-800 border-opacity-60 pt-4'>
                                                    <div className='w-full text-sm font-semibold flex flex-row justify-between bg-white bg-opacity-90 px-2 py-2 mb-0.5'>
                                                        <div className='text-gray-800'>Total</div>
                                                        <div className='text-gray-900 text-xs self-center'>7750 CFA</div>
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

                <Transition appear show={this.state.opened} as={Fragment}>
                    <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={(e) => this.setState({opened: false})}>
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
                                                <form role="form" method="post" onSubmit={(e) => this.closeModal(e)}>

                                                <div className="" >

                                                    <div className="px-3 mt-1 mb-1 w-full text-center text-lg font-medium text-purple-500">Liste des produits</div>

                                                    <div className="bg-white px-3 py-3">


                                                        <div className="w-full">
                                                            
                                                            <div className='w-full px-3'>

                                                                <div className='w-full h-10 mb-2'>
                                                                    <input type="text" onChange={(e) => this.refetch(null, e.target.value) } className='w-full h-full px-4 focus:ring-0 text-sm border-0 bg-gray-200 bg-opacity-80 rounded-full' placeholder='Rechercher un nom, une description ou une catégorie ...' />
                                                                </div>

                                                            </div>
                                                            

                                                            <div className='py-3 px-3 w-full relative'>
                                                            
                                                                {/* <BlockUI blocking={this.state.block2} /> */}

                                                                <div className='mb-3 text-[0.915rem] font-medium text-gray-900'>Sélectionner des produits</div>

                                                                <div className='w-full h-[12.5rem] overflow-y-auto'>
                                                                    {this.state.block2 == true &&
                                                                        <div className='w-full h-full flex flex-row justify-center self-center'>
                                                                            <div className='h-10 self-center'><img className='h-full' src="../spinner.gif" /></div>
                                                                        </div>                                                  
                                                                    }

                                                                    {this.state.block2 == false && products?.products != null &&
                                                                        <div className="grid grid-cols-5 gap-5">

                                                                            {products?.products?.map((item, i) => (
                                                                                <div key={i}>
                                                                                    <motion.div initial={{ opacity: 0, y: ( Math.random() * 15) }} whileInView={{ opacity: 1, y: 0, transition: { duration: 1.05 }, }}>
                                                                                        <div onClick={(e) => this.handleBasket(e, item)} className="w-full pt-1 pb-5 rounded-xl bg-gray-200 bg-opacity-80 cursor-pointer relative">
    
                                                                                            {item?.selected  &&
                                                                                                <div className="absolute top-[0.75rem] right-[0.75rem] w-5 h-5 bg-purple-600 rounded-full shadow-sm flex flex-row justify-center">
                                                                                                    <div className='w-3 h-3 text-white self-center'><CheckIcon className='w-full h-full'/></div>
                                                                                                </div>
                                                                                            }
                                                                                            
    
                                                                                            <div className='w-full image-layer-00 flex flex-row justify-center'>
                                                                                                <div className='image-layer-01 self-center'>
                                                                                                    <img src={item.images[0]?.url} />
                                                                                                </div>
                                                                                            </div>
    
                                                                                            <div className='w-full mt-2 px-3'>
                                                                                                <div className='w-full text-gray-500 text-[0.65rem] font-medium truncate'>{capitalize(item.category?.name)}</div>
                                                                                                <div className='w-full flex mt-1'>
                                                                                                    <div className='self-center w-full'>
                                                                                                        <div className='w-full text-gray-900 text-sm font-semibold truncate'>{item.name}</div>
                                                                                                        <div className='w-full text-gray-800 text-xs font-medium truncate mt-1'>{new Intl.NumberFormat('fr-FR', {style: 'currency', currency:'XOF'}).format(item.unitprice)}</div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
    
                                                                                        </div>
    
                                                                                    </motion.div>
                                                                                </div>
                                                                            ))}
    
                                                                        </div>                                               
                                                                    }
                                                                </div>

                                                                <div onClick={e => e.preventDefault()} className='w-full flex flex-row justify-end h-8 overflow-hidden mt-5'>
                                                                    {products?.count != null &&
                                                                        <Pagination
                                                                            initialPage={1} 
                                                                            itemsPerPage={this.state.take} 
                                                                            onPageСhange={(pageNumber) => pageNumber == this.state.page ? '' : this.refetch(pageNumber)} 
                                                                            totalItems={products?.count}  
                                                                            pageNeighbours={2} 
                                                                            startLabel= {<DoubleChevronLeftIcon customClass="w-3 h-3"/>}
                                                                            endLabel={<DoubleChevronRightIcon customClass="w-3 h-3"/>}
                                                                            nextLabel={<ChevronRightIcon customClass="w-3 h-3"/>}
                                                                            prevLabel={<ChevronLeftIcon customClass="w-3 h-3"/>}
                                                                            customClassNames={{rpbItemClassName:'pg-btn', rpbItemClassNameActive:'pg-active-btn',}}
                                                                        />
                                                                    }
                                                                    
                                                                </div>

                                                            </div>

                                                            <div className='w-full px-3'>

                                                                <div className='mt-3 w-full h-[5.25rem] border-2 border-gray-500 border-opacity-90 rounded-xl shadow-inner flex flex-col justify-center'>

                                                                    <div className='w-full px-3 self-center flex flex-row'>
                                                                        {chosenProducts.map((item, i) => (
                                                                            <AnimatePresence key={i}>
                                                                                <motion.div key={i} initial={{ opacity: 0, x: 300 + Math.random() * 15 }} whileInView={{ opacity: 1, x: 0, transition: { type: 'spring', stiffness: 195, damping: 20 }, }} exit={{ opacity: 0}}>
                                                                                    <div className='relative h-full'>
                                                                                        <div className='item-image-1 bg-gradient-to-r from-violet-600 to-purple-600 hover:scale-110 rounded-full border-opacity-80 self-center mr-4' >
                                                                                            <div className='image-layer-2 rounded-full'>
                                                                                                <div className='image-layer-3'><img src={item?.images[0].url}  /></div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div onClick={(e) => this.handleBasket(e, null, i)} className='absolute -top-0.5 -left-0.5 w-4 h-4 bg-red-500 hover:bg-red-600 rounded-full flex flex-row justify-center shadow-sm'>
                                                                                            <CrossIcon customClass="w-1.5 h-1.5 text-white self-center" />
                                                                                        </div>
                                                                                    </div>
                                                                                </motion.div>
                                                                            </AnimatePresence>
                                                                        ))}
                                                                    </div>

                                                                </div>

                                                            </div>

                                                            

                                                        </div>

                                                    </div>

                                                    <div className="px-3 py-2.5 bg-gray-50 sm:px-6 flex flex-row justify-end rounded-b-lg border-t border-gray-200 ">

                                                        {/* <div onClick={(e) => this.closeModal(e, 'modal1')} className='bg-gray-500 bg-opacity-90 shadow-lg h-9 px-3 rounded-md flex flex-col justify-center btn-effect1 self-center mr-2'>
                                                            <button type="reset" className='text-[0.8rem] font-medium text-gray-100 hover:text-white self-center tracking-wide'>Annuler</button>
                                                        </div> */}
                            
                                                        <div className='ml-1.5 bg-gray-900 bg-opacity-90 shadow-lg h-9 px-5 rounded-md flex flex-col justify-center btn-effect1 self-center'>
                                                            <button type="submit" className='text-[0.8rem] font-medium text-gray-100 hover:text-white self-center tracking-wide'>Terminer</button>
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

                <Transition appear show={this.state.opened2} as={Fragment}>
                    <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={(e) => this.setState({opened2: false})}>
                        <div className="">
                            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                                <Dialog.Overlay className="fixed inset-0" />
                            </Transition.Child>

                            {/* <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span> */}
                            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                                <div className="modal-width overflow-y-auto flex flex-row justify-center">
                                    <div className='modal-content bg-white transition-all transform rounded-lg gt-shadow6 self-center my-8 mx-2'>
                                        <div className="w-full flex flex-row justify-center mt-2">
                                            <div className="w-full">
                                                <form role="form" method="post" onSubmit={(e) => this.setState({opened2: false})}>

                                                <div className="" >

                                                    <div className="px-3 py-3 bg-white space-y-6 sm:p-6 z-10">

                                                        <div className="w-full text-left text-base font-semibold text-purple-600">Choisir une option :</div>

                                                        <div className="w-full flex flex-row mt-4">
                                                            {chosenProduct && chosenProduct.options.map((item, i) => (
                                                                <div key={i} className="">
                                                                    {!item?.option?.colorCode 
                                                                        ?<div onClick={(e) => this.handleOption(e, null, null, item?.option?.variantId, item?.option?.id, item?.option?.value, item?.option?.colorCode )} className={classNames(item?.option?.selected ? 'border-2 border-purple-600 bg-purple-600 text-white shadow shadow-purple-300' : 'bg-gray-50/50 border border-gray-600 text-gray-800', 'flex flex-row justify-center w-8 h-8 mr-3 rounded-md cursor-pointer self-center transition duration-500 ease-in-out ')}>
                                                                            <div className="self-center text-[10.5px] font-semibold">{item?.option?.value}</div>
                                                                        </div>
                                                                        :<div onClick={(e) => this.handleOption(e, null, null, item?.option?.variantId, item?.option?.id, item?.option?.value, item?.option?.colorCode )} className={classNames(item?.option.selected ? 'border-2 border-purple-600' : 'border-2 border-gray-200 border-opacity-60', 'w-8 h-8 mr-3 rounded-full cursor-pointer self-center py-[2px] px-[2px] transition duration-500 ease-in-out')}  >
                                                                            <div className='w-full h-full rounded-full' style={{backgroundColor: item?.option?.colorCode, }}></div>
                                                                        </div>
                                                                    }
                                                                </div>
                                                            ))}
                                                        </div>

                                                    </div>

                                                    <div className="px-3 py-2.5 bg-gray-50 sm:px-6 flex flex-row justify-end rounded-b-lg border-t border-gray-200 ">

                                                        <div className='ml-1.5 bg-gray-900 bg-opacity-90 shadow-lg h-9 px-5 rounded-md flex flex-col justify-center btn-effect1 self-center'>
                                                            <button type="submit" className='text-[0.8rem] font-medium text-gray-100 hover:text-white self-center tracking-wide'>Terminer</button>
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

