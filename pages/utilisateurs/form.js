import React, { Component, Fragment, useState } from 'react';
import Link from 'next/link'
import { motion } from "framer-motion";
import Header from '../../components/common/header'
import Sidebar from '../../components/common/sidebar'
import HeadInfo from '../../components/common/headinfo'
import ArrowLeftBoldIcon from '../../components/ui/icons/arrowLeftBoldIcon';
import { saveUser, getUser} from '../../hooks/user';
import { saveImage } from '../../hooks/image';
import router from 'next/router'
import BlockUI from '../../components/common/blockui';
import toast, { Toaster } from 'react-hot-toast';
import TrashBoldIcon from '../../components/ui/icons/trashBoldIcon'
import { Listbox, Dialog, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import ImageHolder from '../../components/ui/icons/imageHolder';
import { capitalize } from '../../libs/util';
import TrashIcon from '../../components/ui/icons/trashIcon';
import firebase from "../../config/firebase"
import { allRoles } from '../../hooks/role';

export async function getServerSideProps(context) {
    return {
      props: {},
    }
}

var toastOne ;


class Index extends Component {

    constructor(props){
        super(props);
        this.state = { block: false, id:null,civility: null, firstname: '', lastname: '', email:'', phonenumber: '', password:'', repassword: '', roles: [], chosenRoles: [], opened: false, checkedAll: false, image: null, chosenImage:null, imageref:null, imageId: null};
        this.checkInput = this.checkInput.bind(this)
        this.saveItem = this.saveItem.bind(this)
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.getRoles = this.getRoles.bind(this)
        this.handleImage = this.handleImage.bind(this)
        this.resetImage = this.resetImage.bind(this)
        this.uploadImage = this.uploadImage.bind(this)
        this.saveImageInfo = this.saveImageInfo.bind(this)
    }

    async componentDidMount(){
        var itemId = router.query.id
        if(itemId !=null){
            this.setState({block: true})
            var {response } = await getUser(itemId)
            if(response?.__typename == 'User'){
                this.setState({ id: response.id, civility: response.civility, firstname: response.firstname, lastname: response.lastname, email: response.email, phonenumber:response.phonenumber, image:response.image?.url, chosenImage:response.image?.url, imageref:response.image?.imageref, imageId: response.image?.id })
                var new_roles = []
                for(let i=0; i< response.roles.length; i++){
                    new_roles.push(response.roles[i].role)
                }
                this.setState({chosenRoles: new_roles, block: false})
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
        this.getRoles()
    }

    getRoles = async() =>{
        var {response} = await allRoles()
        if(response){
            this.setState({roles: response.roles})
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

        const {roles} = this.state
        var new_roles = roles

        if(checkAll){
            var results = new_roles.filter(item => item?.selected == true);
            for(var j=0; j< new_roles.length; j++){
                new_roles[j].selected = (results.length != new_roles.length) 
            }
        }
        else{
            new_roles[i].selected = !new_roles[i].selected
        }

        var results = new_roles .filter(item => item?.selected == true);
        this.setState({roles: new_roles, checkedAll: (results.length == new_roles.length)})
        // toast.success('Mise à jour réussie !')
    }

    saveRoles = (e) => {

        e.preventDefault();
        const {roles} = this.state

        var new_choices = roles.filter(item => item.selected == true);

        if(new_choices.length == 0){
            toast.error('Veuillez choisir au moins une role')
            return null
        }

        this.setState({chosenRoles: new_choices, opened: false})
        toast.success('Mise à jour réussie !')
    }

    deleteRole = (e, index) => {
        e.preventDefault()
        const {chosenRoles} = this.state
        var new_roles = chosenRoles
        new_roles.splice(index, 1)
        this.setState({chosenRoles: new_roles});
        toast.success("Role retirée !");
    }

    checkInput = (e) => {

        e.preventDefault()
        const {id, civility, firstname, lastname, email, phonenumber, chosenRoles, password, repassword, image} = this.state
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

        const {id, civility, firstname, lastname, email, phonenumber, chosenRoles, password, repassword} = this.state

        const chosenRoleIds = chosenRoles.map(item => parseInt(item.id));
        var {response } = await saveUser(id, firstname, lastname, email, phonenumber, chosenRoleIds, password, repassword, civility)

        if(response?.__typename == 'AuthPayload'){
            this.handleUpload(response?.user?.id)
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

    handleUpload = (itemId) => {

        const { id, image, chosenImage, imageref, imageId } = this.state

        if(imageref != null){ 
            if(image == chosenImage){
                toast.dismiss()
                toast.success("Mise à jour réussie !", {id: toastOne,});
                this.setState({block: false})
                setTimeout(() => {router.push('./');}, 2250);
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
        var ref = "user_" + itemId
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
        var {response } = await saveImage(imageId, url, ref, null, null, null, null, itemId)

        if(response?.__typename == 'Image'){
            toast.dismiss()
            toast.success("Mise à jour réussie !", {id: toastOne,});
        }
        else if(response?.__typename == 'InputError'){
            toast.dismiss()
            console.log("ImageInfo mutation ", response?.message)
            toast.error("Une erreur s'est produite lors de l'ajout de l'image !", {id: toastOne,});
        }
        else{
            toast.dismiss()
            toast.error("Erreur inconnue. Veuillez vérifier votre connexion internet.", {id: toastOne,});
        }

        this.setState({block: false})
        setTimeout(() => {
            toast.dismiss()
            router.push('./');
        }, 2250);

    };

    render() {
        const {id, roles, chosenRoles, checkedAll, chosenImage} = this.state
        var imageInput;


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
        
                                        <div className='text-lg font-semibold text-purple-600'>Gestion des utilisateurs</div>
        
                                        <div></div>
        
                                    </div>
        
                                    <div className='app-form overflow-y-auto mt-4 px-5'>

                                        <div className='flex flex-row justify-center'>

                                            <div className='flex flex-col'>

                                                <div className='relative bg-gray-50 border-[0.135rem] border-purple-500 h-[6.5rem] w-[6.5rem] rounded-full shadow flex flex-col justify-center cursor-pointer'>
                                                        {chosenImage &&
                                                        <>
                                                            <div onClick={() => this.imageInput.click()} className="w-full h-full absolute top-0 left-0 px-[0.0925rem] py-[0.0925rem]">
                                                                <img className="w-full h-full object-cover rounded-full" src={chosenImage} />
                                                            </div>

                                                            <div onClick={(e) => this.resetImage(e, 'image')} className='bg-gray-300 bg-opacity-80 hover:bg-opacity-90 text-center w-6 h-6 rounded-full shadow flex flex-row justify-center btn-effect1 absolute bottom-1 -right-1 z-10'>
                                                                <div className='self-center'><TrashIcon customClass="w-[0.8rem] h-[0.8rem] text-black" /></div>
                                                            </div>
                                                        
                                                        </>
                                                        }
                                                        <div onClick={() => this.imageInput.click()} className="space-y-1 text-center">
                                                            {!chosenImage && <ImageHolder customClass="mx-auto h-10 w-8 text-gray-400" />}
                                                            <div className="flex text-sm text-gray-600">
                                                                <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-mediu hover:text-opacity-90">
                                                                    <input type="file"  ref={refParam => this.imageInput = refParam} onChange={(e) => this.handleImage(e, 'image')} name="image" id="image" className="sr-only"/>
                                                                </label>
                                                            </div>
                                                        </div>
                                                </div>

                                            

                                            </div>

                                        </div>
        
                                        <div className='w-full grid grid-cols-5 grid-flow-row gap-6 mt-6'>
        
                                            <div className='col-span-3 grid grid-cols-2 grid-flow-row gap-6 bg-gray-200 bg-opacity-60 rounded-xl px-4 py-5'>

                                                <div className="">
                                                    <label htmlFor="civility" className="block text-sm font-medium text-gray-900">Civilité <span className='font-bold text-purple-600'>*</span></label>
                                                    <select id="civility" name="civility" onChange={(e) => this.setState({ civility: e.target.value})} autoComplete="civility" className="form-select mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 shadow-inner bg-white bg-opacity-90 rounded-md focus:border-0 focus:ring-2 focus:ring-purple-500 px-2 decorated" placeholder="Civilité">
                                                        <option  className='' >Choisir</option>
                                                        <option value="MONSIEUR" className='form-option py-3 hover:bg-purple-500 hover:text-white decorated' >Monsieur</option>
                                                        <option value="MADAME" className='form-option py-3 hover:bg-purple-500 hover:text-white' >Madame</option>
                                                    </select>
                                                </div>

                                                <div></div>
            
                                                <div className="">
                                                    <label htmlFor="name" className="block text-sm font-medium text-gray-900">Prénom <span className='font-bold text-purple-600'>*</span> </label>
                                                    <input type="text" value={this.state.firstname} onChange={(e) => this.setState({firstname:e.target.value }) } name="firstname" id="firstname" autoComplete="title" placeholder="Désignation" className="mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 focus:border-0 focus:ring-2 focus:ring-purple-500 shadow-inner bg-white bg-opacity-90 rounded-md px-2" required/>
                                                </div>

                                                <div className="">
                                                    <label htmlFor="name" className="block text-sm font-medium text-gray-900">Nom <span className='font-bold text-purple-600'>*</span> </label>
                                                    <input type="text" value={this.state.lastname} onChange={(e) => this.setState({lastname:e.target.value }) } name="lastname" id="lastname" autoComplete="title" placeholder="Désignation" className="mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 focus:border-0 focus:ring-2 focus:ring-purple-500 shadow-inner bg-white bg-opacity-90 rounded-md px-2" required/>
                                                </div>

                                                <div className="">
                                                    <label htmlFor="name" className="block text-sm font-medium text-gray-900">Téléphone<span className='font-bold text-purple-600'>*</span> </label>
                                                    <input type="text" value={this.state.phonenumber} onChange={(e) => this.setState({phonenumber:e.target.value }) } name="phonenumber" id="phonenumber" autoComplete="title" placeholder="Désignation" className="mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 focus:border-0 focus:ring-2 focus:ring-purple-500 shadow-inner bg-white bg-opacity-90 rounded-md px-2" required/>
                                                </div>

                                                <div className="">
                                                    <label htmlFor="name" className="block text-sm font-medium text-gray-900">Adresse email<span className='font-bold text-purple-600'>*</span> </label>
                                                    <input type="text" value={this.state.email} onChange={(e) => this.setState({email:e.target.value }) } name="email" id="email" autoComplete="title" placeholder="Désignation" className="mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 focus:border-0 focus:ring-2 focus:ring-purple-500 shadow-inner bg-white bg-opacity-90 rounded-md px-2" required readOnly={id!=null}/>
                                                </div>

                                                <div className="">
                                                    <label htmlFor="name" className="block text-sm font-medium text-gray-900">Mot de passe<span className='font-bold text-purple-600'>*</span> </label>
                                                    <input type="password" value={this.state.password} onChange={(e) => this.setState({password:e.target.value }) } name="password" id="password" autoComplete="password" placeholder="Désignation" className="mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 focus:border-0 focus:ring-2 focus:ring-purple-500 shadow-inner bg-white bg-opacity-90 rounded-md px-2"/>
                                                </div>

                                                <div className="">
                                                    <label htmlFor="name" className="block text-sm font-medium text-gray-900">Confirmer le mot de passe<span className='font-bold text-purple-600'>*</span> </label>
                                                    <input type="password" value={this.state.repassword} onChange={(e) => this.setState({repassword:e.target.value }) } name="repassword" id="repassword" autoComplete="password" placeholder="Désignation" className="mt-1 h-10 w-full shadow-sm text-sm border border-gray-400 focus:border-0 focus:ring-2 focus:ring-purple-500 shadow-inner bg-white bg-opacity-90 rounded-md px-2"/>
                                                </div>            
                                                
                                            </div>

                                            <div className='col-span-2'>

                                                <div className='bg-gray-200 bg-opacity-60 rounded-xl py-5'>

                                                    <div className='mb-3 ml-0.5 flex flex-row px-4'>
                                                        <div className='text-base font-medium text-purple-600 mr-1 self-center'>Roles</div>
                                                        <div className='px-2 py-[0.45px] text-[10.325px] font-medium bg-purple-500 bg-opacity-80 text-white rounded-xl self-center'>{chosenRoles?.length}</div>
                                                    </div>

                                                    <div className='w-full h-[15rem] overflow-y-auto px-5'>

                                                        {chosenRoles?.length == 0 ?

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
                                                                        {chosenRoles.map((item, i) => (
                                                                            <tr key={item.id} className={(i%2==0) ? "" : "bg-gray-100 bg-opacity-50"}>
                                                                                <td className="px-6 py-3 whitespace-nowrap">
                                                                                    <div className="text-sm text-gray-900">{i+1}</div>
                                                                                </td>
                                                                                <td className="px-6 py-3 whitespace-nowrap">
                                                                                    <div className="text-sm text-gray-900 self-center">{item.name}</div>
                                                                                </td>
                                                                                
                                                                                <td className="px-2 py-3 whitespace-nowrap text-right flex flex-row justify-end">

                                                                                    <div className="self-center">
                                                                                        <button  onClick={(e) => this.deleteRole(e, i)} className="w-6 h-6 rounded-full border border-iiblack gt-shadow5 flex flex-row justify-center cursor-pointer btn-effect1 bg-gray-100 hover:bg-gray-200 active:bg-gray-30">
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
                                                        <div className='text-sm font-medium text-gray-100 hover:text-white self-center tracking-wide'>Ajouter des users</div>
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
                                                <form user="form" method="post" onSubmit={(e) => this.saveRoles(e)}>
                                                    <div className="mt-2" >

                                                        <div className="px-3 w-full text-center text-lg font-medium text-purple-500">Liste des roles</div>

                                                        <div className="bg-white sm:p-6 h-[28rem] overflow-y-auto">


                                                            <div className="w-full mt-1">

                                                                <div className='w-full h-[2.5rem]'>
                                                                    <input type="search" className='w-full h-full px-4 focus:ring-0 text-sm border-0 bg-gray-200 bg-opacity-60 rounded-full shadow-inner border border-gray-200' placeholder='Rechercher une role ...' />
                                                                </div>

                                                                <div className='mt-5'>

                                                                    <div className='mb-3 text-[0.915rem] font-medium text-gray-900'>Sélectionner un ou plusieurs users</div>

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
                                                                                    {roles.map((item, i) => (
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
