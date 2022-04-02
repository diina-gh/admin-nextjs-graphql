import React, { Component, Fragment, useRef, useEffect, useState } from 'react';
import Link from 'next/link'
import { motion } from "framer-motion";
import Header from '../../components/common/header'
import Sidebar from '../../components/common/sidebar'
import HeadInfo from '../../components/common/headinfo'
import ArrowLeftBoldIcon from '../../components/ui/icons/arrowLeftBoldIcon';
import { saveVariant, getVariant} from '../../hooks/variant';
import router from 'next/router'
import BlockUI from '../../components/common/blockui';
import toast, { Toaster } from 'react-hot-toast';
import { Dialog, Transition } from '@headlessui/react'
import EditBoldIcon from '../../components/ui/icons/editBoldIcon'
import TrashBoldIcon from '../../components/ui/icons/trashBoldIcon'

export async function getServerSideProps(context) {
    return {
      props: {},
    }
}

var toastOne ;


class Index extends Component {

    constructor(props){
        super(props);
        this.state = { block: false, id:null, name: '', desc: '', options:[], opened: false, id_res: null, value_res:'', color_res:'' };
        this.checkInput = this.checkInput.bind(this)
        this.saveItem = this.saveItem.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.saveOption = this.saveOption.bind(this)
        this.deleteOption = this.deleteOption.bind(this)
    }

    async componentDidMount(){
        var itemId = router.query.id
        if(itemId !=null){
            this.setState({block: true})
            var {response} = await getVariant(itemId)
            if(response?.__typename == 'Variant'){
                this.setState({ id: response.id, name: response.name, desc: response.desc, options: response.options, block:false })
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
        this.setState({ opened: false, id_res: null, value_res: '', color_res:'' });
    }

    openModal = (e, id = null, value = '', color = '') => {
        e.preventDefault();
        this.setState({ id_res: id, value_res: value, color_res: color, opened: true});
    }

    checkInput = (e) => {

        e.preventDefault()
        const {name, desc, options} = this.state
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

    saveOption = (e) =>{
        e.preventDefault();

        const {id_res, value_res, color_res, options} = this.state
        var newOptions = options

        if(value_res == null || value_res == ''){
            toast.error("Veuillez donner une valeur");
        }
        else if((color_res == null || color_res == '') && this.state.name.toLowerCase().indexOf('couleur') != -1){
            toast.error("Veuillez choisir une couleur");
        }
        else{
            id_res != null ? newOptions.splice(id_res, 1, {'value': value_res, 'colorCode': color_res } ) : newOptions.push({'value': value_res, 'colorCode': color_res })
            this.setState({options: newOptions,})
            toast.success("Option mise à jour !");
            this.setState({opened: false, id_res: null, value_res:'', color_res:''})
        }
    }

    deleteOption = (e, index) => {
        e.preventDefault()
        const {options} = this.state
        var newOptions = options
        newOptions.splice(index, 1)
        this.setState({options: newOptions});
        toast.success("Option supprimée !");
    }

    saveItem = async () => {

        const {id, name, desc, options} = this.state

        var {response } = await saveVariant(id, name, desc, options)

        if(response?.__typename == 'Variant'){
            toast.dismiss()
            toast.success("Mise à jour réussie", {id: toastOne,});
            this.setState({block: false})
            setTimeout(() => {router.push('./');}, 2250);
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

        const {options} = this.state

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
        
                                        <div className='text-lg font-semibold text-purple-600'>Formulaire Variants</div>
        
                                        <div></div>
        
                                    </div>
        
                                    <div className='app-form overflow-y-auto mt-3 px-5'>
        
                                        <div className='w-full grid grid-cols-5 grid-flow-row gap-6 mt-6'>
        
                                        <div className='col-span-3 bg-gray-200 bg-opacity-60 rounded-xl px-5 py-6'>
        
                                            <div className="w-full mb-5">
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-900">Désignation <span className='font-bold text-purple-600'>*</span> </label>
                                                <input type="text" value={this.state.name} onChange={(e) => this.setState({name:e.target.value }) } name="name" id="name" autoComplete="title" placeholder="Désignation" className="mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 focus:border-0 focus:ring-2 focus:ring-purple-500 shadow-inner bg-white bg-opacity-90 rounded-md px-2" required/>
                                            </div>

                                            <div className="w-full mb-3">
                                                <label htmlFor="desc" className="block text-sm font-medium text-gray-900">Description <span className='font-bold text-purple-600'>*</span></label>
                                                <div className="mt-1">
                                                    <textarea value={this.state.desc} onChange={(e) => this.setState({desc:e.target.value })} name="desc" id="desc" rows={8}  className="mt-1 w-full shadow-sm text-sm border border-gray-400 focus:border-0 focus:ring-2 focus:ring-purple-500 shadow-inner bg-white bg-opacity-90 rounded-md px-2 py-2" placeholder="Donner une description" required/>
                                                </div>
                                            </div>

                                        

                                        </div>
        
                                        <div className='col-span-2 bg-gray-200 bg-opacity-60 rounded-xl py-6'>

                                            <div className='mb-3 ml-0.5 flex flex-row px-5'>
                                                <div className='text-base font-medium text-purple-600 mr-1 self-center'>Options</div>
                                                <div className='px-2 py-[0.45px] text-[10.325px] font-medium bg-purple-500 bg-opacity-80 text-white rounded-xl self-center'>{options?.length}</div>
                                            </div>

                                            <div className='w-full h-52 overflow-y-auto px-5'>

                                                {options?.length == 0 ?

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
                                                                        Valeur
                                                                    </th>

                                                                    <th scope="col" className="relative px-6 py-3">
                                                                        <span className="sr-only">Edit</span>
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="bg-white divide-y divide-gray-200">
                                                                {options.map((item, i) => (
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

                                                                            <div className="flex flex-row">
                                                                                <button onClick={(e) => this.openModal(e, i, item.value, item.color)} className="w-6 h-6 rounded-full border border-iiblack gt-shadow5 flex flex-row justify-center cursor-pointer btn-effect1 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 mr-2">
                                                                                    <EditBoldIcon customClass="w-[0.575rem] text-gray-600 text-opacity-90 self-center"/>
                                                                                </button>

                                                                                <button  onClick={(e) => this.deleteOption(e, i)} className="w-6 h-6 rounded-full border border-iiblack gt-shadow5 flex flex-row justify-center cursor-pointer btn-effect1 bg-gray-100 hover:bg-gray-200 active:bg-gray-30">
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
        
                                            {this.state.name != null && this.state.name != '' &&
                                                <div onClick={(e) => this.openModal(e)} className='mt-3 bg-black bg-opacity-80 shadow-lg h-10 px-5 rounded-md flex flex-col justify-center btn-effect1 self-center mx-5'>
                                                    <div className='text-sm font-medium text-gray-100 hover:text-white self-center tracking-wide'>Ajouter une option</div>
                                                </div>
                                            }
                                           
        
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
                                <div className="modal-width overflow-y-auto flex flex-row justify-center">
                                    <div className='modal-content bg-white transition-all transform rounded-lg gt-shadow6 self-center my-8 mx-2'>
                                        <div className="w-full flex flex-row justify-center mt-2">
                                            <div className="w-full">
                                                <form role="form" method="post" onSubmit={(e) => this.saveOption(e)}>

                                                <div className="" >

                                                    <div className="px-3 py-4 bg-white space-y-6 sm:p-6 z-10">

                                                        <div className="w-full text-center text-base font-medium text-purple-500">Formulaire Option</div>

                                                        <div className="w-full mt-3">

                                                            <div className="w-full mb-3">
                                                                <div className="w-full">
                                                                    <label htmlFor="street-address" className="block text-sm font-medium text-gray-900">Valeur</label>
                                                                    <input value={this.state.value_res} onChange={(e) => this.setState({ value_res: e.target.value})} type="text" name="value_res" id="value_res" autoComplete="value_res" placeholder="Valeur" className="mt-2 h-10 w-full shadow-sm text-sm border border-gray-400 shadow-inner bg-white bg-opacity-90  rounded-md px-2"/>
                                                                </div>
                                                            </div>

                                                            {this.state.name.toLowerCase().indexOf('couleur') != -1 &&
                                                                <div className="w-full mb-3">
                                                                    <div className="w-full">
                                                                        <label htmlFor="objet" className="block text-sm font-medium text-gray-900">Couleur</label>
                                                                        <input value={this.state.color_res} onChange={(e) => this.setState({ color_res: e.target.value})} type="color" name="color_res" id="color_res" placeholder="Couleur" autoComplete="color" className="mt-3 h-10 border block w-full shadow-sm border-gray-300 rounded-md "/>
                                                                    </div>
                                                                </div>
                                                            }

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
