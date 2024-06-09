import { useEffect, useRef, useState } from 'react'

import { IoIosClose } from "react-icons/io";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

export type SelectOption = {
    label: string,
    value: number | string
}

type SingleSelect = {
    multiple?: false
    value?: SelectOption,
    onChange: (option: SelectOption | undefined) => void
}
type MultipleSelect = {
    multiple: true
    value: SelectOption[],
    onChange: (option: SelectOption[]) => void
}

type SelectProps = {
    options: SelectOption[],
} & (SingleSelect | MultipleSelect)


function Select({ multiple, value, options, onChange }: SelectProps) {
    const SELECTED: string = 'bg-slate-600';
    const HIGHLIGHTED: string = '!bg-slate-500 !text-blue-300';

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [highlightedIndex, setHighlightedIndex] = useState<number>(0)
    const selectRef = useRef<HTMLDivElement>(null)

    function clearOptions() {
        multiple ? onChange([]) : onChange(undefined)
    }

    function selectOption(o: SelectOption) {
        if (multiple) {
            if (value.some(v => v.value === o.value)) {
                onChange(value.filter(v => v.value !== o.value))
            } else {
                onChange([...value, o])
            }
        } else {
            if (o.value !== value?.value) {
                console.log('new')
                onChange(o)
            }
            else {
                console.log('nearly')
                onChange(undefined)
            }
        }
    }

    function isOptionSelected(o: SelectOption) {
        return multiple ? value.some(v => v.value === o.value) : o.value === value?.value
    }

    function deleteOption(option: SelectOption) {
        multiple && onChange(value.filter(o => option !== o))
    }

    useEffect(() => {
        setHighlightedIndex(0)
    }, [isOpen])

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.target != selectRef.current) return

            const key: string = e.code
            console.log(key)
            switch (key) {
                case 'Enter':
                case 'Space':
                    setIsOpen(prev => !prev)
                    if (isOpen) selectOption(options[highlightedIndex])
                    break

                case 'ArrowDown':
                case 'ArrowUp': {
                    if (!isOpen) {
                        setIsOpen(true)
                    } else {
                        const newValue = highlightedIndex + (e.code === 'ArrowDown' ? 1 : -1)

                        if (newValue >= 0 && newValue < options.length) {
                            setHighlightedIndex(newValue)
                        }
                    }
                    break
                }
                case 'Escape':
                    setIsOpen(false)
            }
        }

        selectRef.current?.addEventListener('keydown', handler)

        return () => selectRef.current?.removeEventListener('keydown', handler)
    }, [isOpen, highlightedIndex, options])

    return (
        <div
            ref={selectRef}
            tabIndex={1}
            onBlur={(e) => {
                setTimeout(() => setIsOpen(false), 150)
            }}
            onClick={() => setIsOpen(prev => !prev)}
            className='flex items-center w-64 bg-slate-800 p-3 rounded-lg text-white min-h-12 relative focus:outline-none focus:ring-1 focus:ring-green-600 transition-all'>
            <span className={`grow cursor-pointer flex gap-1 ${multiple ? 'flex-wrap' : 'truncate'}`}>{multiple ? value.map(o => (
                <button
                    onClick={e => {
                        e.stopPropagation()
                        deleteOption(o)
                    }}
                    key={o.value}
                    className='group border px-1 rounded text-sm flex items-center hover:bg-red-300 hover:text-gray-900 hover:border-red-200
                    focus:bg-red-300 focus:text-gray-900 focus:border-red-200  focus:outline-none transition duration-100'>
                    {o.label}
                    <IoIosClose className='size-5 group-hover:text-red-700 group-hover:scale-125 group-focus:text-red-700 group-focus:scale-125 transition-all duration-75' />
                </button>
            )) : value?.label}</span>
            <button
                onMouseDown={e => e.preventDefault()}
                onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    clearOptions()
                }}><IoIosClose className='text-2xl hover:scale-110 transition hover:text-red-300' /></button>
            <div className='w-[0.01rem] bg-slate-400 self-stretch mx-1'></div>
            <button onMouseDown={e => e.preventDefault()}>
                <MdOutlineKeyboardArrowDown className='text-2xl' />
            </button>

            <ul className={`transition-opacity ${isOpen ? 'opacity-100 !visible' : 'opacity-0'} invisible flex flex-col gap-2 bg-gradient-to-b from-slate-800 to-slate-700 absolute w-full top-[calc(100%+0.13rem)] left-0 rounded-lg p-2 max-h-64 overflow-y-auto custom-scrollbar`}>
                {options.map((o, index) => (
                    <li
                        onMouseEnter={() => setHighlightedIndex(index)}
                        onClick={() => selectOption(o)}
                        key={o.value}
                        className={`group p-1.5 rounded-lg cursor-pointer justify-between flex items-center ${isOptionSelected(o) ? SELECTED : ''} 
                        ${index === highlightedIndex ? HIGHLIGHTED : ''}
                        `}
                    >
                        {o.label}
                        {isOptionSelected(o) && <span className='leading-none text-xl -translate-y-0.5 group-hover:text-red-500 group-hover:scale-125'>×</span>}
                    </li>
                ))}
            </ul>

        </div>
    )
}

export default Select