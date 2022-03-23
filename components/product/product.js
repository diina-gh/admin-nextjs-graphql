import React from 'react';
import Link from 'next/link'
import { ShoppingCartIcon } from '@heroicons/react/outline'
import CartAddIcon from '../ui/icons/cartAddIcon';
import { motion } from "framer-motion";


export default function Product(props) {
    return (
        <motion.div initial={{ opacity: 0, y: ( Math.random() * 15) }} whileInView={{ opacity: 1, y: 0, transition: { duration: 1.05 }, }}>

            <div key={props.product.id}  className="w-full pt-1 pb-5 rounded-xl bg-gray-200 bg-opacity-80 cursor-pointer relative">

                <div className="form-check absolute top-[0.65rem] right-[0.65rem]">
                    <input type="checkbox" value="" className="form-check-input rounded-md appearance-none h-[0.765rem] w-[0.765rem] border border-purple-300 rounded-full bg-gray-100 checked:bg-purple-600 checked:border-purple-600 text-purple-500 focus:outline-none focus:border-0 focus:ring-2 focus:ring-purple-500 transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer"  />
                </div>

                <div className='w-full h-[6rem] flex flex-row justify-center'>
                    <div className='max-h-[4rem] max-w-[3.75rem] self-center'>
                        <img className='w-full h-full' src={props.product.image} />
                    </div>
                </div>

                <div className='w-full mt-2 px-3'>
                    <div className='w-full text-gray-500 text-[0.65rem] font-medium'>{props.product.category}</div>
                    <div className='w-full flex mt-1'>
                        <div className='self-center w-full'>
                            <div className='w-full text-gray-900 text-sm font-semibold truncate'>{props.product.name}</div>
                            <div className='w-full text-gray-800 text-xs font-medium mt-1'>{props.product.price}</div>
                        </div>
                    </div>
                </div>

            </div>

        </motion.div>
    );
}
