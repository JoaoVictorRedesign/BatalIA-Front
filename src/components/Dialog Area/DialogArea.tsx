import React from 'react';
import { AiOutlineLoading3Quarters } from "react-icons/ai";


interface Components {
    Output: string;
    IsRequest: boolean;
  }
  

function DialogArea(props: Components) {
    return (
        <div className='no-scrollbar w-[38rem] h-96 bg-gradient-to-r from-[#FF00B8] to-[#FF5C00] rounded-3xl overflow-auto text-white p-[2px]'>
          {props.IsRequest?
          <div className='h-full flex items-center justify-center rounded-3xl bg-slate-950 p-8 '>
            <AiOutlineLoading3Quarters className='text-5xl animate-spin '/>
          </div>  
          :
          <div className='h-full rounded-3xl bg-slate-950 p-8'> {props.Output}</div>
          }
        </div>
    )
  }
export default DialogArea