import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { MdOutlineKeyboardArrowDown } from "react-icons/md";


const items = [
  { name: 'Selecione...' },
  { name: 'LLama' },
  { name: 'Claude 3' },

]
interface DropMenu{
  DropMenuItem: Function
}

export default function DropMenu(props: DropMenu) {
  const [selected, setSelected] = useState(items[0])
  const [isClicked, setIsClicked] = useState(false)

  function HandleClick(item: { name: string }){
    props.DropMenuItem(item.name)
  }
  return (
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1 z-50"
        onClick={()=>{setIsClicked(!isClicked)}}
        >
          <Listbox.Button className="relative h-14 w-full cursor-default text-white font-bold text-center text-2xl rounded-3xl bg-gradient-to-r from-[#FF00B8] to-[#FF5C00] py-2 pl-3 pr-10 shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 ">
            <span className="block truncate">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-2xl">
              <MdOutlineKeyboardArrowDown
                className={`h-5 w-5 text-white text-2xl transition-all ${isClicked? 'rotate-180 ': ''}`}
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {items.map((item, itemIndex) => (
                <Listbox.Option
                  key={itemIndex}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={item}
                  onClick={() => HandleClick(item)}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {item.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
  )
}
