import { Route, Routes } from 'react-router-dom'
import LoingPage from './pages/LoingPage'
import RegisterPage from './pages/RegisterPage'
import LandingPage from './pages/HomePage'

const App = () => {
  return (
<>

<Routes>
  <Route path= "/" element={<LoingPage />}/>
  <Route path= "/register" element={<RegisterPage />}/>
  <Route path= "/home" element={<LandingPage/>}/>
</Routes>

</>
  )
}

export default App