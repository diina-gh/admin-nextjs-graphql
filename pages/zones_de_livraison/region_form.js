import React, { Component, Fragment } from 'react';
import Link from 'next/link'
import { motion } from "framer-motion";
import Header from '../../components/common/header'
import Sidebar from '../../components/common/sidebar'
import HeadInfo from '../../components/common/headinfo'
import ArrowLeftBoldIcon from '../../components/ui/icons/arrowLeftBoldIcon';
import InfoBoldIcon from '../../components/ui/icons/infoBoldIcon';
import { saveRegion, getRegion} from '../../hooks/region';
import {allCountries } from '../../hooks/country';
import router from 'next/router'
import BlockUI from '../../components/common/blockui';
import toast, { Toaster } from 'react-hot-toast';
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
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
        this.state = { block: false, id:null, name: '', code: '', country: null, countries : []};
        this.checkInput = this.checkInput.bind(this)
        this.saveItem = this.saveItem.bind(this)
        this.getParents = this.getParents.bind(this)
    }

    async componentDidMount(){
        var itemId = router.query.id
        if(itemId !=null){
            this.setState({block: true})
            var {response} = await getRegion(itemId)
            if(response?.__typename == 'Region'){
                this.setState({ id: response.id, name: response.name, code: response.code, country: response.country, block:false })
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

    getParents = async() => {
        var {response} = await allCountries()
        if(response){
            this.setState({countries: response.countries})
        }
    }

    checkInput = (e) => {

        e.preventDefault()
        const {name, code, countryId} = this.state
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

        const {id, name, code, country} = this.state

        var {response } = await saveRegion(id, name, code, country?.id)

        if(response?.__typename == 'Region'){
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

        const {country, countries} = this.state

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
        
                                        <div className='text-lg font-semibold text-purple-600'>Formulaire Région</div>
        
                                        <div></div>
        
                                    </div>
        
                                    <div className='app-form overflow-y-auto mt-3 px-5'>
        
                                        <div className='w-full grid grid-cols-5 grid-flow-row gap-6 mt-6'>
        
                                        <div className='col-span-2 px-4 py-4 '>
                                            <div className='flex flex-row'>
                                                <div className='self-center -mb-1 mr-2'><InfoBoldIcon customClass="w-4 h-4"/></div>
                                                <div className='self-center text-xl font-semibold text-gray-900 '>Région</div>
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
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-900">Code <span className='font-bold text-purple-600'>*</span> </label>
                                                <input type="text" value={this.state.code} onChange={(e) => this.setState({code:e.target.value }) } name="name" id="name" autoComplete="title" placeholder="Désignation" className="mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 focus:border-0 focus:ring-2 focus:ring-purple-500 shadow-inner bg-white bg-opacity-90 rounded-md px-2" required/>
                                                <p className="mt-2 text-xs text-gray-600">ⓘ Le code d&#39;une région doit comporter 2 charactères.</p>
                                            </div>

                                            <div className='w-full mb-1'>
                                                <Listbox value={country} onChange={(e) => this.setState({country: e})}>
                                                    {({ open }) => (
                                                        <>
                                                        <Listbox.Label className="block text-sm font-medium text-gray-900">Choisir un pays <span className='font-bold text-purple-600'>*</span></Listbox.Label>
                                                        <div className="mt-1 relative">
                                                            <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm">
                                                                <span className="flex items-center">
                                                                    <span className="ml-3 block truncate">{country ? country.name : 'Choisir un pays'}</span>
                                                                </span>
                                                                <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                                    <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                </span>
                                                            </Listbox.Button>

                                                            <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                                                <Listbox.Options className="absolute sticky mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                                                    {countries.map((item) => (
                                                                    <Listbox.Option key={item.id} className={({ active }) => classNames(active ? 'text-white bg-purple-600' : 'text-gray-900','cursor-pointer select-none relative py-2 pl-3 pr-9')} value={item}>
                                                                        {({ country, active }) => (
                                                                        <>
                                                                            <div className="flex items-center">
                                                                                <span className={classNames(country ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>
                                                                                    {item.name}
                                                                                </span>
                                                                            </div>

                                                                            {country || active &&
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
