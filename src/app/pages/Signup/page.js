"use client"

import Link from 'next/link';
import './signup.css'
import Lottie from "lottie-react";
import signupLoginAnimation from './assets/signupLoginAnimation.json'
import { useState } from 'react';

export default function Signup(){

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);   

    const form = document.querySelector('.signupForm');

    const signupHandler = event =>{
        event.preventDefault();

        if (password === confirmPassword)
          setPasswordsMatch(true);
        else 
          setPasswordsMatch(false);
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        const signupDetails = JSON.stringify(data);

        console.log(signupDetails)
    }

    return(
        <main className="w-full min-h-[90vh] flex items-center justify-center gap-16">
            <div className="signupContainer flex flex-col gap-6 p-4  ">
                <h1 className='font-semibold text-2xl flex px-8'>Signup</h1>
                <form onSubmit={signupHandler} className='signupForm flex flex-col gap-3'>
                    <div>
                        <p>Username*</p>
                        <input name='username' type='text' className='text-center' required></input>
                    </div>
                    <div>
                        <p>Email*</p>
                        <input name='email' type='email' className='text-center' required></input>
                    </div>
                    <div>
                        <p>Phone Number</p>
                        <input name='phoneNumber' type='text' className='text-center' maxLength={10}></input>
                    </div>
                    <div>
                        <p>Password*</p>
                        <input name='password' type='password' className='text-center' onChange={(event) => setPassword(event.target.value)} required></input>
                    </div>
                    <div>
                        <p>Confirm Password*</p>
                        <input type='password' className='text-center' onChange={(event) => setConfirmPassword(event.target.value)} required></input>
                    </div>

                    {!passwordsMatch && <p className='font-semibold text-red-500'>Passwords do not match</p>}

                    <button type='submit' className='w-[300px] h-[40px] bg-blue-700 mx-auto rounded-[10px] text-white mt-2'>Create account.</button>
                </form>
                <p>Already have an account? <span><Link href="../pages/Login" className='text-blue-700'>Log in.</Link></span></p>
            </div>
            <div className="flex flex-col items-center justify-center">
                <Lottie animationData={signupLoginAnimation} loop={true} className='h-[50vh]' />  
                <p className='text-2xl font-semibold'>Your mail organiser.</p>
            </div>       
        </main>
    );
}