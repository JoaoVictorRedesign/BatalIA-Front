import React from 'react';
import { AiOutlineLoading3Quarters } from "react-icons/ai";


interface Components {
    Output: string;
    IsRequest: boolean;
    position: string;
  }
  

function DialogArea(props: Components) {
    return (
        <div className={`w-[38rem] h-96 ${props.position == "left" ? "bg-gradient-to-r": "bg-gradient-to-l"}  from-[#FF00B8] to-[#FF5C00] rounded-3xl text-white p-[2px]`}>
          {props.IsRequest?
          <div className='h-full flex items-center justify-center rounded-3xl bg-slate-950 p-8 '>
            <div>
              <AiOutlineLoading3Quarters className='text-5xl animate-spin '/>
            </div>
          </div>  
          :
          <div className='h-full rounded-3xl bg-slate-950 p-8 overflow-auto no-scrollbar'> 
          <div className='overflow-auto whitespace-pre-line font-averta_medium'>
            {props.Output}
          </div>
          </div>
          }
        </div>
    )
  }
export default DialogArea