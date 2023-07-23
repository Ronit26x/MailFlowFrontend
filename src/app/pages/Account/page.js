"use client"

import Lottie from "lottie-react";


import accountHelloAnimation from './assets/animation_lk9srpas.json'

export default function Account(){
    return(
        <div>
            <section className="min-h-[90vh] py-4 px-16">
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
        </div>
    );
}