import React, { useState, useEffect } from 'react';
import './Drafts.css';
import Cookies from 'js-cookie';
import axios from 'axios';
import Lottie from 'lottie-react';


import DraftsAnimation from './assets/animation_lk30q3yq.json';


export default function Drafts(isDraftSaved, setIsDraftSaved) {
    const [allDrafts, setAllDrafts] = useState([]);
    const [selectedDraft, setSelectedDraft] = useState(null);
  
    const fetchDrafts = () =>{
        const getCookieValue = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        };
      
        const authcookie = getCookieValue('Authorization');
      
        axios.get('http://localhost:4000/seemail', {
              headers: {
                'x-api-key': '54321a',
                Authorization: decodeURIComponent(authcookie),
              },
            })
            .then((response) => {
              const draftsData = response.data.map((draft) => ({
                draftTitle: draft.draftTitle,
                draftBody: draft.draftBody, // Make sure this property matches your API response
              }));
              setAllDrafts(draftsData);
            })
            .catch((error) => {
              console.log(error);
            });
    }
    useEffect(()=>{
        fetchDrafts();
    },[isDraftSaved]);
  
    const filteredDrafts = allDrafts.slice(1,6);  

    const handleDraftSelection = (draft) =>{
      if(selectedDraft==draft)
          setSelectedDraft(null)
      else
          setSelectedDraft(draft);
    }
  
    return (
        <div className='flex h-[70vh] min-h-fit gap-8'>
            <div className='grid grid-flow-row row-span-5 min-w-[350px] pt-12'>
                {
                    filteredDrafts.map((draft, index) => (
                    <div
                        key={index}
                        onClick={()=>{handleDraftSelection(draft)}}
                        className={`draftPreviewShadow rounded-2xl flex items-center justify-between cursor-pointer  ${selectedDraft === draft ? 'bg-blue-700' : 'bg-[#fff]'} h-[60px] px-6`}
                    >
                        <h1 className={`text-xl font-semibold ${selectedDraft === draft ? 'text-white' : 'text-black'}`}>{draft.draftTitle}</h1>
                    </div>
                    ))
                }
            </div>
            
            <div>
                {
                    selectedDraft ? (
                        <div className='draftPreviewShadow flex flex-col h-[60vh] min-h-fit mt-12 p-8 rounded-2xl'>
                            <div className='flex items-center justify-between'>
                                <div className='flex'>
                                    <label className='text-2xl font-bold'>Subject :</label>
                                    <p className='text-2xl font-bold'>&nbsp;{selectedDraft.draftTitle}</p>
                                </div>
                                <button className='bg-[#ececec] px-4 py-2 w-[150px] rounded-2xl hover:rounded-3xl' onClick={()=>{setSelectedDraft(null)}}>Close</button>
                            </div>
                            <p className='mt-4'>{selectedDraft.draftBody}</p>
                        </div>
                    ) : (
                        <Lottie animationData={DraftsAnimation} className=' h-[500px] w-[1000px]'></Lottie>
                    )
                }
            </div>
        </div>
    );
}