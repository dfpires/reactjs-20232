import { Produto } from "./Produto";
import {useLocation} from 'react-router-dom';

export function ProdutoP() {
  // esta variável vai conter o username passado na navegação
  const location = useLocation();
  // recupera o username
  const username = location.state?.username || '';
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