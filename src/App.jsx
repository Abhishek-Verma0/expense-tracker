


import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"

import Navbar from './components/navbar/Navbar'
import Dashboard from "./pages/Dashboard"
import AddTransaction from "./pages/AddTransaction"

const App = () => {
  return (
    <>
      <BrowserRouter>
        
      <Navbar/>
        <Routes>
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/addTransaction" element={<AddTransaction/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
