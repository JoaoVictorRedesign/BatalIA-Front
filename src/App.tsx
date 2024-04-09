import { useState } from 'react'  
import DialogArea from "./components/Dialog Area/DialogArea"
import DropMenu from "./components/DropMenu/DropMenu" 
import Point from "./components/Points/Point"
import { MdSend } from "react-icons/md";
import axios from 'axios';
import Theme from './components/QuestionTheme/Theme';
import RadioButton from './components/RadioButton/RadioButton';

function App() {
  const [prompt, setPrompt] = useState("")
  const [isRequest, setIsRequest] = useState<boolean>(false)
  const [isRequestAWS, setIsRequestAWS] = useState<boolean>(false)

  const [responseIBM, setResponseIBM] = useState<string>("")
  const [responseAWS, setResponseAWS] = useState<string>("")
  
  const [itemSelectedLeft, setItemSelectedLeft] = useState("Escolha um modelo")
  const [itemSelectedRigth, setItemSelectedRigth] = useState("Escolha um modelo")

  async function OnSubmitPrompt(){
    setIsRequest(true)
    setIsRequestAWS(true)
    const body = {
      prompt,
      model: itemSelectedLeft,
    }
    const [resIBM, resAWS] = await Promise.all([
      axios.post("http://localhost:3000/request-prompt", body),
      axios.post("http://localhost:3000/request-model2", body)
  ]);

  setIsRequest(false);
  setIsRequestAWS(false);

  setResponseIBM(resIBM.data.text);
  setResponseAWS(resAWS.data.text);

    setPrompt("")
  }
  function handleClickLeft(data: string){
    setItemSelectedLeft(data)
  }
  function handleClickRight(data: string){
    setItemSelectedRigth(data)
  }

  return (
      <div className='bg-dots w-[100vw] overflow-hidden bg-cover pt-6 pb-8'>
        <div className='w-full flex justify-center pb-8'>
          {/* <img src={gif} alt="" className='h-40 ' />   */}
        </div>
        <div className='flex gap-14 w-full  items-center justify-center  relative '>
          <div className='flex flex-col '>
          <div className='flex mb-6 justify-between'>
            <div className='flex'>
              <Point></Point>
              <Point></Point>
            </div>
              <h1 className='text-white font-bold text-3xl'>{itemSelectedLeft}</h1>
          </div>
            <DialogArea Output={responseIBM} IsRequest={isRequest} ></DialogArea>
            <div className='w-64 mt-8'>
              <DropMenu DropMenuItem={handleClickLeft}></DropMenu>
            </div>
          </div>

          <div className='mb-0 flex-initial   absolute bottom-0 w-[30%]'>
            <textarea className='bg-gradient-to-r from-[#FF00B8] outline-none text-white text-base  to-[#FF5C00] h-16 resize-none w-full rounded-3xl px-4 pr-14 disabled:text-gray-300 overflow-hidden p-2' 
            onChange={e=> setPrompt(e.target.value)}
            disabled={isRequest}
            value={prompt}
            />
            <button
            className='disabled:cursor-default cursor-pointer  disabled:text-white'
            disabled={isRequest}
            onClick={OnSubmitPrompt}
            ><MdSend className='text-white absolute right-4 top-4 text-3xl hover:text-gray-200 hover:scale-105 transition-all disabled:hover:scale-0 '/></button>
          </div>
          
          <div className='flex flex-col items-end'>
          <div className='flex mb-6 justify-between w-full'>
              <h1 className='text-white font-bold text-3xl'>{itemSelectedRigth}</h1>
              <div className='flex '>
                <Point></Point>
                <Point></Point>
              </div>
          </div>
            <DialogArea Output={responseAWS} IsRequest={isRequestAWS}></DialogArea>
            <div className='w-64 mt-8'>
              <DropMenu DropMenuItem={setItemSelectedRigth}></DropMenu>
            </div>
          </div>
        </div>
        <div className='text-white flex justify-between gap-8  mt-6  container mx-auto md:px-0 2xl:px-32'>
          {/* <Theme theme='Formula 1'></Theme>
          <Theme theme='Futebol'></Theme>
          <Theme theme='Em aberto...'></Theme> */}
          <RadioButton></RadioButton>
        </div>          
      </div>
  )
}

export default App
