import Fastify from 'fastify'
import cors from '@fastify/cors'
import { AppRoutes } from './routes'
// instanciar o objeto da classe Fastify
const app = Fastify()
// registra o uso do cors
app.register(cors) // permite que qualquer IP utilize as rotas
// registra todas as rotas no servidor HTTP
app.register(AppRoutes)
// vamos subir o servidor, vamos executá-lo, ele ficará ouvindo
// e aguardando as requisições
app.listen({
    port: 3333
})
.then(() => {
    console.log('HTTP server running and listening requests')
})
