import React from 'react';


interface Components {
    Output: string;
  }
  

function DialogArea(props: Components) {
    return (
        <div className='w-[38rem] h-96 border-solid   border-2 rounded-3xl bg-slate-950/65 overflow-auto text-white text-justify p-8'>
          {props.Output}
        </div>
    )
  }
export default DialogArea