import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react'

function App() {

  useEffect(() => {
    async function fetchHelloWorld() {
      try {
        const url = '/api/users/m'
        console.log('Fetching from:', new URL(url, window.location.origin))
        const response = await fetch('/api/users/m', {
          headers: {
            'Accept': 'application/json'
          }
        })
        // const response = await fetch('http://localhost:3000/users/m')
        console.log(response)
        const data = await response.json()
        console.log(data)
        setText(data.message)
      }
      catch (error) {
        setText("error")
        console.error(error)
      }
    }
    fetchHelloWorld()
  }, [])
  
  const [count, setCount] = useState(0)
  const [text, setText] = useState("pas encore")

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + Rexxxxxact</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count} and text is {text}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App

