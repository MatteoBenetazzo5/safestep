import { BrowserRouter, Route, Routes } from "react-router-dom"
import NavigationBar from "./components/NavigationBar"
import Home from "./pages/Home"
import Terme from "./pages/Terme"
import DettaglioStruttura from "./pages/DettaglioStruttura"
import Parchi from "./pages/Parchi"
import Ristoranti from "./pages/Ristoranti"
import Hotel from "./pages/Hotel"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profilo from "./pages/Profilo"
import AdminDashboard from "./pages/AdminDashboard"
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <NavigationBar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/terme" element={<Terme />} />
            <Route path="/struttura/:id" element={<DettaglioStruttura />} />
            <Route path="/parchi" element={<Parchi />} />
            <Route path="/ristoranti" element={<Ristoranti />} />
            <Route path="/hotel" element={<Hotel />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profilo" element={<Profilo />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
