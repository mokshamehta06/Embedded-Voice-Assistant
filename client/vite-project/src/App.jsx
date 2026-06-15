import React, { useState, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import axios from "axios"
import { linkWithCredential } from "firebase/auth"
import ProtectedRoute from "./components/ProtectedRoute.jsx"

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
      <Routes>
        <Route path='/login' element={<Login setUser={setUser} />} />
        <Route path='/*' element={<ProtectedRoute user={user} loading={loading}>
          <Navbar setUser={setUser} />
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