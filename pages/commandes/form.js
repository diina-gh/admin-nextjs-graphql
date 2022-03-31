import React, { Component, Fragment } from 'react';
import Link from 'next/link'
import { motion } from "framer-motion";
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

const people = [
  { id: 1, name: 'Wade Cooper' },
  { id: 2, name: 'Arlene Mccoy' },
  { id: 3, name: 'Devon Webb' },
  { id: 4, name: 'Tom Cook' },
  { id: 5, name: 'Tanya Fox' },
  { id: 6, name: 'Hellen Schmidt' },
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
        this.state = { block: false, block2: false, id:null, firstname: 'Seydina', lastname: 'GUEYE', email:'dina3903@gmail.com', phonenumber: '+221781234997', addresses: [], filteredClients: people, selectedClient:null, query: '', discount: 0, shippingMethods: [], shippingMethod: null, paymentMethods: [], paymentMethod: null, products: [], chosenProducts: [], opened: false, page: 1, take: 5, filter:'', orderBy: {"id": 'asc'}  };
        this.checkInput = this.checkInput.bind(this)
        this.saveItem = this.saveItem.bind(this)
        this.filterItems = this.filterItems.bind(this)
        this.getShippingMethods = this.getShippingMethods.bind(this)
        this.getPaymentMethods = this.getPaymentMethods.bind(this)
        this.getProducts = this.getProducts.bind(this)
        this.refetch = this.refetch.bind(this)
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
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
    }

    getShippingMethods = async() =>{
        this.setState({block: true})
        var {response} = await allShippingMethods()
        if(response){
            this.setState({shippingMethods: response.shippingMethods})
        }
    }

    getPaymentMethods = async() =>{
        this.setState({block: true})
        var {response} = await allPaymentMethods()
        if(response){
            this.setState({paymentMethods: response.paymentMethods})
        }
    }

    getProducts = async() => {
        const{page, take, filter, orderBy} = this.state
        var {response} = await allProducts(page, take, filter, orderBy)
        if(response){
            const {chosenProducts} = this.state
            if(chosenProducts != null && chosenProducts.length >0){
                for(let i=0; i<chosenProducts.length; i++){
                    response.products.find(item => item.id == chosenProducts[i].id).selected = true
                }
            }
            this.setState({products: response, block: false, block2: false})
        }
    }

    refetch = async (newPage, newFilter = null, newOrder = null ) =>{
        this.setState({block2: true})
        if(newPage != null) this.setState({page: newPage}) 
        if(newFilter != null) this.setState({filter: newFilter})
        if(newOrder != null) this.setState({filter: newOrder})
        setTimeout(() => { this.getProducts() }, 250);
    }

    filterItems = (e) =>{
        e.preventDefault()
        this.setState({query: e.target.value})
        const {query} = this.state
        this.setState({filteredClients: query === '' ? people : people.filter((person) => person.name.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))) })
        if(query == '') this.setState({selectedClient: null})
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

   

    render() {

        const {filteredClients, selectedClient, query,  shippingMethods, shippingMethod, paymentMethods, paymentMethod, products, chosenProducts} = this.state

        let class_type_1 = "mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 focus:border-0 focus:ring-2 focus:ring-purple-500 shadow-inner bg-white bg-opacity-90 rounded-md px-2"
        let class_type_2 = "mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 focus:border-0 focus:ring-0 focus:border focus:border-gray-400 shadow-inner bg-gray-50 bg-opacity-95 rounded-md px-2"


        return(
            <div className="app-container h-screen">
                <Toaster position='top-right' />
                <HeadInfo title= 'Dashboard' description='description here'/>
                <Header/>
        
                <div className='w-full overflow-x-auto px-3 py-3 md:px-6 md:py-5 flex flex-row justify-between'>
        
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
                                                                <span className="flex items-center">
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
                                                                            <div className="flex items-center">
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
                                                                <span className="flex items-center">
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
                                                                            <div className="flex items-center">
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
                                                <Combobox value={selectedClient} onChange={(e) => this.setState({selectedClient: e})}>
                                                    <div className="relative mt-1">
                                                        <div className="relative w-full text-left bg-white rounded-md shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-purple-300 focus-visible:ring-offset-2 sm:text-sm overflow-hidden">
                                                            <Combobox.Input displayValue={(person) => person != null ? person.name : ''} onChange={(e) => this.filterItems(e)} className="w-full rounded-md border border-gray-400 focus:border-2 focus:border-purple-500 py-[0.535rem] px-3 text-sm leading-5 text-gray-900" placeholder="Rechercher un prénom, nom ou adresse email"/>
                                                            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                                                <SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                                                            </Combobox.Button>
                                                        </div>
                                                        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0" afterLeave={() => this.setState({query: ''})}>
                                                            <Combobox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-64 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                                {filteredClients.length === 0 && query !== '' ? (
                                                                    <div className="cursor-default select-none relative py-2 px-3 text-gray-700">
                                                                        Nothing found.
                                                                    </div>
                                                                ) : (
                                                                    filteredClients.map((person) => (
                                                                        <Combobox.Option key={person.id} className={({ active }) => `cursor-default select-none relative py-2 px-4 ${active ? 'text-white bg-purple-600' : 'text-gray-900'}`} value={person}>
                                                                            {({ selectedClient, active }) => (
                                                                                <div className='w-full flex flex-row justify-between'>

                                                                                    <div className='flex flex-row self-center'>

                                                                                        <div className='w-8 h-8 rounded-full bg-gray-500 self-center mr-3'>
                                                                                        </div>

                                                                                        <div className='self-center'>
                                                                                            <span className={`block truncate ${ selectedClient ? 'font-medium' : 'font-normal'}`}>
                                                                                                {person.name}
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

                                            <div className="mb-3">
                                                <label htmlFor="order" className="block text-sm font-medium text-gray-900">Adresse</label>
                                                <input type="text"  name="phonenumber" id="phonenumber" autoComplete="phonenumber" placeholder="" className="mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 focus:border-0 focus:ring-2 focus:ring-purple-500 shadow-inner bg-white bg-opacity-90 rounded-md px-2"/>
                                            </div>

                                        </div>

                                        <div className='divider w-full h-[1px] bg-gray-400 bg-opacity-30 mt-8 mb-4'></div>
                                        <div className='mb-3 ml-0.5 flex flex-row px-5'>
                                            <div className='text-base font-semibold text-purple-600 mr-1 self-center'>Panier</div>
                                            <div className='px-2 py-[0.45px] text-[10.325px] font-medium bg-purple-500 bg-opacity-80 text-white rounded-xl self-center'>{chosenProducts?.length}</div>
                                        </div>

                                        <div className='w-full grid grid-cols-3 grid-flow-row gap-6'>
                                            
                                            <div className="col-span-2 bg-gray-200 bg-opacity-80 rounded-xl py-5">
                                                <div className='w-full h-80 overflow-y-auto px-5'>
                                                    {chosenProducts?.length == 0 ?

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
                                                <div onClick={(e) => this.openModal(e)} className='mt-3 bg-black bg-opacity-80 shadow-lg h-10 px-5 rounded-md flex flex-col justify-center btn-effect1 self-center mx-5'>
                                                    <div className='text-sm font-medium text-gray-100 hover:text-white self-center tracking-wide'>Ajouter des produits</div>
                                                </div>
                                            </div>

                                            <div className="bg-gray-200 bg-opacity-80 rounded-xl px-5 py-5 h-80">
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
                                                                    <input type="search" onChange={(e) => this.refetch(null, e.target.value)} className='w-full h-full px-4 focus:ring-0 text-sm border-0 bg-gray-200 bg-opacity-80 rounded-full' placeholder='Rechercher un nom, une description ou une catégorie ...' />
                                                                </div>

                                                            </div>
                                                            

                                                            <div className='py-3 px-3 w-full relative'>
                                                            
                                                                <BlockUI blocking={this.state.block2} />

                                                                <div className='mb-3 text-[0.915rem] font-medium text-gray-900'>Sélectionner des produits</div>

                                                                <div className='w-full h-[12.5rem] overflow-y-auto'>

                                                                    <div className="grid grid-cols-5 gap-5">

                                                                        {products?.products?.map((item, i) => (
                                                                            <div key={i}>
                                                                                <motion.div initial={{ opacity: 0, y: ( Math.random() * 15) }} whileInView={{ opacity: 1, y: 0, transition: { duration: 1.05 }, }}>
                                                                                    <div className="w-full pt-1 pb-5 rounded-xl bg-gray-200 bg-opacity-80 cursor-pointer relative">

                                                                                        <div className="form-check absolute top-[0.65rem] right-[0.65rem]">
                                                                                            <input checked={item.selected} onFocus={(e) =>  this.saveRelative(e, item)} type="checkbox" className="form-check-input rounded-md appearance-none h-[0.765rem] w-[0.765rem] border border-purple-300 rounded-full bg-gray-100 checked:bg-purple-600 checked:border-purple-600 text-purple-500 focus:outline-none focus:border-0 focus:ring-2 focus:ring-purple-500 transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer"  />
                                                                                        </div>

                                                                                        <div className='w-full h-[6rem] flex flex-row justify-center'>
                                                                                            <div className='max-h-[4rem] max-w-[3.75rem] self-center'>
                                                                                                <img className='w-full h-full' src={item.images[0]?.url} />
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className='w-full mt-2 px-3'>
                                                                                            <div className='w-full text-gray-500 text-[0.65rem] font-medium'>{item.category?.name}</div>
                                                                                            <div className='w-full flex mt-1'>
                                                                                                <div className='self-center w-full'>
                                                                                                    <div className='w-full text-gray-900 text-sm font-semibold truncate'>{item.name}</div>
                                                                                                    <div className='w-full text-gray-800 text-xs font-medium mt-1'>{item.unitprice}</div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>

                                                                                    </div>

                                                                                </motion.div>
                                                                            </div>
                                                                        ))}

                                                                    </div>

                                                                </div>

                                                                <div onClick={e => e.preventDefault()} className='w-full flex flex-row justify-end h-8 overflow-hidden mt-5'>
                                                                    {products?.count != null &&
                                                                        <Pagination
                                                                            initialPage={1} 
                                                                            itemsPerPage={this.state.take} 
                                                                            onPageСhange={(pageNumber) => this.refetch(pageNumber)} 
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
                                                                            <motion.div key={i} initial={{ opacity: 0, x: 300 + Math.random() * 15 }} whileInView={{ opacity: 1, x: 0, transition: { type: 'spring', stiffness: 195, damping: 20 }, }}>
                                                                                <div className='relative h-full'>
                                                                                    <div className='item-image-1 bg-gradient-to-r from-violet-600 to-purple-600 hover:scale-110 rounded-full border-opacity-80 self-center mr-4' >
                                                                                        <div className='image-layer-2 rounded-full'>
                                                                                            <div className='image-layer-3'><img src={item?.images[0].url}  /></div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className='absolute -top-0.5 -left-0.5 w-4 h-4 bg-red-500 hover:bg-red-600 rounded-full flex flex-row justify-center shadow-sm'>
                                                                                        <CrossIcon customClass="w-1.5 h-1.5 text-white self-center" />
                                                                                    </div>
                                                                                </div>
                                                                                
                                                                            </motion.div>
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
        
            </div>
        )
    }

}

export default Index;

