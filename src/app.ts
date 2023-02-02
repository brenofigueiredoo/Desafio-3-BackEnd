import express from 'express'
import "express-async-errors"
import cors from "cors"

import { handleError } from './errors/appError';
import clientsRoutes from './routes/clients.routes'
import contactsRoutes from './routes/contacts.routes';
import loginRoutes from './routes/login.routes';

const app = express()
app.use(cors())
app.use(express.json());

app.use("/clients", clientsRoutes)
app.use("/contacts", contactsRoutes)
app.use("/login", loginRoutes)

app.use(handleError)

export default app

