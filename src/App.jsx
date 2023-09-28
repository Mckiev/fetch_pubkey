import { useState } from 'react'
import Header from "./components/Header"
import Main from "./components/Main"

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="container">
      <Header />
      <Main />
      
    </div>
  )
}

export default App
