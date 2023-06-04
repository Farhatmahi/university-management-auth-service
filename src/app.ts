/* eslint-disable no-undef */
import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import usersRouter from './app/modules/users/users.route'

const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//application router
// console.log(process.env)
app.use('/api/v1/users/', usersRouter)

//testing
app.get('/', async (req: Request, res: Response) => {
  res.send('Hello world!')
})

export default app
