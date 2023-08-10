import Login from './components/Login'
import { ProdutoP } from './components/ProdutoP'
import './styles/global.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
// componente funcional
function App() {
  return (
    <Router>
      <Routes>
         <Route path="/" element={<Login />} />
         <Route path="/produto" element={<ProdutoP />} />
      </Routes>
    </Router>
  )
}
export default App
