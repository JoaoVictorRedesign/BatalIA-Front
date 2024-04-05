import { useState } from 'react'  
import { RiLoader4Fill } from "react-icons/ri";
import DialogArea from "./components/Dialog Area/DialogArea"
import DropMenu from "./components/DropMenu/DropMenu" 
import Point from "./components/Points/Point"
import gif from "./assets/batalia.gif"
import { MdSend } from "react-icons/md";
import Api from './api/Axios';
import axios from 'axios';

function App() {
  const [prompt, setPrompt] = useState("")
  const [response, setResponse] = useState("")
  async function OnSubmitPrompt(){
    const body = {
      prompt,
    }
    const res = await axios.post("http://localhost:3000/request-prompt", body)
    setResponse(res.data)
    console.log(res.data)
  }
  return (
      <div className='bg-dots w-[100vw] h-[100vh]  bg-cover pt-6'>
        <div className='w-full flex justify-center'>
          <img src={gif} alt="" className='h-40 ' />  
        </div>
        <div className='flex gap-14 w-full  items-center justify-center  relative '>
          <div className='flex flex-col '>
          <div className='flex mb-6'>
              <Point></Point>
              <Point></Point>
          </div>
            <DialogArea Output={response} ></DialogArea>
            <div className='w-64 mt-8'>
              <DropMenu></DropMenu>
            </div>
          </div>

          <div className='mb-0 flex-initial   absolute bottom-0 w-[30%]'>
            <input type="text" className='bg-red-300 h-14 w-full rounded-3xl px-4 pr-14' 
            onChange={e=> setPrompt(e.target.value)}
            />
            <i
            onClick={OnSubmitPrompt}
            ><MdSend className='text-white absolute right-4 top-3 text-3xl cursor-pointer hover:text-slate-100 transition-colors'/></i>
          </div>
          
          <div className='flex flex-col items-end'>
          <div className='flex mb-6'>
              <Point></Point>
              <Point></Point>
          </div>
            <DialogArea Output={response}></DialogArea>
            <div className='w-64 mt-8'>
              <DropMenu></DropMenu>
            </div>
          </div>
        </div>
        <div className='text-white flex justify-between gap-8  mt-6  container mx-auto md:px-0 2xl:px-32'>

            <div className='border-solid border-2 border-red-500 w-96 h-14 rounded-3xl flex items-center justify-center '>Ola mundo</div>
            <div className='border-solid border-2 border-red-500 w-96 h-14 rounded-3xl flex items-center justify-center '>Ola mundo</div>
            <div className='border-solid border-2 border-red-500 w-96 h-14 rounded-3xl flex items-center justify-center '>Ola mundo</div>
            </div>          
      </div>
  )
}

export default App
