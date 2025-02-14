import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { AuthProvider } from "./common/context/AuthContext"
import Home from "./pages/Home"

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
