import { Routes, Route, BrowserRouter } from "react-router-dom"
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />} >
            <Route path="/" element={<Home />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Login register/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App