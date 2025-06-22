import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Hub } from './components/Hub'

function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Hub/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
