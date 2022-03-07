import React from 'react';

export default function EnvelopeBoldIcon(props) {
    return (
        <span className='relative'>

            <svg xmlns="http://www.w3.org/2000/svg" id="Bold" viewBox="0 0 26 22" className={props.customClass} fill="currentColor">
                <path d="M18.5,1H5.5A5.506,5.506,0,0,0,0,6.5v11A5.506,5.506,0,0,0,5.5,23h13A5.506,5.506,0,0,0,24,17.5V6.5A5.506,5.506,0,0,0,18.5,1Zm0,3a2.476,2.476,0,0,1,1.643.631l-6.5,6.5a2.373,2.373,0,0,1-3.278,0l-6.5-6.5A2.476,2.476,0,0,1,5.5,4Zm0,16H5.5A2.5,2.5,0,0,1,3,17.5V8.017l5.239,5.239a5.317,5.317,0,0,0,7.521,0L21,8.017V17.5A2.5,2.5,0,0,1,18.5,20Z"/>
            </svg>

            <span class="animate-ping transition duration-1000 ease-in-out absolute top-0 right-0 inline-flex w-1 h-1 rounded-full bg-purple-900"></span>

        </span>

    );
}