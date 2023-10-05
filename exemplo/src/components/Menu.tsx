import { MdLogout, MdOutlinePermContactCalendar, MdSell, MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie' // hook para manipular cookies

export default function Menu(){
    // recupera conteúdo do cookie username
    const [cookie] = useCookies(['username'])
    // se o cookie não existir, o valor padrão é 'visitante'
    const username = cookie.username || 'visitante'

    return (
        <div className="flex flex-col w-64 h-screen overflow-y-auto px-4 py-8 border-r">
            <h2 className="text-blue-800 font-semibold text-center text-3xl"> Sistema da Creche </h2>
            <h3 className="text-blue-800 font-semibold text-center text-3xl my-4"> 
                Bem vindo {username} 
            </h3>
            <div className="flex flex-col justify-between mt-6">
                <aside> 
                    <ul>
                        <li className="mb-4">
                            <Link to="/produto" className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-md"> 
                                <MdSell size={20}/>
                                <span className="mx-4 font-medium"> Produto </span>
                            </Link>
                        </li>
                        <li className="mb-4">
                            <Link to="/ordem" className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-md"> 
                                <MdShoppingCart size={20}/>
                                Ordem 
                            </Link>
                        </li>
                        <li className="mb-4">
                            <Link to="/contato" className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-md"> 
                                <MdOutlinePermContactCalendar size={20}/>
                                Contato 
                            </Link>
                        </li>
                        <li className="mb-4">
                            <button className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-md"> 
                                <MdLogout size={20}/>
                                Sair 
                            </button>
                        </li>
                    </ul>
                </aside>
            </div>
        </div>
    )
}