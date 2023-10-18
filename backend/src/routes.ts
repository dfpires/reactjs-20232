import { FastifyInstance } from 'fastify'
export async function AppRoutes(app: FastifyInstance) {
    app.get('/teste', async (request) => { 
        return 'Hello World' 
    })
}
