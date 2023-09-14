import { useLocation } from "react-router-dom";
import Menu from "./Menu"

export default function Contato(){
    
         // esta variável vai conter o username passado na navegação
         //vamos utilizar Cookies para armazenar o username - BREVE
  const location = useLocation();
  // recupera o username
  const username = location.state?.username || '';
  
    return (
        <>
         <div className="flex-col">
        <Menu username={username}/>
      </div>
    <div className="flex flex-col items-center justify-center ">
        <div className="max-w-md mx-10 my-5 mb-4">
                Página de contato
            </div>
        </div>
        </>
    )
}