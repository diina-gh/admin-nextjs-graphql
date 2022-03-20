import React, { Component, useRef, useEffect, useState } from 'react';
import Link from 'next/link'
import { motion } from "framer-motion";
import Header from '../../components/common/header'
import Sidebar from '../../components/common/sidebar'
import HeadInfo from '../../components/common/headinfo'
import ArrowLeftBoldIcon from '../../components/ui/icons/arrowLeftBoldIcon';
import InfoBoldIcon from '../../components/ui/icons/infoBoldIcon';
import firebase from "../../config/firebase"
import { uid } from 'uid';
import { saveImage, deleteImage } from '../../hooks/image';
import { saveDeliveryMan, getDeliveryMan} from '../../hooks/deliveryMan';
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
        this.state = { block: false, id:null, firstname: '', lastname: '', email: '', phonenumber:'', civility: null};
        this.checkInput = this.checkInput.bind(this)
        this.saveItem = this.saveItem.bind(this)
    }

    async componentDidMount(){
        var itemId = router.query.id
        if(itemId !=null){
            this.setState({block: true})
            var {response} = await getDeliveryMan(itemId)
            if(response?.__typename == 'DeliveryMan'){
                this.setState({ id: response.id, civility: response.civility, firstname: response.firstname, lastname: response.lastname, email: response.email, phonenumber: response.phonenumber, block:false })
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

    checkInput = (e) => {

        e.preventDefault()
        const {firstname, lastname, phonenumber, email, civility} = this.state
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

        const {id, civility, firstname, lastname, phonenumber, email} = this.state

        var {response } = await saveDeliveryMan(id, civility, firstname, lastname, phonenumber, email)

        if(response?.__typename == 'DeliveryMan'){
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
        
                                        <div className='text-lg font-semibold text-purple-600'>Formulaire des livreurs</div>
        
                                        <div></div>
        
                                    </div>
        
                                    <div className='app-form overflow-y-auto mt-3 px-5'>
        
                                        <div className='w-full grid grid-cols-5 grid-flow-row gap-6 mt-6'>
        
                                        <div className='col-span-2 px-4 py-4 '>
                                            <div className='flex flex-row'>
                                                <div className='self-center -mb-1 mr-2'><InfoBoldIcon customClass="w-4 h-4"/></div>
                                                <div className='self-center text-xl font-semibold text-gray-900 '>Livreurs</div>
                                            </div>
                                            <div className='text-sm font-normal text-gray-700 mt-3'>
                                                Afin de garantir la qualité des informations disponibles sur votre platform, veillez à bien suivre les consigne. 
                                                Elles pourront vous aider à  obtenir des statistiques plus précises sur votre activité.
                                            </div>
        
                                        </div>
        
                                        <div className='col-span-3 bg-gray-200 bg-opacity-60 rounded-xl px-5 py-6'>

                                            <div className="w-full mb-4">
                                                <label htmlFor="civility" className="block text-sm font-medium text-gray-900">Civilité <span className='font-bold text-purple-600'>*</span></label>
                                                <select id="civility" name="civility" onChange={(e) => this.setState({ civility: e.target.value})} autoComplete="civility" className="form-select mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 shadow-inner bg-white bg-opacity-90 rounded-md px-2" placeholder="Civilité">
                                                    <option value="MONSIEUR" className='form-option py-3 hover:bg-purple-500 hover:text-white' >Monsieur</option>
                                                    <option value="MADAME" className='form-option py-3 hover:bg-purple-500 hover:text-white' >Madame</option>
                                                </select>
                                            </div>

                                            <div className="w-full mb-5">
                                                <label htmlFor="lastname" className="block text-sm font-medium text-gray-900">Nom <span className='font-bold text-purple-600'>*</span> </label>
                                                <input type="text" value={this.state.lastname} onChange={(e) => this.setState({lastname:e.target.value }) } name="lastname" id="lastname" autoComplete="lastname" placeholder="Prénom" className="mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 shadow-inner bg-white bg-opacity-90 rounded-md px-2" required/>
                                            </div>
        
                                            <div className="w-full mb-4">
                                                <label htmlFor="firstname" className="block text-sm font-medium text-gray-900">Prénom <span className='font-bold text-purple-600'>*</span> </label>
                                                <input type="text" value={this.state.firstname} onChange={(e) => this.setState({firstname:e.target.value }) } name="firstname" id="firstname" autoComplete="firstname" placeholder="Nom" className="mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 shadow-inner bg-white bg-opacity-90 rounded-md px-2" required/>
                                            </div>
        
                                            <div className="w-full mb-4">
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-900">Adresse email <span className='font-bold text-purple-600'>*</span> </label>
                                                <input type="text" value={this.state.email} onChange={(e) => this.setState({email:e.target.value }) } name="email" id="email" autoComplete="email" placeholder="Adresse email" className="mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 shadow-inner bg-white bg-opacity-90 rounded-md px-2" required/>
                                            </div>

                                            <div className="w-full mb-4">
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-900">Numéro de téléphone <span className='font-bold text-purple-600'>*</span> </label>
                                                <input type="text" value={this.state.phonenumber} onChange={(e) => this.setState({phonenumber:e.target.value }) } name="phonenumber" id="phonenumber" autoComplete="phonenumber" placeholder="Numéro de téléphone" className="mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 shadow-inner bg-white bg-opacity-90 rounded-md px-2" required/>
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
