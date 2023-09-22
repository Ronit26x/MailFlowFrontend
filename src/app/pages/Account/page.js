"use client"

import Lottie from "lottie-react";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Link from "next/link";

import accountHelloAnimation from './assets/animation_lk9srpas.json';
import loginAnimation from 'src/assets/animation_lmu618a3.json';

export default function Account(){

    const [loggedIn, setLoggedIn] = useState('false')
    useEffect(()=>{
        setInterval(()=>{
            const isLoggedIn = Cookies.get('isLoggedIn');
            setLoggedIn(isLoggedIn)  
        }, 1000) 
    }, [])

    return(
        <div>
            {
                loggedIn ? (<section className="min-h-[90vh] py-4 px-16">
                <div className="flex items-center gap-8">
                    <h1 className="text-6xl font-bold">Hello, Arnav Jain</h1>
                    <Lottie animationData={accountHelloAnimation} className="h-[20vh]"/>
                </div>
                <div className="grid grid-flow-col col-span-3 gap-8 mt-8">
                    <div className="flex flex-col">
                        <div className="containerShadow bg-[#ececec] h-[350px] w-[350px] rounded-3xl"></div>
                        <button className="containerShadow bg-[#ececec] h-[50px] w-[350px] mt-8 rounded-2xl text-center">Change image</button>
                    </div>
                    <div className="containerShadow min-w-[1000px] rounded-3xl p-4">
                        <h1 className="text-3xl font-bold">Account Details</h1>
                    </div>
                </div>
            </section>
            ) : ( 
            <div className='h-[90vh] flex flex-col items-center justify-center'>
                <Lottie animationData={loginAnimation} className="h-[50vh] -mt-16" />
                <h1 className=' text-2xl font-semibold -mt-16'>Log in to view your account details.</h1>
                <Link href='/pages/Login' className='bg-blue-700 px-20 py-4 text-xl text-white rounded-2xl mt-4' >Log in</Link>
            </div>
            )
            }
        </div>
    );
}