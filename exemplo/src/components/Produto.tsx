
// vamos definir as props (propriedades) do componente Produto
interface ProdutoProps {
    nome: string,
    descricao: string,
    qtde: number,
    preco: number
}
export function Produto(prod: ProdutoProps) {

    return (
        <div>
            Nome: {prod.nome}
            Descrição: {prod.descricao}
            Qtde: {prod.qtde}
            Preço: {prod.preco}
        </div>
    )
}

