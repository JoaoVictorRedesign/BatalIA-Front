import { useState } from "react"



export default function DialogArea() {
    const [isClicked, setIsClick] = useState(false)
    return (
        <div className={`h-10 w-12 border-solid border-red-500 border-2 rounded-md skew-y-12 rotate-90 mt cursor-pointer transition-colors ${isClicked? 'bg-red-500': 'bg-none'}`}
        onClick={()=>{setIsClick(!isClicked)}}
        >
        </div>
    )
  }
