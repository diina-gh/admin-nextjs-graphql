import React, { Component,Fragment, useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router'


export default function Header(props) {

    const router = useRouter();

    return (
        <header className="h-14 w-full bg-white flex flex-row justify-between px-4 shadow-sm" >

            <div className='h-10 flex flex-row self-center '>

                <div className='h-8 w-8 rounded-md mr-2 self-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
                </div>

                <div className='text-2xl gt-title font-bold self-center'>Untitled</div>


            </div>
        
        </header>
    );
}
