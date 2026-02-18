


import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"

import Navbar from './components/navbar/Navbar'
import Dashboard from "./pages/Dashboard"

const App = () => {
  return (
    <>
      <BrowserRouter>
        
      <Navbar/>
        <Routes>
      <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
