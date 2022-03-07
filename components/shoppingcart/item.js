import React, { useRef, useState } from "react";
import Console from "../product/console";


export default function Item(props) {

    return (
        <li key={props.product.id} className="py-6 flex">
            <div className="flex-shrink-0 w-24 h-24 flex flex-row justify-center rounded-xl bg-gray-400 bg-opacity-20 overflow-hidden cursor-pointer">
                <div className='p-image4 self-center'>
                    <img src={props.product.imageSrc} alt={props.product.imageAlt} />
                </div>
            </div>
    
            <div className="ml-4 flex-1 flex flex-col">
    
                <div>
                    <div className="flex justify-between text-base font-medium text-gray-100">
                        <h3 className="cursor-pointer gt-hover-text-gradient">
                            <a href={props.product.href}>{props.product.name}</a>
                        </h3>
                        <p className="ml-4">{props.product.price}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-400">{props.product.color}</p>
                </div>
    
                <div className="flex-1 flex items-end justify-between text-sm">
    
                    <Console />
    
                    <div className="flex">
                        <button type="button" className="font-medium text-red-600 hover:text-red-500">
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </li>
      )
}