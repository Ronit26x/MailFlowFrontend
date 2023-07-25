'use client'

import Link from "next/link";
import Lottie from 'lottie-react';
import signupLoginAnimation from '../Signup/assets/signupLoginAnimation.json'
import {useState, useEffect } from 'react'
import Cookies from "js-cookie"


import './login.css';
import { useRouter } from "next/navigation";

const axios = require('axios');

export default function Login(){
    const router = useRouter();

    const [loginError, setLoginError] = useState(false)

    const [_document, set_document] = useState(null)
    useEffect(() => {
        set_document(document)
    }, [])

    const form = document.querySelector('.loginForm');

    const loginHandler = event =>{
        event.preventDefault()

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        const loginDetails = JSON.stringify(data);

        axios.post('http://localhost:4000/signin', data, {
            headers: {
            'x-api-key': "54321a",
          }
        })
        .then(response => {
            Cookies.set('Authorization', response.data.token, { expires: 1 });           
            if(response.data.token && response.status == 200){
                Cookies.set('isLoggedIn', true, {
                    expires: 1,
                    path: '/',
                    // httpOnly: true, // Cookie cannot be accessed by client-side JavaScript
                    // secure: true, // Cookie can only be sent over HTTPS (requires SSL/TLS)
                    // sameSite: 'strict',
                });
                router.push('/pages/Dashboard')
                setLoginError(false)
            }
        })
        .catch(error => {
            setLoginError(true)
        });   
    }
    return(
        <main className="w-full min-h-[90vh] flex items-center justify-center gap-16">
            {
                loginError && <>
                    <p className="fixed top-[11vh] left-50% text-white rounded-2xl text-xl p-4 bg-blue-700 z-10">Unable to login. Try Again.</p>
                </>
            }

            <div className="signupContainer flex flex-col gap-6 p-4  ">
                <h1 className='font-semibold text-3xl flex px-8'>Login</h1>
                <form onSubmit={loginHandler} className='loginForm flex flex-col gap-3'>
                    <div>
                        <p>Email*</p>
                        <input name="loginEmail" type='email' required></input>
                    </div>
                    
                    <div>
                        <p>Password*</p>
                        <input name="loginPassword" type='password' required></input>
                    </div>
                    <p className="font-semibold flex flex-row-reverse mr-8 cursor-pointer">Forgot Password?</p>
                    <button type='submit' className='w-[300px] h-[40px] bg-blue-700 mx-auto rounded-[10px] text-white mt-2'>Create account.</button>
                </form>
                <p>Dont have an account? <span><Link href="../pages/Signup" className='text-blue-700'>Sign up.</Link></span></p>
            </div>
            <div className="flex flex-col items-center justify-center">
                <Lottie animationData={signupLoginAnimation} loop={true} className='h-[50vh]' />  
                <p className='text-2xl font-semibold'>Your mail organiser.</p>
            </div>       
        </main>
    );
}