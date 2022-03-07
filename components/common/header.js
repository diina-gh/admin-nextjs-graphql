import React, { Component,Fragment, useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { BellIcon } from '@heroicons/react/solid';
import CalendarBoldIcon from '../ui/icons/calendarBoldIcon';
import BellBoldIcon from '../ui/icons/bellBoldIcon';

export default function Header(props) {

    const router = useRouter();

    return (
        <header className="h-14 w-full bg-white flex flex-row justify-between px-6 shadow-sm" >

            <div className='flex flex-row self-center '>

                <div className='w-60 flex flex-row self-center'>

                    <div className='h-8 w-8 rounded-full mr-2 self-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
                    </div>

                    <div className='text-2xl gt-title font-bold self-center'>Untitled</div>

                </div>

                <div className='self-center text-xl font-semibold ml-5'>
                    Dashboard
                </div>

            </div>

            <div className='flex flex-row self-center'>

                <div className='h-8 rounded-md bg-gray-300 bg-opacity-50 text-gray-900 flex flex-row px-3 mr-3'>
                    <div className='w-4 h-4 self-center mr-2'>
                        <CalendarBoldIcon customClass="w-full h-full" />
                    </div>
                    <div className='text-xs font-semibold self-center'>07 Mars 2021</div>
                </div>

                <div className='w-8 h-8 bg-gray-300 bg-opacity-50 text-gray-900 rounded-full flex flex-row justify-center mr-3'>
                    <div className='w-4 h-4 self-center'>
                        <BellBoldIcon customClass="w-full h-full" />
                    </div>
                </div>

                <div className='w-8 h-8 bg-gray-300 bg-opacity-60 text-gray-600 rounded-full flex flex-row justify-center'>
                    
                </div>

            </div>
        
        </header>
    );
}
