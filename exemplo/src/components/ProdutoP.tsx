
import {useLocation} from 'react-router-dom';
import {useState, useEffect} from 'react'

interface ProdutoProps { // tipo de dado
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

  // fazer o hook useEffect para carregar os produtos da API
  // quando a página for carregada ou o username for alterado
  useEffect( () => {
    const buscaProdutos = async () => {
      try {
        const resp = await fetch(`http://localhost:3000/products`)
        const produtos = await resp.json()
        if (resp.ok){
          setProducts(produtos) // atualiza vetor de produtos com dados da API
        }
        else {
          console.log('Falha na busca por dados')
        }
      }
      catch(error) {
        console.log(error)
      }
    }
      buscaProdutos()
  } , [username])

    return (
      <div className="flex flex-col items-center justify-center h-screen w-screen">
        <div className="max-w-md mx-auto mb-4">
          <h2 className="font-bold mb-4"> Lista de Produtos </h2>
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Nome</th>
                <th className="border border-gray-300 px-4 py-2">Descrição</th>
                <th className="border border-gray-300 px-4 py-2">Preço</th>
                <th className="border border-gray-300 px-4 py-2">Quantidade</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    )
}