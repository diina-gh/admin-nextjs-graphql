import React, { Component,Fragment, useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router'
import CalendarBoldIcon from '../ui/icons/calendarBoldIcon';
import BellBoldIcon from '../ui/icons/bellBoldIcon';
import CommentBoldIcon from '../ui/icons/commentBoldIcon';
import MenuBurgerIcon from '../ui/icons/menuBurgerIcon';
import { SideNav } from './sidebar';
import Cookies from 'js-cookie'


export default function Header(props) {

    const router = useRouter();
    const [open, setOpen] = useState(false)

    const username = Cookies.get('username')
    const user_image = Cookies.get('user_image')
    const user_mail = Cookies.get('user_mail')


    const onOpenChange = (SideNavData) => {
        setOpen(SideNavData);
    }

    return (
        <header className="h-14 w-full bg-white flex flex-row justify-between px-[0.885rem] md:px-6 2xl:px-8 shadow-sm" >

            <div className='flex flex-row self-center '>

                <div className='w-60 flex flex-row self-center'>

                    <div className="flex flex-row self-center cursor-pointer">
                        
                        <div className="text-gray-800 self-center md:hidden mr-2">
                            <button onClick={() => setOpen(true)} className="flex items-center px-[0.35rem] py-[0.35rem] border rounded border-gray-400 shadow focus:outline-none">
                                <MenuBurgerIcon customClass="fill-current h-[0.85rem] w-[0.85rem] text-gray-700" />
                            </button>
                        </div>

                        <div className='h-8 w-8 rounded-full mr-2 self-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
                        </div>

                        <div className='text-2xl logo-text1 font-bold self-center'>Untitled</div>

                    </div>

                   

                </div>

                <div className='self-center text-xl font-semibold ml-5'>
                    {/* Dashboard */}
                </div>

            </div>

            <div className='flex flex-row self-center'>

                <div className='h-8 rounded-md th-bg-1 text-gray-900 flex flex-row px-3 mr-3 hidden'>
                    <div className='w-4 h-4 self-center mr-2'>
                        <CalendarBoldIcon customClass="w-full h-full" />
                    </div>
                    <div className='text-xs font-semibold self-center'>07 Mars 2021</div>
                </div>

                <div className='w-8 h-8 th-bg-1 text-gray-900 rounded-full flex flex-row justify-center mr-3'>
                    <div className='w-4 h-4 self-center'>
                        <CommentBoldIcon customClass="w-full h-full" />
                    </div>
                </div>

                <div className='w-8 h-8 th-bg-1 text-gray-900 rounded-full flex flex-row justify-center mr-3'>
                    <div className='w-4 h-4 self-center'>
                        <BellBoldIcon customClass="w-full h-full" />
                    </div>
                </div>

                <div className='w-8 h-8 th-bg-1 border-2 border-purple-600 px-[0.035rem] py-[0.035rem] rounded-full flex flex-row justify-center'>
                    <img className='w-full h-full object-cover rounded-full' src={user_image} />
                </div>

            </div>

            <SideNav open={open} onOpenChange={onOpenChange} />
        
        </header>
    );
}
