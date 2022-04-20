import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { MakeCalls} from "../src/components/requester"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <MakeCalls></MakeCalls>
    </div>
  )
}

export default App
