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

  const [topic, setTopic] = useState<Number>()

  async function OnSubmitPrompt(){
    setIsRequest(true)
    setIsRequestAWS(true)
    const data = {
      prompt,
      model: itemSelectedLeft,
      topic,
    }
    const [resIBM, resAWS] = await Promise.all([
      axios.post("http://localhost:3000/request-prompt", data),
      axios.post("http://localhost:3000/request-model2", data)
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
  function handleChageTopic(data: Number){
    setTopic(data)
    console.log("No item pai: " + data)
  }

  return (
      <div className='w-screen h-screen pt-6 pb-10 overflow-hidden bg-dots bg-cover'>
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

          <div className='mb-0 flex absolute rounded-3xl p-[2px] bottom-0 w-[30%] bg-gradient-to-r from-[#FF00B8]  to-[#FF5C00]'>
            <textarea className=' outline-none text-white text-base bg-slate-900 h-16 resize-none w-full rounded-3xl px-4 pr-14 disabled:text-gray-300 overflow-hidden p-2 flex justify-center  ' 
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
          <RadioButton itemSelected={handleChageTopic}></RadioButton>
        </div>          
      </div>
  )
}

export default App
