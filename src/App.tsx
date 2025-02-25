import { HashRouter, Routes, Route } from 'react-router'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  
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
      <h1>Vite + React</h1>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <HashRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="new" element={<New />} />
          <Route path="help" element={<Help />} />

        </Routes>
      </HashRouter>
    </>
  )
}

export default App
