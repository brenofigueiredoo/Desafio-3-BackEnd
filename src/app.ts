import express from 'express'
import { Request, Response } from 'express'

const app = express()
// app.use(express.json());

app.get("/hello", (req: Request, res: Response) => {
    return res.json({message: "Hello TS"})
})

export default app

