'use client'

import Lottie from 'lottie-react';
import heroAnimation from '../assets/88708-email.json';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {

  // const [_document, set_document] = useState(null)

  // useEffect(() => {
  //   set_document(document)
  // }, [])

  return (
    <main className="flex min-h-[90vh] flex-col">
      <section className='flex min-h-[90vh] p-16'>
        <div className='w-[100%]'>
          <h1 className="text-7xl font-bold">mailflow.<span className="text-blue-700">ai</span></h1>
          <p className='mt-8 text-xl'>Welcome to MailFlow, the revolutionary email generation platform designed to streamline your communication needs effortlessly. Developed in my fourth year, MailFlow is a cutting-edge project that empowers users to craft emails with just a mere 5-word input. Say goodbye to the tedious task of composing lengthy mails —our intuitive system does the heavy lifting for you. What sets MailFlow apart is its unparalleled customization feature, allowing users to tailor the tone of their emails according to individual preferences. Whether you prefer a formal, casual, or even humorous touch, MailFlow adapts to your unique style. Experience the future of efficient communication with MailFlow, where brevity meets personalization. Elevate your email game today!</p>
          <p className='mt-8 text-xl'>Want to take it out for a spin? Here is the username:testuser and password:testuser</p>
          <br/>
          <Link href="./pages/Account">See your Account</Link>
        </div>
        <div>
          <Lottie animationData={heroAnimation} className='h[50vh]' />
        </div>
      </section>
    </main>
  )
}
