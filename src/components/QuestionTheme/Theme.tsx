

interface Themes{
    theme: string
}

export default function Theme(props: Themes){

    return(
        <div>
            <div className=' bg-gradient-to-r from-[#FF00B8] to-[#FF5C00] w-96 h-14 rounded-3xl font-bold text-2xl p-[2px]'>
                <div className="bg-slate-900 w-full h-full rounded-3xl flex items-center justify-center">
                {props.theme}
                </div>
            </div>
        </div>
    )
}