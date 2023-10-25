import { FastifyInstance } from 'fastify'
import {prisma} from './lib/prisma'
import {z} from 'zod'
import dayjs from 'dayjs'

export async function AppRoutes(app: FastifyInstance) {
    
    app.post('/user', async (request) => {

        const postBody  = z.object({
            username: z.string(),
            password: z.string(), 
            email: z.string()       
        })

        const {username, password, email} = postBody.parse(request.body)

        const created_at = dayjs().startOf('day').toDate() // sem hora, minuto e segundo

        const newUser = await prisma.user.create({
            data: {
                username,
                password, 
                email,
                created_at
            }
        }
        )
        return newUser
    })
}