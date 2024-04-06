import { useState } from 'react'  
import { RiLoader4Fill } from "react-icons/ri";
import DialogArea from "./components/Dialog Area/DialogArea"
import DropMenu from "./components/DropMenu/DropMenu" 
import Point from "./components/Points/Point"
import gif from "./assets/batalia.gif"
import { MdSend } from "react-icons/md";
import Api from './api/Axios';
import axios from 'axios';
import Theme from './components/QuestionTheme/Theme';

function App() {
  const [prompt, setPrompt] = useState("")
  const [isRequest, setIsRequest] = useState<boolean>(false)
  const [response, setResponse] = useState<string>("")
  async function OnSubmitPrompt(){
    setIsRequest(true)
    const body = {
      prompt,
    }
    const res = await axios.post("http://localhost:3000/request-prompt", body)

    res ? setIsRequest(false) : setIsRequest(true)

    setResponse(res.data.res)
    console.log(response)
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
            <DialogArea Output={response} IsRequest={isRequest} ></DialogArea>
            <div className='w-64 mt-8'>
              <DropMenu></DropMenu>
            </div>
          </div>

          <div className='mb-0 flex-initial   absolute bottom-0 w-[30%]'>
            <input type="text" className='bg-gradient-to-r from-[#FF00B8] outline-none text-white font-semibold text-xl to-[#FF5C00] h-14 w-full rounded-3xl px-4 pr-14 disabled:text-slate-600' 
            onChange={e=> setPrompt(e.target.value)}
            disabled={isRequest}
            value={prompt}
            />
            <button
            className='disabled:cursor-default cursor-pointer hover:text-slate-100 disabled:text-white'
            disabled={isRequest}
            onClick={OnSubmitPrompt}
            ><MdSend className='text-white absolute right-4 top-3 text-3xl   transition-colors '/></button>
          </div>
          
          <div className='flex flex-col items-end'>
          <div className='flex mb-6'>
              <Point></Point>
              <Point></Point>
          </div>
            <DialogArea Output={response} IsRequest={isRequest}></DialogArea>
            <div className='w-64 mt-8'>
              <DropMenu></DropMenu>
            </div>
          </div>
        </div>
        <div className='text-white flex justify-between gap-8  mt-6  container mx-auto md:px-0 2xl:px-32'>
          <Theme theme='Formula 1'></Theme>
          <Theme theme='Futebol'></Theme>
          <Theme theme='Em aberto...'></Theme>
        </div>          
      </div>
  )
}

export default App
