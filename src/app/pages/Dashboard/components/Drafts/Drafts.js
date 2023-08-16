import './Drafts.css'
import Cookies from 'js-cookie';

const axios = require('axios');

export default function Drafts(){

    const drafts = [
        // {
        //     title: "title1",
        //     creationDate: new Date().getFullYear(),
        // },
        // {
        //     title: "title2",
        //     creationDate: new Date().getFullYear(),
        // },
        // {
        //     title: "title3",
        //     creationDate: new Date().getFullYear(),
        // },
        // {
        //     title: "title4",
        //     creationDate: new Date().getFullYear(),
        // },
        // {
        //     title: "title5",
        //     creationDate: new Date().getFullYear(),
        // },
    ]
    const getCookieValue = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };    
    const authcookie = getCookieValue('Authorization');
    console.log(decodeURIComponent(authcookie))
    
    axios.get('http://localhost:4000/seemail', {
        headers: {
        'x-api-key': "54321a",
        'Authorization': decodeURIComponent(authcookie)
      }
    })
    .then(response => {          
        console.log(response)
    })
    .catch(error => {
        console.log(error)
    });

    return(
        <>
            <div className='grid grid-flow-row row-span-5 w-[350px] gap-6 pt-8'>
                {
                    drafts.map(draft => {
                        return(
                            <div key={draft.title} className='draftPreviewShadow rounded-lg flex items-center justify-between cursor-pointer bg-[#ececec] h-[50px] px-4'>
                                <h1 className=" text-xl font-semibold">{draft.title}</h1>
                                <p>{draft.creationDate}</p>
                            </div>
                        )
                    })
                }
            </div>
        </>
    );
}