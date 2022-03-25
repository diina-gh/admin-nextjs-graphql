import React, { Component, Fragment, useState } from 'react';
import Link from 'next/link'
import { motion } from "framer-motion";
import Header from '../../components/common/header'
import Sidebar from '../../components/common/sidebar'
import HeadInfo from '../../components/common/headinfo'
import ArrowLeftBoldIcon from '../../components/ui/icons/arrowLeftBoldIcon';
import { saveBrand, getBrand} from '../../hooks/brand';
import router from 'next/router'
import BlockUI from '../../components/common/blockui';
import toast, { Toaster } from 'react-hot-toast';
import TrashBoldIcon from '../../components/ui/icons/trashBoldIcon'
import { Listbox, Dialog, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

export async function getServerSideProps(context) {
    return {
      props: {},
    }
}

var toastOne ;


class Index extends Component {

    constructor(props){
        super(props);
        this.state = { block: false, id:null, name: '', desc: '', permissions: [], chosenPermissions: [], opened: false, checkedAll: false};
        this.checkInput = this.checkInput.bind(this)
        this.saveItem = this.saveItem.bind(this)
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    async componentDidMount(){
        var itemId = router.query.id
        if(itemId !=null){
            this.setState({block: true})
            var {response } = await getBrand(itemId)
            if(response?.__typename == 'Brand'){
                this.setState({ id: response.id, name: response.name, desc: response.desc, order: response.order, image:response.image?.url, chosenImage:response.image?.url, imageref:response.image?.imageref, imageId: response.image?.id, block: false })
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
    }

    closeModal = (e) => {
        e.preventDefault();
        this.setState({ opened: false });
    }

    openModal = (e) => {
        e.preventDefault();
        this.setState({ opened: true});
    }

    handleCheck = (e, i, checkAll = false) => {

        e.preventDefault();

        const {permissions} = this.state
        var new_permissions = permissions

        if(checkAll){
            var results = new_permissions.filter(item => item?.selected == true);
            for(var j=0; j< new_permissions.length; j++){
                new_permissions[j].selected = (results.length != new_permissions.length) 
            }
        }
        else{
            new_permissions[i].selected = !new_permissions[i].selected
        }

        var results = new_permissions .filter(item => item?.selected == true);
        this.setState({permissions: new_permissions, checkedAll: (results.length == new_permissions.length)})
        // toast.success('Mise à jour réussie !')
    }

    savePermissions = (e) => {

        e.preventDefault();
        const {permissions} = this.state

        var new_choices = permissions.filter(item => item.selected == true);

        if(new_choices.length == 0){
            toast.error('Veuillez choisir au moins une permission')
            return null
        }

        this.setState({chosenPermissions: new_choices, opened: false})
        toast.success('Mise à jour réussie !')
    }

    deletePermission = (e, index) => {
        e.preventDefault()
        const {chosenPermissions} = this.state
        var new_permissions = chosenPermissions
        new_permissions.splice(index, 1)
        this.setState({chosenPermissions: new_permissions});
        toast.success("Permission retirée !");
    }

    checkInput = (e) => {

        e.preventDefault()
        const {name, desc, chosenPermissions} = this.state
        var errorMessage

        if(!navigator.onLine){
            errorMessage = "Aucun accès à Internet"
        }
        else if(image == null){
            errorMessage = "Veuillez ajouter une image"
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

        const {id, name, desc, chosenPermissions} = this.state

        const chosenPermissionIds = chosenPermissions.map(item => parseInt(item.id));
        var {response } = await saveRole(id, name, desc, chosenPermissionIds)

        if(response?.__typename == 'Role'){
            toast.dismiss()
            toast.success("Mise à jour réussie", {id: toastOne,});
            this.setState({block: false})
            setTimeout(() => {router.push('./');}, 2200);
        }
        else if(response?.__typename == 'InputError'){
            toast.error(response?.message, {id: toastOne,});
            this.setState({block: false})
        }
        else{
            toast.error("Erreur inconnue. Veuillez vérifier votre connexion internet.", {id: toastOne,});
        }
    };

    render() {
        const {permissions, chosenPermissions, checkedAll} = this.state

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
        
                                        <div className='text-lg font-semibold text-purple-600'>Gestion des roles</div>
        
                                        <div></div>
        
                                    </div>
        
                                    <div className='app-form overflow-y-auto mt-3 px-5'>
        
                                        <div className='w-full grid grid-cols-2 grid-flow-row gap-6 mt-6'>
        
                                            <div className='bg-gray-200 bg-opacity-60 rounded-xl px-4 py-5'>
            
                                                <div className="w-full mb-5">
                                                    <label htmlFor="name" className="block text-sm font-medium text-gray-900">Désignation <span className='font-bold text-purple-600'>*</span> </label>
                                                    <input type="text" value={this.state.name} onChange={(e) => this.setState({name:e.target.value }) } name="name" id="name" autoComplete="title" placeholder="Désignation" className="mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 focus:border-0 focus:ring-2 focus:ring-purple-500 shadow-inner bg-white bg-opacity-90 rounded-md px-2" required/>
                                                </div>
            
                                                <div className="w-full">
                                                    <label htmlFor="desc" className="block text-sm font-medium text-gray-900">Description <span className='font-bold text-purple-600'>*</span></label>
                                                    <div className="mt-1">
                                                        <textarea value={this.state.desc} onChange={(e) => this.setState({desc:e.target.desc })} name="desc" id="desc" rows={10}  className="mt-1 w-full shadow-sm text-sm border border-gray-400 focus:border-0 focus:ring-2 focus:ring-purple-500 shadow-inner bg-white bg-opacity-90 rounded-md px-2 py-2" placeholder="Donner une description" required/>
                                                    </div>
                                                </div>
            
                                            </div>

                                            <div className='bg-gray-200 bg-opacity-60 rounded-xl py-5'>

                                                <div className='mb-3 ml-0.5 flex flex-row px-4'>
                                                    <div className='text-base font-medium text-purple-600 mr-1 self-center'>Permissions</div>
                                                    <div className='px-2 py-[0.45px] text-[10.325px] font-medium bg-purple-500 bg-opacity-80 text-white rounded-xl self-center'>{chosenPermissions?.length}</div>
                                                </div>
        
                                                <div className='w-full h-[15rem] overflow-y-auto px-5'>

                                                    {chosenPermissions?.length == 0 ?

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
                                                                        <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                                                                            N#
                                                                        </th>
                                                                        
                                                                        <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider" >
                                                                            Désignation
                                                                        </th>

                                                                        <th scope="col" className="relative px-6 py-3">
                                                                            <span className="sr-only">Edit</span>
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody className="bg-white divide-y divide-gray-200">
                                                                    {chosenPermissions.map((item, i) => (
                                                                        <tr key={item.id} className={(i%2==0) ? "" : "bg-gray-100 bg-opacity-50"}>
                                                                            <td className="px-6 py-3 whitespace-nowrap">
                                                                                <div className="text-sm text-gray-900">{i+1}</div>
                                                                            </td>
                                                                            <td className="px-6 py-3 whitespace-nowrap">
                                                                                <div className="text-sm text-gray-900 self-center">{item.name}</div>
                                                                            </td>
                                                                            
                                                                            <td className="px-2 py-3 whitespace-nowrap text-right flex flex-row justify-end">

                                                                                <div className="self-center">
                                                                                    <button  onClick={(e) => this.deletePermission(e, i)} className="w-6 h-6 rounded-full border border-iiblack gt-shadow5 flex flex-row justify-center cursor-pointer btn-effect1 bg-gray-100 hover:bg-gray-200 active:bg-gray-30">
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
        
                                                <div onClick={(e) => this.openModal(e)} className='mt-3 bg-black bg-opacity-80 shadow-lg h-10 px-5 rounded-md flex flex-col justify-center btn-effect1 self-center mx-5'>
                                                    <div className='text-sm font-medium text-gray-100 hover:text-white self-center tracking-wide'>Ajouter des permissions</div>
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
                                                <form role="form" method="post" onSubmit={(e) => this.savePermissions(e)}>
                                                    <div className="mt-2" >

                                                        <div className="px-3 w-full text-center text-lg font-medium text-purple-500">Liste des permissions</div>

                                                        <div className="bg-white sm:p-6 h-[28rem] overflow-y-auto">


                                                            <div className="w-full mt-1">

                                                                <div className='w-full h-[2.5rem]'>
                                                                    <input type="search" className='w-full h-full px-4 focus:ring-0 text-sm border-0 bg-gray-200 bg-opacity-60 rounded-full shadow-inner border border-gray-200' placeholder='Rechercher une permission ...' />
                                                                </div>

                                                                <div className='mt-5'>

                                                                    <div className='mb-3 text-[0.915rem] font-medium text-gray-900'>Sélectionner des permissions</div>

                                                                    <div className='w-full h-[18.5rem] overflow-y-auto'>

                                                                        <div>
                                                                            <table className="min-w-full divide-y divide-gray-200 ">
                                                                                <thead className="th-bg-1 sticky top-0 ">
                                                                                    <tr>
                                                                                        <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                                                                                            N#
                                                                                        </th>
                                                                                        
                                                                                        <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-gray-800 uppercase tracking-wider" >
                                                                                            Désignation
                                                                                        </th>

                                                                                        <th scope="col" className="relative px-2 py-3 flex flex-row justify-end">
                                                                                            <div className="form-check mr-1">
                                                                                                <input type="checkbox" checked={checkedAll} onFocus={(e) =>  this.handleCheck(e, null, true)} value="" className="form-check-input rounded-md appearance-none h-4 w-4 border border-purple-300 rounded-sm bg-white checked:bg-purple-600 checked:border-purple-600 text-purple-500 focus:outline-none focus:border-0 focus:ring-2 focus:ring-purple-500 transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"  />
                                                                                            </div>
                                                                                        </th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody className="bg-white divide-y divide-gray-200">
                                                                                    {permissions.map((item, i) => (
                                                                                        <tr key={item.id} className={(i%2==0) ? "" : "bg-gray-100 bg-opacity-50"}>

                                                                                            <td className="px-6 py-3 whitespace-nowrap">
                                                                                                <div className="text-sm text-gray-900">{i+1}</div>
                                                                                            </td>

                                                                                            <td className="px-6 py-3 whitespace-nowrap">
                                                                                                <div className="text-sm text-gray-900 self-center">{item.name}</div>
                                                                                            </td>
                                                                                            
                                                                                            <td className="px-2 py-3 whitespace-nowrap text-right flex flex-row justify-end">
                                                                                                <div className="form-check mr-1">
                                                                                                    <input type="checkbox" checked={item.selected} onFocus={(e) =>  this.handleCheck(e, i)} value="" className="form-check-input rounded-md appearance-none h-4 w-4 border border-purple-300 rounded-sm bg-white checked:bg-purple-600 checked:border-purple-600 text-purple-500 focus:outline-none focus:border-0 focus:ring-2 focus:ring-purple-500 transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"  />
                                                                                                </div>
                                                                                            </td>

                                                                                        </tr>
                                                                                    ))}
                                                                                </tbody>
                                                                            </table>
                                                                        </div>

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
