import { useState } from 'react'
import Select, { SelectOption } from './Select'

function App() {
  const options: SelectOption[] = [
    { label: 'Apple', value: 1 },
    { label: 'banana', value: 2 },
    { label: 'coconut', value: 3 },
    { label: 'orange', value: 4 },
    { label: 'tangerine', value: 5 }
  ]

  const [value1, setValue1] = useState<SelectOption | undefined>(options[0])
  const [value2, setValue2] = useState<SelectOption[]>([options[0]])

  return (
    <div className='p-3 flex space-x-5'>
      <div>
        <Select value={value1} options={options} onChange={(o) => setValue1(o)} />
      </div>
      <div>
        <Select multiple value={value2} options={options} onChange={(o) => setValue2(o)} />
      </div>
    </div>
  )
}

export default App
