"use client"

import Lottie from "lottie-react";
import constructionAnimation from 'src/app/pages/UnderConstruction/animation_lmu4rah9.json';

export default function UnderConstruction(){
    return(
        <div className="h-[90vh] w-full flex items-center justify-center">
            <div className="flex flex-col items-center">
                <Lottie animationData={constructionAnimation} className="h-[60vh] -mt-10" />
                <p className="text-3xl font-bold -mt-10">Sorry! We are still working on this page.</p>
            </div> 
        </div>
    );
}