export default function ErrorDialog( { message } ){
    return(
        <div className="containerShadow fixed top-[11vh] right-0 h-[100px] w-[300px] bg-blue-700 flex items-center justify-center p-8 rounded-l-xl z-50">
            <p className="text-xl text-white">{message}</p>
        </div>
    );
}