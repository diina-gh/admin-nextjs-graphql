import React, { Component, Fragment, useState } from 'react';
import Link from 'next/link'
import { motion } from "framer-motion";
import Header from '../../components/common/header'
import Sidebar from '../../components/common/sidebar'
import HeadInfo from '../../components/common/headinfo'
import ArrowLeftBoldIcon from '../../components/ui/icons/arrowLeftBoldIcon';
import { getUser} from '../../hooks/user';
import { saveClient } from '../../hooks/client';
import router from 'next/router'
import BlockUI from '../../components/common/blockui';
import toast, { Toaster } from 'react-hot-toast';
import EditBoldIcon from '../../components/ui/icons/editBoldIcon'
import TrashBoldIcon from '../../components/ui/icons/trashBoldIcon'
import { Listbox, Dialog, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { allDistricts } from '../../hooks/district';
import { Switch } from '@headlessui/react'
import { classNames } from '../../libs/util';

export async function getServerSideProps(context) {
    return {
      props: {},
    }
}

var toastOne ;


class Index extends Component {

    constructor(props){
        super(props);
        this.state = { block: false, id:null, civility: null, firstname: '', lastname: '', email:'', phonenumber: '', districts: [], addresses: [], opened: false, id_res: null, line1_res: '', line2_res: '', district_res: null, default_res: false};
        this.checkInput = this.checkInput.bind(this)
        this.saveItem = this.saveItem.bind(this)
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.getDistricts = this.getDistricts.bind(this)
        this.saveAddress = this.saveAddress.bind(this)
        this.deleteAddress = this.deleteAddress.bind(this)
    }

    async componentDidMount(){
        var itemId = router.query.id
        if(itemId !=null){
            this.setState({block: true})
            const fields = {"userActivated": true, "userCivility": true, "userFirstname": true, "userLastname": true, "userPhonenumber": true, "userEmail": true, "userImage": true, "imageImageref": true, "imageUrl": true, "userDistricts": true, "userDistrictName": true}
            var {response } = await getUser(itemId, fields)
            if(response?.__typename == 'User'){
                this.setState({ id: response.id, civility: response.civility, firstname: response.firstname, lastname: response.lastname, email: response.email, phonenumber:response.phonenumber , addresses: response.districts,})
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
        this.getDistricts()
    }

    getDistricts = async() =>{
        const districtFields = {"districtName": true}
        var {response} = await allDistricts(districtFields)
        if(response){
            this.setState({districts: response.districts, block: false})
        }
    }

    closeModal = (e) => {
        e.preventDefault();
        this.setState({ opened: false, id_res: null, line1_res: '', line2_res:'', default_res: false, district_res: null });
    }

    openModal = (e, id = null, line1 = '', line2 = '', default_nr = false, district= null) => {
        e.preventDefault();
        this.setState({ id_res: id, line1_res: line1, line2_res: line2, default_res: default_nr , district_res: district, opened: true});
    }

    saveAddress = (e) =>{

        e.preventDefault();

        const {id_res, line1_res, line2_res, default_res, district_res,addresses} = this.state
        var new_addresses = addresses

        if(line1_res == null || line1_res == ''){
            toast.error("Veuillez renseigner la première ligne.");
        }
        else if(district_res == null){
            toast.error("Veuillez choisir une zone");
        }
        else{

            if(default_res == true && new_addresses.length > 0){
                for(let i=0; i< new_addresses.length; i++) new_addresses[i].isDefault = false 
            }

            var data = {line1: line1_res, line2:line2_res, isDefault: default_res, district: district_res}
            if(new_addresses.length == 0 && default_res == false ) data.isDefault = true
            id_res != null ? new_addresses.splice(id_res, 1, data ) : new_addresses.push(data)

            this.setState({addresses: new_addresses,})
            toast.success("Adresse mise à jour !");
            this.setState({ opened: false, id_res: null, line1_res: '', line2_res:'', default_res: false, district_res: null });
        }
    }

    deleteAddress = (e, index) => {
        e.preventDefault()
        const {addresses} = this.state
        var new_addresses = addresses
        new_addresses.splice(index, 1)
        this.setState({addresses: new_addresses});
        toast.success("Adresse supprimée !");
    }

    checkInput = (e) => {

        e.preventDefault()
        const {id, firstname, lastname, email, phonenumber, addresses} = this.state
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

        const {id, civility, firstname, lastname, email, phonenumber, addresses} = this.state
        var new_addresses = []

        for(let i=0; i< addresses.length; i++){
            let data = {id: undefined, line1:addresses[i].line1, line2:addresses[i].line2, isDefault:addresses[i].isDefault, districtId:addresses[i].district.id}
            new_addresses.push(data)
        } 

        var {response } = await saveClient(id, civility, firstname, lastname, email, phonenumber, new_addresses)

        if(response?.__typename == 'User'){
            toast.dismiss()
            this.setState({block: false})
            toast.success("Mise à jour réussie !", {id: toastOne,});
            setTimeout(() => {router.push('./');}, 2250);
        }
        else if(response?.__typename == 'InputError'){
            toast.dismiss()
            toast.error(response?.message, {id: toastOne,});
            this.setState({block: false})
        }
        else{
            toast.dismiss()
            toast.error("Erreur inconnue. Veuillez vérifier votre connexion internet.", {id: toastOne,});
        }
    };

    render() {
        const {id, districts, addresses, district_res, default_res} = this.state

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
        
                                        <div className='text-lg font-semibold text-purple-600'>Gestion des utilisateurs</div>
        
                                        <div></div>
        
                                    </div>
        
                                    <div className='app-form overflow-y-auto mt-4 px-5'>
        
                                        <div className='w-full grid grid-cols-4 grid-flow-row gap-6 mt-6'>
        
                                            <div className='col-span-2 grid grid-cols-2 grid-flow-row gap-6 bg-gray-200 bg-opacity-60 rounded-xl px-4 py-5'>

                                                <div className="">
                                                    <label htmlFor="civility" className="block text-sm font-medium text-gray-900">Civilité <span className='font-bold text-purple-600'>*</span></label>
                                                    <select id="civility" name="civility" onChange={(e) => this.setState({ civility: e.target.value})} autoComplete="civility" className="form-select mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 shadow-inner bg-white bg-opacity-90 rounded-md focus:border-0 focus:ring-2 focus:ring-purple-500 px-2 decorated" placeholder="Civilité">
                                                        <option  className='' >Choisir une civilité</option>
                                                        <option value="MONSIEUR" className='form-option py-3 hover:bg-purple-500 hover:text-white decorated' >Monsieur</option>
                                                        <option value="MADAME" className='form-option py-3 hover:bg-purple-500 hover:text-white' >Madame</option>
                                                    </select>
                                                </div>
            
                                                <div className="">
                                                    <label htmlFor="name" className="block text-sm font-medium text-gray-900">Prénom <span className='font-bold text-purple-600'>*</span> </label>
                                                    <input type="text" value={this.state.firstname} onChange={(e) => this.setState({firstname:e.target.value }) } name="firstname" id="firstname" autoComplete="title" placeholder="Prénom" className="mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 focus:border-0 focus:ring-2 focus:ring-purple-500 shadow-inner bg-white bg-opacity-90 rounded-md px-2" required/>
                                                </div>

                                                <div className="">
                                                    <label htmlFor="name" className="block text-sm font-medium text-gray-900">Nom <span className='font-bold text-purple-600'>*</span> </label>
                                                    <input type="text" value={this.state.lastname} onChange={(e) => this.setState({lastname:e.target.value }) } name="lastname" id="lastname" autoComplete="title" placeholder="Nom" className="mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 focus:border-0 focus:ring-2 focus:ring-purple-500 shadow-inner bg-white bg-opacity-90 rounded-md px-2" required/>
                                                </div>

                                                <div className="">
                                                    <label htmlFor="name" className="block text-sm font-medium text-gray-900">Téléphone<span className='font-bold text-purple-600'>*</span> </label>
                                                    <input type="text" value={this.state.phonenumber} onChange={(e) => this.setState({phonenumber:e.target.value }) } name="phonenumber" id="phonenumber" autoComplete="title" placeholder="Téléphone" className="mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 focus:border-0 focus:ring-2 focus:ring-purple-500 shadow-inner bg-white bg-opacity-90 rounded-md px-2" required/>
                                                </div>

                                                <div className="">
                                                    <label htmlFor="name" className="block text-sm font-medium text-gray-900">Adresse email<span className='font-bold text-purple-600'>*</span> </label>
                                                    <input type="text" value={this.state.email} onChange={(e) => this.setState({email:e.target.value }) } name="email" id="email" autoComplete="title" placeholder="Adresse email" className="mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 focus:border-0 focus:ring-2 focus:ring-purple-500 shadow-inner bg-white bg-opacity-90 rounded-md px-2" required readOnly={id!=null}/>
                                                </div>
                                                
                                            </div>

                                            <div className='col-span-2'>

                                                <div className='bg-gray-200 bg-opacity-60 rounded-xl py-5'>

                                                    <div className='mb-3 ml-0.5 flex flex-row px-4'>
                                                        <div className='text-base font-medium text-purple-600 mr-1 self-center'>Adresses</div>
                                                        <div className='px-2 py-[0.45px] text-[10.325px] font-medium bg-purple-500 bg-opacity-80 text-white rounded-xl self-center'>{addresses?.length}</div>
                                                    </div>

                                                    <div className='w-full h-[14rem] overflow-y-auto px-5'>

                                                        {addresses?.length == 0 ?

                                                            <div className='w-full h-full flex flex-row justify-center '>
                                                                <div className='h-24 self-center'>
                                                                    <img src="../empty_svg.svg" className='h-full opacity-90' />
                                                                </div>
                                                            </div>
                                                            :
                                                            <div>
                                                                <table className="min-w-full divide-y divide-gray-200 ">
                                                                    <thead className="th-bg-1 sticky top-0 ">
                                                                        <tr>
                                                                            <th scope="col" className="px-6 py-1 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                                                                                N#
                                                                            </th>
                                                                            
                                                                            <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider" >
                                                                                Adresse
                                                                            </th>

                                                                            <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider" >
                                                                                Quartier
                                                                            </th>

                                                                            <th scope="col" className="relative px-6 py-3">
                                                                                <span className="sr-only">Edit</span>
                                                                            </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody className="bg-white divide-y divide-gray-200">
                                                                        {addresses?.map((item, i) => (
                                                                            <tr key={item.id} className={(i%2==0) ? "" : "bg-gray-100 bg-opacity-50"}>
                                                                                <td className="px-6 py-3 whitespace-nowrap">
                                                                                    <div className="text-sm text-gray-900">{i+1}</div>
                                                                                </td>
                                                                                <td className="px-6 py-3 whitespace-nowrap flex flex-row items-center">
                                                                                    <div className="text-sm text-gray-900 self-center mr-1">{item.line1}</div>
                                                                                    {item.isDefault && <CheckIcon className='text-green-600 w-5 self-center'/>}
                                                                                </td>

                                                                                <td className="px-6 py-3 whitespace-nowrap">
                                                                                    <div className="text-sm text-gray-900 self-center">{item.district.name}</div>
                                                                                </td>
                                                                                
                                                                                <td className="px-2 py-3 whitespace-nowrap text-right flex flex-row justify-end">

                                                                                    <div className="flex flex-row">
                                                                                        <button onClick={(e) => this.openModal(e, i, item.line1, item.line2, item.isDefault, item.district)} className="w-6 h-6 rounded-full border border-iiblack gt-shadow5 flex flex-row justify-center cursor-pointer btn-effect1 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 mr-2">
                                                                                            <EditBoldIcon customClass="w-[0.575rem] text-gray-600 text-opacity-90 self-center"/>
                                                                                        </button>

                                                                                        <button  onClick={(e) => this.deleteAddress(e, i)} className="w-6 h-6 rounded-full border border-iiblack gt-shadow5 flex flex-row justify-center cursor-pointer btn-effect1 bg-gray-100 hover:bg-gray-200 active:bg-gray-30">
                                                                                            <TrashBoldIcon customClass="w-[0.575rem] text-red-600 text-opacity-90 self-center"/>
                                                                                        </button>
                                                                                    </div>

                                                                                </td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            </div>

                                                        }

                                                    </div>

                                                    <div onClick={(e) => this.openModal(e)} className='mt-4 bg-black bg-opacity-80 shadow-lg h-[2.65rem] px-5 rounded-md flex flex-col justify-center btn-effect1 self-center mx-5'>
                                                        <div className='text-[14.5px] font-medium text-gray-100 hover:text-white self-center tracking-wide'>Ajouter une adresse</div>
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

                <Transition appear show={this.state.opened} as={Fragment}>
                    <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={(e) => this.setState({opened: false})}>
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
                                                <form user="form" method="post" onSubmit={(e) => this.saveAddress(e)}>
                                                    <div className="mt-2" >

                                                        <div className="px-3 w-full text-center text-lg font-medium text-purple-500">Nouvelle adresse</div>

                                                        <div className="bg-white sm:p-6 h-[28rem] overflow-y-auto">


                                                            <div className="w-full mt-1">

                                                                <div className="w-full mb-5">
                                                                    <label htmlFor="name" className="block text-sm font-medium text-gray-900">Ligne 1 <span className='font-bold text-purple-600'>*</span> </label>
                                                                    <input type="text" value={this.state.line1_res} onChange={(e) => this.setState({line1_res:e.target.value }) } name="Ligne" id="lastname" autoComplete="title" placeholder="Désignation" className="mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 focus:border-0 focus:ring-2 focus:ring-purple-500 shadow-inner bg-white bg-opacity-90 rounded-md px-2" required/>
                                                                </div>

                                                                <div className="w-full mb-5">
                                                                    <label htmlFor="name" className="block text-sm font-medium text-gray-900">Ligne 2</label>
                                                                    <input type="text" value={this.state.line2_res} onChange={(e) => this.setState({line2_res:e.target.value }) } name="Ligne 2" id="lastname" autoComplete="title" placeholder="Désignation" className="mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 focus:border-0 focus:ring-2 focus:ring-purple-500 shadow-inner bg-white bg-opacity-90 rounded-md px-2"/>
                                                                </div>

                                                                <div className='w-full mb-5'>
                                                                    <Listbox value={district_res} onChange={(e) => this.setState({district_res: e})}>
                                                                        {({ open }) => (
                                                                            <>
                                                                            <Listbox.Label className="block text-sm font-medium text-gray-900">Quartier <span className='font-bold text-purple-600'>*</span></Listbox.Label>
                                                                            <div className="mt-1 relative">
                                                                                <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm">
                                                                                    <span className="flex items-center">
                                                                                        <span className="ml-3 block truncate">{district_res ? district_res.name : 'Choisir un quartier'}</span>
                                                                                    </span>
                                                                                    <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                                                        <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                                    </span>
                                                                                </Listbox.Button>
                    
                                                                                <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                                                                    <Listbox.Options className="absolute sticky mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                                                                        {districts.map((item) => (
                                                                                        <Listbox.Option key={item.id} className={({ active }) => classNames(active ? 'text-white bg-purple-600' : 'text-gray-900','cursor-pointer select-none relative py-2 pl-3 pr-9')} value={item}>
                                                                                            {({ district_res, active }) => (
                                                                                            <>
                                                                                                <div className="flex items-center">
                                                                                                    <span className={classNames(district_res ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>
                                                                                                        {item.name}
                                                                                                    </span>
                                                                                                </div>
                    
                                                                                                {district_res || active &&
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
                                                                    <div className="self-center ml-1">
                                                                        <label htmlFor="desc" className="block text-sm font-medium text-gray-900 mb-1">Par défault</label>
                                                                        <Switch checked={default_res} onChange={(e) => this.setState({default_res: e})} className={`${default_res ? 'bg-purple-600 bg-opacity-80 shadow-sm' : 'bg-white bg-opacity-80 shadow-sm'} relative inline-flex flex-shrink-0 h-[34px] w-[70px] border border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}>                                                    
                                                                            <span className="sr-only">Use setting</span>
                                                                            <span
                                                                            aria-hidden="true"
                                                                            className={`${default_res ? 'translate-x-9' : 'translate-x-0'}
                                                                                pointer-events-none inline-block h-[29.5px] w-[29.5px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200 border border-gray-200 border-opacity-80 self-center`}
                                                                            />
                                                                        </Switch>
                                                                    </div>
                                                                </div>

                                                            </div>

                                                        </div>

                                                        <div className="px-3 py-2.5 bg-gray-50 sm:px-6 flex flex-row justify-end rounded-b-lg border-t border-gray-200 ">

                                                            <div onClick={(e) => this.closeModal(e)} className='bg-gray-500 bg-opacity-90 shadow-lg h-9 px-3 rounded-md flex flex-col justify-center btn-effect1 self-center mr-2'>
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
