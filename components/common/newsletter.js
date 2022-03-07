import React from 'react';

export default function Newsletter(props) {
        return (

            <section className="w-full py-16 px-4 sm:px-16 md:px-20 lg:px-24 xl:px-28 2xl:px-48 my-5 md:my-10">

                <div className='w-full h-56 md:h-72 gt-bg4 rounded-2xl'>
        
                <form className='w-full h-full flex flex-col justify-center rounded-xl' method="post" onSubmit=''>
                    <div className="w-full bg-opacity-0 flex flex-col justify-center self-center" >
                        <div className="text-xl md:text-4xl text-center font-medium text-white">Abonnez-vous à notre newsletter</div>
                        <div className="text-xs md:text-lg text-center font-normal hidden lg:block text-gray-200 mt-1">Soyez les premiers informés de nos promotions, offres et nouveautés.</div>
                        <div className="w-full flex flex-row justify-center my-5">
                            <div className="w-10/12 md:w-1/2 h-12 md:h-14 bg-white opacity-100 shadow-xl rounded-md px-2 py-2 flex flex-row justify-between border-1 border-gray-200 border-opacity-40">
                                <div className="h-full w-8/12 md:w-3/4 2xl:w-5/6">
                                    <input className="border-0 focus:ring-0 h-full w-full px-2 md:px-4 text-sm md:text-base" type="email" id="" name="" placeholder="Ecrire votre adresse email.." required />
                                </div>
                                <div className="h-full w-4/12 md:w-1/4 2xl:w-1/6 gt-btn-type1 cursor-pointer rounded-md opacity-100 flex flex-col justify-center">
                                    <button type="submit" className="text-center text-white text-sm md:text-base">S&#039;inscrire</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
        
                </div>
    
          </section>
        );
}
