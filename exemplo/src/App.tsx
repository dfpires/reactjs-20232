import Contato from './components/Contato'
import Login from './components/Login'
import Menu from './components/Menu'
import Ordem from './components/Ordem'
import { ProdutoP } from './components/ProdutoP'
import './styles/global.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
// componente funcional
function App() {
  return (
    <Router>
      <div className="flex">
        <div className="flex-col">
          <Menu/>
        </div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/produto" element={<ProdutoP />} />
          <Route path="/ordem" element={<Ordem/>}/>
          <Route path="/contato" element={<Contato/>}/>
        </Routes>
      </div>
    </Router>
  )
}
export default App
