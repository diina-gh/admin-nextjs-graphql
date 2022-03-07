import React, { useRef, useState } from "react";

export default function ButtonType4(props) {

  return (
    <div style={{marginRight: props.mr ? props.mr : 0 }} className='px-6 h-12 md:h-14 flex flex-row justify-center text-base md:text-lg font-medium text-gtpurple hover:text-gtblue duration-700 ease-in-out cursor-pointer'>
        <div className='self-center underline'>{props.text}</div>
    </div>
  );
}
