import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Hub } from './components/Hub/Hub'
import { OrderPage } from './components/OrderPage/OrderPage'
import { CoinPage } from './components/CoinPage/CoinPage'
import { ChangePage } from './components/ChangePage/ChangePage'

function App() {
 
  return (
    <BrowserRouter>
      <main className='w-full bg-white flex flex-col justify-center items-center'>
        <Routes>
          <Route path='/' element={<Hub/>}/>
          <Route path='/order' element={<OrderPage/>}/>
          <Route path='/coins' element={<CoinPage/>}/>
          <Route path='/change' element={<ChangePage/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
