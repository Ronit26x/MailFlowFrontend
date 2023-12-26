"use client"

import Link from "next/link";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link as ScrollLink } from 'react-scroll';

import './Navbar.css'


export default function Navbar(){

    const [_document, set_document] = useState();
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

    useEffect(()=>{
        const accountButton = document.querySelector('.accountButton');
        const accountMenu = document.querySelector('.accountMenu');

        console.log(accountButton + " " + accountMenu)
        if(loggedIn)
            accountButton.addEventListener('click', ()=>{
                console.log("clicked")
                accountButton.classList.toggle('accountButton-active')
                accountMenu.classList.toggle('accountMenu-active')
            })
    }, [])



    const logoutHandler = () => {
        Cookies.remove('isLoggedIn');
        Cookies.remove('Authorization');
        setLoggedIn(false)
    }
    return(
        <div className="h-[10vh] fixed top-0 left-0 flex items-center justify-between w-full px-16 border-b border-[] z-10 bg-white">
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
                    <Link href="/pages/Dashboard" className="text-xl cursor-pointer">Dashboard</Link>
                    <Link href="/pages/UnderConstruction" className="text-xl cursor-pointer">Templates</Link>
                    <div className="relative">
                        <p className="accountButton ">Account</p>
                        <div className="accountMenu">
                            <p className="py-2 font-bold text-xl hover:text-blue-700 cursor-pointer">Arnav Jain</p>
                            <Link href="/pages/Account" className=" py-2 cursor-pointer hover:text-blue-700">Open Account</Link>
                            <p onClick={logoutHandler} className=" py-2 cursor-pointer hover:text-blue-700">Logout</p>
                        </div>
                    </div>
                    
                </ul>
            }
            
        </div>
    );
}