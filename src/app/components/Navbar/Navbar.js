"use client"

import Link from "next/link";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

import './Navbar.css'


export default function Navbar(){

    const [_document, set_document] = useState(null);
    useEffect(() => {
        set_document(document)
    }, [])


    const [loggedIn, setLoggedIn] = useState('false')
    useEffect(()=>{
        setInterval(()=>{
            const isLoggedIn = Cookies.get('isLoggedIn');
            setLoggedIn(isLoggedIn)  
        }, 1000) 
    }, [])

    // const accountButton = document.querySelector('.accountButton');
    // const miniAccountSettings = document.querySelector('.miniAccountSettings')
    // accountButton.addEventListener('click', ()=>{
    //     miniAccountSettings.classList.add('miniAccountSettings-active');
    // })

    return(
        <div className="h-[10vh] fixed top-0 left-0 flex items-center justify-between w-full px-16 border-b border-gray-500 z-10 bg-white">
            <Link href="/" className=" text-3xl font-semibold">mailflow.<span className="text-blue-700">ai</span></Link>

            {
                !loggedIn && 
                <ul className="flex items-center gap-6">
                    <li><Link href="../pages/Signup" className="text-xl" >Signup</Link></li>
                    <li><Link href="../pages/Login" className="text-xl rounded-full bg-blue-700 px-8 py-3 text-white">Login</Link></li>
                </ul>
            }

            {
                loggedIn && 
                <ul className="flex items-center gap-6">
                    <li className="text-xl cursor-pointer" >Paraphraser</li>
                    <li className="text-xl cursor-pointer" >Drafts</li>
                    <div className="relative">
                        <li className="accountButton cursor-pointer text-xl rounded-full bg-blue-700 px-8 py-3 text-white">Account</li>
                        <div className="miniAccountSettings">
                            <p>Open Account</p>
                            <p>Logout</p>
                        </div>
                    </div>
                    
                </ul>
            }
            
        </div>
    );
}