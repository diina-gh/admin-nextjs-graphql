import React, { useRef, useState } from "react";
import CartAddIcon from '../icons/cartAddIcon';


export default function ButtonType1(props) {

  return (
    <div className={'h-12 md:h-14 flex flex-row justify-center rounded-md shadow-xl text-base md:text-lg xl:text-xl font-medium text-white gt-btn-type1 cursor-pointer' + ' '  + props.customClass}>
        <div className="flex flex-row self-center">
            <CartAddIcon customClass='h-4 w-4 md:h-5 md:w-5 xl:h-6 xl:w-6 self-center mr-3' />
            <div className='self-center'>{props.text}</div>
        </div>
    </div>
  );
}
