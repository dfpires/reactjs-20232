import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCookies } from 'react-cookie' // hook para manipular cookies

export default function Login(){
    // vamos criar duas variáveis de estado para username e password   
    // setUsername é uma função que altera o valor de username
    // useState é um hook do ReactJS, cria e inicia a variável de estado
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    // vamos criar um cookie para armazenar o username
    const [cookie, setCookie] = useCookies(['username'])

    // hook do React Router DOM para navegar entre páginas
    const navigate = useNavigate()

    // função que será executada quando o formulário for submetido
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        // previne o comportamento padrão do formulário
        e.preventDefault()
        let usuario = {
            username,
            password
        }
        // vamos verificar se usuário e senha estão corretos
        // vamos conectar assincronamente no backend no endpoint /users?username=xxx
        const resp = await fetch(`http://localhost:3333/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
              // quando enviamos os dados para servidor, convertemos objeto JS para string
              body: JSON.stringify(usuario) 
            })
            .then (resposta => {
                // quando recebemos os dados do servidor, convertemos string para objeto JS 
                return resposta.json() 
            })
        console.log(resp)
        if (resp.length === 0) {
            alert('Usuário / senha incorretos ')
        }
        else {
            // senha correta
            // vamos armazenar o username no cookie username
            setCookie('username', username)
            // vamos navegar para a página de produtos
            navigate('/produto', {state: {username: username, userId: resp[0].id}})
        }
    }
    return (
       <div className="bg-slate-700 flex items-center justify-center h-screen w-screen">
            <div className="bg-teal-600 p-8 rounded-lg drop-shadow-2x1 w-96 flex flex-col items-center">
                <h2 className="font-bold mb-4"> Login </h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block mb-2 font-semibold" htmlFor="username">
                            Username
                        </label>
                        <input type="text" id="username" value={username}
                            onChange={e => setUsername(e.target.value)}
                            className="w-full border rounded p-2" />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 font-semibold" htmlFor="password">
                            Password
                        </label>
                        <input type="password" id="password" value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full border rounded p-2" />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-teal-500 text-white font-semibold p-2 rounded">
                            Login
                    </button>
                </form>
            </div>
       </div>
    )
}