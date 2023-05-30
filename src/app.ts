import express, { Application, Request, Response } from 'express'
import cors from 'cors'

const app: Application = express()
export const PORT = 4000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: any) => {
  res.send('Hello world!')
})

export default app
