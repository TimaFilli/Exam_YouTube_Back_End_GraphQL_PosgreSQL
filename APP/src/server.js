import {
    ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageGraphQLPlayground
} from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'
import { graphqlUploadExpress } from 'graphql-upload'
import queryParser from '#helpers/queryParser'
import schema from './modules/index.js'
import ip from '#helpers/getIp'
import JWT from '#helpers/jwt'
import express from 'express'
import http from 'http'
import cors from 'cors'
import path from 'path'
import './config.js'


!async function () {
    const app = express()
    const httpServer = http.createServer(app)

    app.use(cors())
    app.use(graphqlUploadExpress())
    app.use(express.static(path.join(process.cwd(), 'uploads')))

    const server = new ApolloServer({
        schema,
        csrfPrevention: true,
        context: ({ req }) => {
            const { operation, fieldName } = queryParser(req.body)

            if (fieldName === '__schema') return

            if ([
                'login',
                'register',
                'users',
                'user',
                'videos',
                'video'
            ].includes(fieldName)) {
                return {
                    agent: req.headers['user-agent'],
                    userIp: req.ip
                }
            }

            const TOKEN = req.headers?.token?.trim()

            if (!TOKEN) {
                throw new Error("Token is required!")
            }

            const { user_id, agent, userIp } = JWT.verify(TOKEN)

            if (
                req.headers['user-agent'].trim() !== agent.trim()
            ) {
                throw new Error("Wrong device")
            }

            return {
                agent: req.headers['user-agent'],
                userIp: req.ip
            }
        },
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground(),
            ApolloServerPluginDrainHttpServer({ httpServer })
        ],
    })

    await server.start()
    server.applyMiddleware({ app, path: '/graphql' })

    await new Promise(resolve => httpServer.listen({ port: process.env.PORT }, resolve))
    console.log(`🚀 Server ready at http://${ip({ internal: false })}:${process.env.PORT}${server.graphqlPath}`)
}()