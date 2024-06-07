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

  const [value, setValue] = useState<SelectOption | undefined>(options[0])

  return (
    <div className='p-3'>
      <Select value={value} options={options} onChange={(o) => setValue(o)} />
    </div>
  )
}

export default App
