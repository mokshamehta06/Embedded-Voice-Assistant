import React, { useState, useEffect } from "react"
import { Route, Routes, Navigate } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Billing from "./pages/Billing.jsx"
import Builder from "./pages/Buider.jsx"
import Navbar from "./components/Navbar.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx"
import axios from "axios"
import { Toaster } from "react-hot-toast"
export const ClientUrl="http://localhost:5173"
export const SeverUrl = "http://localhost:5000"
function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await axios.get(SeverUrl + "/api/user/current-user", {
          withCredentials: true
        })
        setUser(res.data)
        setLoading(false)
      }
      catch (error) {
        console.log(error)
        setLoading(false)

      }
    }
    fetchMe()
  }, []);
  return (
    <>
    <Toaster position="top-right"/>
      <Routes>
        <Route path='/login' element={<Login setUser={setUser} />} />
        <Route path='/*' element={<ProtectedRoute user={user} loading={loading}>
          <Navbar user={user} setUser={setUser} />
          <Routes>
            <Route path='/' element={<Home user={user} />} />
            <Route path='/billing' element={<Billing user={user} />} />
            <Route path='/builder' element={<Builder user={user} />} />
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </ProtectedRoute>
        } />
      </Routes>
    </>
  )
}

export default App 