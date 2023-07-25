'use client'

import Lottie from 'lottie-react';
import heroAnimation from '../assets/88708-email.json';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {

  const [_document, set_document] = useState(null)

  useEffect(() => {
    set_document(document)
  }, [])

  return (
    <main className="flex min-h-[90vh] flex-col">
      <section className='flex min-h-[90vh] p-16'>
        <div className='w-[100%]'>
          <h1 className="text-7xl font-bold">mailflow.<span className="text-blue-700">ai</span></h1>
          <p className='mt-8 text-xl'>Consequat et qui magna aliqua consectetur. Occaecat ullamco incididunt dolor nostrud reprehenderit in ex deserunt exercitation enim veniam veniam. Cillum et amet ullamco dolor nostrud consectetur nostrud dolor elit. Quis veniam proident est reprehenderit quis. Sit ut in qui eu ea exercitation consectetur magna ullamco proident magna laboris eu et.</p>
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
