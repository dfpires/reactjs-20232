import { MdOutlinePermContactCalendar, MdSell, MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Menu(){
    return (
        <div className="flex flex-col w-64 h-screen overflow-y-auto px-4 py-8 border-r">
            <h2 className="text-blue-800 font-semibold text-center text-3xl"> Sistema da Creche </h2>
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
                    </ul>
                </aside>
            </div>
        </div>
    )
}