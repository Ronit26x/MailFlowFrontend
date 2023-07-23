export default function Drafts(){

    const drafts = [
        {
            title: "title1",
            date: new Date(),
        },
        {
            title: "title2",
            date: new Date(),
        },
        {
            title: "title3",
            date: new Date(),
        },
        {
            title: "title4",
            date: new Date(),
        },
        {
            title: "title5",
            date: new Date(),
        },
    ]

    return(
        <>
            <div className='grid grid-flow-col col-span-5 gap-4 pt-8'>
                {
                    drafts.map(draft => {
                        return(
                            <div key={draft.title} className='containerShadow rounded-2xl h-[150px] '>
                                <h1 className="px-4 py-2 overflow-hidden text-xl font-semibold bg-[#ececec] rounded-t-2xl">Title</h1>
                            </div>
                        )
                    })
                }
            </div>
        </>
    );
}