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
      
        axios.get('https://mailflow-production.up.railway.app/seemail', {
              headers: {
                'x-api-key': '54321a',
                Authorization: decodeURIComponent(authcookie),
              },
            })
            .then((response) => {
              const draftsData = response.data.map((draft) => ({
                draftTitle: draft.draftTitle,
                draftBody: draft.draftBody,
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
  
    const filteredDrafts = allDrafts.slice(0,5);  

    const handleDraftSelection = (draft) =>{
      if(selectedDraft==draft)
          setSelectedDraft(null)
      else{
        setSelectedDraft(draft);
      }
    }

    const [isEditingDraft, setIsEditingDraft] = useState(false);
    const [editedDraftBody, setEditedDraftBody] = useState(selectedDraft);
    const draftEditHandler = (selectedDraft) => {
        if(isEditingDraft){
            // console.log(editedDraftBody)
            selectedDraft.draftBody = editedDraftBody;

            if(editedDraftBody)
                setIsEditingDraft(false)
        }
        else{
            // setEditedDraftBody(selectedDraft.draftBody);
            setIsEditingDraft(true);
        }
    }

    const saveEditedDraft = (selectedDraft) => {
        console.log("save edited draft function called")
        console.log(editedDraftBody)
        setIsEditingDraft(false)
        fetchDrafts();
    }

    const [isEditingOrSaving, SetIsEditingOrSaving] = useState(true)
  
    return (
        <div className='flex h-[70vh] min-h-fit gap-8'>
            <div className='grid grid-flow-row row-span-5 min-w-[350px] pt-12'>
                {
                    filteredDrafts.map((draft, index) => (
                    <div
                        key={index}
                        onClick={()=>{handleDraftSelection(draft)}}
                        className={`draftPreviewShadow rounded-2xl flex items-center justify-between cursor-pointer hover:rounded-full  ${selectedDraft === draft ? 'bg-blue-700 rounded-full' : 'bg-[#fff]'} h-[60px] px-6`}
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
                                <button className='bg-[#ececec] px-4 py-2 w-[150px] rounded-2xl hover:rounded-3xl' onClick={()=>{setSelectedDraft(null); setIsEditingDraft(false)}}>Close</button>
                            </div>

                            {
                                isEditingDraft ? (
                                    <textarea onChange={(e) => setEditedDraftBody(e.target.value)} className='mt-4 resize-none h-[40vh] w-[61vw]'>{selectedDraft.draftBody}</textarea>
                                ) : (
                                    <textarea value={selectedDraft.draftBody} className='mt-4 resize-none h-[40vh] w-[61vw]'></textarea>
                                )
                            }

                            
                            <div className='flex items-center justify-end mt-4 gap-16'>
                                <div onClick={() => { isEditingOrSaving ? SetIsEditingOrSaving(false) : SetIsEditingOrSaving(true) }}>
                                    {
                                        isEditingOrSaving ? (
                                            <button onClick={()=>{draftEditHandler(selectedDraft)}} className='bg-[#ececec] px-4 py-2 w-[150px] rounded-2xl hover:rounded-3xl'>Edit Draft</button>
                                        ) : (
                                            <button onClick={()=>{saveEditedDraft(selectedDraft)}} className='bg-[#ececec] px-4 py-2 w-[150px] rounded-2xl hover:rounded-3xl'>Save Draft</button>
                                        )
                                    }
                                </div>
                                {/* <button onClick={()=>{draftEditHandler(selectedDraft)}} className='bg-[#ececec] px-4 py-2 w-[150px] rounded-2xl hover:rounded-3xl'>
                                    {
                                        isEditingDraft ? 'Save Draft' : 'Edit Draft'
                                    }
                                </button> */}
                                <button className='bg-[#ececec] px-4 py-2 w-[150px] rounded-2xl hover:rounded-3xl'>Delete Draft</button>
                                <button className='bg-[#4052f2] px-4 py-2 w-[150px] text-white rounded-2xl hover:rounded-3xl'>Send Email</button>
                            </div>
                        </div>
                    ) : (
                        <Lottie animationData={DraftsAnimation} className=' h-[500px] w-[1000px]'></Lottie>
                    )
                }
            </div>
        </div>
    );
}