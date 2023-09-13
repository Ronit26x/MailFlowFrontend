import {useState, useEffect, useRef} from 'react'

import './SendEmailDialog.css'

export default function SendEmailDialog({onClose}){

    const dialogRef = useRef(null);

    const handleClickOutside = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        onClose();
      }
    };

    useEffect(()=>{
        document.body.addEventListener('click', handleClickOutside);

        // Remove the event listener when the component unmounts
        return () => {
          document.body.removeEventListener('click', handleClickOutside);
        };
    },[])



    return(
        <div className="dialog-overlay bg-white">
            <div className="dialog-actual containerShadow absolute h-[500px] w-[1150px] p-8" ref={dialogRef} onClick={(e)=>{e.stopPropagation()}}>
                <div className='flex items-center justify-between '>
                    <p className='text-3xl font-bold'>Send Email.</p>
                    <button className='rounded-2xl bg-[#4052f2] h-[50px] w-[150px] text-white cursor-pointer' onClick={onClose}>Close</button>
                </div>
                <div className='flex justify-between relative h-[100%]'>
                    <form>
                        <div>
                            <div>
                                <label>To</label>
                                <input type='email'></input>
                            </div>
                            <div>
                                <label>BCC/CC</label>
                                <input type='email'></input>
                            </div>
                        </div>
                        <label>Subject</label>
                        <input type='text'></input>
                        <label>Body</label>
                        <input type='text'></input>
                    </form>
                    <div className='flex flex-col absolute right-0 bottom-0 gap-4'>
                        <button className='h-[50px] w-[150px] bg-[#ececec] rounded-2xl resize-none'>Save Draft</button>
                        <button className='rounded-2xl bg-[#4052f2] h-[50px] w-[150px] text-white cursor-pointer'>Send Email</button>
                    </div>
                </div>
            </div>    
        </div>
    );
}