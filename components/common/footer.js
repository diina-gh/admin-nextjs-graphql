import React, { Component, useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router'
import FaceIcon from '../ui/icons/faceIcon';
import InstaIcon from '../ui/icons/instaIcon';
import LkdnIcon from '../ui/icons/lkdnIcon';
import TwitterIcon from '../ui/icons/twitterIcon';

export default function Footer(props) {
    return (
        <footer className="w-full bg-gtblack">

            <div className="bg-gtblack gt-bg4 pt-10 md:pt-20 pb-4 px-7 sm:px-16 md:px-20 lg:px-28 xl:px-36 2xl:px-52 w-full">

                <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-10 m-auto mt-2">

                    <div className="col-span-2 md:col-span-1 mb-3 md:mb-0">
                        <div className="w-full flex flex-row justify-center md:justify-start mb-3">
                            <div className="">
                                <span className="block lg:inline-block text-3xl font-bold mt-lg-0 mr-0 mr-md-10 no-underline cursor-pointer text-gray-200">
                                    Untitled
                                </span>
                            </div>
                        </div>

                        <div className="text-gray-300 flex flex-row justify-center md:justify-start">
                            <div className="text-xs flex flex-row">
                                <Link href={'https://web.facebook.com'} >
                                    <div className="ii-social w-6 h-6 border border-gray-300 rounded-full flex flex-row justify-center mr-3 cursor-pointer">
                                        <div className="self-center"><FaceIcon/></div>
                                    </div>
                                </Link>
                                <Link href={'https://twitter.com'} >
                                    <div className="ii-social w-6 h-6 border border-gray-300 rounded-full flex flex-row justify-center mr-3 cursor-pointer">
                                        <div className="self-center"><TwitterIcon /></div>
                                    </div>
                                </Link>
                                <Link href={'https://www.instagram.com'} >
                                    <div className="ii-social w-6 h-6 border border-gray-300 rounded-full flex flex-row justify-center mr-3 cursor-pointer">
                                        <div className="self-center"><InstaIcon/></div>
                                    </div>
                                </Link>
                                <Link href={'https://www.linkedin.com'} >
                                    <div className="ii-social w-6 h-6 border border-gray-300 rounded-full flex flex-row justify-center mr-3 cursor-pointer">
                                        <div className="self-center"><LkdnIcon/></div>
                                    </div>
                                </Link>
                                
                            </div>
                        </div>

                    </div>

                    <div className="">
                        <div className="text-lg font-medium text-white">Contenu</div>
                        <Link href='/'>
                            <div className="text-base text-gray-100 font-normal mt-1 transition duration-700 ease-in-out cursor-pointer">Accueil</div>
                        </Link>
                        <Link href='/'>
                            <div className="text-base text-gray-100 font-normal mt-1 transition duration-700 ease-in-out cursor-pointer">A propos</div>
                        </Link>
                        <Link href='/'>
                            <div className="text-base text-gray-100 font-normal mt-1 transition duration-700 ease-in-out cursor-pointer">Produits</div>
                        </Link>
                        <Link href='/contact'>
                            <div className="text-base text-gray-100 font-normal mt-1 transition duration-700 ease-in-out cursor-pointer">Contact</div>
                        </Link>
                        
                    </div>

                    <div className="">

                        <div className="text-lg font-medium text-white mb-3">Nos catégories</div>
                        <Link href='/catalogue'>
                            <div className="text-base text-gray-100 font-normal mt-1 transition duration-700 ease-in-out cursor-pointer">Téléphone</div>
                        </Link>
                        <Link href='/catalogue'>
                            <div className="text-base text-gray-100 font-normal mt-1 transition duration-700 ease-in-out cursor-pointer">Ordinateur</div>
                        </Link>
                        <Link href='/catalogue'>
                            <div className="text-base text-gray-100 font-normal mt-1 transition duration-700 ease-in-out cursor-pointer">Tablette</div>
                        </Link>
                        <Link href='/catalogue'>
                            <div className="text-base text-gray-100 font-normal mt-1 transition duration-700 ease-in-out cursor-pointer">Accessoire</div>
                        </Link>
                        <Link href='/catalogue'>
                            <div className="text-base text-gray-200 font-normal mt-1 transition duration-700 ease-in-out underline cursor-pointer">Tous les catégories</div>
                        </Link>

                    </div>

                    <div className="">
                        <div className="text-lg font-medium text-white">En savoir plus</div>
                        <Link href='/faqs'>
                            <div className="text-base text-gray-100 font-normal mt-1 transition duration-700 ease-in-out cursor-pointer">FAQ</div>
                        </Link>
                        <Link href='/'>
                            <div className="text-base text-gray-100 font-normal mt-1 transition duration-700 ease-in-out cursor-pointer">Paiement</div>
                        </Link>
                        <Link href='/'>
                            <div className="text-base text-gray-100 font-normal mt-1 transition duration-700 ease-in-out cursor-pointer">Livraison</div>
                        </Link>
                        <Link href='/'>
                            <div className="text-base text-gray-100 font-normal mt-1 transition duration-700 ease-in-out cursor-pointer">Politique de retour</div>
                        </Link>
                        <Link href='/terms'>
                            <div className="text-base text-gray-100 font-normal mt-1 transition duration-700 ease-in-out cursor-pointer">Conditions générales</div>
                        </Link>
                        
                    </div>

                </div>

                <div className="text-center text-xs text-gray-300 font-normal mt-20"> © 2022
                    <span className="text-gray-200 ml-1">Untitled</span> | Created by <Link className="cursor-pointer text-gray-200 hover:text-gray-50 no-underline hover:underline transition duration-700 ease-in-out" href="https://www.linkedin.com/in/seydina-gueye-596b051b0/" target="_blank">Seydina GUEYE</Link>
                </div>
                
            </div>
                
        </footer>
    );
}
