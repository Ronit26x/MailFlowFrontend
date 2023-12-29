"use client"

import './dashboard.css'

import Lottie from "lottie-react";
import EmailSendAnimation from "./assets/animation_lk1ht47q.json"
import Drafts from './components/Drafts/Drafts';
import { BsClipboardPlus, BsClipboardCheckFill } from 'react-icons/bs';
import loginAnimation from 'src/assets/animation_lmu618a3.json';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import SendEmailDialog from './components/sendEmail/SendEmailDialog';
import ErrorDialog from '@/app/components/Error/ErrorDialog';

const axios = require('axios');


export default function Dashboard(){
    const isClient = typeof window !== 'undefined';

    const [loggedIn, setLoggedIn] = useState('false')
    const [errorMessage, setErrorMessage] = useState('');
    const [showErrorDialog, setShowErrorDialog] = useState(false)
    const [sendEmailActive, setSendEmailActive] = useState(false);
    
    const [isDraftSaved, setIsDraftSaved] = useState(false);
    const [copyStatus, setCopyStatus] = useState('');
    const [isCopyToClipboardSelected, setIsCopyToClipboardSelected] = useState(false);


    // const [_document, set_document] = useState(null);
    // useEffect(() => {
    //     set_document(document)
    // }, [])
    
    
    useEffect(()=>{
        setInterval(()=>{
            const isLoggedIn = Cookies.get('isLoggedIn');
            setLoggedIn(isLoggedIn)  
        }, 1000) 
    }, [])

    
    const removeErrorDialog = () =>{
        setTimeout(() => {
            setShowErrorDialog(false);
        }, 5000);
    }

    // const sendEmailHandler = () =>{
    //     setSendEmailActive(true);
    //     // document.body.classList.add('disable-scroll');
    //     // sendEmailActive?document.body.style.overflow="hidden" : document.body.style.overflow="auto"
    // }
    // const closeSendDialog = () =>{
    //     setSendEmailActive(false)
    //     document.body.classList.remove('disable-scroll');
    // }

    // useEffect(() => {
    //     return () => {
    //       // Cleanup function to remove the CSS class when the component unmounts
    //       document.body.classList.remove('disable-scroll');
    //     };
    //   }, []);

    
    const promptGenerateHandler = (event) =>{
        event.preventDefault();

        if(isClient){
            const form = document.querySelector('.promptForm');
            const finalEmail = document.querySelector('.paraphrasedEmail') 
            const formData = new FormData(form);
            const promptData = Object.fromEntries(formData);
            axios.post('https://mailflow-production.up.railway.app/genemail', promptData, {
                    headers: {
                      'x-api-key': "54321a"
                   }
            })
            .then(response => {
                finalEmail.innerHTML = response.data;
                setIsCopyToClipboardSelected(false);
            })
            .catch((error) => {
                console.log('Error saving draft:', error);
                setErrorMessage('Server Error! Please try again in a while.');
                setShowErrorDialog(true);
                removeErrorDialog();
              });
        }
        
    }

    const draftAdditionHandler = (req,res) =>{
        if(isClient){
            const finalEmail = document.querySelector('.paraphrasedEmail') 
            const draftEmailBody = finalEmail.innerHTML;
            const draftEmailTitle = document.querySelector('.paraphrasedEmailTitle').value;
    
            const draft = {
                "draft": draftEmailBody,
                "title": draftEmailTitle,
            }
            const getCookieValue = (name) => {
                const value = `; ${document.cookie}`;
                const parts = value.split(`; ${name}=`);
                if (parts.length === 2) return parts.pop().split(';').shift();
            };
            const authcookie = getCookieValue('Authorization');
    
            if(draftEmailBody && draftEmailTitle){
                axios.post('https://mailflow-production.up.railway.app/saveDraft', draft, {
                    headers: {
                      'x-api-key': "54321a",
                      'Authorization': decodeURIComponent(authcookie),
                    }
                })
                .then(response => {
                    setIsDraftSaved(true)
                    console.log("save draft triggered")
                })
                .catch((error) => {
                    console.log('Error saving draft:', error);
                    setErrorMessage('Server Error! Please try again in a while.');
                    setShowErrorDialog(true);
                    removeErrorDialog();
                  });
            }
            else if(!draftEmailBody || !draftEmailTitle){
                // alert("Add title or body");
                setErrorMessage('Title or email body missing in the draft');
                setShowErrorDialog(true);
                removeErrorDialog();
                console.log("error to hai boss")
            }
        }
        
    }

    const copyToClipboard = (textToCopy) => {
        navigator.clipboard.writeText(textToCopy)
          .then(() => {
            setCopyStatus('Copied to clipboard');
            console.log("function called")
          })
          .catch((error) => {
            setCopyStatus('Copy failed');
            console.error('Error copying to clipboard:', error);
          });
    };
      
    
    return(
        <>
        {
            showErrorDialog && (
                <ErrorDialog message={errorMessage} />
            )
        }

        {
            loggedIn && <main className="min-h-[90vh] px-16">
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
                        <label className="px-7 text-lg">Set a tone and word limit for your mail.</label>
                        <div className="moodSelector">
                            <textarea name='emailContext' className="h-[50px] w-[350px] pr-8 bg-[#ececec] rounded-s-2xl resize-none" placeholder="Formal, Casual, etc"></textarea>
                            <select name='mailLength' className=' bg-[#ececec] border border-l-gray-400 px-1'> 
                                <option value="100">100 words</option>
                                <option value="200">200 words</option>
                                <option value="500">500 words</option>
                                <option value="1000">1000 words</option>
                            </select>
                            <button className=" rounded-e-2xl bg-[#4052f2] w-[150px] text-white cursor-pointer" type="submit">Generate</button>
                        </div>
                    </form>
                    <form className="containerShadow paraphrasedEmailContainer w-[550px] h-[500px]  rounded-3xl">
                        <textarea name='EmailTitle' placeholder='Paraphrased email (Click to change title)' className="paraphrasedEmailTitle w-full h-[50px] rounded-t-3xl bg-[#ececec] flex items-center px-4 text-xl font-semibold resize-none" required></textarea>
                        <div className='flex relative'>
                            <textarea name='paraphrasedEmail' placeholder='Dear abcdefg.........' className='paraphrasedEmail resize-none h-[350px] w-full' required></textarea>
                            <span onClick={ () => {setIsCopyToClipboardSelected(true); copyToClipboard(hello)}}>
                                {
                                    isCopyToClipboardSelected && copyStatus ? <BsClipboardCheckFill className='cursor-pointer h-[30px] w-[20px] absolute top-4 right-6' /> : <BsClipboardPlus className='cursor-pointer h-[30px] w-[20px] absolute top-4 right-6'/>
                                }
                            </span>
                            
                        </div>
                        <div className='flex gap-8 items-center justify-center pt-7'> 
                            <button onClick={draftAdditionHandler} className="h-[50px] w-[150px] bg-[#ececec] rounded-2xl resize-none" type='button'>Save to drafts</button>
                            <button className=" rounded-2xl bg-[#4052f2] h-[50px] w-[150px] text-white cursor-pointer" type="button" >Send email</button>
                        </div>
                    </form>
                </div>
            </section>
            <section className='draftsSection pt-16 min-h-[100vh] pb-8' id='draftsSection'>
                <h1 className='text-5xl font-bold'>Your Drafts</h1>
                <div className='flex items-center justify-between'>
                    <Drafts isDraftSaved={isDraftSaved} setIsDraftSaved={setIsDraftSaved} />   
                </div>   
            </section>
        </main> 
        }

        {
            !loggedIn && <div className='h-[90vh] flex flex-col items-center justify-center'>
                <Lottie animationData={loginAnimation} className='h-[50vh] -mt-16' />
                <h1 className=' text-2xl font-semibold -mt-16'>Dashboard cannot be accessed without logging in.</h1>
                <Link href='/pages/Login' className='bg-blue-700 px-20 py-4 text-xl text-white rounded-2xl mt-4' >Log in</Link>
            </div>
        }

        {/* {
            sendEmailActive && <>
                <SendEmailDialog onClose={closeSendDialog} />
            </>
        } */}
        </>
    );
}