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
import { saveCountry, getCountry} from '../../hooks/country';
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
        this.state = { block: false, id:null, name: '', iso3: '', isoNum:''};
        this.checkInput = this.checkInput.bind(this)
        this.saveItem = this.saveItem.bind(this)
    }

    async componentDidMount(){
        var itemId = router.query.id
        if(itemId !=null){
            this.setState({block: true})
            var {response} = await getCountry(itemId)
            if(response?.__typename == 'Country'){
                this.setState({ id: response.id, name: response.name, iso3: response.iso3, isoNum: response.isoNum, block:false })
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
        const {name, iso3, isoNum} = this.state
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

        const {id, name, iso3, isoNum} = this.state

        var {response } = await saveCountry(id, name, iso3, isoNum)

        if(response?.__typename == 'Country'){
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
        
                                        <div className='text-lg font-semibold text-purple-600'>Formulaire Pays</div>
        
                                        <div></div>
        
                                    </div>
        
                                    <div className='app-form overflow-y-auto mt-3 px-5'>
        
                                        <div className='w-full grid grid-cols-5 grid-flow-row gap-6 mt-6'>
        
                                        <div className='col-span-2 px-4 py-4 '>
                                            <div className='flex flex-row'>
                                                <div className='self-center -mb-1 mr-2'><InfoBoldIcon customClass="w-4 h-4"/></div>
                                                <div className='self-center text-xl font-semibold text-gray-900 '>Pays</div>
                                            </div>
                                            <div className='text-sm font-normal text-gray-700 mt-3'>
                                                Afin de garantir la qualité des informations disponibles sur votre platform, veillez à bien suivre les consigne. 
                                                Elles pourront vous aider à  obtenir des statistiques plus précises sur votre activité.
                                            </div>
        
                                        </div>
        
                                        <div className='col-span-3 bg-gray-200 bg-opacity-60 rounded-xl px-5 py-6'>
        
                                            <div className="w-full mb-5">
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-900">Nom <span className='font-bold text-purple-600'>*</span> </label>
                                                <input type="text" value={this.state.name} onChange={(e) => this.setState({name:e.target.value }) } name="name" id="name" autoComplete="title" placeholder="Désignation" className="mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 focus:border-0 focus:ring-2 focus:ring-purple-500 shadow-inner bg-white bg-opacity-90 rounded-md px-2" required/>
                                            </div>
        
                                            <div className="w-full mb-5">
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-900">iso3 <span className='font-bold text-purple-600'>*</span> </label>
                                                <input type="text" value={this.state.iso3} onChange={(e) => this.setState({iso3:e.target.value }) } name="name" id="name" autoComplete="title" placeholder="Désignation" className="mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 focus:border-0 focus:ring-2 focus:ring-purple-500 shadow-inner bg-white bg-opacity-90 rounded-md px-2" required/>
                                                <p className="mt-2 text-xs text-gray-600">ⓘ Le code iso3 d&#39;un pays doit comporter 3 charactères.</p>
                                            </div>
        
                                            <div className="w-full mb-4">
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-900">isoNum <span className='font-bold text-purple-600'>*</span> </label>
                                                <input type="text" value={this.state.isoNum} onChange={(e) => this.setState({isoNum:e.target.value }) } name="name" id="name" autoComplete="title" placeholder="Désignation" className="mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 focus:border-0 focus:ring-2 focus:ring-purple-500 shadow-inner bg-white bg-opacity-90 rounded-md px-2" required/>
                                                <p className="mt-2 text-xs text-gray-600">ⓘ Le code iso numérique doit comporter au maximum 3 charactères.</p>
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
