"use client"

import './dashboard.css'

import Lottie from "lottie-react";
import EmailSendAnimation from "./assets/animation_lk1ht47q.json"
import DraftsAnimation from "./assets/animation_lk30q3yq.json"
import Drafts from './components/Drafts/Drafts';

import { useState, useEffect } from 'react';

const axios = require('axios');


export default function Dashboard(){

    const [_document, set_document] = useState(null);
    useEffect(() => {
        set_document(document)
    }, [])

    const form = document.querySelector('.promptForm');
    const finalEmail = document.querySelector('.paraphrasedEmail')

    const promptGenerateHandler = (event) =>{
        event.preventDefault();
        const formData = new FormData(form);
        const promptData = Object.fromEntries(formData);

        console.log(promptData)

        axios.post('http://localhost:4000/genemail', promptData, {
                headers: {
                  'x-api-key': "54321a"
                }
        })
        .then(response => {
            finalEmail.innerHTML = response.data;
        })
    }

    const draftAdditionHandler = (req,res) =>{
        const draftEmail = finalEmail.innerHTML;
        const EmailTitle = document.querySelector('.paraphrasedEmailTitle').value;
        const draft = {
            "draft": draftEmail,
            "title": EmailTitle
        }
        const getCookieValue = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
          };
        
        console.log(draft);
        const authcookie = getCookieValue('Authorization');
        axios.post('http://localhost:4000/saveDraft', draft, {
                headers: {
                  'x-api-key': "54321a",
                  'Authorization': decodeURIComponent(authcookie),
                }
        })
        .then(response => {
            console.log(response.status)
        })
    }

    return(
        <main className="min-h-[90vh] px-16">
            <section className='paraphraserSection' id='paraphraserSection'>
                <div className="flex items-center justify-center">
                    <p className="text-5xl font-bold">Paraphrase your next email!</p>
                    <Lottie animationData={EmailSendAnimation} className="h-[20vh]" />
                </div>
                <div className="flex items-center justify-center gap-4">
                    <form onSubmit={promptGenerateHandler} className="promptForm containerShadow w-[550px] h-[500px] rounded-3xl">
                        <div className="w-full h-[50px] rounded-t-3xl bg-[#ececec] flex items-center px-4 text-xl font-semibold">
                            <p>Enter your prompt below.</p>
                        </div>
                        <textarea name='emailContent' className="paraphraseInput" type="text" placeholder="Go ahead, give me a prompt."></textarea>
                        <label className="px-7 text-lg">Select a tone for the mail.</label>
                        <div className="moodSelector flex justify-center">
                            <textarea name='emailContext' className="h-[50px] w-[350px] bg-[#ececec] rounded-s-2xl resize-none" placeholder="Formal, Casual, etc"></textarea>
                            <button className=" rounded-e-2xl bg-[#4052f2] w-[150px] text-white cursor-pointer" type="submit">Generate</button>
                        </div>
                    </form>
                    <form className="containerShadow paraphrasedEmailContainer w-[550px] h-[500px]  rounded-3xl">
                        <textarea name='EmailTitle' placeholder='Paraphrased email (Click to change title)' className="paraphrasedEmailTitle w-full h-[50px] rounded-t-3xl bg-[#ececec] flex items-center px-4 text-xl font-semibold resize-none"></textarea>
                        <textarea name='paraphrasedEmail' placeholder='Dear abcdefg.........' className='paraphrasedEmail resize-none h-[350px] w-full'></textarea>
                        <div className='flex gap-8 items-center justify-center pt-7'> 
                            <button onClick={draftAdditionHandler} className="h-[50px] w-[150px] bg-[#ececec] rounded-2xl resize-none" type='button'>Save to drafts</button>
                            <button className=" rounded-2xl bg-[#4052f2] h-[50px] w-[150px] text-white cursor-pointer" type="button">Send email</button>
                        </div>
                    </form>
                </div>
            </section>
            <section className='draftsSection pt-16' id='draftsSection'>
                <h1 className='text-5xl font-bold'>Your Drafts</h1>
                <Drafts />
                <Lottie animationData={DraftsAnimation} className=' h-[500px]'></Lottie>
            </section>
        </main>
    );
}