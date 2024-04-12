import { SVGProps, useEffect, useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { JSX } from 'react/jsx-runtime'
import { FaCheckCircle } from "react-icons/fa";

const topic = [
  {
    name: 'Fórmula 1',
    index: 1
  },
  {
    name: 'Futebol',
    index: 2
  },
  {
    name: 'Alimentação Saudável',
    index: 3
  },
]
interface RadioButton{
  itemSelected: (data: number)=> void
}

export default function RadioButton(props: RadioButton) {
  const [selected, setSelected] = useState(topic[0])

  useEffect(()=>{
    props.itemSelected(selected.index)

  },[selected])

  

  return(
    <RadioGroup value={selected} onChange={setSelected} defaultValue={topic[0]} className={'flex gap-4 w-full justify-between  '}>
       {topic.map((plan)=>(
        <RadioGroup.Option
        key={plan.name}
        value={plan}
        className={({ active, checked}) =>
          ` 
          ${
            active
              ? ''
              : ''
          }
          ${checked ? ' transition-color bg-gradient-to-l from-[#FF00B8] to-[#FF5C00] text-white scale-[1.08] hover:scale-[1.08]' : 'bg-white'}
           hover:scale-[1.02] transition-all flex cursor-pointer  w-96 h-14 rounded-3xl  p-[2px] items-center text-white `
        }
      >
        {({ active, checked }) => (
          <>
            <div className="flex w-full items-center justify-between relative h-full"
              // onClick={handleClick}
            >
              <div className="flex items-center w-full justify-center h-full bg-slate-900 rounded-3xl">
                <div className="text-2xl font-bold text-center ">
                  <RadioGroup.Label
                    as="p"
                    className={`flex   ${
                      checked ? 'text-white' : 'text-white'
                    }`}
                  >
                    {plan.name}
                  </RadioGroup.Label>
                </div>
              </div>
              {checked && (
                <div className="shrink-0 text-white absolute right-2">
                  <FaCheckCircle 
                  className='text-[#FF00B8] text-2xl'/>
                </div>
              )}
            </div>
          </>
        )}
      </RadioGroup.Option>
       ))}
    </RadioGroup>
  )
 
}

function CheckIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
