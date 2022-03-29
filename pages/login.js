import React, { Component, useState } from 'react';
import { LockClosedIcon } from '@heroicons/react/solid'
import router from 'next/router'
import Head from 'next/head'
import BlockUI from '../components/common/blockui';
import toast, { Toaster } from 'react-hot-toast';
import HeadInfo from '../components/common/headinfo';
import { login } from '../hooks/user';
import Cookies from 'js-cookie'

var toastOne ;

export async function getServerSideProps(context) {
    return {
      props: {},
    }
}

class Login extends Component({error}) {

  constructor(props){
    super(props);
    this.state = { email: '', password: '', block: false};
    this.handleChange = this.handleChange.bind(this);
    this.checkInput = this.checkInput.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
        [name]: value
    });
  }

  signIn = async () => {

    const {email, password} = this.state

    var {response } = await login(email, password)

    if(response?.__typename == 'AuthPayload'){
        Cookies.set('userToken', response.token)
        Cookies.set('username', response.user.firstname)
        Cookies.set('user_mail', response.user.email)
        Cookies.set('user_image', response.user.image.url)
        toast.dismiss()
        router.push('/')
    }
    else if(response?.__typename == 'InputError'){
        toast.dismiss()
        this.setState({block: false})
        toast.error(response?.message, {id: toastOne,});
    }
    else{
        toast.dismiss()
        this.setState({block: false})
        toast.error("Erreur inconnue. Veuillez vérifier votre connexion internet.", {id: toastOne,});
    }
};

  checkInput = (e) => {

    e.preventDefault();

    const {email, password} = this.state

    var error = null;
    toast.dismiss()

    if(!navigator.onLine){
        error = "Aucun accès à Internet"
    }
    else if(email == ''){
        error = "Veuillez donner votre adresse email";
    }
    else if(password == ''){
        error = "Veuillez donner votre mot de passe";
    }

    if(error != null){
        toast.error(error, {id: toastOne,});
        this.setState({block: false})
        return null
    }
    else{
        toast.loading("Veuillez patienter svp...", {id: toastOne,});
        this.setState({block: true})
        this.signIn()
    }

  }

  render() {

    return (
      <div className="full-height bg-p4 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">

        <HeadInfo title= 'Login' description='description here'/>
        <Toaster position='top-right' />


      <div className="absolute bottom-3 left-0 px-8 sm:px-20 w-full text-center text-[0.775rem] text-white font-normal py-2"> © Copyright 2022 <span className="text-gray-200">Untitled</span> | Created by <a className="cursor-pointer text-gray-200 hover:text-iired no-underline hover:underline transition duration-700 ease-in-out" href="https://www.linkedin.com/in/seydina-gueye-596b051b0/" target="_blank" rel="noreferrer">Seydina GUEYE</a></div>

        <div className="rounded-md shadow-xl bg-gray-100 bg-opacity-75 px-8 sm:px-16 py-8 sm:py-10">

          <BlockUI blocking={this.state.block} />

          <div>
            <img className="mx-auto h-12 w-auto" src="favicon.ico"/>
            <h2 className="mt-6 text-center text-xl font-bold text-gray-900">Connectez-vous à votre compte</h2>
          </div>
          <form className="max-w-md mt-8 space-y-6 w-72 sm:w-80" method="POST" onSubmit={(e) => this.checkInput(e)}>
            <div className="rounded-md -space-y-px">
              <div className='mb-4'>
                <label htmlFor="email-address" className="sr-only"> Identifiant</label>
                <input value={this.state.email} onChange={(e) => this.setState({ email: e.target.value})} id="email-address" name="email" type="email" autoComplete="email" required className="h-11 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none bg-white focus:border-0 focus:ring-2 focus:ring-purple-500 text-sm font-medium bg-opacity-75" placeholder="Adresse email"/>
              </div>
              <div className="">
                <label htmlFor="password" className="sr-only">Mot de passe</label>
                <input value={this.state.password} onChange={(e) => this.setState({ password: e.target.value})} id="password" name="password" type="password" autoComplete="current-password" required className="h-11 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none bg-white focus:border-0 focus:ring-2 focus:ring-purple-500 text-sm font-medium bg-opacity-75" placeholder="Mot de passe"/>
              </div>
            </div>

            <div>
              <button type="submit" className="btn-effect1 group relative h-12 w-full flex justify-center px-4 border text-lg font-medium rounded-md text-white bg-gray-900 hover:bg-purple-600 focus:outline-none">
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-gray-300 group-hover:text-gray-100" aria-hidden="true" />
                </span>
                <span className="self-center text-gray-100">Se connecter</span>
              </button>
            </div>

          </form>
        </div>

    </div>
    )
  }

}

export default Login