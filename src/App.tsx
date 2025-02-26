import { HashRouter, Routes, Route } from 'react-router'
import Home from './Home'
import { AppHeader } from './components/AppHeader'


function App() {
  
  return (
    <>
      <HashRouter>
      <AppHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/p/:program" element={<Home />} />
          {/* <Route path="new" element={<New />} /> */}
          {/* <Route path="help" element={<Help />} /> */}
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
