import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ModalFn from './Components/Modal'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ModalFn />
    </>
  )
}

export default App
