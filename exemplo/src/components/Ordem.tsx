
import { useCookies } from "react-cookie";
import Menu from "./Menu";
import Login from "./Login";
export default function Ordem() {

    const [cookie] = useCookies(['username'])
    if (cookie.username === undefined) {
      return <Login />
    }
    else {
     return (
        <>
            <div className="flex-col">
                <Menu/>
            </div>
            <div className="flex flex-col items-center justify-center ">
                <div className="max-w-md mx-10 my-5 mb-4">
                    Página de ordem
                </div>
            </div>
        </>
        )
     }
}