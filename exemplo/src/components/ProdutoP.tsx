import { Produto } from "./Produto";
import {useLocation} from 'react-router-dom';
import {useState, useEffect} from 'react'

interface ProdutoProps {
  id: number,
  name: string,
  description: string,
  price: number,
  qty: number
}

export function ProdutoP() {
  // esta variável vai conter o username passado na navegação
  const location = useLocation();
  // recupera o username
  const username = location.state?.username || '';
  // vetor de produtos
  const [products, setProducts] = useState<ProdutoProps[]>([])

  // fazer o hook useEffect para carregar os produtos 
  // quando a página for carregada ou o username for alterado
  useEffect( () => {
    const buscaProdutos = async () => {
      try {
        const resp = await fetch(`http://localhost:3000/products`)
      }
      catch(error) {

      }
    }
      buscaProdutos()
  } , [username])
    return (
        <>
        <h1> Bem-Vindo {username} </h1>
        <Produto 
          nome={"Notebook"} 
          descricao={"Notebook Dell"} 
          qtde={10} 
          preco={5000.00}/>
        <Produto
         nome={"Celular"} 
         descricao={"Samsung S21"} 
         qtde={10} 
         preco={5000.00}
        /> 
      </>        
    )
}