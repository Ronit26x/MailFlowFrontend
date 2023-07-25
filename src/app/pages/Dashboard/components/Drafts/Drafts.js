import './Drafts.css'

export default function Drafts(){

    const drafts = [
        {
            title: "title1",
            creationDate: new Date().getFullYear(),
        },
        {
            title: "title2",
            creationDate: new Date().getFullYear(),
        },
        {
            title: "title3",
            creationDate: new Date().getFullYear(),
        },
        {
            title: "title4",
            creationDate: new Date().getFullYear(),
        },
        {
            title: "title5",
            creationDate: new Date().getFullYear(),
        },
    ]

    return(
        <>
            <div className='grid grid-flow-row row-span-5 w-[350px] gap-8 pt-8'>
                {
                    drafts.map(draft => {
                        return(
                            <div key={draft.title} className='draftPreviewShadow rounded-2xl flex items-center justify-between cursor-pointer bg-[#ececec] h-[50px] px-4'>
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