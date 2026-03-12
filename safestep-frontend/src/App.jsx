import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"
import NavigationBar from "./components/NavigationBar"
import ProtectedRoute from "./components/ProtectedRoute"
import AdminRoute from "./components/AdminRoute"
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

function AppContent() {
  const location = useLocation()

  return (
    <div className="app-wrapper">
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <NavigationBar />
      )}

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

          <Route
            path="/profilo"
            element={
              <ProtectedRoute>
                <Profilo />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
        </Routes>
      </main>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
