import React, { useRef, useState } from "react";
import BadgeType0 from "../ui/Badges/badgeType0";
import ButtonType0 from "../ui/Buttons/buttonType0";
import ButtonType4 from "../ui/Buttons/buttonType4";
import { motion } from "framer-motion";


export default function Offre(props) {

  return (

        <section className="flex justify-center px-7 sm:px-16 md:px-20 lg:px-24 xl:px-28 2xl:px-48 mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-20 items-center">

                <div className="">
                    <motion.div 
                        initial={{ opacity: 75 }}
                        whileInView={{ opacity: 1, transition: { duration: 1.25 }, }}
                    >
                        <img className="w-full float-right mt-5 md:mt-0" src={props.image} />

                    </motion.div>
                </div>

                <div className="mt-4 md:mt-0">
                
                    <div className="sm:text-center lg:text-left">

                        <motion.div initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0, transition: { duration: 0.60 }, }}>
                            <BadgeType0 text="Offres" />
                        </motion.div>


                        <motion.div initial={{ opacity: 0, x: 150 }} whileInView={{ opacity: 1, x: 0, transition: { duration: 0.70 }, }}>
                            <h1 className="w-full text-2xl sm:text-4xl md:text-6xl tracking-tight font-semibold text-gray-900 mt-8">
                                <span className="block xl:inline">{props.title}</span>
                            </h1>                    
                        </motion.div>
                        

                        <motion.div initial={{ opacity: 0, x: 200 }} whileInView={{ opacity: 1, x: 0, transition: { duration: 0.80 }, }}>
                            <p className="mt-6 text-base text-gray-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-6 md:text-xl lg:mx-0">{props.description}</p>
                        </motion.div>
                        
                        <div className="mt-6 sm:mt-10 flex flex-row justify-start">
                            {/* <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1, transition: { duration: 0.77 }, }}> */}
                                <ButtonType0 text="Commander" mr='8px' />
                            {/* </motion.div> */}
                            {/* <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1, transition: { duration: 0.77 }, }}> */}
                                <ButtonType4 text="En savoir +" />
                            {/* </motion.div> */}
                        </div>

                    </div>

                </div>

            </div>

        </section>

  );
}
