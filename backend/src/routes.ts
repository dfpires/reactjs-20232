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
    // rota para recuperar um user
    app.post('/user/login', async (request) => {
        const postBody  = z.object({
            username: z.string(),
            password: z.string(), 
        })
        const {username, password } = postBody.parse(request.body)
        const user = await prisma.user.findMany({
            where: {
                username: username,
                password: password
            }
        })
        return user
    })

    // define uma rota que consulta todos os usuários cadastrados no banco de dados
    app.get('/users', async () => {
        const users = await prisma.user.findMany()
        return users
    })

        // define uma rota que consulta todos os produtos cadastrados no banco de dados
        app.get('/products', async () => {
            const products = await prisma.product.findMany()
            return products
        })
    
    // define uma rota que cria um produto no banco de dados, usando o verbo post, com um usuário
    app.post('/product', async (request) => {
        // recupera os dados do corpo da requisição
        const createProductBody = z.object({
            name: z.string(),
            description: z.string(),
            quantity: z.number(),
            price: z.number(),
            userId: z.number()
        })
        const {name, description, quantity, price, userId} = 
        createProductBody.parse(request.body)

        // insere o produto no banco de dados
        // recupera a data atual - de hoje
        const today = dayjs().startOf('day').toDate() // sem hora, minuto e segundo
        let newProduct = await prisma.product.create({
            data: {
                name,
                description,
                quantity,
                price,
                created_at: today,
                userId
            }
        })
        return newProduct
    })  
    
    // recupera todos os produtos de um usuário
    app.get('/products/:userId', async (request) => {
        const userIdParams = z.object({
            userId: z.string()
        })
        const {userId} = userIdParams.parse(request.params)
        const products = await prisma.product.findMany({
            where: {
                userId: Number(userId)
            }
        })
        return products
    })

    app.patch('/product/compra', async (request) => {
        const compraBody = z.object({
            id: z.number(),
            userId: z.number(),
            quantity: z.number(),
            price: z.number()
        })
        const {id, userId, quantity, price} = compraBody.parse(request.body)

        let productUpdated = await prisma.product.update({
            where: {
                id: id
            },
            data: {
                quantity: {
                    increment: quantity
                }
            }
        })

        const today = dayjs().startOf('day').toDate() // sem hora, minuto e segundo
        await prisma.control.create({
            data: {
                type: "C", 
                quantity,
                price: price,
                created_at: today,
                userId,
                productId: id
            }
        })
        return productUpdated
    })


    //Passo 5. Lista os controls
    app.get('/controls', async () => {
        const controls = await prisma.control.findMany()
        return controls
    })


       // Passo 6. Lista os controls de um usuário
    app.get('/controls/:userId', async (request) => {
    const userIdParams = z.object({
        userId: z.string()
    })
    const {userId} = userIdParams.parse(request.params)
    const controls = await prisma.control.findMany({
        where: {
            userId: Number(userId)
        }
    })
    return controls
})

// Passo 7. Realiza uma venda de um usuário
// rota pra atualizar a quantidade em estoque - venda
app.patch('/product/venda', async (request) => {
    const vendaBody = z.object({
        id: z.number(),
        x: z.number(),
        userId: z.number(),
        price: z.number()
    })
    const {id, x, userId, price} = vendaBody.parse(request.body)

    let resp = await prisma.product.updateMany({
        where: {
            id: id,
            quantity: {
                gte: x
            }
        },
        data: {
            quantity: {
                decrement: x
            }
        }
    })

//  return resp.count
    if ((resp.count) > 0){
        const today = dayjs().startOf('day').toDate() // sem hora, minuto e segundo
        await prisma.control.create({
            data: {
                type: "V", 
                quantity: x,
                price: price,
                created_at: today,
                userId,
                productId: id
            }
        })
        return 1 // indica que a venda foi realizada
    }
    else {
        return 0 // indica que a venda não foi realizada
    }
})

// rota para remover um produto, usando o verbo delete
app.delete('/product/:id', async (request) => {
    // recupera o id para remoção
    const idParam = z.object({
        id: z.string()
    })
    const {id} = idParam.parse(request.params)
    // remove o produto
    let productDeleted = await prisma.product.delete({
        where: {
            id: Number(id)
        }
    })
    return productDeleted
})



}