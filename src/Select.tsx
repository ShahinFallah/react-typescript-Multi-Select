import React, { useEffect, useState } from 'react'

import { IoIosClose } from "react-icons/io";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

export type SelectOption = {
    label: string,
    value: number | string
}

type SelectProps = {
    value?: SelectOption,
    options: SelectOption[],
    onChange: (option: SelectOption | undefined) => void
}


function Select({ value, options, onChange }: SelectProps) {
    const SELECTED = 'bg-slate-600'
    const HIGHLIGHTED = '!bg-slate-500 text-green-200'
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [highlightedIndex, setHighlightedIndex] = useState<number>(0)

    console.log(highlightedIndex)

    function clearOptions() {
        onChange(undefined)
    }

    function selectOption(o: SelectOption) {
        if (o !== value) onChange(o)
    }

    function isOptionSelected(o: SelectOption) {
        return o.value === value?.value
    }

    useEffect(() => { 
        setHighlightedIndex(0)
    }, [isOpen])

    return (
        <div
            tabIndex={1}
            onBlur={() => setIsOpen(false)}
            onClick={() => setIsOpen(prev => !prev)}
            className='flex items-center w-64 bg-slate-800 p-3 rounded-lg text-white min-h-12 relative focus:outline-none focus:ring-1 focus:ring-green-600 transition-all'>
            <span className='grow cursor-pointer truncate'>{value?.label}</span>
            <button onClick={(e) => {
                e.stopPropagation()
                clearOptions()
            }}><IoIosClose className='text-2xl hover:scale-110 transition hover:text-red-300' /></button>
            <div className='w-[0.01rem] bg-slate-400 self-stretch mx-1'></div>
            <button><MdOutlineKeyboardArrowDown className='text-2xl' /></button>

            <ul className={`transition-opacity ${isOpen ? 'opacity-100 !visible' : 'opacity-0'} invisible flex flex-col gap-2 bg-gradient-to-b from-slate-800 to-slate-700 absolute w-full top-[calc(100%+0.13rem)] left-0 rounded-lg p-2 max-h-64 overflow-y-auto custom-scrollbar`}>
                {options.map((o, index) => (
                    <li
                        onMouseEnter={() => setHighlightedIndex(index)}
                        onClick={() => selectOption(o)}
                        key={o.value}
                        className={`p-1.5 rounded-lg cursor-pointer ${isOptionSelected(o) ? SELECTED : ''} 
                        ${index === highlightedIndex ? HIGHLIGHTED : ''}
                        `}
                    >
                        {o.label}
                    </li>
                ))}
            </ul>

        </div>
    )
}

export default Select