import { useState } from 'react'  
import DialogArea from "./components/Dialog Area/DialogArea"
import DropMenu from "./components/DropMenu/DropMenu" 
import Point from "./components/Points/Point"
import { MdSend } from "react-icons/md";
import axios from 'axios';
import RadioButton from './components/RadioButton/RadioButton';
import gif from "./assets/batalia.gif"
import vs from "./assets/vs.png"

function App() {
  const [prompt, setPrompt] = useState("")
  const [isRequest, setIsRequest] = useState<boolean>(false)
  const [isRequestAWS, setIsRequestAWS] = useState<boolean>(false)

  const [responseIBM, setResponseIBM] = useState<string>("")
  const [responseAWS, setResponseAWS] = useState<string>("")
  
  const [itemSelectedLeft, setItemSelectedLeft] = useState("Escolha um modelo")
  const [itemSelectedRigth, setItemSelectedRigth] = useState("Escolha um modelo")
  const [platformLeft, setPlatformLeft] = useState("")
  const [platformRigth, setPlatformRigth] = useState("")

  const [topic, setTopic] = useState<Number>()

  async function OnSubmitPrompt(){
    setIsRequest(true)
    setIsRequestAWS(true)
    const dataLeft = {
      prompt,
      model: itemSelectedLeft,
      topic,
      platform: platformLeft
    }
    const dataRigth = {
      prompt,
      model: itemSelectedRigth,
      topic,
      platform: platformRigth
    }
    const [resIBM, resAWS] = await Promise.all([
      axios.post("https://batalia3.1ft4vjov9vox.us-south.codeengine.appdomain.cloud/request-prompt", dataLeft),
      axios.post("https://batalia3.1ft4vjov9vox.us-south.codeengine.appdomain.cloud/request-model2", dataRigth)
  ]);

  setIsRequest(false);
  setIsRequestAWS(false);
  
  setResponseIBM(resIBM.data.text);
  setResponseAWS(resAWS.data.text);

  console.log(responseAWS)
    // setPrompt("")
  }
  type HandleClick = {
    name: string,
    platform: string
  }
  function handleClickLeft(data: HandleClick){
    setItemSelectedLeft(data.name)
    setPlatformLeft(data.platform)
    console.log("platform: left ", platformLeft)
  }
  function handleClickRight(data: HandleClick){
    setItemSelectedRigth(data.name)
    setPlatformRigth(data.platform)
    console.log("platform rigth: " + platformRigth)

  }
  function handleChageTopic(data: Number){
    setTopic(data)
  }

  return (
      <div className='w-screen h-screen pb-10 overflow-hidden bg-dots bg-cover'>
        <div className='w-full flex justify-center pb-8'>
          <img src={gif} alt="" className='' />  
        </div>
        <div className='flex gap-14 w-full  items-center justify-center  relative '>
          <div className='flex flex-col '>
          <div className='flex mb-6 justify-between'>
            <div className='flex'>
              <Point></Point>
              <Point></Point>
            </div>
              <h1 className='text-white'>{itemSelectedLeft}</h1>
          </div>
            <DialogArea Output={responseIBM} IsRequest={isRequest} position='left' ></DialogArea>
            <div className='w-64 mt-8'>
              <DropMenu DropMenuItem={handleClickLeft}></DropMenu>
            </div>
          </div>

          <div className='mb-0 flex absolute rounded-3xl p-[2px] bottom-0 w-[50%] bg-gradient-to-l from-[#FF00B8]  to-[#FF5C00]'>
            <textarea className=' outline-none text-white text-base bg-slate-900 h-16 resize-none w-full rounded-3xl px-4 pr-14 disabled:text-gray-300 overflow-hidden p-2 flex justify-center font-averta_medium' 
            onChange={e=> setPrompt(e.target.value)}
            disabled={isRequest}
            value={prompt}
            />
            <button
            className='disabled:cursor-default cursor-pointer  disabled:text-white'
            disabled={isRequest}
            onClick={OnSubmitPrompt}
            ><MdSend className='text-white absolute right-4 top-5 text-3xl hover:text-gray-200 hover:scale-105 transition-all disabled:hover:scale-0 '/></button>
          </div>
          <div className=''>
            <img src={vs} alt="" />
          </div>
          <div className='flex flex-col items-end'>
          <div className='flex mb-6 justify-between w-full'>
              <h1 className='text-white'>{itemSelectedRigth}</h1>
              <div className='flex '>
                <Point></Point>
                <Point></Point>
              </div>
          </div>
            <DialogArea Output={responseAWS} IsRequest={isRequestAWS} position='right'></DialogArea>
            <div className='w-64 mt-8'>
              <DropMenu DropMenuItem={handleClickRight}></DropMenu>
            </div>
          </div>
        </div>
        <div className='text-white flex mt-6 container mx-auto md:px-0 2xl:px-12  '>
          <RadioButton itemSelected={handleChageTopic}></RadioButton>
        </div>          
      </div>
  )
}

export default App
